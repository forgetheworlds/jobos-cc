# Setup Interview Blueprint

**Detailed guide for each phase of the setup conversation.**

---

## How to Use This Blueprint

For each phase, you'll find:
- **What we're learning** — The purpose of this phase
- **Questions to ask** — Suggested questions (conversational, not interrogating)
- **Example answers** — Show the user what good answers look like
- **File we write to** — Where this information gets saved
- **Validation rules** — What must be present before saving
- **Defaults if skipped** — What we use if user says "skip"

---

## Phase 1: Identity & Contact

**What we're learning:** Basic information — who you are and how to reach you.

### Questions to Ask
- "What's your full name? (This will appear on your resume and cover letters.)"
- "What's your email address? (Use an email you check regularly and that looks professional — like your name or initials.)"
- "What's your phone number? (Include area code. This won't be shared without your approval.)"
- "What city and state do you live in? (We use this to match jobs in your area. Remote-only searching is also an option.)"
- "What's your current job title? (If you're not currently employed, that's fine — just say 'seeking opportunities' or similar.)"
- "What's your highest earned degree? (For example: PhD, EdD, Master's, Bachelor's)"

### Example Answers
- Full name: "Dr. Mohamed Sambul"
- Email: "mohamed.sambul@gmail.com"
- Phone: "(555) 123-4567"
- Location: "Boston, Massachusetts"
- Current role: "Adjunct Faculty & Academic Program Coordinator"
- Highest degree: "Doctor of Education (EdD)"

### File We Write To
`state/candidate/candidate_profile.yml`

### Validation Rules
- Name must have at least a first and last name
- Email must look like an email (contains @ and domain)
- Phone must have 10+ digits
- Location must have city and state (or country)
- At least one field must be filled out

### Defaults If Skipped
- Name: "[Your Name]"
- Email: "[your.email@example.com]"
- Phone: "[(555) 000-0000]"
- Location: "[City, State]"
- Current role: "Higher Education Professional"
- Highest degree: "Master's Degree"

---

## Phase 2: Professional Narrative

**What we're learning:** Your story — how you describe yourself and your career journey.

### Questions to Ask
- "Let's create your elevator pitch — a 2-3 sentence summary of who you are professionally. Think of this as what you'd say to someone who asks 'So, what do you do?'"
- "Now let's capture your career story in a bit more detail. What's the arc of your career? How did you get to where you are now? (A paragraph is fine — we're not writing a memoir here!)"

### Example Answers
- Elevator pitch: "I'm a higher education leader with 20+ years of experience in academic program coordination, student success initiatives, and faculty development. I specialize in creating bridging programs that help first-year students transition successfully to college life. My work focuses on making higher education more accessible and supportive for all students."
- Career story: "I started my career in multicultural education, which gave me a deep appreciation for the diverse backgrounds students bring to campus. Over the years, I've moved into roles focused on academic program coordination and first-year experience — areas where I could make a direct impact on student retention. I've led curriculum development efforts, coordinated practicum placements, and trained faculty on inclusive teaching practices. Throughout my career, I've been drawn to roles that sit at the intersection of student support, academic quality, and community engagement."

### File We Write To
`state/candidate/candidate_profile.yml`

### Validation Rules
- Elevator pitch must be 1-4 sentences
- Career story must be at least 2 sentences (can be short)

### Defaults If Skipped
- Elevator pitch: "Experienced higher education professional with a focus on student success and academic program development."
- Career story: "A career dedicated to supporting students and strengthening academic programs in higher education."

---

## Phase 3: Experience Inventory

**What we're learning:** The raw material for resumes and cover letters — your degrees, jobs, accomplishments, skills, certifications.

### Approach
This is a longer phase. Break it into sections and check in frequently. Offer to take breaks.

### Questions to Ask

#### Education
- "Let's start with your education. What degrees do you hold? (For each one, I'll need: degree name, field of study, institution, and graduation year.)"
- "Any significant academic achievements? (Honors, thesis title, publications, presentations...)"

#### Work Experience
- "Now let's go through your professional experience. I'll capture each role with: job title, employer, dates, and a few bullet points about what you did and accomplished."
- "For each role, think about: What were you responsible for? What did you improve or accomplish? Any metrics or numbers you can share?"

#### Accomplishments
- "What are you most proud of in your career? (Think: programs you launched, improvements you made, recognition you received.)"
- "Any specific outcomes with numbers? (For example: 'increased retention by 15%', 'trained 50+ faculty members', 'coordinated 200+ student placements')"

#### Skills
- "What are your core professional skills? (Think about both technical skills — like assessment tools or learning management systems — and soft skills — like facilitation or conflict resolution.)"
- "Any specialized expertise? (Curriculum design, accreditation processes, grant writing...)"

#### Certifications & Training
- "Any certifications, licenses, or specialized training? (Include the year if you remember.)"

#### Languages
- "What languages do you speak? (Include your proficiency level — fluent, conversational, basic.)"

### Example Answers

#### Education
```yaml
- degree: "Doctor of Education (EdD)"
  field: "Educational Leadership"
  institution: "Northeastern University"
  year: 2015
  achievements: "Dissertation on first-year transition programs; graduated with distinction"

- degree: "Master of Education"
  field: "Curriculum and Instruction"
  institution: "Boston University"
  year: 2008
```

#### Work Experience (one example)
```yaml
- title: "Academic Program Coordinator"
  employer: "Metropolitan Community College"
  dates: "2018 - Present"
  accomplishments:
    - "Coordinate first-year experience program serving 500+ students annually"
    - "Launched peer mentoring initiative that improved fall-to-spring retention by 12%"
    - "Train and supervise 15+ student leaders and peer mentors each year"
    - "Collaborate with faculty to integrate success strategies into introductory courses"
```

#### Skills
```yaml
core_skills:
  - "Academic program coordination and management"
  - "Curriculum development and assessment"
  - "Faculty training and development"
  - "Student advising and mentoring"
  - "First-year experience program design"
  - "Community partnership development"
  - "Practicum supervision"

technical_skills:
  - "Learning management systems (Canvas, Blackboard)"
  - "Student information systems"
  - "Assessment and evaluation tools"
  - "Microsoft Office Suite"
  - "Zoom and virtual meeting platforms"
```

#### Languages
```yaml
- language: "English"
  proficiency: "Native/Bilingual"
- language: "French"
  proficiency: "Conversational"
- language: "Arabic"
  proficiency: "Basic"
```

### File We Write To
`state/candidate/resume_facts.yml`

### Validation Rules
- At least one degree listed OR explanation of why not (e.g., "Currently completing EdD")
- At least one work experience OR explanation (e.g., "New to higher ed — transitioning from K-12")
- At least 5 skills total
- Accomplishments encouraged but not required (can be filled later)

### Defaults If Skipped
- Empty template file with placeholder examples
- User prompted to add their information before running `/discover`

---

## Phase 4: Target Roles (8-Lane Taxonomy)

**What we're learning:** Which types of academic jobs interest you most.

### Pre-Phase Context
Explain the 8 academic lanes in plain terms. Each one represents a type of higher education role.

### Questions to Ask
- "Here are 8 types of higher ed jobs. Which ones interest you? You can pick as many or as few as you like."
- "For each lane you selected, how interested are you? (Top priority, Interested, Maybe)"
- "Any specific job titles within those lanes? (For example: 'Program Coordinator', 'Director of First-Year Experience', 'Academic Advisor')"

### The 8 Lanes (Plain Language)

1. **Academic Administration** — Department or program management roles. Example: Program Director, Department Chair, Academic Coordinator.
2. **Student Success** — Roles focused on retention, advising, first-year experience, student support programs.
3. **Advising & Support** — Academic advising, career counseling, mentoring, coaching roles.
4. **Curriculum & Faculty Development** — Curriculum design, faculty training, instructional development, teaching & learning centers.
5. **Policy & Governance** — Institutional policy, accreditation, governance, compliance, assessment.
6. **Education Program Management** — Program coordination, community partnerships, practicum supervision, experiential learning.
7. **Teaching** — Teaching positions (adjunct, lecturer, clinical faculty, instructor).
8. **Reject Lane** — Roles to avoid (K-12, corporate training, sales-heavy roles).

### Example Answers
```yaml
lanes:
  academic_admin:
    priority: "Top priority"
    notes: "Program coordination, department management"

  student_success:
    priority: "Top priority"
    notes: "First-year experience, retention programs, transition initiatives"

  advising_support:
    priority: "Interested"
    notes: "Academic advising, mentoring roles"

  curriculum_faculty_dev:
    priority: "Interested"
    notes: "Curriculum design, faculty training"

  education_program_mgmt:
    priority: "Maybe"
    notes: "If it involves practicum coordination or community partnerships"

  teaching:
    priority: "Maybe"
    notes: "Adjunct teaching in addition to administrative role"

  policy_governance:
    priority: "Not interested"
    notes: ""

  reject:
    roles_to_skip:
      - "K-12 education"
      - "Corporate training"
      - "Sales-heavy positions"
      - "For-profit education"
```

### File We Write To
`state/candidate/target_roles.yml`

### Validation Rules
- At least 1 lane must be marked "Top priority" or "Interested"
- Cannot mark all lanes as "Not interested" (need some targets!)
- Reject lane must have at least 1 type of role to avoid

### Defaults If Skipped
- All lanes set to "Maybe" except Reject
- User prompted to refine before `/discover`

---

## Phase 5: Constraints

**What we're learning:** What jobs to avoid — both hard exclusions and soft preferences.

### Questions to Ask
- "Are there any types of jobs you definitely do NOT want to apply to? (These are hard exclusions — we'll never apply to them.)"
- "Are there any types of jobs you'd only consider if they're a really great fit? (These are soft exclusions — we'll be cautious but not rule them out entirely.)"

### Example Hard Exclusions
- K-12 teaching or administration
- Corporate training roles
- Sales-heavy positions with "education consultant" titles
- For-profit institutions
- Roles requiring significant travel
- Roles with evening/weekend requirements

### Example Soft Exclusions
- Purely fundraising roles (unless focused on student scholarships)
- Research administration (unless involves student programs)
- Online-only institutions (prefer traditional campuses)

### File We Write To
`state/candidate/constraints.yml`

### Validation Rules
- Hard exclusions can be empty if user is genuinely open
- Soft exclusions are optional
- At least one category must have content (hard or soft)

### Defaults If Skipped
- Hard exclusions: K-12, corporate, for-profit
- Soft exclusions: empty

---

## Phase 6: Search Preferences

**What we're learning:** Where to look for jobs, what locations to consider, what keywords to use.

### Questions to Ask

#### Sources
- "Where should we search for jobs? (Options: LinkedIn, Indeed, Google Jobs, institutional websites directly, professional associations)"
- "Any preference among these?"

#### Locations
- "What locations are you considering? (City/state, or 'open to relocation', or 'remote-only')"
- "Any locations you definitely won't consider?"

#### Search Terms
- "What keywords describe the roles you're seeking? (For example: 'academic program coordinator', 'student success', 'first-year experience', 'curriculum development')"
- "Any keywords to avoid? (For example: if you keep seeing 'sales consultant' roles that aren't actually what you want)"

#### Remote Preference
- "Are you open to fully remote positions? Hybrid? On-campus only?"

### Example Answers
```yaml
sources:
  - source: "LinkedIn"
    priority: "High"
  - source: "Indeed"
    priority: "Medium"
  - source: "HigherEdJobs"
    priority: "High"
  - source: "Institutional websites"
    priority: "Medium"

locations:
  preferred:
    - "Boston, MA"
    - "Cambridge, MA"
    - "Remote"
  open_to_relocation: true
  relocation_note: "Open to relocation for compelling opportunities"

keywords:
  primary:
    - "academic program coordinator"
    - "student success"
    - "first-year experience"
    - "curriculum development"
    - "faculty development"
    "program director"
  avoid:
    - "sales consultant"
    - "education specialist" (usually K-12)
    - "training specialist" (often corporate)

remote_preference: "Hybrid or remote preferred, on-campus for right role"
```

### File We Write To
`state/candidate/search_preferences.yml`

### Validation Rules
- At least 1 source must be selected
- At least 1 location OR "open to relocation" must be true
- At least 3 primary keywords

### Defaults If Skipped
- Sources: LinkedIn, Indeed, HigherEdJobs
- Location: User's current city + remote
- Keywords: "academic program coordinator", "student success", "higher education"

---

## Phase 7: Route Policy

**What we're learning:** Your comfort level with different ways of applying to jobs.

### Context (Explain in Plain Terms)
Jobs have different application methods:
- **Browser-based forms** — You fill out forms on a website (often tedious)
- **Email applications** — You send materials via email
- **Redirects** — "Apply" button takes you to another site
- **Document uploads** — Just upload resume and cover letter
- **Manual applications** — Require special handling (mail, phone, etc.)

JobOS can help with some of these, but needs to know your comfort level.

### Questions to Ask
- "Is it okay for JobOS to fill out browser forms for you? (It can save time, but some people prefer to do this themselves.)"
- "Do you want to review email applications before they're sent? Or should JobOS prepare drafts for your review?"
- "Is it okay to create accounts on job portals when needed? (Some sites require account creation to apply.)"
- "How do you want to handle external redirects — when 'Apply' takes you to a different website? (Auto-follow and classify, or pause and let you decide?)"

### Example Answers
```yaml
browser_forms:
  comfort_level: "Comfortable with review"
  notes: "Auto-fill is fine, but I want to review before submitting"

email_applications:
  comfort_level: "Draft only, I review and send"
  notes: "Prepare the email and show me before anything goes out"

account_creation:
  comfort_level: "Yes, create accounts as needed"
  notes: "Use my job search email"

external_redirects:
  comfort_level: "Auto-follow and classify"
  notes: "But flag anything that looks suspicious or very different from original posting"

document_upload:
  comfort_level: "Fully comfortable"
  notes: "This is the easiest route — no concerns"

manual_routes:
  comfort_level: "Prepare brief, I handle manually"
  notes: "Just tell me what to do"
```

### File We Write To
`state/candidate/route_policy.yml`

### Validation Rules
- Each route type must have a comfort level specified
- All 6 route types must be addressed

### Defaults If Skipped
- Browser forms: "Draft only, I review"
- Email: "Draft only, I review"
- Account creation: "Ask me first"
- Redirects: "Auto-follow and classify"
- Document upload: "Fully comfortable"
- Manual: "Prepare brief, I handle"

---

## Phase 8: Writing Style

**What we're learning:** How you want your written materials (resumes, cover letters, emails) to sound.

### Questions to Ask
- "Let's talk about tone. How formal or conversational do you want your materials to be? (Options: very formal, moderately formal, professional but warm, conversational)"
- "Are there phrases or buzzwords you definitely don't want used? (For example: 'passionate', 'game-changer', 'synergy')"
- "What values or qualities do you want to emphasize? (For example: student-centered, collaborative, data-informed, equity-focused)"
- "How do you feel about first-person statements like 'I led' versus passive statements like 'Led'? (Do you prefer active voice or is either fine?)"
- "Any preferences about paragraph length or sentence structure? (Concise and punchy, or more detailed and explanatory?)"

### Example Answers
```markdown
# Tone
Professional but warm — not stiff or overly formal, but not casual. Sound like a competent, approachable colleague.

# Phrases to Avoid
- "Passionate about" (overused, vague)
- "Game-changer" or "disruptor" (too buzzwordy)
- "Synergy" or "leverage" (corporate speak)
- "Detail-oriented" (show it, don't say it)
- Any claims that sound exaggerated or too good to be true

# Values to Emphasize
- Student-centered approach
- Collaboration and partnership
- Data-informed decision making
- Equity and inclusion
- Practical solutions over theory
- Building bridges between stakeholders

# Voice Preference
Active voice preferred — "I led" rather than "Led" or "Responsible for leading". Sound capable without being boastful.

# Paragraph Style
Clear topic sentences, one main idea per paragraph. Avoid walls of text. Use bullet points for accomplishments.
```

### File We Write To
`state/candidate/writing_style.md`

### Validation Rules
- Tone must be specified
- At least 3 phrases to avoid OR "none — I'm open"
- At least 3 values to emphasize
- Voice preference must be specified

### Defaults If Skipped
- Tone: "Professional but warm"
- Phrases to avoid: Generic buzzwords list
- Values: "Student-centered, collaborative, data-informed"
- Voice: "Active voice preferred"
- Paragraph style: "Clear, concise, one main idea per paragraph"

---

## Phase 9: Behavioral Profile

**What we're learning:** Your strengths, leadership style, conflict resolution approach, communication preferences.

### Questions to Ask
- "What are your top 3-5 professional strengths? (Think about what colleagues would say you're really good at.)"
- "How would you describe your leadership style? (Even if you're not in a formal leadership role, you have a style of working with others.)"
- "When conflicts arise — whether with colleagues, students, or other stakeholders — how do you typically approach resolving them?"
- "How do you prefer to communicate? (Email, in-person, Zoom? Quick updates or detailed discussions?)"
- "What's your approach to feedback — both giving and receiving?"

### Example Answers
```markdown
# Top Strengths
- Building bridges between academic departments and student services
- Designing programs that address practical student needs
- Collaborating with diverse stakeholders (faculty, staff, students, community partners)
- Translating complex initiatives into actionable steps
- Mentoring and developing others

# Leadership Style
Collaborative and facilitative. I believe in bringing people together, listening to different perspectives, and finding shared goals. I lead by building consensus and ensuring everyone feels heard. I'm comfortable making decisions when needed, but I prefer inclusive processes.

# Conflict Resolution
I approach conflicts by:
1. Listening first to understand all perspectives
2. Identifying shared interests or common goals
3. Focusing on the issue, not the person
4. Seeking solutions that address underlying concerns
5. Following up to ensure the resolution is working

# Communication Preferences
- In-person or video for important or sensitive conversations
- Email for updates, confirmations, and non-urgent matters
- I appreciate direct, honest communication delivered with respect
- I give context and background — I like to understand the 'why'

# Feedback Approach
- **Receiving feedback:** I listen openly, ask clarifying questions, and reflect on how to improve. I don't get defensive.
- **Giving feedback:** I'm specific, timely, and focus on behavior not personality. I try to balance positives with areas for growth.
```

### File We Write To
`state/candidate/behavioral_profile.md`

### Validation Rules
- At least 3 strengths
- Leadership style must be described (even briefly)
- Conflict resolution approach must be described
- Communication preferences must be stated
- Feedback approach must be stated

### Defaults If Skipped
- Strengths: "Collaboration, student-centered approach, program development"
- Leadership: "Collaborative and inclusive"
- Conflict: "Listen first, find common ground, focus on solutions"
- Communication: "In-person for important matters, email for updates"
- Feedback: "Give and receive feedback openly and constructively"

---

## Phase 10: Application Defaults

**What we're learning:** Email signature, form-fill preferences, how much autonomy to give JobOS.

### Questions to Ask

#### Email Signature
- "What should your email signature look like? (Include your name, preferred pronouns if any, contact info, and any links like LinkedIn or a portfolio.)"

#### Application Defaults
- "What salary range should we use if asked? (You can say ' negotiable' if you prefer to discuss later.)"
- "When's your earliest start date? (For example: 'immediately', '2 weeks notice', 'flexible')"
- "Are you legally authorized to work in the US? (This is a common screening question.)"
- "Do you require visa sponsorship now or in the future?"
- "Any accommodations or special considerations we should be aware of?"

#### Autonomy Levels
- "Should JobOS automatically prepare application materials when you shortlist a job? Or wait for you to say '/prepare'?"
- "Do you want to review every cover letter and resume before submission? Or is a quick scan okay?"
- "How many applications per session feels comfortable? (Don't want to overwhelm you!)"

### Example Answers

#### Email Signature
```yaml
signature: |
  Dr. Mohamed Sambul, EdD
  Higher Education Leader | Student Success | Program Development

  Email: mohamed.sambul@gmail.com
  Phone: (555) 123-4567
  LinkedIn: linkedin.com/in/mohamedsambul

  (he/him)
```

#### Application Defaults
```yaml
salary_expectation: "Negotiable based on role and responsibilities"
earliest_start_date: "Flexible — 2-4 weeks notice"
work_authorization: "Yes, legally authorized to work in US"
visa_sponsorship: "No sponsorship required"
requires_accommodation: false
accommodation_notes: null
```

#### Autonomy Levels
```yaml
auto_prepare_materials: false
# "Wait for me to run /prepare"

review_level: "full"
# "I want to review everything before submission"
# Options: full (review all), quick_scan (skim only), trust (skip review)

max_applications_per_session: 3
# "Don't submit more than 3 applications in one session"

comfortable_submission_batching: false
# "Submit each application individually, not in batches"
```

### Files We Write To
- `state/candidate/email_defaults.yml`
- `state/candidate/application_defaults.yml`
- `state/candidate/execution_policy.yml`

### Validation Rules
- Email signature must include name and at least one contact method
- Work authorization must be answered
- Auto-prepare must be true/false
- Review level must be specified
- Max applications must be a number between 1-10

### Defaults If Skipped

#### Email Signature
```
[Your Name]
[Email] | [Phone]
```

#### Application Defaults
- Salary: "Negotiable"
- Start date: "Flexible"
- Work authorization: "Yes, authorized to work in US"
- Visa sponsorship: "No sponsorship required"

#### Autonomy
- Auto-prepare: false
- Review level: "full"
- Max applications: 3
- Batching: false

---

## Phase Completion

After all 10 phases are complete:

1. **Summarize what was created**
   - List all 14 files that were generated
   - Confirm where they're located (`state/candidate/`)

2. **Explain what's next**
   - "Your profile is ready! Next steps:"
   - "1. Review your files to make sure everything looks right"
   - "2. Run `/discover` to start finding jobs"
   - "3. Run `/shortlist` to score and rank jobs"
   - "4. Run `/prepare` to create tailored materials"

3. **Offer to make updates**
   - "You can update any of these files anytime. Just open the file and edit, or run `/setup` again to go through specific phases."

4. **Celebrate**
   - "Great work! You've built a comprehensive profile that will help JobOS find the right opportunities for you."

---

## Handling "I Want to Update My Profile"

When a user runs `/setup` and already has a profile:

1. **Detect existing files**
   - Check which files exist in `state/candidate/`

2. **Ask what they want to update**
   - "I see you already have a profile. What would you like to update?"
   - Show menu of phases
   - Let them select specific phases or run "all"

3. **For selected phases**
   - Show current content
   - Ask what they want to change
   - Update file with new content
   - Confirm before saving

4. **Skip unselected phases**
   - Leave existing files untouched

---

## Tips for Warm, Non-Technical Conversation

- **Use plain language** — Avoid jargon. Say "where should we look for jobs?" not "what are your preferred data sources?"
- **Be encouraging** — "Great question!" "That's really helpful context." "I'm getting a good picture of..."
- **Check in frequently** — "Does that make sense?" "Want to add anything else?" "Ready to move on?"
- **Offer examples** — Show what good answers look like. It reduces anxiety about "saying it wrong."
- **Validate their choices** — "That's a smart approach." "That will help us target the right roles."
- **No pressure** — "If you're not sure, we can skip and come back later."
- **Be transparent** — Explain why you're asking each question. "I'm asking because this helps us find roles that match your expertise."
- **Progress updates** — "We're 6 out of 10 phases done. About halfway there!"
- **Celebrate completion** — Acknowledge that they've done something meaningful.

---

## Error Handling

### If User Gives Unclear Answers
- "I want to make sure I capture this correctly. Can you give me an example?"
- "Let me rephrase what I heard — [summary]. Did I get that right?"

### If User Gets Overwhelmed
- "We're covering a lot of ground. It's okay to take a break. Your work so far is saved."
- "Want to skip this phase and come back to it later?"
- "We can keep it simple — just give me the basics and we can add detail later."

### If User Says "I Don't Know"
- "That's okay! We can use a default and you can update it later when you've had time to think about it."
- "Let me suggest something common and you can tell me if that sounds about right."

### If Validation Fails
- Explain clearly what's missing
- "Before we save this, I need just one more piece: [what's needed]"
- "Almost there! Just need [specific field] to complete this phase."
