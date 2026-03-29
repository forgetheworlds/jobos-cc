# Review Checklist — Higher Education Application Materials

## 10-Point Checklist

### 1. Factual Accuracy
**Check**: Every claim in all materials traces to real experience in `resume_facts.yml`.
- Cross-reference institution names, dates, titles
- Verify outcomes and metrics mentioned
- Check that skills claimed actually appear in the candidate's skills inventory
- **PASS**: All facts verified. **FAIL**: Any claim cannot be traced to resume_facts.

### 2. No Fabrication
**Check**: No skills, credentials, or experiences have been invented.
- Verify no new skills appear that aren't in resume_facts.yml
- Check that responsibilities haven't been inflated beyond what facts support
- Ensure dates and institutions haven't been altered
- **PASS**: Zero fabrication. **FAIL**: Any fabrication detected (automatic FAIL verdict).

### 3. Lane Alignment
**Check**: Materials consistently address the target lane's priorities.
- Does the resume emphasize experiences relevant to the classified lane?
- Does the cover letter address the lane's core competencies?
- Are screening answers framed for this role family?
- **PASS**: Consistent lane alignment. **FAIL**: Materials address a different lane or are generic.

### 4. Tone Check
**Check**: Materials sound like a real higher education professional wrote them.
- Read the cover letter aloud — does it sound natural?
- Check for AI-sounding patterns (overly polished, repetitive structure, excessive hedging)
- Check for corporate jargon that doesn't fit higher education
- **PASS**: Natural, professional tone. **FAIL**: AI-sounding or inappropriate tone.

### 5. Banned Phrase Scan
**Check**: None of these phrases appear in any material.
**Banned phrases**:
- "Passionate about" / "I am passionate"
- "Synergy" / "synergistic"
- "Think outside the box"
- "Team player" / "Self-starter"
- "Detail-oriented" / "Fast-paced environment"
- "Proven track record" (unless followed by specific evidence)
- "World-class" / "best-in-class"
- "I am committed to excellence"
- "My diverse background allows me to"
- "I bring a unique perspective"
- "I believe that every student deserves"
- **PASS**: Zero banned phrases. **FAIL**: Any banned phrase found.

### 6. Completeness
**Check**: All required materials exist and address key qualifications.
- Resume exists and addresses top job requirements
- Cover letter exists and covers main requirements
- Screening answers exist for all questions found
- No empty sections or placeholder text
- **PASS**: All materials complete. **FAIL**: Missing materials or empty sections.

### 7. Institution Specificity
**Check**: Cover letter references the specific institution.
- The institution's name appears (not just "your institution")
- Mission, values, or strategic priorities are referenced where possible
- The letter would be different if sent to a different institution
- Not a template with name swapped in
- **PASS**: Institution-specific throughout. **FAIL**: Generic letter or template.

### 8. Consistency
**Check**: Materials tell a consistent story.
- Same dates, titles, and institutions across resume and cover letter
- No contradictions in described responsibilities
- Screening answers align with resume and cover letter narrative
- **PASS**: Fully consistent. **FAIL**: Any contradictions found.

### 9. Credibility Gap Check
**Check**: Materials do not overreach.
- If the job requires something the candidate lacks, the materials either address it with transferable evidence or acknowledge the gap honestly
- No claims of expertise in areas where the candidate has no experience
- Transferable strengths are framed honestly (not as direct experience)
- **PASS**: Honest representation. **FAIL**: Overreaching claims or fake-it framing.

### 10. Professional Quality
**Check**: Formatting and presentation are ready for submission.
- Clean, consistent formatting
- No typos or grammatical errors
- Professional layout and structure
- Appropriate length (resume 2 pages, cover letter 350-450 words)
- **PASS**: Submission-ready quality. **FAIL**: Errors or formatting issues.

## Verdict Rules

| Verdict | Criteria | Action |
|---------|----------|--------|
| PASS | All 10 items pass | Ready for submission |
| PASS_WITH_REVISIONS | 8-9 items pass, specific fixable issues | List exactly what must change |
| FAIL | Fewer than 8 items pass OR fabrication detected | Materials must be regenerated |

## Issue Documentation

For every issue found, document:
- **Which checklist item** it violates (1-10)
- **Which file** contains the issue (resume, cover letter, screening answers)
- **Specific location** (paragraph number, bullet point, question number)
- **What the issue is** (exact quote or description)
- **How to fix it** (specific correction or rewrite instruction)
