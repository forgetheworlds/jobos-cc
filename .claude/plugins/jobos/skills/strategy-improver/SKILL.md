---
name: strategy-improver
description: Review how your job search is going and suggest improvements. Analyzes what's working and what could be better.
triggers:
  - "improve strategy"
  - "analyze failures"
  - "optimize search"
  - "strategy review"
  - "what went wrong"
references:
  - improvement-prompts.md
author: JobOS-CC
version: 1.0.0
---

# Strategy Improver

The strategy-improver skill analyzes job search outcomes and recommends targeted improvements to search and application strategy.

## Workflow

1. Load outcome data from multiple sources (see Data Sources below)
2. Analyze patterns across dimensions:
   - Wasted effort (scored but not pursued, tailored but not submitted)
   - Poor matches (excluded jobs that should have been filtered earlier)
   - Missed opportunities (roles that should have been found)
   - Material quality issues (recurring review feedback)
   - Screening question gaps (manual work required)
3. Generate recommendations per `references/improvement-prompts.md`
4. Prioritize by impact (HIGH/MEDIUM) and effort (EASY/HARD)
5. Suggest specific, actionable changes to configuration files
6. Write improvement report to `data/outputs/strategy_improvement/`

## Improvement Categories

See `references/improvement-prompts.md` for detailed prompts:
- Search tuning: queries, locations, sources
- Scoring calibration: weights, thresholds, reason codes
- Material quality: resume facts, answer library, writing guidance
- Constraint adjustments: exclusions, filters, thresholds

## Data Sources

| File | What It Tells You |
|------|-------------------|
| `data/jobs/discovered_jobs.jsonl` | What was found, from where |
| `data/jobs/applications.jsonl` | What was pursued and outcome |
| `data/handoffs/*/scoring.json` | Score distributions, lane assignments |
| `data/outputs/reviews/*_REVIEW*.md` | Quality issues, revision patterns |
| `data/candidate/constraints.yml` | Current exclusion rules |
| `data/candidate/search_preferences.yml` | Current search config |

## Output

Improvement report with:
- Analysis summary: what the data shows
- Prioritized recommendations: specific, actionable changes
- Expected outcomes: what each recommendation should achieve
- Risks: potential side effects to monitor
- Configuration updates: suggested file changes with diff
