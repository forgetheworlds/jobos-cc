#!/usr/bin/env bun
/**
 * validate-packet.ts - Validates application packet completeness
 *
 * Usage: bun run scripts/validate-packet.ts <job_id>
 * Example: bun run scripts/validate-packet.ts abc123
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Get plugin root from script directory
const PLUGIN_ROOT = join(String(import.meta.dir), '..');
const STATE_DIR = join(PLUGIN_ROOT, 'state');
const OUTPUTS_DIR = join(STATE_DIR, 'outputs');

interface PacketManifest {
  job_id: string;
  created_at: string;
  updated_at: string;
  route_family: 'ats_browser' | 'board_simplified' | 'external_redirect' | 'email' | 'document_led' | 'manual';
  files: PacketFile[];
  review: PacketReview;
  destination_re_inspected?: boolean;
}

interface PacketFile {
  type: 'resume' | 'cover_letter' | 'email_body' | 'email_subject' | 'screening_answers' | 'review_report' | 'action_brief' | 'email_attachment' | 'additional_document';
  path: string;
  status: 'pending' | 'complete' | 'failed';
  created_at?: string;
}

interface PacketReview {
  reviewer: string;
  reviewed_at: string;
  verdict: 'PASS' | 'FAIL' | 'REVISE';
  score: number;
  issues: string[];
}

/**
 * Loads a packet manifest
 */
function loadPacketManifest(jobId: string): PacketManifest {
  const manifestPath = join(STATE_DIR, 'jobs', 'packets', `${jobId}_manifest.json`);

  if (!existsSync(manifestPath)) {
    console.error(`Error: Packet manifest not found: ${manifestPath}`);
    process.exit(1);
  }

  try {
    const content = readFileSync(manifestPath, 'utf-8');
    return JSON.parse(content) as PacketManifest;
  } catch (error) {
    console.error(`Error: Failed to parse packet manifest: ${error}`);
    process.exit(1);
  }
}

/**
 * Checks if a file exists and has status != 'pending'
 */
function validateFile(file: PacketFile, outputsDir: string): { valid: boolean; reason: string } {
  const fullPath = join(outputsDir, file.path);

  if (!existsSync(fullPath)) {
    return { valid: false, reason: `File does not exist: ${file.path}` };
  }

  if (file.status === 'pending') {
    return { valid: false, reason: `File status is pending: ${file.path}` };
  }

  if (file.status === 'failed') {
    return { valid: false, reason: `File status is failed: ${file.path}` };
  }

  return { valid: true, reason: '' };
}

/**
 * Validates packet completeness based on route type
 */
function validatePacket(manifest: PacketManifest): { valid: boolean; missing: string[] } {
  const missing: string[] = [];

  // Check review verdict (GAP-005: FAIL verdict blocks execution)
  if (manifest.review.verdict === 'FAIL') {
    missing.push(`Review verdict is FAIL (${manifest.review.issues.join('; ')})`);
  }

  // Route-specific requirements
  if (manifest.route_family === 'ats_browser') {
    // ATS browser routes require: resume, cover_letter
    const resume = manifest.files.find(f => f.type === 'resume');
    const coverLetter = manifest.files.find(f => f.type === 'cover_letter');

    if (!resume) {
      missing.push('resume file not in manifest');
    } else {
      const validation = validateFile(resume, OUTPUTS_DIR);
      if (!validation.valid) missing.push(validation.reason);
    }

    if (!coverLetter) {
      missing.push('cover_letter file not in manifest');
    } else {
      const validation = validateFile(coverLetter, OUTPUTS_DIR);
      if (!validation.valid) missing.push(validation.reason);
    }

  } else if (manifest.route_family === 'board_simplified') {
    // Board simplified routes require: resume (cover_letter optional)
    const resume = manifest.files.find(f => f.type === 'resume');

    if (!resume) {
      missing.push('resume file not in manifest');
    } else {
      const validation = validateFile(resume, OUTPUTS_DIR);
      if (!validation.valid) missing.push(validation.reason);
    }

    // Cover letter is optional for board simplified
    const coverLetter = manifest.files.find(f => f.type === 'cover_letter');
    if (coverLetter) {
      const validation = validateFile(coverLetter, OUTPUTS_DIR);
      if (!validation.valid) missing.push(`Optional cover_letter issue: ${validation.reason}`);
    }

  } else if (manifest.route_family === 'external_redirect') {
    // External redirect routes require: resume, cover_letter, and destination re-inspection
    const resume = manifest.files.find(f => f.type === 'resume');
    const coverLetter = manifest.files.find(f => f.type === 'cover_letter');

    if (!resume) {
      missing.push('resume file not in manifest');
    } else {
      const validation = validateFile(resume, OUTPUTS_DIR);
      if (!validation.valid) missing.push(validation.reason);
    }

    if (!coverLetter) {
      missing.push('cover_letter file not in manifest');
    } else {
      const validation = validateFile(coverLetter, OUTPUTS_DIR);
      if (!validation.valid) missing.push(validation.reason);
    }

    // Check if destination has been re-inspected
    if (!manifest.destination_re_inspected) {
      missing.push('destination_re_inspected flag is false - destination page must be re-inspected before execution');
    }

  } else if (manifest.route_family === 'email') {
    // Email routes require: email_subject, email_body
    const emailSubject = manifest.files.find(f => f.type === 'email_subject');
    const emailBody = manifest.files.find(f => f.type === 'email_body');

    if (!emailSubject) {
      missing.push('email_subject file not in manifest');
    } else {
      const validation = validateFile(emailSubject, OUTPUTS_DIR);
      if (!validation.valid) missing.push(validation.reason);
    }

    if (!emailBody) {
      missing.push('email_body file not in manifest');
    } else {
      const validation = validateFile(emailBody, OUTPUTS_DIR);
      if (!validation.valid) missing.push(validation.reason);
    }

    // Resume is optional for email routes
    const resume = manifest.files.find(f => f.type === 'resume');
    if (resume) {
      const validation = validateFile(resume, OUTPUTS_DIR);
      if (!validation.valid) missing.push(`Optional resume issue: ${validation.reason}`);
    }

    // Attachment manifest is optional but recommended
    const attachments = manifest.files.filter(f => f.type === 'email_attachment');
    if (attachments.length > 0) {
      for (const attachment of attachments) {
        const validation = validateFile(attachment, OUTPUTS_DIR);
        if (!validation.valid) missing.push(`Email attachment issue: ${validation.reason}`);
      }
    }

  } else if (manifest.route_family === 'document_led') {
    // Document-led routes require: resume, cover_letter, and any additional documents
    const resume = manifest.files.find(f => f.type === 'resume');
    const coverLetter = manifest.files.find(f => f.type === 'cover_letter');

    if (!resume) {
      missing.push('resume file not in manifest');
    } else {
      const validation = validateFile(resume, OUTPUTS_DIR);
      if (!validation.valid) missing.push(validation.reason);
    }

    if (!coverLetter) {
      missing.push('cover_letter file not in manifest');
    } else {
      const validation = validateFile(coverLetter, OUTPUTS_DIR);
      if (!validation.valid) missing.push(validation.reason);
    }

    // Check for additional documents required by this route
    const additionalDocs = manifest.files.filter(f => f.type === 'additional_document');
    if (additionalDocs.length > 0) {
      for (const doc of additionalDocs) {
        const validation = validateFile(doc, OUTPUTS_DIR);
        if (!validation.valid) missing.push(`Additional document issue: ${validation.reason}`);
      }
    }

  } else if (manifest.route_family === 'manual') {
    // Manual routes require: action_brief document
    const actionBrief = manifest.files.find(f => f.type === 'action_brief');

    if (!actionBrief) {
      missing.push('action_brief file not in manifest');
    } else {
      const validation = validateFile(actionBrief, OUTPUTS_DIR);
      if (!validation.valid) missing.push(validation.reason);
    }
  }

  // Optional files: screening_answers, review_report
  const optionalFiles = ['screening_answers', 'review_report'];
  for (const type of optionalFiles) {
    const file = manifest.files.find(f => f.type === type);
    if (file) {
      const validation = validateFile(file, OUTPUTS_DIR);
      if (!validation.valid) {
        missing.push(`Optional ${type} issue: ${validation.reason}`);
      }
    }
  }

  return { valid: missing.length === 0, missing };
}

/**
 * Main validate packet logic
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    console.error('Usage: bun run scripts/validate-packet.ts <job_id>');
    console.error('Example: bun run scripts/validate-packet.ts abc123');
    process.exit(1);
  }

  const [jobId] = args;

  // Load packet manifest
  const manifest = loadPacketManifest(jobId);

  console.log(`Packet manifest for job ${jobId}:`);
  console.log(`  Route family: ${manifest.route_family}`);
  if (manifest.destination_re_inspected !== undefined) {
    console.log(`  Destination re-inspected: ${manifest.destination_re_inspected}`);
  }
  console.log(`  Review verdict: ${manifest.review.verdict} (score: ${manifest.review.score})`);
  console.log(`  Files: ${manifest.files.length}`);
  console.log('');

  // Validate packet
  const { valid, missing } = validatePacket(manifest);

  if (valid) {
    console.log('✓ Packet is complete and ready for execution');
    process.exit(0);
  } else {
    console.error('✗ Packet is incomplete or has issues:\n');
    for (const issue of missing) {
      console.error(`  - ${issue}`);
    }
    console.error('');
    process.exit(1);
  }
}

// Run validate packet
main();
