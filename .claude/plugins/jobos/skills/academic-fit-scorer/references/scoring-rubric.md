# Scoring Rubric — Academic Role Fit Analysis

## 10 Weighted Dimensions

Each dimension scored 1-10. Weights sum to 100%.

| # | Dimension | Weight | Scoring Guide |
|---|-----------|--------|---------------|
| 1 | title_fit | 12% | 10 = exact title match to target cluster. 7 = close variant. 4 = tangentially related. 1 = unrelated. |
| 2 | experience_fit | 18% | 10 = candidate has directly comparable experience. 7 = strong transferable evidence. 4 = partial overlap. 1 = no relevant experience. |
| 3 | education_fit | 8% | 10 = exceeds requirements. 7 = meets requirements. 4 = close but not exact. 1 = significant gap. |
| 4 | sector_fit | 8% | 10 = higher education (preferred type). 7 = higher education. 4 = education-adjacent. 1 = unrelated sector. |
| 5 | responsibility_fit | 18% | 10 = day-to-day responsibilities match candidate strengths exactly. 7 = strong overlap. 4 = partial. 1 = mismatch. |
| 6 | leadership_fit | 8% | 10 = leadership scope matches candidate's level. 7 = close. 4 = below or above. 1 = no leadership component. |
| 7 | mission_alignment | 8% | 10 = institution mission strongly resonates with candidate values. 7 = good fit. 4 = neutral. 1 = conflicting. |
| 8 | geography_fit | 5% | 10 = preferred location. 7 = acceptable. 4 = requires relocation. 1 = excluded region (unless remote). |
| 9 | compensation_fit | 8% | 10 = competitive for level. 7 = acceptable. 4 = below market. 1 = significantly below or undisclosed. |
| 10 | application_complexity | 7% | 10 = simple (resume only). 7 = moderate (resume + CL). 4 = complex (custom docs). 1 = extremely complex. |

## Weighted Total Formula

```
total = (title_fit * 0.12) + (experience_fit * 0.18) + (education_fit * 0.08) +
        (sector_fit * 0.08) + (responsibility_fit * 0.18) + (leadership_fit * 0.08) +
        (mission_alignment * 0.08) + (geography_fit * 0.05) +
        (compensation_fit * 0.08) + (application_complexity * 0.07)
```

Range: 1.0 to 10.0. Round to 1 decimal place.

## Decision Thresholds

| Total | Decision | Action |
|-------|----------|--------|
| >= 7.0 | PROCEED | Generate all materials, submit |
| 5.0 - 6.9 | CONSIDER | Ask user whether to proceed |
| < 5.0 | PASS | Skip, not worth the effort |

## Hard Exclusion Override

If ANY hard exclusion from `constraints.yml` matches, set `proceed: false` regardless of total score. The total is still computed for informational purposes but the job is rejected.

## Confidence Calibration

- 0.9-1.0: Very confident in lane classification (title and description clearly match)
- 0.7-0.89: Confident (good evidence for classification)
- 0.5-0.69: Moderate (some ambiguity in the role)
- < 0.5: Low confidence (role is unusual or hard to classify)

## Score Validation

After computing, check:
- If experience_fit < 5 and total > 7.0: flag as potential over-score
- If title_fit < 4 and total > 6.0: flag as potential over-score
- If any dimension is 1: require justification in risk_notes
