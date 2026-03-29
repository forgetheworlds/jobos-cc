---
name: jobos-prepare
description: Create tailored resume, cover letter, and screening answers for a specific job. Customizes your materials based on the job requirements.
argument-hint: <job_id>
allowed-tools:
  - Read
  - Write
  - Bash
  - mcp__plugin_oh-my-claudecode_t__notepad_write_working
---

# /jobos-prepare — Prepare Application Materials

Generate all tailored application materials (resume, cover letter, screening answers) for a specific job.

## What This Command Does

This command creates customized application materials for a job by:
1. Reading the job's lane classification and fit score
2. Generating a lane-specific tailored resume
3. Writing an institution-aware cover letter
4. Drafting evidence-based screening question responses
5. Saving all materials to the outputs directory

## Usage

```
/prepare <job_id>
```

**Arguments:**
- `job_id` (required) — Job identifier from the shortlisted queue

## Prerequisites

The job must have:
- `fit_score.total >= 6.0` (at least "CONSIDER" status)
- A classified lane (not "reject")
- Route classification completed

If prerequisites aren't met, explain what's needed first.

## Step-by-Step Instructions

### Step 1: Load Job and Candidate Context

**Read the job record** from `state/jobs/normalized/{job_id}.json`

Verify:
- Lane is assigned
- Fit score is >= 6.0
- Route family is classified

**Load candidate data** from `state/candidate/`:
- `resume_facts.yml` — Source of all experience
- `writing_style.md` — Tone guidelines
- `star_stories.yml` — STAR stories for evidence
- `screening_answers.yml` — Reusable answer seeds

### Step 2: Generate Tailored Resume

**Load the higher-ed-resume-tailor skill**:
- Read `skills/higher-ed-resume-tailor/SKILL.md`
- Read `skills/higher-ed-resume-tailor/tailoring-rules.md`

**Generate the resume**:

1. Identify the job's lane
2. Find the lane-specific reordering priority in tailoring-rules.md
3. Reorder experience sections by lane priority
4. Expand relevant bullet points (5-7 for most relevant section)
5. Condense less relevant sections (3-4 secondary, 2-3 least relevant)
6. Write lane-specific professional summary (2-3 sentences)
7. Reorder skills by relevance to this job
8. Fact-check every claim against resume_facts.yml

**Save the resume** to `state/outputs/resumes/{job_id}_resume.txt`

### Step 3: Generate Cover Letter

**Load the cover-letter-crafter skill**:
- Read `skills/cover-letter-crafter/SKILL.md`
- Read `skills/cover-letter-crafter/style-rules.md`

**Generate the cover letter**:

1. Extract top 3-5 requirements from job posting
2. Identify the job's lane for lane-specific opening angle
3. Select 2-3 experiences from resume_facts that address requirements
4. Research institution mission/values (from posting or web if available)
5. Draft 4-paragraph letter (350-450 words):
   - Paragraph 1 (60-80 words): Position + institution + strongest qualification
   - Paragraph 2 (120-150 words): Core evidence with outcomes
   - Paragraph 3 (100-130 words): Secondary strengths + institutional connection
   - Paragraph 4 (50-70 words): Closing + call to action
6. Scan for and remove banned phrases
7. Verify institution specificity

**Save the cover letter** to `state/outputs/cover_letters/{job_id}_cl.txt`

### Step 4: Generate Screening Answers

**Load the screening-answer-writer skill**:
- Read `skills/screening-answer-writer/SKILL.md`
- Read `skills/screening-answer-writer/answer-archetypes.md`

**Generate screening answers**:

1. Extract all screening questions from job posting
2. Classify each question by archetype (15 types in answer-archetypes.md)
3. For each question:
   - Check for reusable seed in screening_answers.yml
   - Select evidence from resume_facts.yml or star_stories.yml
   - Draft 3-5 sentence response following archetype structure
   - Match length to question type (short: 100-200, medium: 150-250, long: 250-400)
   - Verify every claim against resume_facts.yml
   - Document source attribution
4. Scan for banned phrases

**Save screening answers** as JSON to `state/outputs/screening/{job_id}_screening.json`:

```json
{
  "job_id": "uuid",
  "questions": [
    {
      "question_id": "q1",
      "question_text": "Describe your advising philosophy...",
      "archetype": "advising_philosophy",
      "answer": "My advising philosophy combines structured...",
      "word_count": 180,
      "sources": ["resume_facts.yml:seu_advising", "screening_answers.yml:advising_seed"]
    }
  ],
  "created_at": "2026-03-28T10:30:00Z"
}
```

### Step 5: Create Packet Manifest

Create a packet manifest at `state/jobs/packets/{job_id}_packet.json`:

```json
{
  "job_id": "uuid",
  "created_at": "2026-03-28T10:30:00Z",
  "route_family": "ats_browser",
  "files": [
    {
      "type": "resume",
      "path": "state/outputs/resumes/{job_id}_resume.txt",
      "word_count": 850,
      "status": "generated"
    },
    {
      "type": "cover_letter",
      "path": "state/outputs/cover_letters/{job_id}_cl.txt",
      "word_count": 380,
      "status": "generated"
    },
    {
      "type": "screening_answers",
      "path": "state/outputs/screening/{job_id}_screening.json",
      "answer_count": 5,
      "status": "generated"
    }
  ],
  "review": {
    "verdict": null,
    "review_path": null
  }
}
```

### Step 6: Update Job Record and Queue

**Update the job record**:
- Set `packet` field with file paths
- Set `state` to "packet_prepared"

**Move job to review queue** using framework script:
```bash
bun run scripts/queue-advance.ts {job_id} packet_prepared review_queue
```

### Step 7: Display Summary

Show the user what was created:

```markdown
# Materials Generated for [Job Title] at [Institution]

## Files Created
✓ Resume: `state/outputs/resumes/{job_id}_resume.txt` (850 words)
✓ Cover Letter: `state/outputs/cover_letters/{job_id}_cl.txt` (380 words)
✓ Screening Answers: `state/outputs/screening/{job_id}_screening.json` (5 answers)

## Packet Summary
- Lane: [lane]
- Fit Score: [score]
- Route: [route_family]

## Next Step
Run `/review {job_id}` for quality audit before submission.
```

### Step 8: Log to Notepad

Add to working notepad:
```
"Generated materials for {job_id} ([Job Title]): resume, cover letter, X screening answers"
```

## Quality Checks

Before completing, verify:
- [ ] All materials fact-checked against resume_facts.yml
- [ ] No banned phrases in any materials
- [ ] Resume uses lane-specific reordering
- [ ] Cover letter is institution-specific
- [ ] Screening answers include source attribution
- [ ] Packet manifest created
- [ ] Job moved to review queue

## Error Handling

If generation fails:
- Document the error clearly
- Save partial materials if any were created
- Explain what needs to be fixed to retry
- Don't leave the job in an ambiguous state
