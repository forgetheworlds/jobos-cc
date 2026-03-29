#!/usr/bin/env bun
/**
 * generate-report.ts - Generates pipeline statistics report
 *
 * Usage: bun run scripts/generate-report.ts [--save]
 * Example: bun run scripts/generate-report.ts --save
 */

import { readFileSync, existsSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

// Get plugin root from script directory
const PLUGIN_ROOT = join(String(import.meta.dir), '..');
const STATE_DIR = join(PLUGIN_ROOT, 'state');

interface QueueEntry {
  job_id: string;
  queued_at: string;
  queue: string;
}

interface Event {
  timestamp: string;
  session_id: string;
  event_type: string;
  job_id: string;
  agent: string;
  details: Record<string, any>;
}

/**
 * Loads JSONL file as array of objects
 */
function loadJsonl(filePath: string): any[] {
  if (!existsSync(filePath)) {
    return [];
  }

  const content = readFileSync(filePath, 'utf-8');
  const lines = content.trim().split('\n').filter(line => line.length > 0);

  return lines.map(line => {
    try {
      return JSON.parse(line);
    } catch (error) {
      console.error(`Warning: Failed to parse line in ${filePath}`);
      return null;
    }
  }).filter(item => item !== null);
}

/**
 * Counts jobs by state in normalized jobs directory
 */
function countJobsByState(): Record<string, number> {
  const normalizedDir = join(STATE_DIR, 'jobs', 'normalized');
  const stateCounts: Record<string, number> = {};

  if (!existsSync(normalizedDir)) {
    return stateCounts;
  }

  // Read all JSON files in the directory

  try {
    const files = readdirSync(normalizedDir);
    const jsonFiles = files.filter((f: string) => f.endsWith('.json'));

    for (const file of jsonFiles) {
      const filePath = join(normalizedDir, file);
      try {
        const content = readFileSync(filePath, 'utf-8');
        const job = JSON.parse(content) as { state: string };

        if (job.state) {
          if (!(job.state in stateCounts)) {
            stateCounts[job.state] = 0;
          }
          stateCounts[job.state]++;
        }
      } catch (error) {
        console.error(`Warning: Failed to parse job file ${file}: ${error}`);
      }
    }
  } catch (error) {
    console.error(`Warning: Failed to read normalized jobs directory: ${error}`);
  }

  return stateCounts;
}

/**
 * Generates pipeline statistics
 */
function generateStats() {
  const stats = {
    queues: {} as Record<string, number>,
    states: {} as Record<string, number>,
    events: {} as Record<string, number>,
    totals: {
      jobs: 0,
      events: 0,
    },
  };

  // Count jobs in each queue
  const queueFiles = [
    'inbound_jobs.jsonl',
    'inspected_jobs.jsonl',
    'shortlisted_jobs.jsonl',
    'prep_queue.jsonl',
    'review_queue.jsonl',
    'execute_queue.jsonl',
    'followup_queue.jsonl',
  ];

  const queuesDir = join(STATE_DIR, 'queues');
  for (const queueFile of queueFiles) {
    const queueName = queueFile.replace('.jsonl', '');
    const queuePath = join(queuesDir, queueFile);
    const entries = loadJsonl(queuePath);
    stats.queues[queueName] = entries.length;
    stats.totals.jobs += entries.length;
  }

  // Count jobs by state (placeholder - would require directory scan)
  stats.states = countJobsByState();

  // Count events by type
  const eventLogPath = join(STATE_DIR, 'logs', 'events.jsonl');
  const events = loadJsonl(eventLogPath) as Event[];

  for (const event of events) {
    const eventType = event.event_type;
    if (!(eventType in stats.events)) {
      stats.events[eventType] = 0;
    }
    stats.events[eventType]++;
    stats.totals.events++;
  }

  return stats;
}

/**
 * Formats statistics as markdown report
 */
function formatReport(stats: ReturnType<typeof generateStats>): string {
  const lines: string[] = [];

  lines.push('# JobOS Pipeline Report');
  lines.push('');
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push('');

  // Summary
  lines.push('## Summary');
  lines.push('');
  lines.push(`- Total jobs in queues: ${stats.totals.jobs}`);
  lines.push(`- Total events logged: ${stats.totals.events}`);
  lines.push('');

  // Queue breakdown
  lines.push('## Queue Breakdown');
  lines.push('');
  lines.push('| Queue | Jobs |');
  lines.push('|-------|------|');

  for (const [queue, count] of Object.entries(stats.queues)) {
    lines.push(`| ${queue} | ${count} |`);
  }
  lines.push('');

  // Event breakdown
  if (Object.keys(stats.events).length > 0) {
    lines.push('## Event Breakdown');
    lines.push('');
    lines.push('| Event Type | Count |');
    lines.push('|------------|-------|');

    for (const [eventType, count] of Object.entries(stats.events)) {
      lines.push(`| ${eventType} | ${count} |`);
    }
    lines.push('');
  }

  // State breakdown (placeholder)
  if (Object.keys(stats.states).length > 0) {
    lines.push('## State Breakdown');
    lines.push('');
    lines.push('| State | Jobs |');
    lines.push('|-------|------|');

    for (const [state, count] of Object.entries(stats.states)) {
      lines.push(`| ${state} | ${count} |`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Main generate report logic
 */
function main() {
  const args = process.argv.slice(2);
  const saveFlag = args.includes('--save');

  // Generate statistics
  const stats = generateStats();

  // Format report
  const report = formatReport(stats);

  // Print to stdout
  console.log(report);

  // Save to file if --save flag
  if (saveFlag) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportFileName = `${timestamp}-report.md`;
    const reportPath = join(STATE_DIR, 'logs', 'sessions', reportFileName);

    writeFileSync(reportPath, report, 'utf-8');
    console.log(`\nReport saved to: ${reportPath}`);
  }
}

// Run generate report
main();
