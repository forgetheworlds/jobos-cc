---
name: screening-answer-writer
description: Write answers to job application screening questions using your real experience. Never makes up answers — only draws from your background.
triggers:
  - "answer screening questions"
  - "write screening responses"
  - "respond to application questions"
  - "answer job questions"
  - "screening question help"
  - "how do I answer this question"
references:
  - answer-archetypes.md
author: JobOS-CC
version: 1.0.0
---

# Screening Answer Writer Skill

**Purpose**: Draft factual, evidence-based responses to screening questions for higher-education job applications.

**What This Skill Does**

This skill helps you write strong answers to screening questions like:
- "Describe your approach to student advising"
- "How do you contribute to diversity, equity, and inclusion?"
- "Tell us about a time you led a complex project"
- "What is your philosophy of curriculum development?"

Each answer is:
- Grounded in real experience from the candidate's background
- Specific and evidence-based, not generic philosophy
- Sized appropriately for the question type
- Free of banned phrases and AI-sounding patterns

**Core Principles**

1. **Evidence over philosophy** — Real examples beat abstract beliefs
2. **Specificity over generality** — Named programs, concrete outcomes
3. **Honesty over invention** — Never claim experience the candidate doesn't have
4. **Brevity over rambling** — Respect word limits, get to the point

**Answer Structure (3-5 sentences)**

Every screening answer follows this structure:

1. **Direct answer** — Respond to the question's core ask immediately
2. **Specific evidence** — Cite real experience from resume_facts.yml or star_stories.yml
3. **Connection to role** — Link the evidence to what this role requires
4. **Outcome or learning** — What was achieved or learned (if space allows)

**Question Archetypes**

Different question types have different strategies. See `answer-archetypes.md` for detailed guidance on 15 common archetypes:

- **motivation_why_role** — Connect institutional mission to your experience
- **program_coordination** — Reference SEU First Common Year scale (2,000+ students)
- **student_support** — Use specific population examples (first-year, multicultural)
- **advising_philosophy** — Frame as structured + responsive with real examples
- **faculty_collaboration** — Reference designing faculty training at SEU
- **diversity_equity_inclusion** — Use specific examples (multilingual teaching, Community Scholar role)
- **curriculum_assessment** — Reference 15% completion improvement at SEU
- **conflict_resolution** — Frame as structured facilitation with real examples
- **leadership** — Use program management scale, not vague claims
- **first_year_support** — PRIMARY STRENGTH: First Common Year program outcomes
- And 5 more archetypes...

**Length Guidelines**

Match length to question type:
- **Short answer** (text field): 3-4 sentences, 100-200 words
- **Medium answer** (textarea): 4-5 sentences, 150-250 words
- **Long answer** (essay): 5-7 sentences, 250-400 words
- **Diversity/teaching statement**: 400-600 words, structured essay format

**Banned Content**

Never use:
- "I am passionate about"
- "I believe that every student deserves"
- "I bring a unique perspective"
- "I am committed to excellence"
- "My diverse background allows me to"
- Generic philosophy statements without specific evidence
- Any claim not grounded in resume_facts.yml

**Answer Reuse**

When drafting answers:
- Check `state/candidate/screening_answers.yml` for reusable seed answers
- Adapt seeds to the specific question wording
- Update with more recent evidence if available
- Note source attribution in the output

**Writing Process**

1. **Extract the question** — What exactly is being asked?
2. **Classify the archetype** — Which of the 15 patterns does this match?
3. **Select evidence** — Which resume_facts or star_stories best address this?
4. **Check for seeds** — Is there a reusable answer in screening_answers.yml?
5. **Draft the response** — Follow the 3-5 sentence structure
6. **Verify facts** — Cross-reference every claim against resume_facts.yml
7. **Check length** — Adjust to fit the question type
8. **Document sources** — Note which facts/stories were used

**Output Format**

Screening answers are saved as JSON to:
```
state/outputs/screening/{job_id}_screening.json
```

Format:
```json
{
  "job_id": "uuid",
  "questions": [
    {
      "question_id": "q1",
      "question_text": "...",
      "archetype": "student_support",
      "answer": "...",
      "word_count": 180,
      "sources": ["resume_facts.yml:seu_first_common_year", "star_stories.yml:retention_improvement"]
    }
  ],
  "created_at": "2026-03-28T10:30:00Z"
}
```

**Reference Files**

- `answer-archetypes.md` — Detailed guidance for 15 question types
- `state/candidate/screening_answers.yml` — Reusable seed answers
- `state/candidate/resume_facts.yml` — Source of all evidence
- `state/candidate/star_stories.yml` — STAR-formatted story library

**Common Questions**

**Q: What if the question asks about something the candidate hasn't done?**

A: Don't invent it. Either (a) pivot to a related strength with transferable value, or (b) acknowledge the gap honestly and emphasize ability to learn. Credibility beats fake expertise.

**Q: Can I reuse the same answer for multiple applications?**

A: Yes, but adapt it to the specific question wording and institutional context. A generic answer looks like a generic answer.

**Q: How formal should the answers be?**

A: Match the tone of the question. If the question is casual ("Tell us about..."), you can be slightly more conversational. If it's formal ("Describe your philosophy..."), match that formality.
