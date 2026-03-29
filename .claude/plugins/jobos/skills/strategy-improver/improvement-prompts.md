# Strategy Improvement Prompts

## Analysis Framework

Use these prompts to analyze job search performance and generate improvement recommendations.

---

## 1. Search Quality Analysis

### Prompt Template
```
Analyze the job discovery performance for this candidate:

DATA TO REVIEW:
- state/queues/inbound_jobs.jsonl (jobs discovered)
- state/queues/inspected_jobs.jsonl (jobs classified by route)
- state/jobs/normalized/*.json (job records with source data)
- state/memory/seen_urls.jsonl (dedup tracking)

QUESTIONS TO ANSWER:
1. How many jobs are being discovered per search cycle? Break down by source.
2. Which search queries are producing the most relevant results?
3. Which search queries are producing low-quality matches (high rejection rate)?
4. Are there geographic clusters producing better or worse results?
5. Which sources (LinkedIn, Indeed, Google Jobs, institutional) yield the highest-quality matches?
6. What search terms might be missing that would surface relevant roles?
7. Are there searches returning too many results that should be split or refined?
8. What time patterns exist in discovery (certain days/times better)?

OUTPUT FORMAT:
### Search Performance Summary
[Brief summary of discovery rate and quality]

### Source Effectiveness
| Source | Jobs Found | % Pursued | % High Fit | Notes |
|--------|-----------|-----------|------------|-------|
| ... |

### Search Term Recommendations
ADD: [new search queries to add]
REMOVE: [search queries to remove]
REFINE: [search queries to adjust]

### Geographic Adjustments
[Recommendations for location filters]

### Evidence
[Cite specific data points supporting recommendations]
```

---

## 2. Answer Reuse Analysis

### Prompt Template
```
Analyze screening answer reuse patterns:

DATA TO REVIEW:
- state/memory/answer_memory.jsonl (answer reuse tracking)
- state/outputs/screening/*.json (screening answer sets)
- state/jobs/reports/*_review.json (review feedback on answers)

QUESTIONS TO ANSWER:
1. Which screening answers are being reused most frequently?
2. Which answers have NEVER been used (consider removing)?
3. Which answers consistently get positive reviewer feedback?
4. Which answers get flagged for revision (vague, too long, lacks specifics)?
5. What question types are NOT covered by the answer library?
6. Which answers need updating with new experience or metrics?
7. Are there answers that are too similar and should be consolidated?
8. What question archetypes appear frequently that we should prepare for?

OUTPUT FORMAT:
### High-Value Answers (Reuse Frequently, Positive Feedback)
- [Answer name]: Used X times, 0 revisions. Keep as-is.

### Answers Needing Revision
- [Answer name]: Used X times, Y revisions. Issue: [specific problem].
  Recommendation: [how to improve]

### Unused Answers (Consider Removing)
- [Answer name]: Never used. May be obsolete or too niche.

### Gaps in Answer Library
Missing archetypes:
- [question type]: Need answer covering [specific scenario].
- [question type]: Need answer covering [specific scenario].

### New Answers to Create
1. [answer name]: [purpose, key points to include]
2. [answer name]: [purpose, key points to include]

### Evidence
[Cite specific review feedback or usage patterns]
```

---

## 3. Route Pain Points Analysis

### Prompt Template
```
Analyze application route performance and failure patterns:

DATA TO REVIEW:
- state/queues/execute_queue.jsonl (jobs awaiting execution)
- state/queues/followup_queue.jsonl (post-submission tracking)
- state/jobs/reports/*_route.json (route classification evidence)
- state/memory/route_memory.jsonl (route-specific lessons)
- state/logs/events.jsonl (execution events and failures)

QUESTIONS TO ANSWER:
1. Which route types (ATS, email, manual, board_simplified, document_led) have highest success rate?
2. Which routes fail most? What are the common failure modes?
3. For ATS routes: which portals (Workday, Taleo, etc.) cause problems?
4. For email routes: are emails bouncing? Going unanswered? Wrong addresses?
5. For manual routes: are candidates completing them? What's the completion rate?
6. For external redirects: where do they lead? Any patterns in destinations?
7. How long does each route type take on average?
8. Which routes have the highest correlation with positive outcomes (interviews)?

OUTPUT FORMAT:
### Route Success Rates
| Route | Attempts | Successes | Failures | Success Rate | Avg Time |
|-------|----------|-----------|----------|--------------|----------|
| ... |

### ATS Portal Analysis
| Portal | Attempts | Successes | Common Issues | Recommendations |
|--------|----------|-----------|---------------|-----------------|
| ... |

### Route-Specific Recommendations

ATS/Browser Routes:
- [Specific portal or pattern issue]: [recommendation]
- [Specific portal or pattern issue]: [recommendation]

Email Routes:
- [Email pattern issue]: [recommendation]
- [Email pattern issue]: [recommendation]

Manual Routes:
- [Manual process issue]: [recommendation]
- [Manual process issue]: [recommendation]

External Redirects:
- [Redirect pattern]: [recommendation]

### Route Strategy Adjustments
PRIORITIZE: [routes to focus on]
DEPRIORITIZE: [routes to avoid or limit]
LEARN MORE: [routes needing investigation]

### Evidence
[Cite specific failures, event logs, or route memory entries]
```

---

## 4. Material Quality Analysis

### Prompt Template
```
Analyze application material effectiveness:

DATA TO REVIEW:
- state/jobs/reports/*_review.json (all review reports)
- state/queues/review_queue.jsonl (review backlog)
- state/outputs/resumes/*.txt (resume variants)
- state/outputs/cover_letters/*.txt (cover letter variants)

QUESTIONS TO ANSWER:
1. What percentage of reviews are PASS vs. PASS_WITH_REVISIONS vs. FAIL?
2. What are the most common revision reasons? (prioritize fixing these)
3. What FAIL patterns appear repeatedly? (these are critical)
4. Which resume variants get the best reviews? Worst reviews?
5. Which cover letter openings/closings work best?
6. Are there materials that consistently get flagged for fabrication or vagueness?
7. Do certain lanes produce better materials than others? Why?
8. What writing style issues come up repeatedly?

OUTPUT FORMAT:
### Review Verdict Breakdown
- PASS: X% (Y of Z applications)
- PASS_WITH_REVISIONS: X% (Y of Z applications)
- FAIL: X% (Y of Z applications)

### Common Revision Themes
1. [Issue theme]: Appears in X reviews. Example: [specific example]
   Recommendation: [how to fix]
2. [Issue theme]: Appears in X reviews. Example: [specific example]
   Recommendation: [how to fix]
3. [Issue theme]: Appears in X reviews. Example: [specific example]
   Recommendation: [how to fix]

### FAIL Patterns (Critical)
1. [FAIL reason]: X occurrences. Must fix: [action]
2. [FAIL reason]: X occurrences. Must fix: [action]

### Resume Variant Performance
| Variant | Uses | PASS Rate | Common Issues | Assessment |
|---------|------|-----------|---------------|------------|
| ... |

### Cover Letter Patterns
Best-performing openings:
- [Opening pattern]: Used X times, PASS rate Y%

Weakest openings:
- [Opening pattern]: Used X times, revision rate Y%

### Material Recommendations
UPDATE resume_facts.yml:
- [Add/update fact]: [reason]

UPDATE writing_style.md:
- [Add/update style guidance]: [reason]

UPDATE screening_answers.yml:
- [Add/update answer]: [reason]

### Evidence
[Cite specific review comments]
```

---

## 5. Follow-Up Queue Analysis (GAP-008)

### Prompt Template
```
Analyze follow-up queue status and recommend actions:

DATA TO REVIEW:
- state/queues/followup_queue.jsonl (jobs in follow-up)
- state/jobs/normalized/*.json (job details, submission dates)
- state/logs/events.jsonl (submission and follow-up events)
- state/memory/strategy_notes.md (previous follow-up actions)

QUESTIONS TO ANSWER:
1. How many jobs are in the follow-up queue?
2. How long has each job been in follow-up? (categorize by age)
3. What follow-up actions are pending? (email check, reference check, etc.)
4. Which jobs are overdue for follow-up? (per time thresholds)
5. What patterns exist in follow-up outcomes? (responses, ghosting, etc.)
6. Which follow-up methods work best? (email, phone, portal check)
7. Are there jobs that should be moved to "closed" status? (no response after X time)

OUTPUT FORMAT:
### Follow-Up Queue Summary
Total jobs in follow-up: X
- Newly submitted (<1 week): X
- Awaiting response (1-3 weeks): X
- Overdue for follow-up (>3 weeks): X
- Stale (>8 weeks, consider closed): X

### Follow-Up Actions Needed

Immediate (This Week):
- [Job]: [Action] - Submitted [date], [context]

Upcoming (Next 2 Weeks):
- [Job]: [Action] - Submitted [date], [context]

Overdue (>3 Weeks):
- [Job]: [Action] - Submitted [date], [context]

### Follow-Up Method Effectiveness
| Method | Attempts | Responses | Response Rate |
|--------|----------|-----------|---------------|
| Email check-in | ... | ... | ... |
| Portal status check | ... | ... | ... |
| Phone inquiry | ... | ... | ... |

### Closure Recommendations
Consider closing (no response after 8+ weeks):
- [Job]: Submitted [date], no response. Recommend: [action]

### Follow-Up Strategy Adjustments
- [Pattern observation]: [recommendation]
- [Pattern observation]: [recommendation]

### Evidence
[Cite specific job records or events]
```

---

## 6. Strategy Adjustment Recommendations

### Prompt Template
```
Synthesize all analyses into prioritized strategy adjustments:

INPUTS:
- Search quality analysis
- Answer reuse analysis
- Route pain points analysis
- Material quality analysis
- Follow-up queue analysis
- state/candidate/search_preferences.yml (current search config)
- state/candidate/constraints.yml (current constraints)
- state/candidate/target_roles.yml (current lane priorities)

QUESTIONS TO ANSWER:
1. What are the TOP 3 highest-impact, easiest-to-implement changes?
2. What search adjustments would most improve relevance?
3. What material improvements would most increase quality?
4. What route strategy adjustments would save time or improve success?
5. What constraint adjustments are needed?
6. What follow-up process improvements are needed?

OUTPUT FORMAT:
### Executive Summary
[3-5 key findings in plain language]

### Prioritized Recommendations

#### HIGH Impact, EASY Effort (Do These First)
1. **[Recommendation title]**
   - Action: [specific change]
   - Expected outcome: [what should improve]
   - How to implement: [specific file to edit, change to make]
   - Evidence: [data supporting this recommendation]
   - Risk: [any potential downsides]

#### HIGH Impact, MEDIUM Effort
1. **[Recommendation title]**
   - Action: [specific change]
   - Expected outcome: [what should improve]
   - How to implement: [specific steps]
   - Evidence: [data supporting this recommendation]
   - Risk: [any potential downsides]

#### MEDIUM Impact, EASY Effort
1. **[Recommendation title]**
   - Action: [specific change]
   - Expected outcome: [what should improve]
   - How to implement: [specific steps]
   - Evidence: [data supporting this recommendation]
   - Risk: [any potential downsides]

### Search Configuration Changes
UPDATE search_preferences.yml:
```yaml
# [comment explaining change]
queries:
  - [add/modify query]
  - [remove query]

sources:
  [source]: [priority adjustment]

locations:
  - [add/modify location]
  - [remove location]
```

### Constraint Changes
UPDATE constraints.yml:
```yaml
# [comment explaining change]
hard_exclusions:
  - [add/remove pattern]

soft_exclusions:
  - [add/remove pattern]

# [comment explaining change]
compensation:
  min_salary: [adjustment]
```

### Material Improvements
UPDATE resume_facts.yml:
- [Add/update fact with better metrics]

UPDATE screening_answers.yml:
- [Add/update answer]

UPDATE writing_style.md:
- [Add/update style guidance]

### Lane Priority Adjustments
UPDATE target_roles.yml:
```yaml
lane_priorities:
  [lane]: [adjust priority]
```

### Follow-Up Process Changes
- [Process improvement]: [recommendation]

### Next Review
Schedule next improvement review: [recommended time frame]
Track these metrics: [what to watch for]
```

---

## 7. Learning Loop Documentation

### After Each Improvement Cycle

Document what you changed and what happened:

```markdown
## Improvement Cycle — [Date]

### Changes Made
1. **[Change title]**
   - File: [file edited]
   - What changed: [specific change]
   - Why: [rationale from recommendation]

2. **[Change title]**
   - File: [file edited]
   - What changed: [specific change]
   - Why: [rationale from recommendation]

### Expected Outcomes
- [Outcome 1]: [expected improvement]
- [Outcome 2]: [expected improvement]

### Actual Outcomes ([Date of next review])
- [Outcome 1]: [what actually happened]
- [Outcome 2]: [what actually happened]

### Lessons Learned
- [What worked, what didn't, what to try next]

### Next Steps
- [What to adjust in the next cycle]
```

This creates a learning history—your job search gets smarter every cycle.
