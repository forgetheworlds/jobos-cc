---
name: agent-browser
description: Browser automation agent using Playwright MCP for form filling and application submission. Snapshot-first approach: always take accessibility snapshot before acting. Supports ATSa (Workday, Taleo, Greenhouse, Slate) and simplified boards (LinkedIn, Indeed).
triggers:
  - "fill application"
  - "browser automation"
  - "browser fill"
  - "automate application"
  - "fill out form"
author: JobOS-CC
version: 1.0.0
---

# Agent Browser

The agent-browser skill executes browser automation for job applications using Playwright MCP.

## Core Principle: Snapshot-First

Before any action (click, type, upload):
1. Take accessibility snapshot via `browser_snapshot`
2. Identify target element by accessible name/role
3. Plan action sequence
4. Execute with human confirmation for high-stakes actions

## Workflow

### ATS Browser Flow (Workday, Taleo, Greenhouse, Slate)
1. Navigate to apply URL
2. Take snapshot to understand page structure
3. If account required: create account or sign in
4. Fill sections sequentially:
   - Personal Information
   - Education History
   - Work Experience
   - Attachments (resume, cover letter, custom docs)
   - Screening Questions
5. Review page
6. Submit with human approval

### Board Simplified Flow (LinkedIn, Indeed)
1. Navigate to apply URL
2. Take snapshot
3. Verify pre-filled data accuracy
4. Update incorrect fields
5. Upload tailored resume
6. Answer any screening questions
7. Submit

## Form Filling Rules

### Field Mapping
- Personal Info: name, email, phone from `data/candidate/profile.yml`
- Education: from `data/candidate/education.yml`
- Experience: from `data/candidate/experience.yml`
- Documents: upload from `data/outputs/`
- Screening Questions: from `data/outputs/screening_answers.md`

### Field Type Handling
- Text inputs: use `browser_type` with accurate data
- Dropdowns: use `browser_select_option` with exact match
- Checkboxes: use `browser_click` to toggle
- File uploads: use `browser_file_upload` with absolute paths
- Textareas: use `browser_type` for long-form content

### Safety Rules
- Never guess dropdown values: if value not found, flag for human
- Never fabricate data: only use data from candidate files
- Always verify auto-filled data is correct
- Always take snapshot after page navigation
- Always request human approval before final submit

## Portal-Specific Patterns

See portal-patterns.md for detailed ATS handling strategies.

## Output

Application status updated to `submitted` with:
- `submitted_at`: ISO timestamp
- `submission_method`: "browser_automation"
- `submission_notes`: Confirmation details or issues encountered
