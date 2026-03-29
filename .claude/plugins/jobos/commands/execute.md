---
name: jobos-submit
description: Submit your application. Performs final safety checks and handles the submission based on the job's application method (online form, email, etc.). Always asks for your approval before submitting.
usage: /jobos-submit [--job-id ID] [--all-ready] [--yolo]
examples:
  - /jobos-submit --job-id linkedin_1234567890
  - /jobos-submit --all-ready
  - /jobos-submit --yolo
author: JobOS-CC
version: 1.0.0
---

# /jobos-submit — Submit Application

Submit job applications using the appropriate strategy for each route type.

## Usage

```
/execute [--job-id ID] [--all-ready] [--yolo]
```

## Options

- `--job-id ID`: Execute application for specific job
- `--all-ready`: Execute all jobs that pass approval gates (materials ready, review passed)
- `--yolo`: Auto-approve certain gates (score >= 5.0, skip human approval checkpoint)

## Default Behavior

If no options provided, list jobs that are ready for execution and prompt for selection.

## Approval Gates

Before execution, all jobs must pass:

### Universal Gates
1. Job record exists and route is classified
2. Fit score meets threshold (>= 7.0, or >= 5.0 with `--yolo`)
3. No fabrication flags
4. Review verdict is PASS or PASS_WITH_REVISIONS (resolved)

### Route-Specific Gates
- **ATS/Simplified**: Resume, cover letter, screening answers present; browser automation feasible
- **Email**: Email address valid; attachments present; email draft prepared
- **Document-led**: All required documents present; upload target identified
- **Manual**: Action brief generated; human acknowledgment required

**--yolo** auto-approves:
- Gate 2 (score threshold): allows >= 5.0 instead of >= 7.0
- Human approval checkpoint: skips to auto-execute

**--yolo does NOT override**:
- Fabrication flags (always stop)
- FAIL review verdicts (always stop)
- Missing materials (always stop)

## Examples

Execute specific job:
```bash
/execute --job-id linkedin_1234567890
```

Execute all ready jobs:
```bash
/execute --all-ready
```

Execute with auto-approval (use with caution):
```bash
/execute --all-ready --yolo
```

## Workflow

1. Load execution-agent
2. Load execution policy, route policy, email defaults
3. For each target job:
   - Run execution-gate approval checks
   - If gate fails: stop and report failure
   - If gates pass: route to execution based on `route_family`:
     - `ats_browser` or `board_simplified`: browser automation via agent-browser
     - `email`: send email application
     - `document_led`: upload documents via browser
     - `manual`: display action brief for human handling
     - `external_redirect`: follow redirect, reclassify, re-route
   - Request human approval before final submission (unless `--yolo`)
   - Execute submission
   - Update job status to `submitted`
4. Display execution summary:
   - Successes count
   - Failures with reasons
   - Manual actions required
   - Any errors or issues

## Output

Updated job records with:
- `status`: "submitted"
- `submitted_at`: ISO timestamp
- `submission_method`: "browser_automation" | "email" | "manual" | "document_upload"
- `submission_notes`: Confirmation details or issues

Application audit trail updated in `data/jobs/applications.jsonl`.

## Route Execution Strategies

| Route Family | Execution Method |
|--------------|------------------|
| ats_browser | Playwright browser automation (full ATS form) |
| board_simplified | Playwright browser automation (simplified form) |
| email | Draft and send email with attachments |
| document_led | Playwright browser automation (document upload only) |
| manual | Display action brief, await human completion |
| external_redirect | Follow redirect, reclassify, re-execute |

## Safety

- Never submits without approval gates passing
- Never overrides fabrication flags or FAIL reviews
- Always preserves audit trail
- Always allows human veto at submission point (unless `--yolo`)
- Never fabricates data during form filling
