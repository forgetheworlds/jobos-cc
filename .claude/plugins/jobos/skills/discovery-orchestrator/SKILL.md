---
name: discovery-orchestrator
description: Search for higher education job openings across LinkedIn, Indeed, Google Jobs, and university websites. Finds jobs that match your profile and saves them for you to review.
triggers:
  - "find jobs"
  - "search for jobs"
  - "discover opportunities"
  - "look for job postings"
  - "job discovery"
references:
  - source-playbooks.md
  - extraction-rules.md
author: JobOS-CC
version: 1.0.0
---

# Discovery Orchestrator — Job Search Skill

## What This Skill Does

This skill helps you find job openings on the internet that match the candidate's profile and interests. It uses a web browser to visit job boards and university websites, collects job listings, and saves them in an organized format.

Think of it as having a research assistant who visits multiple job websites for you, gathers all the relevant postings, and organizes them in one place.

## When to Use This Skill

Use this skill when you need to:
- Find new higher education job openings
- Search for specific types of roles (e.g., "academic advisor," "program coordinator")
- Check multiple job sources in one session
- Build or refresh your pipeline of potential opportunities

## How It Works

### Step 1: Understand What to Look For

Before searching, this skill reviews:
- **Target roles** — What job titles and career lanes the candidate is pursuing
- **Search preferences** — Which locations, job types, and sources to check
- **Constraints** — What types of jobs to avoid (sales roles, certain industries, etc.)

This ensures we only collect jobs that are actually relevant.

### Step 2: Visit Job Sources

The skill visits job websites systematically:

**Major Job Boards:**
- LinkedIn Jobs
- Indeed
- Google Jobs

**Higher-Education Specialty Sites:**
- HigherEdJobs
- ChronicleVitae

**Direct University Sources:**
- University HR pages (e.g., "jobs.harvard.edu")
- Academic job listings

Each source has different navigation patterns — the skill knows how to use each one.

### Step 3: Extract Job Information

For each job listing found, the skill collects:
- Job title
- Employer/institution name
- Location
- Job description
- Application link (URL)
- Salary (if listed)
- Posting date
- Required documents (resume, cover letter, teaching philosophy, etc.)

### Step 4: Save and Organize

All discovered jobs are saved in a structured format:
- Raw data goes to `state/jobs/raw/`
- Cleaned, standardized records go to `state/jobs/normalized/`
- Jobs are added to a queue for processing

### Step 5: Remove Duplicates

The skill automatically detects and removes duplicate listings:
- Same URL → same job
- Nearly identical title + employer → probably same job
- Very similar description + location → probably same job

## Best Practices

**Search Strategy:**
- Start with broader searches, then narrow down
- Use multiple search terms per target role
- Check 2-3 pages of results per source (not just the first page)

**Rate Limiting:**
- Don't overwhelm job boards with rapid-fire searches
- Take breaks between sources
- If a site blocks access, stop and try again later

**Quality Over Quantity:**
- It's better to find 10 well-matched jobs than 100 poor matches
- Always respect constraints — don't collect jobs the candidate wouldn't want
- If a listing looks suspicious or incomplete, skip it

## What This Skill Doesn't Do

- ❌ Apply to jobs (that's the execution phase)
- ❌ Evaluate whether a job is a good fit (that's the fit scoring phase)
- ❌ Generate application materials (that's the preparation phase)
- ❌ Fill out application forms (that's the browser automation skill)

## Related Files

This skill uses these reference files:
- `source-playbooks.md` — How to navigate each job website
- `extraction-rules.md` — What data to collect and how to format it

## Output Format

When discovery is complete, you'll have:
1. **Raw captures** in `state/jobs/raw/` — Original listing data
2. **Normalized job records** in `state/jobs/normalized/` — Clean, consistent JSON files
3. **Updated queue** — New discoveries added for processing
4. **Event log entry** — Record of what was searched and found

## Troubleshooting

**Problem:** Can't find any jobs
- **Solution:** Try broader search terms or check different sources

**Problem:** All results look like bad matches
- **Solution:** Review target_roles.yml and search_preferences.yml — adjust search strategy

**Problem:** Job website blocks access
- **Solution:** You may be searching too fast. Wait a few minutes and try again, or use a different source

**Problem:** Duplicate jobs appearing
- **Solution:** Run `bun run scripts/merge-discoveries.ts` to deduplicate automatically
