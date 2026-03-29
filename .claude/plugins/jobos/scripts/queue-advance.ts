#!/usr/bin/env bun
/**
 * queue-advance.ts - Moves a job from one queue to another with state validation
 *
 * Usage: bun run scripts/queue-advance.ts <job_id> <from_queue> <to_queue> <new_state>
 * Example: bun run scripts/queue-advance.ts abc123 inbound_jobs inspected_jobs route_inspected
 */

import { readFileSync, writeFileSync, existsSync, appendFileSync } from 'fs';
import { join } from 'path';

// Get plugin root from script directory
const PLUGIN_ROOT = join(String(import.meta.dir), '..');
const STATE_DIR = join(PLUGIN_ROOT, 'state');
const SCHEMA_PATH = join(STATE_DIR, 'schema', 'job-states.json');

interface QueueEntry {
  job_id: string;
  queued_at: string;
  queue: string;
}

interface JobState {
  next: string[];
}

interface JobStatesSchema {
  states: Record<string, JobState>;
  terminal_states: string[];
  route_inspected_states: Record<string, string>;
}

interface NormalizedJob {
  id: string;
  state: string;
  [key: string]: any;
}

/**
 * Loads the job states schema
 */
function loadSchema(): JobStatesSchema {
  if (!existsSync(SCHEMA_PATH)) {
    console.error(`Error: Schema file not found: ${SCHEMA_PATH}`);
    process.exit(1);
  }

  try {
    const content = readFileSync(SCHEMA_PATH, 'utf-8');
    return JSON.parse(content) as JobStatesSchema;
  } catch (error) {
    console.error(`Error: Failed to parse schema file: ${error}`);
    process.exit(1);
  }
}

/**
 * Validates a state transition
 */
function validateTransition(schema: JobStatesSchema, fromState: string, toState: string): boolean {
  if (!(fromState in schema.states)) {
    console.error(`Error: Invalid from_state "${fromState}"`);
    return false;
  }

  if (!(toState in schema.states)) {
    console.error(`Error: Invalid to_state "${toState}"`);
    return false;
  }

  const stateConfig = schema.states[fromState];
  return stateConfig.next.includes(toState);
}

/**
 * Loads all entries from a queue JSONL file
 */
function loadQueue(queueName: string): QueueEntry[] {
  const queuePath = join(STATE_DIR, 'queues', `${queueName}.jsonl`);

  if (!existsSync(queuePath)) {
    console.error(`Error: Queue file not found: ${queuePath}`);
    process.exit(1);
  }

  const content = readFileSync(queuePath, 'utf-8');
  const lines = content.trim().split('\n').filter(line => line.length > 0);

  return lines.map(line => {
    try {
      return JSON.parse(line) as QueueEntry;
    } catch (error) {
      console.error(`Error: Failed to parse queue entry: ${line}`);
      process.exit(1);
    }
  });
}

/**
 * Writes entries to a queue JSONL file
 */
function writeQueue(queueName: string, entries: QueueEntry[]): void {
  const queuePath = join(STATE_DIR, 'queues', `${queueName}.jsonl`);
  const content = entries.map(entry => JSON.stringify(entry)).join('\n') + '\n';
  writeFileSync(queuePath, content, 'utf-8');
}

/**
 * Loads a normalized job from state/jobs/normalized/
 */
function loadNormalizedJob(jobId: string): NormalizedJob {
  const jobPath = join(STATE_DIR, 'jobs', 'normalized', `${jobId}.json`);

  if (!existsSync(jobPath)) {
    console.error(`Error: Normalized job file not found: ${jobPath}`);
    process.exit(1);
  }

  try {
    const content = readFileSync(jobPath, 'utf-8');
    return JSON.parse(content) as NormalizedJob;
  } catch (error) {
    console.error(`Error: Failed to parse normalized job: ${error}`);
    process.exit(1);
  }
}

/**
 * Saves a normalized job to state/jobs/normalized/
 */
function saveNormalizedJob(job: NormalizedJob): void {
  const jobPath = join(STATE_DIR, 'jobs', 'normalized', `${job.id}.json`);
  writeFileSync(jobPath, JSON.stringify(job, null, 2), 'utf-8');
}

/**
 * Logs an event to the event log
 */
function logEvent(eventType: string, jobId: string, agent: string, details: Record<string, any>): void {
  const eventLogPath = join(STATE_DIR, 'logs', 'events.jsonl');

  const event = {
    timestamp: new Date().toISOString(),
    session_id: process.env.SESSION_ID || 'unknown',
    event_type: eventType,
    job_id: jobId,
    agent,
    details,
  };

  appendFileSync(eventLogPath, JSON.stringify(event) + '\n', 'utf-8');
}

/**
 * Main queue advance logic
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length !== 4) {
    console.error('Usage: bun run scripts/queue-advance.ts <job_id> <from_queue> <to_queue> <new_state>');
    console.error('Example: bun run scripts/queue-advance.ts abc123 inbound_jobs inspected_jobs route_inspected');
    process.exit(1);
  }

  const [jobId, fromQueue, toQueue, newState] = args;

  // Load schema and validate transition
  const schema = loadSchema();
  const normalizedJob = loadNormalizedJob(jobId);
  const currentState = normalizedJob.state;

  console.log(`Current state: ${currentState}`);
  console.log(`Proposed new state: ${newState}`);

  const isValid = validateTransition(schema, currentState, newState);

  if (!isValid) {
    const validNextStates = schema.states[currentState].next;
    console.error(`INVALID transition: ${currentState} → ${newState}`);
    console.error(`Valid next states: ${validNextStates.join(', ')}`);
    process.exit(1);
  }

  console.log(`✓ Valid transition: ${currentState} → ${newState}`);

  // Remove from source queue
  const fromQueueEntries = loadQueue(fromQueue);
  const filteredEntries = fromQueueEntries.filter(entry => entry.job_id !== jobId);

  if (filteredEntries.length === fromQueueEntries.length) {
    console.error(`Error: Job ${jobId} not found in queue ${fromQueue}`);
    process.exit(1);
  }

  writeQueue(fromQueue, filteredEntries);
  console.log(`✓ Removed from ${fromQueue}`);

  // Add to destination queue
  const toQueueEntries = loadQueue(toQueue);
  const newEntry: QueueEntry = {
    job_id: jobId,
    queued_at: new Date().toISOString(),
    queue: toQueue,
  };
  toQueueEntries.push(newEntry);
  writeQueue(toQueue, toQueueEntries);
  console.log(`✓ Added to ${toQueue}`);

  // Update normalized job state
  normalizedJob.state = newState;
  normalizedJob.updated_at = new Date().toISOString();
  saveNormalizedJob(normalizedJob);
  console.log(`✓ Updated job state to ${newState}`);

  // Log event
  logEvent('queue_advance', jobId, 'queue-advance', {
    from_queue: fromQueue,
    to_queue: toQueue,
    old_state: currentState,
    new_state: newState,
  });
  console.log(`✓ Event logged`);

  console.log(`\nJob ${jobId} successfully advanced from ${fromQueue} to ${toQueue}`);
}

// Run queue advance
main();
