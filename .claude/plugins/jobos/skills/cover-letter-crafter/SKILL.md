---
name: cover-letter-crafter
description: Write a strong, professional cover letter for a higher education job application. Sounds like a real person, not AI.
triggers:
  - "write cover letter"
  - "draft cover letter"
  - "create cover letter"
  - "prepare cover letter"
  - "cover letter for this job"
  - "letter of application"
  - "application letter"
references:
  - style-rules.md
author: JobOS-CC
version: 1.0.0
---

# Cover Letter Crafter Skill

**Purpose**: Generate strong, credible cover letters for higher-education job applications that sound like a real professional wrote them, not AI.

**What This Skill Does**

This skill helps you write cover letters that:
- Open with a clear statement of interest and strongest matching qualification
- Present 2-3 specific experiences directly addressing the job's top requirements
- Connect the candidate's background to the institution's mission and context
- Close with a clear call to action
- Avoid banned phrases and AI-sounding patterns
- Match the tone and formality level of higher education

**Core Principles**

1. **Evidence over adjectives** — "Directed a first-year program serving 2,000+ students" beats "I'm a passionate educator"
2. **Specificity over generality** — Named institutions, concrete outcomes, real responsibilities
3. **Professional warmth** — Formal but not stiff, warm but not casual
4. **Institution specificity** — Each letter is unique to the institution, not a template

**Structure: 4 Paragraphs (350-450 words)**

**Paragraph 1: Opening (60-80 words)**
- State the position and institution by name
- Lead with your strongest matching qualification
- Optionally reference the institution's mission or a recent initiative

**Paragraph 2: Core Evidence (120-150 words)**
- Present 2-3 specific experiences directly addressing top requirements
- Use concrete outcomes with numbers where possible
- Connect past achievements to what you'd bring to this role

**Paragraph 3: Broader Value (100-130 words)**
- Address secondary requirements or preferred qualifications
- Highlight transferable skills or complementary experience
- Connect to the institution's specific context (mission, values, initiatives)

**Paragraph 4: Closing (50-70 words)**
- Summarize your key areas of contribution
- Reference enclosed materials
- Express eagerness to discuss further

**Tone: Formal-Warm Institutional**

- Professional but not stiff
- Warm but not casual
- First person, active voice throughout
- Vary sentence length naturally
- Sound like a real higher education professional, not AI
- Match the institution's formality level (research university = more formal; community college = more accessible)

**Banned Phrases (NEVER Use)**

- "Passionate about" / "I am passionate"
- "Synergy" / "synergistic"
- "Think outside the box"
- "Team player" / "Self-starter"
- "Detail-oriented" / "Fast-paced environment"
- "Proven track record" (unless followed by specific evidence)
- "World-class" / "best-in-class" / "unique perspective"
- "I am committed to excellence"
- "My diverse background allows me to"
- "I bring a unique perspective"
- "I believe that every student deserves"

**Lane-Specific Openings**

Different lanes lead with different strengths:

- **academic_admin**: Lead with program management scale and institutional coordination
- **student_success**: Lead with advising outcomes and student success metrics
- **curriculum_faculty_dev**: Lead with curriculum design and faculty training impact
- **policy_governance**: Lead with assessment framework and quality improvement
- **education_program_mgmt**: Lead with community partnership or program coordination
- **teaching**: Lead with cross-institutional teaching and diverse student engagement

**Institution Research Integration**

When the institution's mission, values, or recent initiatives are known (from job posting or web research):
- Reference them naturally in paragraph 1 or 3
- Connect candidate's experience to the institution's specific goals
- Use the institution's language where it honestly applies

Example: "I am particularly drawn to TMU's commitment to community-engaged learning, which aligns with my experience supervising practicum students through the Pathways to Education–York University partnership."

**Writing Process**

1. **Read the job posting** — Extract top 3-5 requirements and institutional language
2. **Check the lane** — Confirm which lane this job belongs to
3. **Research the institution** — If mission/values are in the posting or available online
4. **Select evidence** — Choose 2-3 experiences from resume_facts.yml that directly address requirements
5. **Draft paragraph 1** — Position + institution + strongest qualification
6. **Draft paragraph 2** — Core evidence with concrete outcomes
7. **Draft paragraph 3** — Secondary strengths + institutional connection
8. **Draft paragraph 4** — Closing + call to action
9. **Review against banned phrases** — Remove any that slipped in
10. **Read aloud** — Check for natural flow and professional tone

**Output Format**

The cover letter is saved as plain text to:
```
state/outputs/cover_letters/{job_id}_cl.txt
```

**Reference Files**

- `style-rules.md` — Detailed structure templates and banned phrases
- `state/candidate/resume_facts.yml` — Source of all evidence
- `state/candidate/writing_style.md` — Tone preferences
