#!/usr/bin/env bun
/**
 * init-jobos.ts - Scaffolds all state directories and creates seed files
 *
 * Usage: bun run scripts/init-jobos.ts
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// Get plugin root from script directory
const PLUGIN_ROOT = join(String(import.meta.dir), '..');
const STATE_DIR = join(PLUGIN_ROOT, 'state');

// Directory structure to create
const DIRECTORIES = [
  'queues',
  'jobs/raw',
  'jobs/normalized',
  'jobs/packets',
  'jobs/reports',
  'memory',
  'logs/sessions',
  'outputs/resumes',
  'outputs/cover_letters',
  'outputs/emails',
  'outputs/screening',
  'outputs/review_reports',
  'outputs/packets',
];

// Queue seed files (empty JSONL)
const QUEUE_FILES = [
  'inbound_jobs.jsonl',
  'inspected_jobs.jsonl',
  'shortlisted_jobs.jsonl',
  'prep_queue.jsonl',
  'review_queue.jsonl',
  'execute_queue.jsonl',
  'followup_queue.jsonl',
];

// Memory seed files (empty JSONL)
const MEMORY_FILES = [
  'seen_urls.jsonl',
  'canonical_jobs.jsonl',
  'portal_memory.jsonl',
  'route_memory.jsonl',
  'answer_memory.jsonl',
  'failure_patterns.jsonl',
];

// Event log
const EVENT_LOG = 'events.jsonl';

/**
 * Ensures a directory exists, creating it if necessary
 */
function ensureDir(dirPath: string): boolean {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
    return true;
  }
  return false;
}

/**
 * Creates an empty JSONL file if it doesn't exist
 */
function ensureJsonl(filePath: string): boolean {
  const fullPath = join(STATE_DIR, filePath);
  if (!existsSync(fullPath)) {
    writeFileSync(fullPath, '', 'utf-8');
    return true;
  }
  return false;
}

/**
 * Main initialization logic
 */
function main() {
  console.log(`JobOS Plugin Root: ${PLUGIN_ROOT}`);
  console.log(`State Directory: ${STATE_DIR}`);
  console.log('');

  let createdDirs = 0;
  let createdFiles = 0;

  // Create directories
  console.log('Creating directories...');
  for (const dir of DIRECTORIES) {
    const dirPath = join(STATE_DIR, dir);
    if (ensureDir(dirPath)) {
      console.log(`  ✓ Created: ${dir}`);
      createdDirs++;
    } else {
      console.log(`  - Exists: ${dir}`);
    }
  }
  console.log('');

  // Create queue files
  console.log('Creating queue seed files...');
  for (const file of QUEUE_FILES) {
    const filePath = join('queues', file);
    if (ensureJsonl(filePath)) {
      console.log(`  ✓ Created: ${filePath}`);
      createdFiles++;
    } else {
      console.log(`  - Exists: ${filePath}`);
    }
  }
  console.log('');

  // Create memory files
  console.log('Creating memory seed files...');
  for (const file of MEMORY_FILES) {
    const filePath = join('memory', file);
    if (ensureJsonl(filePath)) {
      console.log(`  ✓ Created: ${filePath}`);
      createdFiles++;
    } else {
      console.log(`  - Exists: ${filePath}`);
    }
  }
  console.log('');

  // Create event log
  console.log('Creating event log...');
  const eventLogPath = join('logs', EVENT_LOG);
  if (ensureJsonl(eventLogPath)) {
    console.log(`  ✓ Created: ${eventLogPath}`);
    createdFiles++;
  } else {
    console.log(`  - Exists: ${eventLogPath}`);
  }
  console.log('');

  // Summary
  console.log('─── Summary ───');
  console.log(`Directories created: ${createdDirs}`);
  console.log(`Files created: ${createdFiles}`);
  console.log('State initialized successfully.');
}

// Run initialization
main();
