---
name: reviewer-higher-ed
description: Quality-check your application materials before submitting. Catches errors, verifies facts, and makes sure everything is ready. Has veto power — if it finds problems, you must fix them before applying.
triggers:
  - "review my application"
  - "check my materials"
  - "quality check"
  - "is this ready to submit"
  - "review resume and cover letter"
  - "should I submit this"
  - "final check before applying"
references:
  - review-checklist.md
author: JobOS-CC
version: 1.0.0
---

# Reviewer Skill — Higher Education Applications

**Purpose**: Perform comprehensive quality audit of application materials using a strict 10-point checklist before submission.

**What This Skill Does**

This skill reviews all prepared application materials (resume, cover letter, screening answers) to ensure they are:
- Factually accurate and fabrication-free
- Aligned with the job's lane and requirements
- Professional in tone and free of banned phrases
- Institution-specific, not generic templates
- Ready for submission

**Core Principle: Veto Power**

The reviewer has absolute veto authority. If any materials fail the review, they MUST be regenerated. There is no "good enough" — either materials pass the 10-point checklist or they don't.

**When to Use This Skill**

Use this skill after materials are prepared but before they are submitted. This is the final quality gate.

**The 10-Point Checklist**

1. **Factual Accuracy** — Every claim traces to resume_facts.yml
2. **No Fabrication** — Zero tolerance for invented experience
3. **Lane Alignment** — Materials consistently address the target lane's priorities
4. **Tone Check** — Materials sound like a real professional, not AI
5. **Banned Phrase Scan** — None of the prohibited phrases appear
6. **Completeness** — All required materials exist and address key requirements
7. **Institution Specificity** — Cover letter references the specific institution
8. **Consistency** — Materials tell a consistent story with no contradictions
9. **Credibility Gap Check** — Materials do not overreach or fake expertise
10. **Professional Quality** — Formatting and presentation are ready for submission

See `review-checklist.md` for the complete checklist with detailed criteria for each point.

**Verdict Rules**

| Verdict | Criteria | Action |
|---------|----------|--------|
| **PASS** | All 10 items pass | Ready for submission |
| **PASS_WITH_REVISIONS** | 8-9 items pass, specific fixable issues | List exactly what must change |
| **FAIL** | Fewer than 8 items pass OR fabrication detected | Materials must be regenerated |

**Automatic FAIL Triggers**

Some failures are automatic and non-negotiable:
- **Any fabrication detected** — Even one fabricated claim means FAIL, regardless of other scores
- **Fewer than 8 checklist items passing** — Too many issues to fix with revisions

**The Non-Negotiable Rule**

If the verdict is **FAIL**, it **cannot be overridden** — not by the user, not by the system, not by "yolo" mode. A FAIL verdict means the materials MUST be regenerated from scratch.

**Review Process**

1. **Load all materials** — Resume, cover letter, screening answers, job posting, candidate facts
2. **Load checklist** — Read the complete 10-point review checklist
3. **Systematic review** — Go through each checklist item one by one
4. **Document issues** — For every problem found, document:
   - Which checklist item it violates (1-10)
   - Which file contains the issue (resume, cover letter, screening answers)
   - Specific location (paragraph number, bullet point, question number)
   - What the issue is (exact quote or description)
   - How to fix it (specific correction or rewrite instruction)
5. **Assign verdict** — Based on how many items pass and whether fabrication was detected
6. **Write report** — Save structured review report to `state/jobs/reports/{job_id}_review.json`

**Issue Documentation Format**

For every issue found:
```json
{
  "checklist_item": 1,
  "file": "cover_letter",
  "location": "Paragraph 2, sentence 3",
  "issue": "Claim not supported by resume_facts.yml",
  "quote": "directed comprehensive advising program",
  "fix": "Remove or rephrase to match actual scope: 'coordinated advising support for first-year students'"
}
```

**Output Format**

The review report is saved as JSON to:
```
state/jobs/reports/{job_id}_review.json
```

Format:
```json
{
  "job_id": "uuid",
  "reviewed_at": "2026-03-28T10:30:00Z",
  "verdict": "PASS | PASS_WITH_REVISIONS | FAIL",
  "checklist_results": {
    "factual_accuracy": "pass",
    "no_fabrication": "pass",
    "lane_alignment": "pass",
    "tone_check": "pass",
    "banned_phrase_scan": "pass",
    "completeness": "pass",
    "institution_specificity": "pass_with_revisions",
    "consistency": "pass",
    "credibility_gap_check": "pass",
    "professional_quality": "pass"
  },
  "items_passed": 9,
  "issues_found": [
    {
      "checklist_item": 7,
      "file": "cover_letter",
      "location": "Paragraph 1",
      "issue": "Generic opening that could apply to any institution",
      "fix": "Add specific reference to TMU's mission or a recent initiative"
    }
  ],
  "required_changes": [
    "Revise paragraph 1 to include institution-specific reference",
    "Verify all claims against resume_facts.yml before resubmitting"
  ],
  "reviewer_notes": "Strong materials overall. One institution-specificity fix needed."
}
```

**Reference Files**

- `review-checklist.md` — Complete 10-point checklist with detailed criteria
- `state/candidate/resume_facts.yml` — Source of truth for all claims
- `state/candidate/writing_style.md` — Tone and banned phrases

**Critical Checks**

These are the most important checks that trigger FAIL verdicts:

1. **Factual Accuracy** — Every claim must trace to resume_facts.yml
2. **No Fabrication** — Zero tolerance for invented experience
3. **Banned Phrase Scan** — "Passionate about" and similar phrases are automatic red flags

**Common Fail Patterns**

Watch for these common issues:
- Vague claims without specific evidence ("strong leadership skills")
- Claims that don't appear in resume_facts.yml
- Banned phrases like "passionate about" or "unique perspective"
- Generic cover letters that could work for any institution
- Tone that sounds AI-generated rather than human
- Contradictions between resume and cover letter

**Common Questions**

**Q: Can a PASS_WITH_REVISIONS verdict be overridden?**

A: No. If revisions are required, they must be made before the materials can be submitted. The specific changes are listed in the report.

**Q: What if the materials are mostly good but have one major issue?**

A: One major issue (like fabrication) is enough for a FAIL verdict. The checklist is binary: each item either passes or it doesn't.

**Q: Can I resubmit materials after a FAIL verdict?**

A: Yes. Regenerate the materials from scratch, addressing the issues found in the review, then run the review again.
