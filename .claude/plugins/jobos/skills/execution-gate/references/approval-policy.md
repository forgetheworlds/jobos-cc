# Approval Policy — Pre-Submit Verification

## Universal Gates (All Route Families)

### Gate 1: Job Record Exists
- File: `data/jobs/discovered_jobs.jsonl` entry exists
- Check: job_id is valid and record is present
- Fail: "Job record not found. Cannot proceed."

### Gate 2: Route Classified
- Check: `route_family` field is populated
- Fail: "Route not classified. Run /inspect first."

### Gate 3: Fit Score Meets Threshold
- File: `data/handoffs/[slug]/scoring.json`
- Check: `total >= min-score` (default 7.0)
- Exception: `--yolo` allows scores >= 5.0
- Fail: "Fit score [X] below threshold [Y]. Regenerate or decline."

### Gate 4: No Fabrication Flags
- Files: scoring output, review report
- Check: No fabrication detected
- **NEVER override**, even with `--yolo`
- Fail: "Fabrication detected. Materials must be regenerated."

### Gate 5: Review Verdict is PASS or PASS_WITH_REVISIONS (resolved)
- File: `data/outputs/reviews/[slug]_REVIEW.md`
- Check: verdict is PASS, or PASS_WITH_REVISIONS with all revisions completed
- **NEVER override a FAIL verdict**, even with `--yolo`
- Fail: "Review has not passed. Address review feedback first."

## Route-Specific Gates (GAP-004)

### ATS Browser / Board Simplified

#### Gate 6A: Resume and Cover Letter Present
- Files: `data/outputs/resumes/[slug].txt`, `data/outputs/cover_letters/[slug]_CL.txt`
- Check: Both files exist and are non-empty (resume >= 500 chars, cover letter >= 200 chars)
- Fail: "Missing materials. Generate missing files first."

#### Gate 7A: Screening Questions Answered
- File: `data/outputs/screening_answers.md`
- Check: All required questions from posting have answers
- Fail: "Screening questions incomplete. Complete answers first."

#### Gate 8A: Browser Automation Feasible
- Check: No CAPTCHA walls detected during route inspection
- Check: No unusual bot protection
- Fail: "Browser automation blocked. Route to manual or handle manually."

#### Gate 9A: Custom Documents (if required)
- File: `scoring.json.custom_doc_flags`
- Check: If any flags exist, verify files exist in `data/outputs/`
- Fail: "Required custom document missing: [document name]"

---

### Email Application

#### Gate 6E: Email Address Valid
- Check: Target email address is present and valid format
- Fail: "Invalid or missing email address."

#### Gate 7E: Attachments Present
- Files: Resume, cover letter, any custom docs
- Check: All attachment files exist
- Fail: "Missing attachment: [filename]"

#### Gate 8E: Email Content Prepared
- File: `data/outputs/email_application/[slug]_EMAIL.md`
- Check: Email draft exists with subject, body, attachment list
- Fail: "Email draft not prepared. Run email-application-preparer first."

---

### Document-Led

#### Gate 6D: All Required Documents Present
- Check: Resume, cover letter, and any custom documents exist
- Fail: "Missing required document: [document type]"

#### Gate 7D: Document Upload Target Identified
- Check: apply_url is valid and accessible
- Fail: "Upload target not accessible."

---

### Manual

#### Gate 6M: Action Brief Generated
- File: `data/outputs/action_briefs/[slug]_BRIEF.md`
- Check: Action brief exists with clear instructions
- Fail: "Action brief not generated. Create brief first."

#### Gate 7M: Human Acknowledgment Required
- Check: User confirms they will handle manually
- Fail: "Manual application requires human acknowledgment."

---

## Gate Results

### All Gates Pass
Display pre-submit summary:
```
>>> Pre-Submit Summary

  Job:            [title] at [employer]
  Route:          [route_family]
  Lane:           [lane]
  Fit Score:      [total]/10

  Materials:
    [x] Resume:        [filename] ([word count] words)
    [x] Cover Letter:  [filename] ([word count] words)
    [x] Screening:     [count] questions answered
    [x] Review:        [verdict]

  Custom Documents:
    [x] [document name]: [filename]

  Route-Specific:
    [ATS/Simplified] Browser automation: Feasible
    [Email] Email draft: Prepared
    [Document-led] Upload target: Identified
    [Manual] Action brief: Generated

  Warnings: [any warnings from review]

  >>> Ready for execution.
```

Proceed to execution strategy.

### Any Gate Fails
Display specific failure reason and STOP. Do not proceed to execution.

## Human Approval

### Default Mode
Require explicit human confirmation at execution point (after gates pass, before submission).

### --yolo Mode
Auto-approve:
- Gate 3 (score threshold): allow >= 5.0 instead of >= 7.0
- Gate 8A (browser feasibility): proceed with caution if CAPTCHA detected
- Human approval checkpoint: skip to auto-execute

**--yolo does NOT override:**
- Gate 4 (fabrication): always stop
- Gate 5 (FAIL review): always stop
- Gate 7A/M (missing materials): always stop

## Execution Routing

After gates pass, route to appropriate execution:

| Route Family | Execution Strategy |
|--------------|-------------------|
| ats_browser | agent-browser skill (full ATS automation) |
| board_simplified | agent-browser skill (simplified form) |
| email | email-application-preparer skill (send email) |
| document_led | agent-browser skill (document upload only) |
| manual | Display action brief, await human confirmation |
| external_redirect | Follow redirect, reclassify, then re-route |
