# Improvement Prompts — Strategy Analysis and Optimization

## Core Analysis Questions

At regular intervals or when `/improve` is run, systematically analyze:

### 1. Wasted Effort Analysis
**What is causing the most wasted effort?**

- Jobs scored but never tailored:
  - Count jobs with scoring but no resume/cover letter
  - Analyze score distribution: are low-scoring jobs being processed?
  - Recommendation: Raise scoring threshold or improve rejection criteria

- Jobs tailored but fail review:
  - Count jobs with materials but FAIL or PASS_WITH_REVISIONS
  - Analyze review feedback: common failure reasons?
  - Recommendation: Improve material quality guidance or tailoring prompts

- Jobs passing review but declined by user:
  - Count jobs user decided not to submit
  - Analyze patterns: common concerns or missing info?
  - Recommendation: Better pre-tailoring fit assessment or more transparent scoring

### 2. Poor Match Detection
**What jobs are being surfaced that should never have appeared?**

- Analyze rejected/excluded jobs:
  - Common sectors or industries appearing?
  - Title patterns that keep appearing (e.g., "Sales", "K-12")?
  - Sources that produce low-quality matches?

- Constraint filter effectiveness:
  - Are excluded jobs getting through scoring?
  - Are constraint rules too loose or too specific?

- Recommendations:
  - Add new exclusion rules to `constraints.yml`
  - Add forbidden title patterns to exclusions
  - Block or deprioritize low-quality sources

### 3. Missed Opportunity Detection
**What jobs are missing that should have appeared?**

- Gaps in title taxonomy:
  - Roles the candidate fits but aren't being found
  - Alternative titles for target roles not in search queries

- Geographic or source gaps:
  - Institutions not being searched
  - Job boards not being queried

- Recommendations:
  - Add new search queries to `search_preferences.yml`
  - Add new source targets (institutional career pages)
  - Expand title variation coverage

### 4. Material Quality Analysis
**Where is the candidate underrepresented or oversold?**

- Review revision patterns:
  - Materials that frequently get PASS_WITH_REVISIONS
  - Recurring issues in review feedback

- Dimension score analysis:
  - Dimensions that consistently score low
  - Weak areas in candidate profile representation

- Recommendations:
  - Update `resume_facts.yml` with better metrics
  - Add new STAR stories for weak areas
  - Improve writing style guidance
  - Adjust tailoring prompts to address recurring issues

### 5. Screening Question Gaps
**Which screening questions still require too much manual work?**

- Questions not covered by archetype library:
  - New question patterns appearing in reviews
  - Questions requiring custom answers each time

- Answer library effectiveness:
  - Archetype answers that don't match real questions
  - Missing answer categories

- Recommendations:
  - Add new seed answers to `screening_answers.yml`
  - Expand archetype coverage
  - Improve question-to-answer matching

## Recommendation Format

Every recommendation must include:

### Specific Action
Not "improve search" but "Add 'Student Success Coordinator' to Cluster C title searches"

### Evidence Citation
Cite specific data:
- "15 jobs scored < 5.0 were still tailored last week"
- "8 K-12 roles slipped through constraints in last batch"
- "Reviews mention 'weak leadership examples' in 40% of PASS_WITH_REVISIONS"

### Impact Estimate
Quantify expected outcome:
- "Should eliminate ~10 low-quality matches per discovery cycle"
- "Could surface 5-8 additional relevant roles per week"
- "Should reduce PASS_WITH_REVISIONS rate from 35% to <20%"

### Effort Level
Classify as EASY or HARD:
- EASY: Simple config change, no new content needed
- HARD: Requires new content (facts, answers, stories) or research

### Risk Assessment
Note potential side effects:
- "May also surface some K-12 roles; constraint filter should catch most"
- "Could reduce total volume by 20% but improve average quality"
- "Requires manual verification of first batch to calibrate"

## Output Structure

Generate improvement report in this format:

```markdown
# Strategy Improvement Report
Generated: [timestamp]

## Executive Summary
[High-level overview of findings and top 3 recommendations]

## Wasted Effort Analysis
[Findings and recommendations for each wasted effort category]

## Poor Match Detection
[Excluded job patterns and constraint recommendations]

## Missed Opportunity Detection
[Missing roles and search expansion recommendations]

## Material Quality Analysis
[Recurring review issues and content improvements]

## Screening Question Gaps
[Manual work patterns and answer library expansions]

## Prioritized Recommendations

### HIGH Impact, EASY Effort
1. [Specific action] - Evidence: [data] - Impact: [outcome] - Risk: [side effects]

### HIGH Impact, HARD Effort
[Same format]

### MEDIUM Impact, EASY Effort
[Same format]

[etc.]

## Configuration Updates
[Specific file changes with diffs or YAML snippets]

## Monitoring Plan
[What to track after implementing recommendations]
```

## Recommendation Categories

### Search Tuning
- Add/remove search queries
- Adjust geographic filters
- Add new title patterns to watch for
- Prioritize different job boards
- Add institutional targets

### Scoring Calibration
- Adjust dimension weights
- Add new reason codes
- Tighten or loosen proceed threshold
- Flag consistently mis-scored lanes
- Adjust lane assignment criteria

### Material Quality
- Update `resume_facts.yml` with better metrics
- Add new STAR stories for weak areas
- Expand screening answer library
- Improve writing style guidance
- Update tailoring prompts

### Constraint Adjustments
- Add new hard exclusion rules
- Relax overly aggressive filters
- Add new soft exclusion patterns
- Adjust geography or compensation thresholds

## Data Sources

| File | What It Tells You |
|------|-------------------|
| `data/jobs/discovered_jobs.jsonl` | What was found, from where, when |
| `data/jobs/applications.jsonl` | What was pursued, submission method, outcome |
| `data/handoffs/*/scoring.json` | Score distributions, lane assignments, reason codes |
| `data/outputs/reviews/*_REVIEW*.md` | Quality issues, revision patterns, feedback themes |
| `data/candidate/constraints.yml` | Current exclusion rules (may need tightening/loosening) |
| `data/candidate/search_preferences.yml` | Current search config (may need expansion) |

## Continuous Learning

After each improvement cycle:
1. Document what changed and why
2. Set monitoring period (2-4 weeks)
3. Compare before/after metrics:
   - Discovery quality (excluded rate, duplicate rate)
   - Scoring distribution (mean, mode, tails)
   - Material quality (PASS rate, revision frequency)
   - Submission rate (tailored → submitted)
4. If improvements validated: make permanent
5. If not effective: analyze why and adjust approach
