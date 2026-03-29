---
name: jobos-analyze
description: Review how your job search is going and suggest improvements. Analyzes what's working and what could be better.
usage: /jobos-analyze [--period DAYS] [--category CATEGORY]
examples:
  - /jobos-analyze
  - /jobos-analyze --period 30
  - /jobos-analyze --category search
author: JobOS-CC
version: 1.0.0
---

# /jobos-analyze — Analyze Search Strategy

Analyze job search performance and generate strategy improvement recommendations.

## Usage

```
/improve [--period DAYS] [--category CATEGORY]
```

## Options

- `--period DAYS`: Analyze outcomes from last N days (default: 30)
- `--category CATEGORY`: Focus on specific category (search, scoring, materials, constraints)

## Default Behavior

Analyze all categories from last 30 days of activity.

## Analysis Categories

### Search Tuning
- Query effectiveness (jobs found per query)
- Source quality (good vs poor matches by source)
- Geographic coverage (locations yielding results)
- Title taxonomy gaps (roles being missed)

### Scoring Calibration
- Score distribution (mean, mode, tails)
- Lane assignment accuracy
- Dimension weighting effectiveness
- Proceed threshold optimization
- Reason code coverage

### Material Quality
- Review verdict distribution (PASS vs PASS_WITH_REVISIONS vs FAIL)
- Recurring revision themes
- Dimension weakness patterns
- Screening question gaps

### Constraint Adjustments
- Exclusion rule effectiveness
- Poor matches slipping through
- Good matches being excluded
- Filter tightness/looseness

## Examples

Full analysis (all categories, last 30 days):
```bash
/improve
```

Analyze last 60 days:
```bash
/improve --period 60
```

Focus on search optimization:
```bash
/improve --category search
```

## Workflow

1. Load strategy-analyst agent (uses opus for deep analysis)
2. Load all relevant data:
   - `data/jobs/discovered_jobs.jsonl`: Discovery history
   - `data/jobs/applications.jsonl`: Application outcomes
   - `data/handoffs/*/scoring.json`: Score distributions
   - `data/outputs/reviews/*`: Quality feedback
   - `data/candidate/constraints.yml`: Current exclusions
   - `data/candidate/search_preferences.yml`: Current search config

3. Analyze across dimensions:
   - Wasted effort: scored-but-not-tailored, tailored-but-not-submitted
   - Poor matches: excluded jobs that should have been filtered earlier
   - Missed opportunities: roles that should have been found
   - Material quality: recurring review feedback
   - Screening gaps: manual work required

4. Generate recommendations:
   - Specific, actionable changes
   - Evidence citations from data
   - Impact estimates
   - Effort levels (EASY/HARD)
   - Risk assessments

5. Prioritize by impact (HIGH/MEDIUM) and effort (EASY/HARD)

6. Write improvement report to `data/outputs/strategy_improvement/YYYY-MM-DD_improvement_report.md`

7. Display summary of top recommendations

## Output

Improvement report with sections:
- Executive Summary
- Wasted Effort Analysis
- Poor Match Detection
- Missed Opportunity Detection
- Material Quality Analysis
- Screening Question Gaps
- Prioritized Recommendations (by impact/effort)
- Configuration Updates (specific file changes)
- Monitoring Plan

## Recommendation Format

Each recommendation includes:
- **Specific Action**: e.g., "Add 'Student Success Coordinator' to Cluster C searches"
- **Evidence**: Data supporting the recommendation
- **Impact**: Expected outcome (e.g., "Should surface ~5 additional relevant jobs per cycle")
- **Effort**: EASY or HARD
- **Risk**: Potential side effects

## Follow-Up

After reviewing recommendations:
1. Implement high-impact, easy-effort changes first
2. Set monitoring period (2-4 weeks)
3. Compare before/after metrics
4. Validate or iterate on changes
