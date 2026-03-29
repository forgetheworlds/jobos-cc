---
name: execution-gate
description: Final safety check before submitting a job application. Makes sure all materials are ready, reviewed, and approved. Handles different application types — online forms, email applications, and manual submissions.
triggers:
  - "execute application"
  - "submit application"
  - "apply"
  - "execute"
  - "submit"
  - "send my application"
  - "I'm ready to apply"
  - "submit this job"
author: JobOS-CC
version: 1.0.0
---

# Execution Gate

The execution-gate skill performs the final safety checks before you submit a job application. It makes sure everything is ready and guides you through the submission process based on how the employer accepts applications.

## When to Use This Skill

Use this skill when:
- You've prepared all your materials (resume, cover letter, etc.)
- The materials have been reviewed and approved
- You're ready to actually submit the application
- You want to make sure nothing was missed

## What This Skill Does

1. **Double-checks everything is ready** — Verifies your materials exist and passed review
2. **Handles the submission safely** — Different jobs have different submission methods
3. **Asks for your approval** — Never submits without your explicit consent
4. **Keeps a record** — Logs what was submitted and when

## How Applications Are Submitted

Jobs accept applications in different ways. This skill detects the method and handles it appropriately:

| Application Type | What Happens |
|-----------------|--------------|
| **Online form** (ATS) | System fills out the web form for you, but asks before clicking "Submit" |
| **Quick apply** (LinkedIn/Indeed Easy Apply) | Fills the simplified form directly on the job board |
| **Email application** | Creates a complete email draft with subject, body, and attachments for you to review |
| **Document upload** | Helps you upload required documents (teaching statements, etc.) |
| **External website** | Guides you to the employer's website, then helps you apply there |
| **Manual application** | Creates a step-by-step action guide for you to follow yourself |

## The Approval Checklist

Before any submission, this skill checks:

- ✅ **Materials ready** — Resume and cover letter exist
- ✅ **Quality approved** — Reviewer gave a "PASS" or "PASS WITH REVISIONS" (and revisions done)
- ✅ **Good fit** — Job scored 6.0 or higher (good match)
- ✅ **No red flags** — No fabrication detected, no banned phrases
- ✅ **Application method clear** — We know how to submit (online form, email, etc.)
- ✅ **Your consent** — You explicitly approve the submission

## Safety Rules

**The reviewer has final say:** If the reviewer said the materials failed ("FAIL" verdict), you cannot submit. You must fix the issues and get a new review first.

**You control submission:** The system will never click "Submit" or send an email without your explicit "yes" confirmation.

**Record keeping:** Every submission attempt is logged, including date/time and outcome.

## What to Expect

1. **System checks your materials** — "Checking that everything is ready..."
2. **Shows you what's being submitted** — Displays job title, employer, and materials
3. **Asks for your go-ahead** — "Ready to submit? Type 'yes' to proceed."
4. **Handles the submission** — Fills forms, prepares email, or creates action guide
5. **Confirms completion** — "Application submitted successfully" or "Here's your next step..."

## If Something Isn't Ready

The skill will tell you exactly what's missing:
- "Cover letter not found — run /prepare first"
- "Review verdict is FAIL — fix issues and re-review before submitting"
- "Job score is 4.2 (weak match) — are you sure you want to apply?"

## Reference Files

- `references/approval-policy.md` — Detailed approval rules
- `state/candidate/execution_policy.yml` — Your preferences for automation level
- `state/candidate/route_policy.yml` — Your comfort level with different application types
