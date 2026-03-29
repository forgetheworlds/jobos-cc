---
name: higher-ed-resume-tailor
description: Tailor your resume for a specific job by reorganizing and emphasizing your experience. Never invents facts — only reorganizes what you already have.
triggers:
  - "tailor my resume"
  - "customize resume for this job"
  - "adapt my resume"
  - "prepare resume for application"
  - "resume for this position"
  - "adjust my resume"
  - "rewrite my resume for this job"
references:
  - tailoring-rules.md
author: JobOS-CC
version: 1.0.0
---

# Higher Education Resume Tailoring Skill

**Purpose**: Reorganize and emphasize existing resume content to align with specific job opportunities, without ever fabricating or inflating credentials.

**What This Skill Does**

This skill helps you tailor a resume for a specific higher-education job posting by:
1. Reordering experience sections to highlight the most relevant roles
2. Expanding bullet points that directly address the job's requirements
3. Adjusting the professional summary to match the role's lane
4. Emphasizing skills most relevant to this specific opportunity
5. Compressing less relevant experience (while keeping it truthful)

**Core Principle: Reorganize Truth, Never Invent**

Tailoring means changing **emphasis and ordering**, not **content or facts**. You:
- Reorder bullet points within experience entries
- Expand some bullets, compress others
- Move relevant experience sections higher
- Adjust section headers for clarity
- Match terminology where it honestly applies

You **never**:
- Add skills not in resume_facts.yml
- Inflate titles or responsibilities
- Alter dates, institutions, or outcomes
- Fabricate achievements or metrics
- Remove relevant experience just to shorten the resume

**When to Use This Skill**

Use this skill whenever you need to prepare a tailored resume for a specific job posting. The tailoring is guided by:
- The job's assigned lane (from `academic-fit-scorer`)
- The job's top requirements (from the posting)
- The candidate's actual experience (from `resume_facts.yml`)

**Lane-Specific Tailoring**

Different role lanes require different emphasis. See `tailoring-rules.md` for complete lane-specific guidance on:
- Which experience sections to put first
- Which skills to highlight
- Professional summary templates
- Bullet point expansion strategies

For example:
- **academic_admin**: Lead with program management experience (SEU First Common Year), then faculty coordination
- **student_success**: Lead with advising outcomes, retention programming, student engagement
- **curriculum_faculty_dev**: Lead with curriculum development, program assessment, faculty training

**The Tailoring Process**

1. **Read the job posting** — Identify top 3-5 requirements
2. **Check the lane** — Confirm the job's assigned lane from fit scoring
3. **Review candidate facts** — Read relevant sections of resume_facts.yml
4. **Reorder experience** — Move most relevant sections to the top
5. **Expand relevant bullets** — Add detail to experience that directly addresses job requirements
6. **Compress less relevant bullets** — Condense (but keep) experience that's less central
7. **Adjust summary** — Write a 2-3 sentence summary tailored to the lane
8. **Reorder skills** — Put job-relevant skills first
9. **Fact-check** — Verify every claim against resume_facts.yml before finalizing

**Bullet Point Guidelines**

- Start with strong action verbs: Directed, Led, Designed, Coordinated, Implemented, Facilitated, Mentored, Evaluated
- Include quantified outcomes where available: "2,000+ students annually", "15% improvement", "reduced attrition"
- Keep each bullet to 1-2 lines
- Most relevant section: 5-7 bullets with specific outcomes
- Secondary sections: 3-4 bullets, more condensed
- Least relevant: 2-3 bullets, high-level summary

**Professional Summary Templates**

The summary (2-3 sentences at the top) should match the lane:

- **academic_admin**: "Experienced higher education leader with [X] years directing academic programs, coordinating faculty across departments, and improving student outcomes at scale. Led first-year program serving 2,000+ students annually with demonstrated improvement in completion rates."

- **student_success**: "Student-centered higher education professional with [X] years advancing student success through strategic advising, retention programming, and inclusive student engagement across diverse institutional settings."

- **curriculum_faculty_dev**: "Curriculum and faculty development specialist with [X] years designing program assessments, facilitating faculty training, and improving instructional quality in higher education settings."

Adapt these templates to the job's specific language, but keep claims grounded in real experience.

**Fact-Check Before Finalizing**

Before completing the resume, verify every bullet point:
- [ ] Does this experience exist in resume_facts.yml?
- [ ] Are the dates, titles, and institutions correct?
- [ ] Are the outcomes stated actually supported by the facts?
- [ ] Is any terminology alignment honest (the candidate actually did this thing)?

**Output Format**

The tailored resume is saved as plain text to:
```
state/outputs/resumes/{job_id}_resume.txt
```

**Reference Files**

- `tailoring-rules.md` — Lane-specific reordering priorities and templates
- `state/candidate/resume_facts.yml` — Source of truth for all experience
- `state/candidate/writing_style.md` — Tone and formatting preferences
