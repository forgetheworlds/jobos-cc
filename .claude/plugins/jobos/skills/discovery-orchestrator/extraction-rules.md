# Extraction Rules — What Data to Collect from Job Listings

This document defines exactly what information to extract from each job listing, how to format it, and how to handle duplicates.

---

## Required Fields (Must Extract)

Every job record MUST include these fields:

### 1. Title
**What:** The job title as listed

**How to Extract:**
- Copy the title exactly as it appears
- Don't add or remove words
- Preserve capitalization

**Example:**
```
"Director of Academic Advising"
```

### 2. Employer
**What:** The hiring organization (university, college, company)

**How to Extract:**
- Use the full institution name
- If unclear, use the organization name from the job posting
- For third-party recruiters, note the actual employer (not just the recruiting firm)

**Examples:**
```
"Harvard University"
"Miami Dade College"
"Colorado State University"
```

### 3. Location
**What:** Where the job is located

**How to Extract:**
- Use "City, State" format (if in US)
- Use "City, Country" format (if international)
- Use "Remote" if fully remote
- Use "Hybrid — City, State" if hybrid

**Normalization Rules:**
- Spell out state names: "California" not "CA"
- Use country name for international: "Toronto, Canada" not "Toronto, ON"

**Examples:**
```
"Boston, Massachusetts"
"Remote"
"Hybrid — Phoenix, Arizona"
"London, United Kingdom"
```

### 4. URL
**What:** The web address of the job listing

**How to Extract:**
- Copy the full URL from browser address bar
- Use the direct job posting page (not search results page)
- For Indeed/LinkedIn aggregations, click through to original source

**Examples:**
```
"https://jobs.harvard.edu/postings/12345"
"https://higherEdjobs.com/search/details.cfm?JobCode=xxxxx"
```

### 5. Description Text
**What:** The full job description

**How to Extract:**
- Copy all text from the job description section
- Remove HTML tags (if present in source)
- Preserve paragraph structure
- Include: responsibilities, qualifications, required documents, application instructions

**Cleaning Rules:**
- Remove excessive whitespace (more than 2 consecutive line breaks)
- Remove HTML tags like `<p>`, `<div>`, `<span>`, etc.
- Keep bullet points and numbered lists
- Keep section headers

**Example Structure:**
```
Job Summary
[2-3 sentences about the role]

Responsibilities:
• Coordinate academic advising services
• [more bullets]

Qualifications:
• Master's degree required
• [more bullets]

Required Documents:
• Resume
• Cover Letter
• Teaching Philosophy
```

---

## Optional Fields (Extract if Available)

### 6. Salary Range
**What:** Compensation information, if listed

**How to Extract:**
- Copy salary information exactly as stated
- Include range if provided
- Note if salary is "competitive" or "commensurate with experience"

**Examples:**
```
"$65,000 — $75,000"
"Competitive"
"$80,000 — $95,000 commensurate with experience"
```

### 7. Department
**What:** The hiring department within the institution

**How to Extract:**
- Look for "Department" or "Division" field
- Extract if clearly listed

**Examples:**
```
"Student Affairs"
"Academic Affairs"
"Undergraduate Studies"
```

### 8. Posted Date
**What:** When the job was posted

**How to Extract:**
- Look for "Posted," "Date Listed," "Published"
- Convert to ISO 8601 format: YYYY-MM-DD

**Examples:**
```
"2024-01-15"
"2024-02-01"
```

### 9. Application Deadline
**What:** Closing date for applications, if specified

**How to Extract:**
- Look for "Deadline," "Apply by," "Closing date"
- Convert to ISO 8601 format: YYYY-MM-DD

**Examples:**
```
"2024-03-15"
"Open until filled"
```

### 10. Required Documents
**What:** Specific documents requested beyond resume/cover letter

**How to Extract:**
- Scan description for document requirements
- List each requested document

**Common Higher-Ed Documents:**
- Teaching Philosophy
- Diversity Statement
- Research Statement
- Writing Sample
- Transcript
- References (with contact info)

**Example:**
```json
"required_documents": ["resume", "cover_letter", "teaching_philosophy", "diversity_statement"]
```

---

## Normalization Rules

### Strip HTML
**Problem:** Some sources include HTML tags in descriptions
**Solution:** Remove all HTML tags before saving

**Example:**
```
Before: "<p>The Director of Academic Advising will <strong>lead</strong> initiatives...</p>"
After: "The Director of Academic Advising will lead initiatives..."
```

### Standardize Location Format
**Problem:** Locations appear in various formats
**Solution:** Convert to "City, State" or "City, Country" format

**Examples:**
```
"Boston, MA" → "Boston, Massachusetts"
"Phoenix, AZ (Remote)" → "Remote"
"Toronto, ON" → "Toronto, Canada"
```

### Clean Salary Ranges
**Problem:** Salaries formatted inconsistently
**Solution:** Extract numeric values and preserve original text

**Examples:**
```
"$65k-$75k" → "$65,000 — $75,000"
"80-95k" → "$80,000 — $95,000"
"Competitive" → "Competitive"
```

### Remove Excessive Whitespace
**Problem:** Descriptions may have double-spacing or extra line breaks
**Solution:** Collapse multiple consecutive line breaks into single line break

---

## Deduplication Algorithm

Jobs are considered duplicates if they meet ANY of these criteria:

### Rule 1: Same URL
**Criteria:** Exact same application URL
**Action:** Merge into single record
**Priority:** Keep whichever record has more complete data

### Rule 2: Title Similarity > 90% AND Same Employer
**Criteria:**
- Title similarity > 90% (Levenshtein distance or similar algorithm)
- Employer name matches exactly
- Location matches or similar

**Action:** Merge into single record
**Priority:** Keep whichever has more complete description

**Example:**
```
Job A: "Director of Academic Advising" at Harvard University
Job B: "Director, Academic Advising" at Harvard University
→ Merge (title similarity > 90%, same employer)
```

### Rule 3: Body Text Similarity > 80% AND Same Location
**Criteria:**
- Job description text similarity > 80%
- Location matches or similar

**Action:** Merge into single record
**Priority:** Keep whichever has more recent data

### Rule 4: Same Application Destination
**Criteria:** Jobs point to same application URL or portal
**Action:** Merge into single record
**Note:** This catches the same job posted on multiple job boards

---

## Source Priority for Merging

When merging duplicates, prioritize sources in this order:

1. **Employer direct** (university HR website) — Most authoritative
2. **ATS portal** (Workday, Taleo, etc.) — Official application system
3. **HigherEdJobs / ChronicleVitae** — Higher-ed specialist sites
4. **LinkedIn Jobs** — Generally reliable
5. **Indeed** — May scrape from other sources
6. **Google Jobs** — Aggregator, least reliable

**Rule:** Keep data from higher-priority source when merging

---

## Data Quality Checks

### Completeness Threshold
A job record is considered "complete" if it has:
- ✅ Title
- ✅ Employer
- ✅ Location
- ✅ URL
- ✅ Description text (at least 100 characters)

If any required field is missing, flag the record for manual review.

### Red Flags
These suggest low-quality or problematic listings:

🚩 "No description provided"
🚩 Description is just "Click for details" with no actual content
🚩 URL leads to 404 page
🚩 Employer name is "Confidential" or missing
🚩 Location is "Multiple locations" with no specifics
🚩 Salary is "Commission-based" or includes sales quotas
🚩 Posting is older than 90 days

**Action:** Flag red-flagged jobs for human review before adding to queue

---

## Extraction Format

When saving job records, use this JSON structure:

```json
{
  "job_id": "[generated UUID]",
  "source": "linkedin|indeed|google_jobs|higheredjobs|chroniclevitae|institutional",
  "source_url": "[original listing URL]",
  "search_query": "[the search term that found this job]",
  "discovered_at": "[ISO 8601 timestamp]",
  "title": "[job title]",
  "employer": "[institution name]",
  "location": "[city, state or remote]",
  "description_text": "[full cleaned description]",
  "salary_range": "[salary if listed, or null]",
  "department": "[department if listed, or null]",
  "posted_date": "[YYYY-MM-DD if listed, or null]",
  "deadline": "[YYYY-MM-DD if listed, or null]",
  "application_url": "[canonical application URL]",
  "required_documents": ["list", "of", "documents"],
  "extraction_quality": "complete|partial|flagged"
}
```

---

## Handling Edge Cases

### Multi-Location Jobs
**Problem:** Job is listed as "Multiple locations" or "Various campuses"
**Solution:**
- If specific locations listed in description, extract those
- If truly open-location, mark location as "Remote" or "Multiple Locations"
- Add note to description clarifying location situation

### Confidential Employer
**Problem:** Posting lists employer as "Confidential"
**Solution:**
- Extract job title and description
- Set employer to "Confidential Employer"
- Flag for human review — may be worth investigating

### Broken or Redirecting URLs
**Problem:** URL leads to error page or redirects elsewhere
**Solution:**
- If redirect, follow it and extract the final URL
- If 404 or error, flag the job as "URL broken" but still save title/employer if available
- Mark extraction_quality as "flagged"

### Non-English Postings
**Problem:** Job description is in another language
**Solution:**
- If candidate has foreign language proficiency noted, save as-is
- Otherwise, skip the posting (unless English version available)

### Job Board Agencies
**Problem:** Posting is from a recruiting agency, not the employer
**Solution:**
- Extract both the agency name and the actual employer (if listed)
- Prioritize direct employer listings over agency listings
- Flag agency postings for lower priority
