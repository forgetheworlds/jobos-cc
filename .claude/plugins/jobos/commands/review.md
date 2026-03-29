---
name: jobos-check
description: Quality-check your application materials before submitting. Catches errors and verifies facts. Has veto power — if problems found, you must fix them first.
argument-hint: <job_id>
allowed-tools:
  - Read
  - Write
  - Bash
  - mcp__plugin_oh-my-claudecode_t__notepad_write_working
---

# /jobos-check — Quality Check Application Materials

Run comprehensive quality audit on all application materials using the reviewer-higher-ed skill and 10-point checklist.

## What This Command Does

This command performs a final quality audit before submission by:
1. Loading the reviewer skill and 10-point checklist
2. Reading all prepared materials for the job
3. Cross-referencing every claim against resume_facts.yml
4. Running systematic quality checks
5. Assigning verdict: PASS, PASS_WITH_REVISIONS, or FAIL
6. Writing a detailed review report

## Usage

```
/review <job_id>
```

**Arguments:**
- `job_id` (required) — Job identifier from the review queue

## Prerequisites

The job must have materials prepared:
- Resume exists at `state/outputs/resumes/{job_id}_resume.txt`
- Cover letter exists at `state/outputs/cover_letters/{job_id}_cl.txt`
- Screening answers exist at `state/outputs/screening/{job_id}_screening.json`

If materials don't exist, explain that `/prepare` must be run first.

## Step-by-Step Instructions

### Step 1: Load Review Framework

**Load the reviewer skill**:
- Read `skills/reviewer-higher-ed/SKILL.md`
- Read `skills/reviewer-higher-ed/review-checklist.md`

**Load candidate context**:
- Read `state/candidate/resume_facts.yml` — Source of truth for all claims
- Read `state/candidate/writing_style.md` — Tone and banned phrase reference

### Step 2: Load Job and Materials

**Read the job record** from `state/jobs/normalized/{job_id}.json`

**Read all application materials**:
- `state/outputs/resumes/{job_id}_resume.txt`
- `state/outputs/cover_letters/{job_id}_cl.txt`
- `state/outputs/screening/{job_id}_screening.json`

**Read the original job posting** from the job record

### Step 3: Run 10-Point Checklist Systematically

Go through each checklist item one by one:

#### 1. Factual Accuracy
Cross-reference EVERY claim in all materials against resume_facts.yml:
- Institution names match?
- Dates are correct?
- Titles are accurate?
- Outcomes are supported by facts?
- Skills claimed appear in skills inventory?

**PASS**: All facts verified against resume_facts.yml
**FAIL**: Any claim cannot be traced

#### 2. No Fabrication
Check for invented experience:
- Any new skills not in resume_facts.yml?
- Responsibilities inflated beyond facts?
- Dates or institutions altered?
- Achievements fabricated?

**PASS**: Zero fabrication
**FAIL**: Any fabrication (automatic FAIL verdict, non-negotiable)

#### 3. Lane Alignment
Verify materials address the job's classified lane:
- Resume emphasizes relevant experience?
- Cover letter addresses lane competencies?
- Screening answers framed for this role family?

**PASS**: Consistent lane alignment
**FAIL**: Generic or wrong lane

#### 4. Tone Check
Read cover letter aloud:
- Sounds natural or AI-generated?
- Professional but not stiff?
- Warm but not casual?
- Higher education appropriate?

**PASS**: Natural, professional tone
**FAIL**: AI-sounding or inappropriate

#### 5. Banned Phrase Scan
Check all materials for prohibited phrases:
- "Passionate about" / "I am passionate"
- "Synergy" / "synergistic"
- "Think outside the box"
- "Team player" / "Self-starter"
- "Detail-oriented" / "Fast-paced environment"
- "Proven track record" (without evidence)
- "World-class" / "best-in-class"
- "I am committed to excellence"
- "My diverse background allows me to"
- "I bring a unique perspective"
- "I believe that every student deserves"

**PASS**: Zero banned phrases
**FAIL**: Any banned phrase found

#### 6. Completeness
Verify all materials present and complete:
- Resume addresses top requirements
- Cover letter covers main points
- Screening answers for all questions
- No empty sections or placeholders

**PASS**: All materials complete
**FAIL**: Missing or incomplete materials

#### 7. Institution Specificity
Check cover letter customization:
- Institution name appears (not "your institution")
- Mission/values referenced?
- Would letter be different for another institution?
- Not a template with name swapped?

**PASS**: Institution-specific throughout
**FAIL**: Generic or template

#### 8. Consistency
Cross-check materials:
- Same dates/titles/institutions throughout?
- No contradictions in responsibilities?
- Screening answers align with resume/cover letter?

**PASS**: Fully consistent
**FAIL**: Any contradictions

#### 9. Credibility Gap Check
Verify honest representation:
- Gaps acknowledged honestly?
- No claims of expertise without experience?
- Transferable strengths framed honestly?

**PASS**: Honest representation
**FAIL**: Overreaching or fake-it framing

#### 10. Professional Quality
Check formatting and presentation:
- Clean, consistent formatting?
- No typos or grammatical errors?
- Appropriate length (resume ~2 pages, cover letter 350-450 words)?
- Ready for submission?

**PASS**: Submission-ready quality
**FAIL**: Errors or formatting issues

### Step 4: Document Issues

For every issue found, document:
```json
{
  "checklist_item": 1-10,
  "file": "resume|cover_letter|screening_answers",
  "location": "Paragraph 2, sentence 3 | Bullet 4 | Question 2",
  "issue": "Specific description of the problem",
  "quote": "Relevant text excerpt if applicable",
  "fix": "Specific correction or rewrite instruction"
}
```

### Step 5: Assign Verdict

Based on checklist results:

**PASS**: All 10 items pass
- Materials are ready for submission

**PASS_WITH_REVISIONS**: 8-9 items pass
- Specific fixable issues identified
- List exact changes needed
- Materials must be revised and re-reviewed

**FAIL**: Fewer than 8 items pass OR any fabrication detected
- Materials must be regenerated from scratch
- Cannot be salvaged with revisions
- **Non-negotiable: FAIL verdict cannot be overridden**

### Step 6: Write Review Report

Save report to `state/jobs/reports/{job_id}_review.json`:

```json
{
  "job_id": "uuid",
  "job_title": "string",
  "institution": "string",
  "lane": "academic_admin",
  "reviewed_at": "2026-03-28T10:30:00Z",
  "verdict": "PASS | PASS_WITH_REVISIONS | FAIL",
  "checklist_results": {
    "factual_accuracy": "pass | fail",
    "no_fabrication": "pass | fail",
    "lane_alignment": "pass | fail",
    "tone_check": "pass | fail",
    "banned_phrase_scan": "pass | fail",
    "completeness": "pass | fail",
    "institution_specificity": "pass | fail",
    "consistency": "pass | fail",
    "credibility_gap_check": "pass | fail",
    "professional_quality": "pass | fail"
  },
  "items_passed": 9,
  "issues_found": [
    {/* issue objects */}
  ],
  "required_changes": [
    "Revise cover letter paragraph 1 to include institution-specific reference",
    "Verify all dates against resume_facts.yml"
  ],
  "reviewer_notes": "Strong materials overall. One institution-specificity fix needed."
}
```

### Step 7: Update Job Record and Queue

**Update the job record**:
- Set `review.verdict` field
- Set `review.reviewed_at` timestamp
- Set `review.issues` array

**Move job based on verdict**:

If PASS:
- Move to execute_queue
- Set `state` to "ready_for_execution"

If PASS_WITH_REVISIONS:
- Keep in review_queue
- Set `state` to "packet_prepared" (for revision)
- Update packet manifest with review findings

If FAIL:
- Move back to prep_queue
- Set `state` to "packet_prepared" (for regeneration)
- Mark review_status as "failed"

### Step 8: Display Summary

Show the user the verdict:

```markdown
# Review Report: [Job Title] at [Institution]

## Verdict: PASS ✓

## Checklist Results
✓ Factual Accuracy
✓ No Fabrication
✓ Lane Alignment
✓ Tone Check
✓ Banned Phrase Scan
✓ Completeness
✓ Institution Specificity
✓ Consistency
✓ Credibility Gap Check
✓ Professional Quality

**10/10 items passed**

## Status
Ready for submission. Run `/execute {job_id}` when ready.
```

OR for PASS_WITH_REVISIONS:

```markdown
# Review Report: [Job Title] at [Institution]

## Verdict: PASS_WITH_REVISIONS ⚠️

## Checklist Results
✓ 9 items passed
✗ Institution Specificity — Cover letter is too generic

## Required Changes
1. Revise cover letter paragraph 1 to reference TMU's mission specifically
2. Add institutional value from job posting or website

Make revisions, then run `/review {job_id}` again.
```

OR for FAIL:

```markdown
# Review Report: [Job Title] at [Institution]

## Verdict: FAIL ✗

## Checklist Results
✓ 6 items passed
✗ Factual Accuracy — Claim not supported by resume_facts.yml
✗ No Fabrication — Skill listed that candidate doesn't have
✗ Professional Quality — Multiple typos

## Required Action
Materials must be regenerated from scratch. Run `/prepare {job_id}` again after addressing issues.
```

### Step 9: Log to Notepad

Add to working notepad:
```
"Reviewed {job_id}: [VERDICT] (X/10 passed). [Ready for submission | Revisions needed | Regeneration required]"
```

## Quality Checks

Before completing:
- [ ] Every checklist item evaluated
- [ ] All issues documented with specific locations
- [ ] Verdict assigned correctly per rules
- [ ] Report saved to correct path
- [ ] Job moved to appropriate queue
- [ ] Summary displayed to user

## Critical Rules

1. **FAIL verdict is absolute** — Cannot be overridden for any reason
2. **Fabrication = automatic FAIL** — Even one fabricated claim
3. **All materials must exist** — Don't review incomplete packets
4. **Document everything** — Every issue needs specific location and fix

## Error Handling

If review cannot be completed:
- Explain why clearly
- Don't assign a verdict if materials are incomplete
- Suggest what needs to be fixed first
