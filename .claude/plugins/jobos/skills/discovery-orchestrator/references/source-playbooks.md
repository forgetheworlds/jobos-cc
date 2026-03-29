# Source Playbooks — Job Discovery Patterns

## LinkedIn

### URL Patterns
- Search: `linkedin.com/jobs/search/?keywords={query}&location={location}`
- Direct job: `linkedin.com/jobs/view/{job_id}/`

### Discovery Method
1. Construct search URL from query and location
2. Navigate via Playwright MCP
3. Take snapshot to load job cards
4. Extract job cards from DOM
5. Follow each job link to full posting

### Extraction Points
- Title: `.job-title`
- Employer: `.company-name`
- Location: `.job-location`
- Posted date: `.job-posted-date`
- Description: `.description`
- Apply URL: `.apply-button` href

### Rate Limits
- Limit to 100 jobs per search
- 2-second delay between job detail navigations
- Respect LinkedIn login walls

---

## Indeed

### URL Patterns
- Search: `indeed.com/jobs?q={query}&l={location}`
- Direct job: `indeed.com/viewjob?jk={job_key}`

### Discovery Method
1. Construct search URL
2. Navigate via Playwright MCP
3. Extract job cards from `.job_seen_beacon`
4. Follow each job link to full posting

### Extraction Points
- Title: `.jobTitle`
- Employer: `.companyName`
- Location: `.companyLocation`
- Posted date: `.date`
- Description: `#jobDescriptionText`
- Apply URL: Apply button href (external or Indeed Easy Apply)

### Rate Limits
- Limit to 150 jobs per search
- 1-second delay between navigations
- CAPTCHA detection: stop if challenge appears

---

## Google Jobs

### URL Patterns
- Search: `google.com/search?q={query}+jobs&near={location}`

### Discovery Method
1. Search Google for query + "jobs"
2. Look for Google Jobs widget in results
3. Extract job postings from widget
4. Follow each to source posting

### Extraction Points
- Title: Job posting title
- Employer: Company name
- Location: Job location
- Posted date: "Posted X days ago"
- Description: Often truncated; follow to source
- Apply URL: External source link

### Special Handling
- Google Jobs is an aggregator: always follow to source for full data
- Tag source as "google_jobs" but preserve original source URL
- Extract actual source domain for source field

---

## Institutional Sites (Direct)

### Discovery Method
1. Maintain list of target institutions from preferences
2. For each institution:
   - Navigate to `/careers`, `/jobs`, `/about/careers`, `/employment`
   - Look for job board or applicant tracking system
   - Extract all open positions

### Common ATS Patterns
- Workday: `myworkdayjobs.com`
- Taleo: `taleo.net`
- Greenhouse: `greenhouse.io`
- Slate: varies (university domains)
- Custom: unknown structure

### Extraction Points
Follow portal-specific patterns from `portal-patterns.md`

---

## Universal Extraction Fields

All sources must extract:
- `title`: Job title
- `employer`: Organization name
- `location`: City, State (or Remote)
- `description`: Full job description text
- `posted_date`: When posted (if available)
- `apply_url`: URL to application
- `source`: Platform name
- `source_job_id`: Platform-specific job identifier
