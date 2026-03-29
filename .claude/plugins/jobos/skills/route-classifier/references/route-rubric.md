# Route Rubric — Application Route Classification

## Route Families

### 1. ats_browser
**Definition**: Full ATS portal requiring multi-field form completion via browser automation.

**Recognized ATS Types** (from portal-patterns.md):
- Workday: `wd1.myworkdayjobs.com`, `myworkday.com`
- Taleo: `taleo.net`, `oraclecloud.com`
- Greenhouse: `greenhouse.io`, `boards.greenhouse.io`
- Slate: varies (academic portals, often `apply.joinhandshake.com`)
- UKG: `ukg.com`, `myworkday.com`
- ADP: `adp.com`
- BambooHR: `bamboohr.com`

**Indicators**:
- Multi-section form (Personal, Education, Experience, Questions)
- Account creation or sign-in required
- Dropdown-heavy fields
- Character limits on text fields
- Document upload required
- Screening questions present

**Classification**: Automatic if URL matches known ATS domain. Otherwise, navigate and inspect page structure.

---

### 2. board_simplified
**Definition**: Simplified job board with basic form (name, contact, resume upload) but no complex ATS.

**Recognized Boards**:
- LinkedIn Easy Apply: overlay form on LinkedIn
- Indeed Easy Apply: simplified Indeed flow
- Handshake: `joinhandshake.com` (but not Slate-based)
- ZipRecruiter: `ziprecruiter.com`
- Glassdoor: `glassdoor.com`

**Indicators**:
- Single-page or minimal-page form
- Pre-filled with profile data (LinkedIn, Indeed)
- Basic fields only: name, email, phone, resume
- No screening questions or minimal questions
- Quick apply flow

**Classification**: URL domain match or inspect page for simplified form structure.

---

### 3. external_redirect
**Definition**: Apply URL redirects to external source (GAP-007). Requires following redirect and reclassifying.

**Indicators**:
- Shortened URLs: `bit.ly`, `tinyurl`, `buff.ly`
- Redirect chains: job board → company ATS
- Tracking URLs that resolve to different domain

**Detection Method**:
1. HEAD request to check for redirects
2. Follow redirect chain (max 5 hops)
3. Identify final destination
4. If final destination is different domain: tag as external_redirect
5. If final destination is known ATS/board: reclassify to that family

**Classification**: Always follow redirects before final classification. Tag job with:
- `route_family`: "external_redirect"
- `external_redirect_url`: final URL
- `external_redirect_target`: reclassified family after following

---

### 4. email
**Definition**: Application via email only (no web form). Requires drafting application email with attachments.

**Indicators**:
- `mailto:` URL scheme
- "Apply by email" in description
- Email address as only application method
- No apply URL (email address in description)

**Classification**: Check if apply_url is `mailto:` or if description contains only email instructions.

---

### 5. document_led
**Definition**: Upload-only application (no form fields, just document submission).

**Indicators**:
- Upload page with file inputs only
- No text fields or dropdowns
- "Upload resume to apply" with no other fields
- Document management system (e.g., Workday resume-only flow)

**Classification**: Navigate and inspect page. If only file inputs present: classify as document_led.

---

### 6. manual
**Definition**: Complex, custom, or unclear application requiring human review and handling.

**Indicators**:
- Custom university portal with unknown structure
- Complex multi-step process not matching known patterns
- Requires human account creation with verification
- External platform not recognized
- CAPTCHA-heavy or bot detection
- In-person application instructions
- "Apply in person" or "mail application"

**Classification**: Fallback for anything not matching other families. Flag for human review.

---

## Classification Decision Tree

```
1. Is apply_url a mailto: link?
   YES → email
   NO  → continue

2. Does apply_url domain match known ATS/board?
   YES → classify as that family (ats_browser or board_simplified)
   NO  → continue

3. Follow redirect chain (max 5 hops)
   Does domain change?
   YES → external_redirect
   NO  → continue

4. Navigate to apply_url and take snapshot
   Check page structure:
   - Multi-section form with account requirement?
     YES → ats_browser
   - Single-page simplified form?
     YES → board_simplified
   - Only file upload inputs?
     YES → document_led
   - Custom/unknown structure?
     YES → manual
```

## Route Memory

Each classification is logged to `state/memory/route_memory.jsonl`:
```json
{
  "job_id": "linkedin_1234567890",
  "apply_url": "https://jobs.example.com/apply",
  "route_family": "ats_browser",
  "route_ats_type": "workday",
  "route_notes": "Multi-section form with account creation required",
  "external_redirect_url": null,
  "classified_at": "2026-03-28T10:30:00Z"
}
```

## Confusion Patterns

| Pattern | Correct Family | Why |
|---------|---------------|-----|
| University portal with Slate | ats_browser | Slate is ATS, despite being academic |
| "Apply via email" in description but has web form | ats_browser or board_simplified | Web form takes precedence |
| Indeed job that redirects to Workday | external_redirect → reclassify to ats_browser | Follow redirect chain |
| LinkedIn Easy Apply to external site | external_redirect | Not true Easy Apply if external |
| "Upload resume only" on ATS page | document_led | Subset of ATS, but simpler flow |
| CAPTCHA on every page | manual | Bot detection blocks automation |
