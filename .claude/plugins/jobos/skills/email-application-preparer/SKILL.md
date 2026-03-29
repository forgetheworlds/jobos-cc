---
name: email-application-preparer
description: Prepare a complete email application with subject line, body text, and attachment list. Creates a draft for you to review before sending.
triggers:
  - "prepare email application"
  - "draft application email"
  - "email application"
  - "apply via email"
references:
  - email-templates.md
author: JobOS-CC
version: 1.0.0
---

# Email Application Preparer

The email-application-preparer skill generates professional email applications for jobs submitted via email.

## Workflow

1. Load job record and candidate profile
2. Load tailored resume and cover letter
3. Select appropriate email template from `references/email-templates.md`
4. Generate subject line per template patterns
5. Compose body text: professional introduction, qualifications, call to action
6. Create attachment manifest: resume, cover letter, custom docs
7. Write email draft to `data/outputs/email_application/[slug]_EMAIL.md`
8. Format for easy copy-paste or email client import

## Templates

See `references/email-templates.md` for:
- Subject line patterns (with and without job ID)
- Body structure (salutation, introduction, qualifications, closing)
- Attachment manifest format
- Institution-specific variations

## Content Rules

### Subject Lines
- Format: "Application for [Position] - [Name]"
- If job ID known: "Application for [Position] (Job ID: [ID]) - [Name]"
- Keep under 50 characters when possible

### Body Text
- Professional tone
- 2-3 paragraphs maximum
- Reference specific job and institution
- Highlight 2-3 key qualifications
- Clear call to action (request interview)
- Professional closing

### Attachments
- Always attach: resume (PDF)
- Always attach: cover letter (PDF) if required
- Attach custom docs if required (teaching philosophy, etc.)
- List all attachments in manifest

## Output

Email draft file with:
- `to`: Recipient email address
- `subject`: Subject line
- `body`: Email body text
- `attachments`: List of files to attach with absolute paths
