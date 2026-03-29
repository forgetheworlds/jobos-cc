---
name: jobos-score
description: Score how well a job matches your profile and rank opportunities. Helps you decide which jobs are worth pursuing.
argument-hint: [job_ids | "all"]
allowed-tools:
  - Read
  - Write
  - Bash
  - mcp__plugin_oh-my-claudecode_t__notepad_write_working
---

# /jobos-score — Score Jobs and Rank by Fit

Score jobs from the inspected queue using the academic-fit-scorer skill, then rank by fit quality.

## What This Command Does

This command processes jobs that have been route-inspected and:
1. Classifies each job into an academic lane (or rejects it)
2. Scores each job across 10 weighted dimensions
3. Computes a total fit score (1.0-10.0)
4. Applies decision thresholds (PROCEED/CONSIDER/PASS)
5. Produces a ranked shortlist

## Usage

```
/shortlist [job_ids | "all"]
```

**Arguments:**
- `job_ids` (optional) — Specific job IDs to score
- `all` — Score all jobs in inspected queue that haven't been scored yet
- Default: Jobs with `fit_score: null`

## Step-by-Step Instructions

### Step 1: Load Candidate Context

Read these files from `state/candidate/`:
- `target_roles.yml` — Lane priorities and title clusters
- `constraints.yml` — Hard exclusion rules
- `candidate_profile.yml` — Basic candidate info
- `search_preferences.yml` — Location and salary preferences

### Step 2: Load Scoring Framework

Read the scoring framework from `skills/academic-fit-scorer/`:
- `lane-taxonomy.md` — 8 academic lane definitions
- `scoring-rubric.md` — 10-dimension scoring guide

### Step 3: Read Jobs from Inspected Queue

Read from `state/queues/inspected_jobs.jsonl`:
- Select jobs where `fit_score` is null (not yet scored)
- If `job_ids` provided, process only those specific jobs
- If `all`, process all unscored jobs in the queue

### Step 4: Score Each Job

For each job:

1. **Read the job record** from `state/jobs/normalized/{job_id}.json`

2. **Check hard exclusions first**:
   - Does the job match any exclusion in constraints.yml?
   - If yes → classify as `reject` lane, skip scoring
   - Document exclusion reason in `risk_notes`

3. **Classify into academic lane**:
   - Match job title against title clusters in lane-taxonomy.md
   - Verify with job description
   - Assign confidence level (0.0-1.0)

4. **Score 10 dimensions** (1-10 each):
   - title_fit (12%)
   - experience_fit (18%)
   - education_fit (8%)
   - sector_fit (8%)
   - responsibility_fit (18%)
   - leadership_fit (8%)
   - mission_alignment (8%)
   - geography_fit (5%)
   - compensation_fit (8%)
   - application_complexity (7%)

5. **Compute weighted total**:
   ```
   total = (title_fit * 0.12) + (experience_fit * 0.18) +
           (education_fit * 0.08) + (sector_fit * 0.08) +
           (responsibility_fit * 0.18) + (leadership_fit * 0.08) +
           (mission_alignment * 0.08) + (geography_fit * 0.05) +
           (compensation_fit * 0.08) + (application_complexity * 0.07)
   ```

6. **Apply decision thresholds**:
   - `total >= 8.0` → decision: "PROCEED"
   - `total 6.0-7.9` → decision: "CONSIDER"
   - `total < 6.0` → decision: "PASS"

7. **Write score report** to `state/jobs/reports/{job_id}_score.json`:
   ```json
   {
     "job_id": "uuid",
     "lane": "academic_admin",
     "fit_score": {
       "total": 7.8,
       "dimensions": { /* all 10 dimensions */ },
       "confidence": 0.85,
       "decision": "CONSIDER"
     },
     "risk_notes": ["Salary not disclosed"],
     "scored_at": "2026-03-28T10:30:00Z"
   }
   ```

8. **Update job record** with lane and fit_score

9. **Move job to shortlisted_jobs queue** using framework script

### Step 5: Sort and Display Results

After scoring all jobs, display a ranked shortlist:

```markdown
# Job Shortlist — Ranked by Fit Score

## PROCEED (Score ≥ 8.0)
1. [8.5] Academic Coordinator — TMU (academic_admin)
2. [8.2] Student Success Advisor — York University (student_success)

## CONSIDER (Score 6.0-7.9)
3. [7.6] Program Manager — University of Toronto (education_program_mgmt)
4. [6.8] Curriculum Developer — Centennial College (curriculum_faculty_dev)

## PASS (Score < 6.0)
5. [5.2] Teaching Assistant — George Brown College (teaching)
   Reason: Score below threshold, lane is lower priority

## REJECTED
6. K-12 Teacher — Toronto District School Board
   Reason: Hard exclusion: K-12 teaching
```

### Step 6: Log to Notepad

Add summary to working notepad:
```
"Shortlisted N jobs: X proceed (≥8.0), Y consider (6.0-7.9), Z pass (<6.0), R rejected (hard exclusions)"
```

## Quality Checks

Before completing, verify:
- [ ] All jobs processed have a score report written
- [ ] All jobs moved to shortlisted_jobs queue
- [ ] Hard exclusions properly documented
- [ ] Lane assignments follow taxonomy rules
- [ ] Confidence scores reflect ambiguity honestly

## Error Handling

If a job cannot be scored:
- Document the reason in `risk_notes`
- Assign lane: "reject" with decision: "ERROR"
- Example: "Job posting incomplete — missing description"

## Prerequisites

Jobs must be in the inspected queue first. If you get "no jobs found", run `/inspect` first to classify routes.
