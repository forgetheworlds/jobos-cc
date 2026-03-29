#!/usr/bin/env bun
/**
 * merge-discoveries.ts - Deduplicates and canonicalizes new job discoveries
 *
 * Usage: bun run scripts/merge-discoveries.ts <discoveries.json>
 * Example: bun run scripts/merge-discoveries.ts discoveries.json
 */

import { readFileSync, writeFileSync, appendFileSync, existsSync } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';

// Get plugin root from script directory
const PLUGIN_ROOT = join(String(import.meta.dir), '..');
const STATE_DIR = join(PLUGIN_ROOT, 'state');

interface DiscoveredJob {
  url: string;
  title: string;
  employer: string;
  [key: string]: any;
}

interface SeenUrl {
  url: string;
  first_seen: string;
}

interface CanonicalJob {
  id: string;
  title: string;
  employer: string;
  urls: string[];
  first_seen: string;
  last_seen: string;
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
      console.error(`Error: Failed to parse line: ${line}`);
      return null;
    }
  }).filter(item => item !== null);
}

/**
 * Appends an object to a JSONL file
 */
function appendJsonl(filePath: string, obj: any): void {
  appendFileSync(filePath, JSON.stringify(obj) + '\n', 'utf-8');
}

/**
 * Checks if a URL has been seen before
 */
function isUrlSeen(url: string, seenUrls: SeenUrl[]): boolean {
  return seenUrls.some(entry => entry.url === url);
}

/**
 * Checks if a job (title + employer) is similar to a canonical job
 * Uses simple string matching (can be enhanced with fuzzy matching)
 */
function isDuplicateJob(title: string, employer: string, canonicalJobs: CanonicalJob[]): boolean {
  const normalizedTitle = title.toLowerCase().trim();
  const normalizedEmployer = employer.toLowerCase().trim();

  return canonicalJobs.some(job => {
    const jobTitle = job.title.toLowerCase().trim();
    const jobEmployer = job.employer.toLowerCase().trim();

    // Exact match on title and employer
    if (jobTitle === normalizedTitle && jobEmployer === normalizedEmployer) {
      return true;
    }

    // Title similarity (contains)
    if (jobTitle.includes(normalizedTitle) || normalizedTitle.includes(jobTitle)) {
      if (jobEmployer === normalizedEmployer) {
        return true;
      }
    }

    return false;
  });
}

/**
 * Main merge discoveries logic
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    console.error('Usage: bun run scripts/merge-discoveries.ts <discoveries.json>');
    console.error('Example: bun run scripts/merge-discoveries.ts discoveries.json');
    process.exit(1);
  }

  const discoveriesPath = args[0];

  if (!existsSync(discoveriesPath)) {
    console.error(`Error: Discoveries file not found: ${discoveriesPath}`);
    process.exit(1);
  }

  // Load discoveries
  let discoveries: DiscoveredJob[];
  try {
    const content = readFileSync(discoveriesPath, 'utf-8');
    discoveries = JSON.parse(content) as DiscoveredJob[];
  } catch (error) {
    console.error(`Error: Failed to parse discoveries file: ${error}`);
    process.exit(1);
  }

  console.log(`Loaded ${discoveries.length} discoveries from ${discoveriesPath}`);

  // Load memory files
  const seenUrlsPath = join(STATE_DIR, 'memory', 'seen_urls.jsonl');
  const canonicalJobsPath = join(STATE_DIR, 'memory', 'canonical_jobs.jsonl');
  const inboundQueuePath = join(STATE_DIR, 'queues', 'inbound_jobs.jsonl');

  const seenUrls = loadJsonl(seenUrlsPath) as SeenUrl[];
  const canonicalJobs = loadJsonl(canonicalJobsPath) as CanonicalJob[];

  console.log(`Loaded ${seenUrls.length} seen URLs`);
  console.log(`Loaded ${canonicalJobs.length} canonical jobs`);

  // Process discoveries
  let newJobs = 0;
  let duplicateUrls = 0;
  let duplicateJobs = 0;

  for (const discovery of discoveries) {
    // Check for duplicate URL
    if (isUrlSeen(discovery.url, seenUrls)) {
      console.log(`Skipping duplicate URL: ${discovery.url}`);
      duplicateUrls++;
      continue;
    }

    // Check for duplicate job (title + employer)
    if (isDuplicateJob(discovery.title, discovery.employer, canonicalJobs)) {
      console.log(`Skipping duplicate job: ${discovery.title} at ${discovery.employer}`);
      duplicateJobs++;
      continue;
    }

    // This is a new job
    const jobId = randomUUID();
    const now = new Date().toISOString();

    // Create queue entry
    const queueEntry = {
      job_id: jobId,
      queued_at: now,
      queue: 'inbound_jobs',
    };
    appendJsonl(inboundQueuePath, queueEntry);

    // Create canonical job entry
    const canonicalJob: CanonicalJob = {
      id: jobId,
      title: discovery.title,
      employer: discovery.employer,
      urls: [discovery.url],
      first_seen: now,
      last_seen: now,
    };
    appendJsonl(canonicalJobsPath, canonicalJob);

    // Add to seen URLs
    const seenUrl: SeenUrl = {
      url: discovery.url,
      first_seen: now,
    };
    appendJsonl(seenUrlsPath, seenUrl);

    // Save normalized job
    const normalizedJob = {
      id: jobId,
      state: 'discovered',
      created_at: now,
      updated_at: now,
      ...discovery,
    };

    const jobPath = join(STATE_DIR, 'jobs', 'normalized', `${jobId}.json`);
    writeFileSync(jobPath, JSON.stringify(normalizedJob, null, 2), 'utf-8');

    console.log(`✓ Added new job: ${discovery.title} at ${discovery.employer}`);
    newJobs++;
  }

  // Summary
  console.log('\n─── Summary ───');
  console.log(`New jobs: ${newJobs}`);
  console.log(`Duplicate URLs skipped: ${duplicateUrls}`);
  console.log(`Duplicate jobs skipped: ${duplicateJobs}`);
  console.log(`Total processed: ${discoveries.length}`);
}

// Run merge discoveries
main();
