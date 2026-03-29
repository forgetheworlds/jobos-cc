# Route Rubric — Decision Tree for Application Route Classification

This guide explains how to determine what kind of application process a job uses. Understanding the route type helps decide how to prepare materials and execute the application.

---

## The Six Route Families

### 1. ATS Browser (`ats_browser`)
**What it is:** Full application portal through a known Applicant Tracking System (ATS). These are multi-step forms with personal information, education, work experience, document uploads, and screening questions.

**Common ATS Platforms:**
- Workday
- Taleo / Oracle
- Greenhouse
- ICIMS
- Slate (academic institutions)
- ADP
- BambooHR
- UKG (Ultimate Kronos Group)

**Detection Patterns:**

**URL Clues:**
- Contains `wd1.myworkdayjobs.com` or `myworkday.com` → Workday
- Contains `taleo.net` or `oraclecloud.com` → Taleo
- Contains `greenhouse.io` or `boards.greenhouse.io` → Greenhouse
- Contains `icims.com` → ICIMS
- Contains `apply.joinhandshake.com` or university domain → Slate
- Contains `adp.com`, `bamboohr.com`, `ukg.com` → respective ATS

**Page Structure Clues:**
- Multi-page wizard with "Next" and "Previous" buttons
- Left sidebar navigation with sections
- Dropdown-heavy form fields
- Character limits on text fields
- "Create Account" or "Sign In" required
- Sections labeled: Personal Info, Education, Experience, Attachments, Questions

**Confidence Scoring:**
- URL matches known ATS domain → 0.95 confidence
- Page structure matches known ATS pattern → 0.85 confidence
- Multiple clues present → 0.90 confidence

**What to Do:**
- Route to browser automation via Playwright MCP
- Fill form sections sequentially
- Upload all required documents
- Answer screening questions
- Request human approval before final submit

---

### 2. Board Simplified (`board_simplified`)
**What it is:** Simplified application flow hosted on a job board (LinkedIn Easy Apply, Indeed Apply). These are streamlined forms, often with pre-filled data.

**Common Platforms:**
- LinkedIn Easy Apply
- Indeed Apply
- Glassdoor Easy Apply

**Detection Patterns:**

**URL Clues:**
- `linkedin.com/jobs/view/` with "Easy Apply" button → LinkedIn Easy Apply
- `indeed.com` with "Apply Now" or "Easy Apply" → Indeed Apply

**Page Structure Clues:**
- Overlay or modal form (not full page navigation)
- Pre-filled with profile data
- Minimal fields: contact info, resume upload, maybe screening questions
- "Submit Application" button without leaving job board
- No "Create Account" step (uses existing job board account)

**Confidence Scoring:**
- "Easy Apply" button visible → 0.95 confidence
- Overlay form pattern → 0.90 confidence
- Job board domain with simplified flow → 0.85 confidence

**What to Do:**
- Route to browser automation via Playwright MCP
- Verify pre-filled data is accurate
- Upload tailored resume
- Answer any screening questions
- Submit (lower stakes than full ATS)

---

### 3. External Redirect (`external_redirect`)
**What it is:** Job listing on a board or aggregator that redirects to an external application site. The real application is elsewhere.

**Detection Patterns:**

**URL Clues:**
- Job board URL with "Apply on Company Website" button
- Redirect URL visible in button/link text
- Indeed/LinkedIn posting that redirects to employer site

**Page Structure Clues:**
- "Apply on Company Website" or "Apply Now" button
- "Visit [employer] career site" link
- Application link points to different domain

**Confidence Scoring:**
- External link clearly labeled → 0.95 confidence
- Redirect URL points to non-job-board domain → 0.90 confidence

**What to Do (GAP-007):**
1. Follow the redirect to the destination page
2. Re-classify the destination page using this rubric
3. If destination is ATS → reclassify as `ats_browser`
4. If destination is email → reclassify as `email`
5. If destination is document upload → reclassify as `document_led`
6. If destination unclear → keep as `external_redirect` with note
7. Update job record with both original and final URLs

**Example:**
- Start: LinkedIn posting with "Apply on Harvard website"
- Follow redirect → `jobs.harvard.edu/postings/12345` (Workday)
- Reclassify as `ats_browser` with confidence 0.95

---

### 4. Email (`email`)
**What it is:** Application submitted via email. No online form — just send resume, cover letter, and documents to an email address.

**Detection Patterns:**

**Page Text Clues:**
- "Send resume to [email address]"
- "Email application to [email address]"
- "Apply via email to [email]"
- "Please send CV and cover letter to [email]"

**Email Address Validation:**
- Must be valid email format (xxx@xxx.xxx)
- Must be in job description or contact section
- Not just general "contact us" email — should be application-specific

**Confidence Scoring:**
- Clear "send to [email]" instruction → 0.95 confidence
- Email address in application instructions → 0.90 confidence
- Ambiguous email contact (e.g., general inquiries) → 0.60 confidence (ask for confirmation)

**What to Do:**
- Route to email application preparation
- Draft email with subject line, body, and attachments
- Generate send-ready packet
- Submit via email client (manual send)
- No browser automation needed

---

### 5. Document Led (`document_led`)
**What it is:** Application requires uploading specific documents (teaching philosophy, diversity statement, research statement) with minimal or no form fields. Common in academic positions.

**Detection Patterns:**

**Page Text Clues:**
- Document list in description:
  - "Teaching Philosophy required"
  - "Diversity Statement required"
  - "Research Statement required"
  - "Writing sample required"
- "Upload the following documents" with list
- Academic position (faculty, librarian, academic administration)

**Page Structure Clues:**
- Upload-focused interface (multiple file upload fields)
- Minimal text entry fields
- May have basic form (name, contact) but emphasis on documents

**Confidence Scoring:**
- Explicit document list with academic-specific requirements → 0.90 confidence
- Upload-heavy interface for academic role → 0.85 confidence
- Academic position with some form fields → 0.75 confidence (may be ATS with document requirements)

**What to Do:**
- Route to document preparation
- Generate all required documents (resume, cover letter, teaching philosophy, diversity statement, etc.)
- If through ATS portal → route to `ats_browser` with document preparation
- If upload-only interface → route to browser automation focused on uploads

---

### 6. Manual (`manual`)
**What it is:** Application process cannot be automated — requires human judgment, custom handling, or unique process.

**Detection Patterns:**

**Unique Process Indicators:**
- "Apply in person"
- "Mail application to [address]"
- Complex multi-step process with custom requirements
- Application requires physical materials
- Unique selection process (audition, portfolio review, interview-first)

**Technical Blockers:**
- CAPTCHA that prevents automation
- Login system that requires 2FA or human verification
- Custom portal with unpredictable structure
- Video or interactive components required

**Confidence Scoring:**
- Clear "apply in person" or "mail application" → 1.0 confidence
- Complex custom process with automation blockers → 0.90 confidence
- Unfamiliar portal structure after inspection → 0.70 confidence (proceed with caution, ask for human input)

**What to Do:**
- Generate application materials (resume, cover letter, documents)
- Create detailed manual application brief
- Provide step-by-step instructions for human
- Flag for human execution
- Do not attempt browser automation

---

## Classification Decision Tree

### Step 1: Check URL Domain
```
Does URL contain known ATS domain?
├─ Yes → ats_browser (high confidence)
└─ No → Continue to Step 2
```

### Step 2: Check for External Redirect
```
Does page show "Apply on Company Website" or external link?
├─ Yes → external_redirect (follow redirect, then reclassify)
└─ No → Continue to Step 3
```

### Step 3: Check for Email Application
```
Does description say "send email to" or "apply via email"?
├─ Yes → email (verify email address is application-specific)
└─ No → Continue to Step 4
```

### Step 4: Check for Simplified Board Apply
```
Is this LinkedIn/Indeed with Easy Apply button?
├─ Yes → board_simplified
└─ No → Continue to Step 5
```

### Step 5: Check for Academic Document Requirements
```
Does job require teaching philosophy, diversity statement, or research statement?
├─ Yes → document_led (or ats_browser with documents)
└─ No → Continue to Step 6
```

### Step 6: Check for Manual Process Indicators
```
Is there "apply in person," "mail application," or clear automation blocker?
├─ Yes → manual
└─ No → Continue to Step 7
```

### Step 7: Inspect Page Structure
```
Navigate to page via Playwright and take snapshot
├─ Multi-section form with sidebar → ats_browser
├─ Overlay modal with pre-filled data → board_simplified
├─ Upload-focused interface → document_led
├─ Unfamiliar/custom structure → manual (low confidence)
└─ Still unclear → manual (ask for human classification)
```

---

## Confidence Thresholds

### High Confidence (0.85 - 1.0)
**Action:** Auto-classify, proceed with execution

**Indicators:**
- URL matches known pattern exactly
- Multiple page structure clues align
- Clear text instructions match expected pattern

### Medium Confidence (0.70 - 0.84)
**Action:** Classify but flag for verification

**Indicators:**
- Some clues present but not definitive
- Unfamiliar ATS or portal variant
- Route classification depends on single clue

**What to Do:**
- Proceed with classification
- Add note: "Medium confidence — verify during execution"
- During execution, confirm classification is correct before proceeding

### Low Confidence (< 0.70)
**Action:** Ask for human confirmation

**Indicators:**
- Very few clues
- Unfamiliar portal structure
- Conflicting signals

**What to Do:**
- Present job details to human
- Show available evidence (URL, page snapshot)
- Ask: "What route type is this application?"
- Use human response to classify

---

## Handling Edge Cases

### Multiple Route Types Present
**Example:** Job posting shows both "Apply on website" AND "Email resume to..."

**Solution:** Prioritize in this order:
1. Email (most direct, least technical)
2. External redirect (follow to actual application)
3. ATS portal (if clearly identified)
4. Manual (if uncertain)

### Unfamiliar ATS
**Example:** URL contains ats.something-university.com but not in known list

**Solution:**
- Navigate to page, take snapshot
- Look for ATS structure clues (multi-section, dropdowns, file uploads)
- If structure matches ATS pattern → classify as `ats_browser` with medium confidence
- Add note: "Unfamiliar ATS — verify during execution"

### Broken or 404 URLs
**Example:** Application URL leads to error page

**Solution:**
- Flag job as having broken application link
- Set route to `manual` with note: "Application URL broken — requires investigation"
- Do not attempt browser automation

### Login Required Before Classification
**Example:** Application page requires account creation to view form

**Solution:**
- Take snapshot of login page
- Check URL for ATS clues
- If ATS domain identifiable → classify as `ats_browser`
- If unclear → classify as `manual` with note: "Login required — investigate further"

---

## Documentation Output

When classification is complete, write to `state/jobs/reports/{job_id}_route.json`:

```json
{
  "job_id": "[job ID]",
  "classified_at": "[ISO 8601 timestamp]",
  "route_family": "ats_browser|board_simplified|external_redirect|email|document_led|manual",
  "route_confidence": 0.95,
  "evidence": {
    "url_patterns": ["myworkday.com", "wd1.myworkdayjobs.com"],
    "page_text_clues": ["Multi-section form", "Left sidebar navigation"],
    "external_redirect_url": "[final URL if redirect, or null]"
  },
  "reasoning": "[Brief explanation of classification decision]",
  "requires_human_verification": false,
  "portal_type": "Workday|Taleo|Greenhouse|ICIMS|Slate|Unknown",
  "next_steps": "[What execution approach to take]"
}
```
