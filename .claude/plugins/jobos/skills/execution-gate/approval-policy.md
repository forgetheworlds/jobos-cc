# Approval Policy — Route-Specific Submission Gates

## Core Rule: FAIL Verdict Is Absolute

**A FAIL verdict from the reviewer can NEVER be overridden.**

If the reviewer marks an application with FAIL, the execution system will not submit it. No exceptions. This is your safety net—when FAIL is triggered, something is fundamentally wrong and must be fixed.

## Pre-Submit Checklist

Before ANY submission, the system verifies these 8 gates:

### Gate 1: Resume Exists and Is Complete
- File must exist at `state/outputs/resumes/{job_id}_resume.txt`
- File must contain at least 500 characters
- **If FAIL**: "Resume file is missing or too short. Regenerate before submitting."

### Gate 2: Cover Letter Exists and Is Complete
- File must exist at `state/outputs/cover_letters/{job_id}_cl.txt`
- File must contain at least 200 characters
- **If FAIL**: "Cover letter file is missing or too short. Regenerate before submitting."

### Gate 3: Review Verdict is PASS or PASS_WITH_REVISIONS (Resolved)
- Read review report from `state/jobs/reports/{job_id}_review.json`
- Verdict must be "PASS" or "PASS_WITH_REVISIONS" with all issues addressed
- **If FAIL**: "Review has not passed. Materials must be reviewed and approved before submitting."
- **NEVER override a FAIL verdict, even with maximum autonomy**

### Gate 4: Fit Score Meets Threshold
- Read fit score from job record or scoring report
- Score must meet or exceed threshold (default: 7.0/10)
- **If FAIL**: "Fit score [X] below threshold [Y]. Are you sure you want to proceed?"

### Gate 5: No Fabrication Flags
- Review checklist items 1 and 2 specifically check for fabrication
- If fabrication detected: immediate FAIL
- **If FAIL**: "Fabrication detected in materials. This must be fixed before submission."

### Gate 6: All Required Fields Are Covered
- Job posting specifies required qualifications and documents
- Candidate data must cover all required fields (name, email, phone, education, experience)
- **If FAIL**: "Missing information for required fields: [list]. Update profile or fill manually."

### Gate 7: Custom Documents Present (If Required)
- Some jobs require teaching philosophy, diversity statement, writing samples, etc.
- If job requires custom documents, verify files exist
- **If FAIL**: "Required custom document missing: [document name]. Prepare before submitting."

### Gate 8: Human Approval (Per Your Settings)
- Your `execution_policy.yml` defines what requires approval
- Default: require explicit approval for submission
- **If FAIL**: "Please review and approve before submission."

## Route-Specific Gates

### ATS/Browser Route
**Scenario**: Job accepts applications through an online portal (Workday, Taleo, etc.)

**Pre-Submit Requirements**:
- [x] All 8 core gates passed
- [x] Browser session is valid (not logged out)
- [x] Portal URL is accessible
- [x] Required documents are ready for upload

**Approval Message**:
> "Your application materials have been reviewed and are ready. I'll fill out the forms and upload your documents. Please review everything before I click submit. Ready to proceed?"

**Auto-Submit**: Only if `execution_policy.yml.auto_submit_ats: true` AND fit score ≥ 8.5 AND review verdict is PASS

**Post-Submit**: Log submission details, move job to followup queue

---

### Email Route
**Scenario**: Job accepts applications via email (address provided in posting)

**Pre-Submit Requirements**:
- [x] All 8 core gates passed
- [x] Email subject line exists (`state/outputs/emails/{job_id}_subject.txt`)
- [x] Email body exists (`state/outputs/emails/{job_id}_body.md`)
- [x] Attachment manifest lists all files to attach
- [x] Draft-only mode is enforced (show email, wait for approval before sending)

**Approval Message**:
> "I've prepared an email draft for this application. Here's what it includes:
>
> **Subject**: [subject line]
> **To**: [email address]
> **Attachments**: [list of files]
>
> Please review the email content below. When you approve, I'll send it.

**Auto-Send**: NEVER automatic. Email submissions always require human approval.

**Post-Send**: Log sent message details, move job to followup queue

---

### Manual Route
**Scenario**: Job requires in-person application, mail submission, or other offline method

**Pre-Submit Requirements**:
- [x] Action brief exists (`state/outputs/packets/{job_id}_manual_brief.md`)
- [x] Brief includes step-by-step instructions
- [x] All required materials are listed and ready

**Approval Message**:
> "This job requires a manual application. Here's what you need to do:
>
> [action brief with instructions]
>
> Let me know once you've completed these steps so I can log the submission."

**Human Confirmation Required**: System waits for you to confirm completion

**Post-Confirmation**: Log submission method and date, move job to followup queue

---

### External Redirect Route
**Scenario**: "Apply" button links to external website (not the original job board)

**Pre-Submit Requirements**:
- [x] All 8 core gates passed
- [x] Destination URL has been re-inspected
- [x] New route classification exists for destination
- [x] Materials are ready for the actual application route

**Approval Message**:
> "This job posting links to another website. Let me check where it goes first to make sure it's safe and to understand how to apply there.
>
> [follows redirect, inspects destination]
>
> This is actually an [ATS/email/manual] application. I'll proceed using that method."

**Never Submit Without Re-Inspection**: Always follow the redirect first, re-classify, then execute per the actual route

---

### Document-Led Route
**Scenario**: Job requires uploading documents but no structured form (common for faculty positions)

**Pre-Submit Requirements**:
- [x] All 8 core gates passed
- [x] All required documents confirmed present
- [x] Documents are in correct formats (PDF, DOCX, etc.)
- [x] Cover letter is addressed to the correct committee/department

**Approval Message**:
> "All documents are ready for upload. Here's what I'll submit:
>
> [list of documents with filenames]
>
> Ready to proceed?"

**Auto-Submit**: Only if `execution_policy.yml.auto_submit_document_led: true` AND review verdict is PASS

---

### Board Simplified Route
**Scenario**: "Easy Apply" or "Quick Apply" on job board (minimal information required)

**Pre-Submit Requirements**:
- [x] All 8 core gates passed
- [x] Basic profile data is current (name, email, phone, resume)
- [x] One-click submission is enabled on job board

**Approval Message**:
> "This is a quick application—just a few clicks. Here's what I'll submit:
>
> [summary of data to be sent]
>
> Shall I go ahead?"

**Auto-Submit**: If `execution_policy.yml.auto_submit_quick_apply: true` AND fit score ≥ 8.0 AND review verdict is PASS

---

## Pre-Submit Summary Format

When all gates pass, the system displays:

```
>>> Pre-Submit Summary

  Job:            [title] at [employer]
  Route:          [route_family]
  Lane:           [lane]
  Fit Score:      [total]/10

  Materials:
    ✓ Resume:        [filename] ([word count] words)
    ✓ Cover Letter:  [filename] ([word count] words)
    ✓ Screening:     [count] questions answered
    ✓ Review:        [verdict]

  Custom Documents:
    ✓ [document name]: [filename]

  Warnings: [any warnings from review, or "None"]

  >>> Ready for submission.
```

## Execution Policy Configuration

Your `state/candidate/execution_policy.yml` controls:

```yaml
# When to auto-submit (always false for email, manual, redirect routes)
auto_submit_ats: false              # Require approval for ATS portals
auto_submit_document_led: false     # Require approval for document uploads
auto_submit_quick_apply: false      # Require approval for quick apply

# Minimum fit score for auto-submit (if enabled)
auto_submit_min_score: 8.5          # Only auto-submit if score ≥ 8.5

# Review requirements
require_review_pass: true           # Require PASS (not PASS_WITH_REVISIONS) for auto-submit

# Approval gates
approve_before_browser_submit: true  # Show filled form before clicking submit
approve_before_email_send: true     # Always show email draft before sending
approve_before_manual_confirm: true # Always confirm manual steps completed

# Safety overrides
never_override_fail_verdict: true   # FAIL verdict always blocks submission
never_override_fabrication: true    # Fabrication flags always block submission
```

## Failure Modes and Recovery

| Failure Type | What Happens | How to Recover |
|--------------|--------------|----------------|
| Missing materials | Execution stops, specific gap identified | Regenerate missing materials via `/prepare` |
| Review not passed | Execution stops | Run `/review` and address issues |
| FAIL verdict | Execution blocked | Fix issues, regenerate materials, re-review |
| Low fit score | Warning, can proceed if you approve | Consider whether job is worth pursuing |
| External redirect | System follows link, re-classifies | Proceed with new route classification |
| Portal unreachable | Execution stops | Try again later, or switch to manual route |
| Email send fails | Logged, job stays in execute queue | Retry or check email configuration |
