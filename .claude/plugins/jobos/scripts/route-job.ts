#!/usr/bin/env bun
/**
 * route-job.ts - Routes a job to the correct next queue based on its current state
 *
 * Usage: bun run scripts/route-job.ts <job_id>
 * Example: bun run scripts/route-job.ts abc123
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Get plugin root from script directory
const PLUGIN_ROOT = join(String(import.meta.dir), '..');
const STATE_DIR = join(PLUGIN_ROOT, 'state');
const SCHEMA_PATH = join(STATE_DIR, 'schema', 'job-states.json');

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

// State to queue mapping
const STATE_TO_QUEUE: Record<string, string | null> = {
  'discovered': 'inbound_jobs',
  'normalized': 'inbound_jobs',
  'route_inspected': 'inspected_jobs',
  'fit_scored': 'inspected_jobs',
  'shortlisted': 'shortlisted_jobs',
  'packet_prepared': 'prep_queue',
  'reviewed': 'review_queue',
  'ready_for_execution': 'execute_queue',
  'executed': 'followup_queue',
  'followup_pending': 'followup_queue',
  'closed': null, // Terminal state, no queue
  'rejected': null, // Terminal state, no queue
};

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
 * Loads a normalized job
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
 * Gets the current queue for a job based on its state
 */
function getQueueForState(state: string): string | null {
  return STATE_TO_QUEUE[state] || null;
}

/**
 * Determines the next state and queue for a job
 * For now, uses the first next state from the schema
 * In a full implementation, this would use routing rules
 */
function determineNextRoute(schema: JobStatesSchema, currentState: string): { nextState: string; nextQueue: string | null } {
  const stateConfig = schema.states[currentState];

  if (!stateConfig || stateConfig.next.length === 0) {
    console.error(`Error: No next states available for current state: ${currentState}`);
    process.exit(1);
  }

  // Default to first next state (can be enhanced with routing logic)
  const nextState = stateConfig.next[0];
  const nextQueue = getQueueForState(nextState);

  return { nextState, nextQueue };
}

/**
 * Main route job logic
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    console.error('Usage: bun run scripts/route-job.ts <job_id>');
    console.error('Example: bun run scripts/route-job.ts abc123');
    process.exit(1);
  }

  const [jobId] = args;

  // Load schema and job
  const schema = loadSchema();
  const job = loadNormalizedJob(jobId);

  const currentState = job.state;
  console.log(`Current state: ${currentState}`);

  // Get current queue
  const currentQueue = getQueueForState(currentState);
  console.log(`Current queue: ${currentQueue || 'none (terminal state)'}`);

  // Determine next route
  const { nextState, nextQueue } = determineNextRoute(schema, currentState);

  console.log(`Next state: ${nextState}`);
  console.log(`Next queue: ${nextQueue || 'none (terminal state)'}`);

  if (!currentQueue || !nextQueue) {
    console.log(`\nJob ${jobId} is in a terminal state or cannot be routed automatically.`);
    console.log('Use queue-advance.ts to manually move the job if needed.');
    return;
  }

  // For now, print the routing decision
  // In a full implementation, this would call queue-advance logic
  console.log(`\n─── Routing Decision ───`);
  console.log(`Job ${jobId} should advance:`);
  console.log(`  From: ${currentQueue} (${currentState})`);
  console.log(`  To: ${nextQueue} (${nextState})`);
  console.log(`\nRun: bun run scripts/queue-advance.ts ${jobId} ${currentQueue} ${nextQueue} ${nextState}`);
}

// Run route job
main();
