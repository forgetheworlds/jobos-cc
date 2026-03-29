# Extraction Rules — Structured Job Data

## Required Fields

Every discovered job must have:

| Field | Type | Description | Source |
|-------|------|-------------|--------|
| `job_id` | string | Unique composite: `{source}_{source_job_id}` | Generated |
| `source` | string | Platform name (linkedin, indeed, google_jobs, institutional) | Extracted |
| `source_job_id` | string | Platform-specific identifier | Extracted |
| `title` | string | Job title | Extracted |
| `employer` | string | Organization name | Extracted |
| `location` | string | City, State or "Remote" | Extracted |
| `description` | string | Full job description HTML/text | Extracted |
| `posted_date` | string | ISO date or "N/A" | Extracted |
| `apply_url` | string | URL to application | Extracted |
| `discovered_at` | string | ISO timestamp of discovery | Generated |
| `status` | string | Initial: "discovered" | Generated |

## Normalization Rules

### Dates
- Convert relative dates to ISO format:
  - "Today" → today's date
  - "Yesterday" → yesterday's date
  - "X days ago" → today - X days
  - "Posted X date" → parse to ISO
- If unparseable: "N/A"

### Locations
- Format: "City, ST" or "Remote"
- Remove extras: "United States", "USA", full state names
- Handle multi-location: use first location or "Multiple Locations"

### Titles
- Trim whitespace
- Remove ALL CAPS (convert to Title Case)
- Remove emoji and special characters
- Preserve seniority indicators (Director, VP, etc.)

### Employers
- Trim whitespace
- Remove legal suffixes (Inc., LLC, etc.) for matching
- Preserve for display

### Descriptions
- Convert HTML to markdown
- Remove excessive whitespace
- Preserve bullet points and formatting
- Minimum 100 characters to be valid

### Apply URLs
- Clean tracking parameters: remove `utm_*`, `source`, `campaign`
- Resolve URL shorteners
- If no URL: mark as `null`

## Deduplication Algorithm (GAP-006)

### Composite Key Generation
For each job, generate two match keys:

1. **Exact Match Key**: `{title_normalized}|{employer_normalized}|{location_normalized}`
2. **Fuzzy Match Key**: `{title_normalized}|{employer_normalized}` (ignore location)

### Deduplication Passes

#### Pass 1: Exact Match
- Group by exact match key
- Keep one record per group:
  - Prefer: source with most complete data (all required fields present)
  - Tiebreaker: most recent `posted_date`
  - Final tiebreaker: alphabetically by `source`

#### Pass 2: Fuzzy Match (Same Title + Employer)
- Group by fuzzy match key
- For groups with size > 1:
  - If locations differ significantly (different states): keep both
  - If locations are same or similar: keep one per Pass 1 rules
  - Tag duplicates with `duplicate_of: job_id` and `duplicate_reason: "fuzzy_match"`

#### Pass 3: External Redirect Handling (GAP-007)
- Check if `apply_url` redirects to another source
- If redirect detected:
  - Extract final URL
  - If final URL matches another job's apply_url: mark as duplicate
  - Tag with `duplicate_of: job_id` and `duplicate_reason: "external_redirect"`

### Output Format
Non-duplicate jobs written to `data/jobs/discovered_jobs.jsonl`:
```json
{
  "job_id": "linkedin_1234567890",
  "source": "linkedin",
  "source_job_id": "1234567890",
  "title": "Director of Student Success",
  "employer": "Example University",
  "location": "Boston, MA",
  "description": "...",
  "posted_date": "2026-03-25",
  "apply_url": "https://jobs.example.com/123",
  "discovered_at": "2026-03-28T10:30:00Z",
  "status": "discovered"
}
```

Duplicate jobs (for audit trail):
```json
{
  "job_id": "indeed_abc123",
  "status": "duplicate",
  "duplicate_of": "linkedin_1234567890",
  "duplicate_reason": "exact_match",
  "...": "..."
}
```

## Validation

A job is valid if:
- All required fields present
- Title length >= 5 characters
- Description length >= 100 characters
- Apply URL is valid HTTP(S) URL (or null)
- Not excluded by constraints in `data/candidate/constraints.yml`
