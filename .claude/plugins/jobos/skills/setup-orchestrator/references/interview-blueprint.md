# JobOS-CC Setup Wizard — Interview Blueprint

Complete interview structure for building candidate profile across 14 data files.

## How This Works

This wizard is smart about existing data. It reads all 14 candidate data files first, shows what is already filled in, and only asks questions about missing or incomplete fields. If you run it multiple times, it preserves what exists and fills new gaps.

## Step 1: Load Existing Data

Before asking anything, read all files under `state/candidate/` and build an internal inventory of what is populated versus empty. The 14 files are:

| # | File | Format | Purpose |
|---|------|--------|---------|
| 1 | `candidate_profile.yml` | YAML | Identity, narrative, education, skills |
| 2 | `resume_facts.yml` | YAML | Experience entries, metrics, skill boundaries |
| 3 | `target_roles.yml` | YAML | Role clusters, lanes, and priorities |
| 4 | `constraints.yml` | YAML | Hard/soft exclusions, compensation floor |
| 5 | `search_preferences.yml` | YAML | Search queries, locations, sites, schedule |
| 6 | `writing_style.md` | Markdown | Tone, register, language rules, banned phrases |
| 7 | `behavioral_profile.md` | Markdown | Strengths, preferences, values, decision-making |
| 8 | `screening_answers.yml` | YAML | Answer seeds for common question archetypes |
| 9 | `star_stories.yml` | YAML | Behavioral interview stories in STAR format |
| 10 | `route_policy.yml` | YAML | Email, browser, approval, and routing rules |
| 11 | `execution_policy.yml` | YAML | Auto-prepare, auto-review, submission rules |
| 12 | `email_defaults.yml` | YAML | Email signature, tone, subject line style |
| 13 | `application_defaults.yml` | YAML | EEO defaults, references, submission policy |
| 14 | `open_questions.md` | Markdown | Remaining gaps tracked across sessions |

For each file, note which top-level keys exist and whether their values are populated or empty/placeholder. Empty strings, `null`, `"To be populated"`, and placeholder brackets count as gaps.

## Step 2: Determine Scope

Parse the `--section` argument if provided. Valid section identifiers:

| Flag | Section | Output File(s) |
|------|---------|----------------|
| `A` or `identity` | Identity and Contact | `candidate_profile.yml` |
| `B` or `narrative` | Professional Narrative | `candidate_profile.yml` |
| `C` or `experience` | Experience Extraction | `resume_facts.yml` |
| `D` or `education` | Education and Credentials | `candidate_profile.yml` |
| `E` or `skills` | Skills and Strengths | `candidate_profile.yml` |
| `F` or `roles` | Target Role Priorities | `target_roles.yml` |
| `G` or `geography` | Geography and Work Arrangement | `constraints.yml`, `search_preferences.yml` |
| `H` or `style` | Writing Style | `writing_style.md` |
| `I` or `behavioral` | Behavioral Assets | `star_stories.yml`, `behavioral_profile.md` |
| `J` or `screening` | Screening Answer Library | `screening_answers.yml` |
| `K` or `search` | Search Strategy | `search_preferences.yml` |
| `L` or `constraints` | Constraints and Red Lines | `constraints.yml`, `application_defaults.yml` |
| `M` or `routing` | Route Policy | `route_policy.yml` |
| `N` or `execution` | Execution Policy | `execution_policy.yml` |
| `O` or `email` | Email Defaults | `email_defaults.yml` |

If no section flag is given, run all sections A through O sequentially.

## Step 3: Opening Message

Begin with one of two messages depending on data state:

**If data files exist with content:**

> "I found your existing profile data. Let me walk through each section and check for gaps. I will only ask about things that are missing or incomplete. Your existing data stays as-is unless you tell me to change it."

**If no data files exist (fresh install):**

> "Welcome to the JobOS-CC setup wizard. I will walk you through 15 sections to build your complete profile. This data drives everything: how jobs are scored, how resumes are tailored, and how cover letters are written. Let us start."

## Step 4: Run Interview Sections

For each active section, follow the pattern: **show what exists, identify gaps, ask only about gaps, then write the file.**

### Section A: Identity and Contact

**Output:** `candidate_profile.yml` under key `identity`

**What this does:** This is the header on every resume and the contact block on every application. Accuracy here is critical because the system uses these fields to fill application forms.

**Fields to collect:**
- `full_name` -- Legal name as it appears on documents
- `preferred_name` -- Name for informal use
- `title_prefix` -- Dr., Mr., Ms., etc.
- `email` -- Primary professional email
- `phone` -- Phone number in international format
- `linkedin_url` -- LinkedIn profile URL
- `location` -- City, Province/State
- `relocation_willingness` -- open, limited, or none
- `work_arrangement_preference` -- on-site, hybrid, remote, flexible
- `work_authorization` -- Work authorization status in target country
- `citizenship` -- Citizenship country

**Gap-only behavior:** If all fields except `linkedin_url` and `citizenship` are populated, say: "Your identity section is mostly complete. I just need your LinkedIn URL and citizenship status." Then ask only for those two.

### Section B: Professional Narrative

**Output:** `candidate_profile.yml` under key `professional_narrative`

**What this does:** This powers the summary at the top of every tailored resume and shapes how cover letters open. It answers "who is this candidate professionally?" in a structured way.

**Fields to collect:**
- `one_sentence` -- A single sentence that captures the professional identity
- `three_strongest_themes` -- The three career themes that appear across roles
- `most_aligned_roles` -- 3-5 role types that best match experience
- `work_to_do_more_of` -- What the candidate wants more of in their next role
- `work_to_avoid` -- What the candidate wants to avoid
- `three_things_to_remember` -- Key facts for the system to keep in mind when tailoring

**Gap-only behavior:** If these fields are populated, present them and ask: "Does this still accurately reflect your professional direction? Anything to add or change?" Do not re-ask unless the user signals a change.

### Section C: Experience Extraction

**Output:** `resume_facts.yml` under keys `experience[]`, `real_metrics[]`, `skills_boundary`, `fabrication_watchlist`

**What this does:** This is the core factual record. Every resume bullet, every cover letter claim, and every screening answer draws from this file. Nothing may be fabricated, so accuracy here is the foundation of the entire system.

**For each experience entry, collect:**
- `title`, `employer`, `dates` (year ranges are fine)
- `type` -- higher_education, education_administration, education_support, or other
- `setting` -- Institution type and location
- `populations_served` -- Who the role served
- `responsibilities` -- 3-5 per role, starting with active verbs
- `achievements` -- Quantified outcomes where possible
- `star_stories` -- IDs of STAR stories that connect to this role

**After all roles are collected, assemble:**
- `real_metrics[]` -- Every number that can be quantified across all roles
- `skills_boundary` -- Categorized skill list grouped by domain
- `fabrication_watchlist` -- Skills and topics the system must NEVER claim (e.g., machine learning, data science, software engineering)

**Gap-only behavior:** If experience entries exist with populated responsibilities and achievements, present a summary table (title, employer, dates, number of bullets). Ask: "Are there any roles missing, or any achievements or numbers you would like to add?" Only prompt for new content.

### Section D: Education and Credentials

**Output:** `candidate_profile.yml` under key `education`

**What this does:** Education appears on resumes and is sometimes asked on application forms. Degrees, year conferred, and languages spoken are all used by the form-filling agent.

**Fields to collect:**
- `degrees[]` -- Each with level, field, institution, year
- `certifications[]` -- Relevant professional certifications
- `languages[]` -- Each with language and proficiency level

**Gap-only behavior:** If degrees are populated but years are missing, ask only about years. If certifications is an empty list, ask whether any certifications should be added.

### Section E: Skills and Strengths

**Output:** `candidate_profile.yml` under key `skills_inventory`

**What this does:** Each skill entry includes a rating and evidence. The scoring agent and resume tailorer use these to match roles and select which skills to emphasize. Without evidence, a skill cannot be claimed.

**Fields to collect per skill:**
- Skill name as key (snake_case)
- `rating` -- strong, moderate, or developing
- `evidence` -- One or two sentences tying the skill to specific experience

**Gap-only behavior:** If skills are populated with ratings and evidence, present the full list. Ask: "Are there skills missing from this inventory, or any ratings that should change?" Do not re-ask about skills that are already well-documented.

### Section F: Target Role Priorities

**Output:** `target_roles.yml` under keys `clusters[]` and `lanes`

**What this does:** This is the job-matching engine. Clusters define groups of related job titles. Lanes define how resumes and cover letters are tailored for each category. Priority 1 clusters are searched first; Priority 3 clusters are searched only if higher-priority searches run dry.

**For each cluster, collect:**
- `id` -- Single letter identifier
- `name` -- Descriptive cluster name
- `priority` -- 1 (apply aggressively), 2 (apply selectively), 3 (apply if strong match)
- `titles[]` -- Specific job titles that belong to this cluster
- `lane` -- Which tailoring lane to use
- `why_strong_fit` -- One sentence explaining alignment

**For each lane, collect:**
- `description` -- What this lane covers
- `resume_emphasis[]` -- What to emphasize on resumes
- `cover_letter_angle` -- How to angle the cover letter

**Standard lanes for higher education:**
- `academic_admin` -- Academic administration, program management
- `student_success` -- Retention, engagement, first-year experience
- `advising_support` -- Academic advising, mentoring
- `curriculum_faculty_dev` -- Curriculum design, faculty training
- `policy_governance` -- Accreditation, compliance, governance
- `education_program_mgmt` -- Education programs outside traditional higher ed
- `teaching` -- Direct instruction roles
- `reject` -- Roles that do not match candidate profile

**Gap-only behavior:** If clusters and lanes exist, present a summary showing cluster name, priority, and number of titles. Ask: "Any clusters to add, remove, or reprioritize?" Confirm priority levels for each cluster.

### Section G: Geography and Work Arrangement

**Output:** `constraints.yml` under `soft_exclusions.geography`; `search_preferences.yml` under `locations[]`

**What this does:** Controls where the system searches for jobs and which locations it will not consider. Also sets remote/hybrid/on-site preferences.

**Fields to collect:**
- `excluded_regions[]` in constraints -- Countries or regions to skip entirely
- `remote_acceptable` -- Whether remote roles should be considered
- `locations[]` in search_preferences -- Each with location name, remote flag, and label
- `relocation_willingness` in candidate_profile -- open, limited, or none

**Gap-only behavior:** If locations are populated and exclusion regions are set, confirm they are current. Ask: "Any changes to your target locations or regions to avoid?"

### Section H: Writing Style

**Output:** `writing_style.md`

**What this does:** Governs every word of generated output. The tone, register, banned phrases, and higher-ed terminology rules here prevent the system from producing corporate-sounding or generic text.

**Structure to confirm or build:**
1. **Tone** -- Formal-warm institutional: confident not boastful, warm not casual
2. **Register** -- Different rules for resume vs. cover letter vs. screening responses
3. **Language rules** -- Must-do and must-not lists including active voice, specificity, no buzzwords
4. **Banned phrases** -- Phrases the system must auto-reject
5. **Higher-ed terminology** -- Correct usage of faculty, academic programs, retention, assessment
6. **Cover letter structure** -- Opening, fit paragraph, mission paragraph, close
7. **Resume conventions** -- Summary length, bullet format, no skills matrix, Dr. prefix

**Gap-only behavior:** If `writing_style.md` is fully populated, present a brief summary and ask: "Any style preferences to adjust? Any phrases you find overused that should be banned?" Only update if the user requests changes.

### Section I: Behavioral Assets

**Output:** `star_stories.yml`, `behavioral_profile.md`

**What this does:** STAR stories feed screening answers and cover letter evidence. The behavioral profile helps the Fit Agent assess culture fit and helps the Cover Letter Crafter align tone.

**For `star_stories.yml`, each story needs:**
- `id` -- snake_case identifier
- `theme` -- One or two word label
- `situation`, `task`, `action`, `result` -- The four STAR components
- `applicable_to[]` -- Lanes or themes this story supports

**For `behavioral_profile.md`, collect:**
- Professional strengths (3-6 items with evidence)
- Work environment preferences (thrives, energized by, drained by)
- Decision-making style
- Communication style
- Professional values
- Ideal role characteristics

**Gap-only behavior:** If stories exist, check for any with placeholder results (e.g., `[To be populated]`). List those and ask the candidate to fill in specific outcomes. If the behavioral profile is complete, ask if anything has changed.

### Section J: Screening Answer Library

**Output:** `screening_answers.yml`

**What this does:** These are answer seeds for common screening questions. When the system encounters a "Why are you interested in this role?" question on an application, it adapts the seed answer for that specific institution and role. Better seeds produce better answers with less revision.

**For each archetype, collect:**
- `pattern` -- The question this answers
- `seed` -- A 3-5 sentence answer the system adapts per application
- `adapt_for[]` -- What variables the system should customize

**Also collect `boolean_answers`** -- yes/no defaults for common qualification questions.

**Gap-only behavior:** If archetypes exist, review each seed for specificity. Flag any that are too generic and ask: "This answer for [pattern] could be stronger with a specific example from your experience. Can you add one?" Also confirm boolean answers are accurate.

### Section K: Search Strategy

**Output:** `search_preferences.yml`

**What this does:** Defines what the system searches for, where it searches, and how often. This directly controls job discovery volume and relevance.

**Fields to collect:**
- `defaults` -- Default location, distance, recency, results per site
- `locations[]` -- Target locations with remote flags
- `queries[]` -- Search queries grouped by tier (1 = search daily, 2 = search daily, 3 = weekly)
- `higher_ed_keywords[]` -- Keywords that signal higher-ed relevance
- `sites[]` -- Which job boards to search
- `institution_preferences` -- Preferred, acceptable, and avoided institution types
- `portal_awareness` -- Known application portals
- `schedule` -- Search frequency and tier rotation

**Gap-only behavior:** If queries and locations are populated, present a summary. Ask: "Any new search terms to add? Any locations to change? Any job boards to add or remove?"

### Section L: Constraints and Red Lines

**Output:** `constraints.yml`, `application_defaults.yml`

**What this does:** This is the safety net. Hard exclusions prevent the system from applying to roles that would waste time or damage credibility. Application defaults set the baseline for how applications are submitted.

**For `constraints.yml`, collect:**
- `hard_exclusions.role_types[]` -- Role patterns to never apply to, with reasons
- `hard_exclusions.sectors[]` -- Industry sectors to skip, with conditions
- `hard_exclusions.red_flag_phrases[]` -- Phrases in job postings that signal a bad fit
- `soft_exclusions.under_leveled[]` -- Roles that may underutilize experience
- `soft_exclusions.licensing_requirements[]` -- Roles requiring credentials not held
- `soft_exclusions.geography` -- Already covered in Section G
- `compensation` -- Minimum salary, currency, negotiation notes

**For `application_defaults.yml`, collect:**
- `eeo_defaults` -- Voluntary self-identification responses
- `work_eligibility` -- Authorization status by country
- `references[]` -- 3 professional references with contact details
- `submission_policy` -- Manual vs. auto, minimum score, review requirements
- `document_preferences` -- Which additional documents to prepare
- `salary_strategy` -- How to handle salary questions
- `availability` -- Start date, notice period, interview format
- `tracking` -- What to log

**Gap-only behavior:** If hard exclusions are populated, present them and ask: "Any role types or sectors to add to this exclusion list?" For application defaults, flag any empty references and confirm EEO and work eligibility settings.

### Section M: Route Policy (NEW)

**Output:** `route_policy.yml`

**What this does:** Controls how jobs flow through the system and when human intervention is required. These settings prevent misrouted applications and ensure appropriate review checkpoints.

**Fields to collect:**
- `email_allowed` -- Whether the system may send emails on candidate's behalf (true/false)
- `auto_browse_redirects` -- Whether browser automation may handle portal redirects automatically (true/false)
- `account_creation_ok` -- Whether the system may create accounts on job portals when needed (true/false)
- `confidence_threshold_manual_confirm` -- Minimum confidence score (0-1) before auto-submitting materials; below this threshold requires manual review (default 0.7)

**Gap-only behavior:** If this file does not exist, explain each setting and recommend defaults. If it exists, confirm current values are still accurate.

### Section N: Execution Policy (NEW)

**Output:** `execution_policy.yml`

**What this does:** Defines what automation is permitted at each stage of the application pipeline. These settings control the balance between efficiency and human oversight.

**Fields to collect:**
- `auto_prepare` -- Whether to automatically generate resumes, cover letters, and screening answers when a job is scored (true/false)
- `auto_review` -- Whether to automatically run quality review on generated materials (true/false)
- `require_approval_for_submit` -- Whether human approval is required before final submission (true/false, strongly recommend true)

**Gap-only behavior:** If this file does not exist, explain each setting and recommend conservative defaults (auto_prepare: false, auto_review: false, require_approval_for_submit: true). If it exists, confirm current values.

### Section O: Email Defaults (NEW)

**Output:** `email_defaults.yml`

**What this does:** Configures email behavior for cover letter submissions and follow-up communications. These defaults ensure consistent, professional communication.

**Fields to collect:**
- `signature` -- Email signature block (name, title, contact info)
- `tone` -- Default email tone (formal, semi-formal, warm-professional)
- `subject_line_style` -- Format for subject lines (e.g., "Application for [Role] - [Name]")

**Gap-only behavior:** If this file does not exist, ask for signature and recommend defaults for tone and subject line style. If it exists, confirm current values match candidate preferences.

## Step 5: Validate and Write

After completing all active sections:

1. **Re-read each file** to confirm it parses correctly (YAML files only)
2. **Cross-check consistency:**
   - Every `star_stories[].id` referenced in `resume_facts.yml` entries must exist in `star_stories.yml`
   - Every `lane` value in `target_roles.yml` clusters must have a matching lane definition
   - Every query tier in `search_preferences.yml` must align with clusters in `target_roles.yml`
   - `constraints.yml` hard exclusions must not contradict `target_roles.yml` cluster definitions
   - `screening_answers.yml` boolean answers must match `candidate_profile.yml` and `constraints.yml`
   - `route_policy.yml` confidence thresholds must be compatible with `execution_policy.yml` approval settings
3. **Write all files** using the Write tool. For files that already exist with content, use Edit to update only changed sections rather than rewriting the entire file
4. **Confirm each write** by reading the file back and noting the size

## Step 6: Generate Open Questions Report

After all sections are complete, write `state/candidate/open_questions.md` with:

- Every field that remains empty or placeholder across all 14 files
- Items marked `[ ]` (unchecked) from the previous version of open_questions.md
- New gaps discovered during this run
- Items checked off during this run (marked with strikethrough)

Group gaps by file. End with: "Last updated: [today's date]"

## Step 7: Summary

Present a final summary to the user:

> **Profile Summary**
>
> - Identity: [complete/incomplete -- list missing fields]
> - Experience: [N roles documented, X metrics quantified]
> - Education: [N degrees, N languages, N certifications]
> - Skills: [N skills with evidence]
> - Target Roles: [N clusters across N lanes]
> - Search Strategy: [N queries across N locations on N sites]
> - STAR Stories: [N stories, M with complete results]
> - Screening Answers: [N archetypes ready]
> - Constraints: [N hard exclusions, N soft exclusions]
> - Route Policy: [configured/not configured]
> - Execution Policy: [configured/not configured]
> - Email Defaults: [configured/not configured]
> - Open Questions: [N remaining gaps -- see open_questions.md]
>
> [If open questions exist:] "There are still some gaps in your profile. You can address them by running the setup command with `--section [letter]` for the relevant section, or update the files directly. The system will work with what it has, but more complete data produces better results."

## Rules

- **Never fabricate.** Record only what the user explicitly states. If a question cannot be answered, add it to open_questions.md.
- **Never overwrite silently.** Always show existing data before asking about changes.
- **Preserve structure.** If a YAML file has a specific key structure, maintain it. Do not reorganize or rename keys.
- **Plain language.** Explain what each section does and why it matters in terms a non-technical user understands. Avoid jargon like "schema," "serialization," or "data model."
- **One section at a time.** Complete each section fully before moving to the next. Do not skip ahead.
- **YAML for structure, Markdown for narrative.** Use YAML for all structured data files. Use Markdown only for writing_style.md, behavioral_profile.md, and open_questions.md.
- **File location.** All output goes to `state/candidate/`. Never write candidate data elsewhere.
