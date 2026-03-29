#!/usr/bin/env bun
/**
 * log-event.ts - Appends an event to the event log
 *
 * Usage: bun run scripts/log-event.ts <event_type> <job_id> <agent> <details_json>
 * Example: bun run scripts/log-event.ts discovered abc123 discovery-scout '{"source": "linkedin"}'
 */

import { appendFileSync } from 'fs';
import { join } from 'path';

// Get plugin root from script directory
const PLUGIN_ROOT = join(String(import.meta.dir), '..');
const STATE_DIR = join(PLUGIN_ROOT, 'state');
const EVENT_LOG_PATH = join(STATE_DIR, 'logs', 'events.jsonl');

interface Event {
  timestamp: string;
  session_id: string;
  event_type: string;
  job_id: string;
  agent: string;
  details: Record<string, any>;
}

/**
 * Main log event logic
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length !== 4) {
    console.error('Usage: bun run scripts/log-event.ts <event_type> <job_id> <agent> <details_json>');
    console.error('Example: bun run scripts/log-event.ts discovered abc123 discovery-scout \'{"source": "linkedin"}\'');
    process.exit(1);
  }

  const [eventType, jobId, agent, detailsJson] = args;

  // Parse details JSON
  let details: Record<string, any>;
  try {
    details = JSON.parse(detailsJson);
  } catch (error) {
    console.error(`Error: Failed to parse details JSON: ${error}`);
    console.error(`Details JSON: ${detailsJson}`);
    process.exit(1);
  }

  // Create event
  const event: Event = {
    timestamp: new Date().toISOString(),
    session_id: process.env.SESSION_ID || 'unknown',
    event_type: eventType,
    job_id: jobId,
    agent,
    details,
  };

  // Append to event log
  try {
    appendFileSync(EVENT_LOG_PATH, JSON.stringify(event) + '\n', 'utf-8');
    console.log(`✓ Event logged: ${eventType} for job ${jobId} by ${agent}`);
  } catch (error) {
    console.error(`Error: Failed to write to event log: ${error}`);
    process.exit(1);
  }
}

// Run log event
main();
