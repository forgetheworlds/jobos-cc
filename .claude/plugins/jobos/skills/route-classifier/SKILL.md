---
name: route-classifier
description: Figure out how to apply for a job — whether it's an online form, email application, or something else. Checks the application method so we know how to submit.
triggers:
  - "classify route"
  - "inspect application route"
  - "determine application type"
  - "what kind of application is this"
  - "check application portal"
references:
  - route-rubric.md
author: JobOS-CC
version: 1.0.0
---

# Route Classifier

The route-classifier skill determines how a job application must be submitted by inspecting the apply URL and, if necessary, navigating to the application page.

## Workflow

1. Read job record from `data/jobs/discovered_jobs.jsonl` or `--job-id`
2. Inspect `apply_url` domain and path
3. If classification unclear from URL:
   - Navigate via Playwright MCP
   - Take snapshot to inspect page structure
4. Classify into route family per `references/route-rubric.md`
5. Handle external redirects (GAP-007) if detected
6. Write `route_family` and `route_notes` to job record
7. Update route memory in `state/memory/route_memory.jsonl`

## Route Families

See `references/route-rubric.md` for detailed classification criteria:
- `ats_browser`: Full ATS portal requiring browser automation
- `board_simplified`: Simplified board with basic form
- `external_redirect`: Redirects to external source
- `email`: Email-only application (apply by email)
- `document_led`: Upload-only (no form, just documents)
- `manual`: Complex or custom requiring human handling

## External Redirect Detection (GAP-007)

If URL redirects:
1. Follow redirect chain
2. Identify final destination
3. If final destination is known source: reclassify to that source
4. If external redirect: tag for special handling
5. Preserve original and final URLs for audit trail

## Output

Updated job record with:
- `route_family`: Classified route type
- `route_notes`: Classification reasoning
- `external_redirect_url`: Final URL if redirect detected
