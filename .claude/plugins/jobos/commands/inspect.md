---
name: jobos-check-route
description: Check how to apply for a job — whether it's an online form, email, or something else. Determines the submission method.
usage: /jobos-check-route [--job-id ID] [--all]
examples:
  - /jobos-check-route --job-id linkedin_1234567890
  - /jobos-check-route --all
author: JobOS-CC
version: 1.0.0
---

# /jobos-check-route — Check Application Route

Classify application routes to determine the appropriate submission strategy for each job.

## Usage

```
/inspect [--job-id ID] [--all]
```

## Options

- `--job-id ID`: Classify route for specific job
- `--all`: Classify routes for all discovered jobs

## Default Behavior

If no options provided, inspect all jobs with status "discovered" that lack route classification.

## Examples

Inspect specific job:
```bash
/inspect --job-id linkedin_1234567890
```

Inspect all discovered jobs:
```bash
/inspect --all
```

## Workflow

1. Load route-inspector agent
2. Load route policy from `data/candidate/route_policy.yml`
3. For each target job:
   - Read job record from `data/jobs/discovered_jobs.jsonl`
   - Inspect apply URL and/or navigate to page
   - Classify into route family:
     - ats_browser: Full ATS portal (Workday, Taleo, Greenhouse, Slate)
     - board_simplified: Simplified board (LinkedIn, Indeed)
     - external_redirect: Redirects to external source
     - email: Apply via email
     - document_led: Upload-only
     - manual: Custom or complex
   - Handle external redirects if detected (GAP-007)
   - Update job record with classification
4. Update route memory in `state/memory/route_memory.jsonl`
5. Display classification summary:
   - Distribution across route families
   - External redirects detected
   - Jobs requiring manual handling

## Output

Updated job records with:
- `route_family`: Classified route type
- `route_notes`: Classification reasoning
- `external_redirect_url`: Final URL if redirect detected

Route memory updated with classification audit trail.

## Route Families

| Family | Description | Execution Strategy |
|--------|-------------|---------------------|
| ats_browser | Full ATS portal | Browser automation via agent-browser |
| board_simplified | Simplified board | Browser automation via agent-browser |
| external_redirect | Redirects to external source | Follow redirect, reclassify |
| email | Apply via email | Email application preparer |
| document_led | Upload-only | Document upload via browser |
| manual | Custom or complex | Human review and action brief |
