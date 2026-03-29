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
| >= 8.0 | Strong Match | High priority. Generate all materials. |
| 6.0 - 7.9 | Good Match | Worth pursuing. Generate materials. |
| 4.0 - 5.9 | Weak Match | Consider carefully. Note gaps. |
| < 4.0 | Reject | Poor fit. Skip. |

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

## Dimension-by-Dimension Guidance

### 1. title_fit (12%)
- Score 10: Title appears exactly in target_roles.yml title clusters
- Score 7: Title is a close variant (e.g., "Manager of Student Success" vs "Student Success Manager")
- Score 4: Title is tangentially related but not a target
- Score 1: Title is completely unrelated or in a excluded cluster

### 2. experience_fit (18%) — MOST WEIGHTED
- Score 10: Candidate has directly comparable experience from past roles
- Score 7: Strong transferable evidence (similar responsibilities in different context)
- Score 4: Partial overlap (some relevant experience, but gaps)
- Score 1: No relevant experience found in resume_facts.yml

### 3. education_fit (8%)
- Score 10: Exceeds stated requirements (e.g., job requires master's, candidate has doctorate)
- Score 7: Meets requirements exactly
- Score 4: Close but not exact (e.g., job specifies "doctorate preferred," candidate has "ABD")
- Score 1: Significant gap (missing required degree or credential)

### 4. sector_fit (8%)
- Score 10: Higher education institution of the type preferred (university, college, etc.)
- Score 7: Higher education (any type)
- Score 4: Education-adjacent (educational nonprofit, research organization with academic mission)
- Score 1: Corporate, government, or other unrelated sector

### 5. responsibility_fit (18%) — MOST WEIGHTED
- Score 10: Day-to-day responsibilities exactly match candidate's documented strengths
- Score 7: Strong overlap with minor gaps
- Score 4: Partial overlap — some responsibilities align, others don't
- Score 1: Mismatch — responsibilities are fundamentally different from candidate's experience

### 6. leadership_fit (8%)
- Score 10: Leadership scope matches (e.g., job directs a program, candidate has directed similar programs)
- Score 7: Close (one level off in scope, but comparable leadership experience)
- Score 4: Below or above (job is more junior or senior than candidate's typical level)
- Score 1: No leadership component in the role

### 7. mission_alignment (8%)
- Score 10: Institution's mission strongly resonates with candidate's values (e.g., commitment to first-generation students, community engagement)
- Score 7: Good fit — mission is compatible and appealing
- Score 4: Neutral — mission doesn't conflict but isn't particularly exciting
- Score 1: Conflicting — mission seems at odds with candidate's values

### 8. geography_fit (5%)
- Score 10: Preferred location from search_preferences.yml
- Score 7: Acceptable location (within candidate's willingness to relocate)
- Score 4: Requires relocation but doable
- Score 1: Excluded region OR remote when candidate prefers on-site (or vice versa)

### 9. compensation_fit (8%)
- Score 10: Competitive for the level (based on market research)
- Score 7: Acceptable
- Score 4: Below market but potentially offset by other factors
- Score 1: Significantly below market OR completely undisclosed (score as neutral 6, note in risk_notes)

### 10. application_complexity (7%)
- Score 10: Simple application (resume upload, maybe quick form)
- Score 7: Moderate (resume + cover letter + basic screening questions)
- Score 4: Complex (custom essays, multiple documents, lengthy questionnaire)
- Score 1: Extremely complex (teaching portfolio, research statement, multiple custom documents)
