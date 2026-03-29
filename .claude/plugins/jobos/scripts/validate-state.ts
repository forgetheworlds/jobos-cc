#!/usr/bin/env bun
/**
 * validate-state.ts - Validates FSM state transitions
 *
 * Usage: bun run scripts/validate-state.ts <from_state> <to_state>
 * Example: bun run scripts/validate-state.ts discovered normalized
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Get plugin root from script directory
const PLUGIN_ROOT = join(String(import.meta.dir), '..');
const SCHEMA_PATH = join(PLUGIN_ROOT, 'state', 'schema', 'job-states.json');

interface JobState {
  next: string[];
}

interface JobStatesSchema {
  states: Record<string, JobState>;
  terminal_states: string[];
  route_inspected_states: Record<string, string>;
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
  // Check if from_state exists
  if (!(fromState in schema.states)) {
    console.error(`Error: Invalid from_state "${fromState}". Valid states: ${Object.keys(schema.states).join(', ')}`);
    process.exit(1);
  }

  // Check if to_state exists
  if (!(toState in schema.states)) {
    console.error(`Error: Invalid to_state "${toState}". Valid states: ${Object.keys(schema.states).join(', ')}`);
    process.exit(1);
  }

  // Check if transition is valid
  const stateConfig = schema.states[fromState];
  return stateConfig.next.includes(toState);
}

/**
 * Main validation logic
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error('Usage: bun run scripts/validate-state.ts <from_state> <to_state>');
    console.error('Example: bun run scripts/validate-state.ts discovered normalized');
    process.exit(1);
  }

  const [fromState, toState] = args;

  // Load schema
  const schema = loadSchema();

  // Validate transition
  const isValid = validateTransition(schema, fromState, toState);

  if (isValid) {
    console.log(`Valid transition: ${fromState} → ${toState}`);
    process.exit(0);
  } else {
    const validNextStates = schema.states[fromState].next;
    console.error(`INVALID transition: ${fromState} → ${toState}`);
    console.error(`Valid next states: ${validNextStates.join(', ')}`);
    process.exit(1);
  }
}

// Run validation
main();
