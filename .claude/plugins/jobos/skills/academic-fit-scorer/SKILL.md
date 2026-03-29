---
name: academic-fit-scorer
description: Score how well a job matches your profile using a 10-point system. Helps you decide which jobs are worth applying to.
triggers:
  - "score this job"
  - "how good is this fit"
  - "evaluate this job"
  - "should I apply to this"
  - "rate this opportunity"
  - "is this a good match"
  - "score the fit"
references:
  - lane-taxonomy.md
  - scoring-rubric.md
author: JobOS-CC
version: 1.0.0
---

# Academic Fit Scorer Skill

**Purpose**: Score job postings against your profile to determine how well they align with your experience and goals.

**What This Skill Does**

This skill helps you evaluate higher-education job opportunities using a structured scoring system. It answers the question: "How strong is this opportunity for you, given your background and what you're looking for?"

**When to Use This Skill**

Use this skill whenever you need to:
- Evaluate a newly discovered job posting
- Decide whether to pursue an opportunity
- Compare multiple job options
- Understand why a job is or isn't a good fit

**How Scoring Works**

The scoring system evaluates jobs across 10 weighted dimensions:

1. **Role Alignment (12%)** — How well the job title matches target role lanes
2. **Required Qualifications (18%)** — Match between job requirements and candidate's experience
3. **Preferred Qualifications (8%)** — Alignment with preferred skills and credentials
4. **Institutional Fit (8%)** — How well the institution type matches preferences
5. **Career Stage Alignment (8%)** — Whether the role's level matches the candidate's seniority
6. **Location Compatibility (5%)** — Geographic alignment with search preferences
7. **Salary Adequacy (8%)** — Compensation competitiveness (if disclosed)
8. **Growth Potential (8%)** — Opportunities for advancement and development
9. **Culture/Values Alignment (8%)** — Mission and institutional culture resonance
10. **Application Feasibility (7%)** — How complex the application process is

Each dimension is scored 1-10, then weighted to produce a total score from 1.0 to 10.0.

**Decision Thresholds**

- **8.0+ = Strong Match** — High-priority opportunity. Proceed with preparation.
- **6.0-7.9 = Good Match** — Worth pursuing. Prepare materials.
- **4.0-5.9 = Weak Match** — Consider carefully. May proceed with caveats.
- **Below 4.0 = Reject** — Poor fit. Do not pursue.

**Hard Exclusions Override Scores**

Even if a job scores highly, it is automatically rejected if it matches any hard exclusion in `constraints.yml`, such as:
- K-12 teaching roles
- Corporate training positions
- Roles requiring licenses the candidate doesn't hold
- Entry-level positions that severely underutilize 20+ years of experience

**Lane Classification**

Before scoring, every job is classified into one of 8 academic lanes (or rejected). See `lane-taxonomy.md` for the complete lane definitions.

**Confidence Levels**

Scores include a confidence rating based on how clear the job posting is:
- **High (0.9-1.0)**: Very confident — posting is detailed and unambiguous
- **Medium (0.7-0.89)**: Confident — good information with some ambiguity
- **Low (<0.7)**: Uncertain — posting is vague or incomplete

**Reference Files**

- `lane-taxonomy.md` — Complete definitions of 8 academic role lanes
- `scoring-rubric.md` — Detailed scoring guide for each dimension
- `state/candidate/target_roles.yml` — Candidate's target role priorities
- `state/candidate/constraints.yml` — Hard and soft exclusion rules

**Output Format**

Each scored job produces a JSON report saved to `state/jobs/reports/{job_id}_score.json` containing:
```json
{
  "job_id": "uuid",
  "lane": "academic_admin",
  "fit_score": {
    "total": 7.8,
    "dimensions": {
      "title_fit": 8,
      "experience_fit": 9,
      "education_fit": 10,
      "sector_fit": 10,
      "responsibility_fit": 8,
      "leadership_fit": 7,
      "mission_alignment": 7,
      "geography_fit": 7,
      "compensation_fit": 6,
      "application_complexity": 7
    },
    "confidence": 0.85,
    "decision": "PROCEED"
  },
  "risk_notes": ["Salary not disclosed — scored as neutral"],
  "scored_at": "2026-03-28T10:30:00Z"
}
```

**Key Principles**

1. **Honesty over optimism** — Score based on evidence, not wishful thinking
2. **Transparency** — Document why each dimension received its score
3. **Respect constraints** — Hard exclusions are never overridden
4. **Context matters** — A "weak" score in one dimension may be acceptable if compensated by strengths elsewhere
5. **Qualitative judgment** — Numbers inform the decision, but don't replace human judgment
