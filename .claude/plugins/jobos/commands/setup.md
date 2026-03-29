---
name: jobos-setup
description: Build your candidate profile through a guided conversation. First time? Start here! Creates 14 profile files that JobOS uses for your job search.
---

# /jobos-setup — Build Your Candidate Profile

**What it does:** Runs a friendly, phased interview to create (or update) your complete candidate profile.

---

## What Gets Created

When you run `/jobos-setup`, you'll be guided through 10 conversation phases. Each phase saves to a specific file in `state/candidate/`:

| Phase | Conversation | File Created |
|-------|-------------|--------------|
| 1 | Identity & contact | `candidate_profile.yml` |
| 2 | Professional story | `candidate_profile.yml` |
| 3 | Experience inventory | `resume_facts.yml` |
| 4 | Target roles (8 lanes) | `target_roles.yml` |
| 5 | Constraints (what to avoid) | `constraints.yml` |
| 6 | Search preferences | `search_preferences.yml` |
| 7 | Route policy (application methods) | `route_policy.yml` |
| 8 | Writing style | `writing_style.md` |
| 9 | Behavioral profile | `behavioral_profile.md` |
| 10 | Application defaults | `execution_policy.yml`, `email_defaults.yml`, `application_defaults.yml` |

**Total: 14 profile files** that JobOS uses to find jobs, score fit, create materials, and apply.

---

## How to Use

### First Time
```
/jobos-setup
```
You'll be welcomed and guided through all 10 phases. Each phase saves immediately — no waiting until the end.

### Update Your Profile
```
/jobos-setup
```
If you already have a profile, you'll be asked what you want to update:
- Run all phases again
- Update specific phases only
- Review existing files

---

## What Each Phase Covers

**Phase 1: Identity & Contact**
- Name, email, phone, location, current role, highest degree

**Phase 2: Professional Narrative**
- Your elevator pitch (2-3 sentences)
- Your career story (how you got here)

**Phase 3: Experience Inventory**
- Education (degrees, institutions, achievements)
- Work experience (roles, employers, accomplishments with metrics)
- Skills (core and technical)
- Certifications and training
- Languages

**Phase 4: Target Roles**
- Which of 8 academic lanes interest you
- Priority levels for each lane
- Specific job titles you're targeting

**Phase 5: Constraints**
- Hard exclusions (jobs to never apply to)
- Soft exclusions (jobs to avoid unless great fit)

**Phase 6: Search Preferences**
- Where to search (LinkedIn, Indeed, institutional sites, etc.)
- Locations (preferred and open-to)
- Keywords (primary and avoid)
- Remote preference

**Phase 7: Route Policy**
- Comfort with browser form-filling
- Email application preferences
- Account creation on portals
- How to handle redirects

**Phase 8: Writing Style**
- Tone (formal to conversational)
- Phrases to avoid
- Values to emphasize
- Voice preferences

**Phase 9: Behavioral Profile**
- Professional strengths
- Leadership style
- Conflict resolution approach
- Communication preferences
- Feedback style

**Phase 10: Application Defaults**
- Email signature
- Salary expectations
- Start date availability
- Work authorization
- Autonomy levels (how much JobOS should do automatically)

---

## Time Estimate

- **First time:** 20–40 minutes (depending on how much detail you provide)
- **Updating specific phases:** 5–10 minutes per phase
- **You can stop anytime** — Everything saves immediately. Pick up where you left off.

---

## What JobOS Does With Your Profile

Once your profile is complete, JobOS uses it to:

1. **Find relevant jobs** — Based on your target lanes, locations, and keywords
2. **Score job fit** — Match jobs against your experience, constraints, and preferences (using the 8-lane taxonomy and 10-dimension rubric)
3. **Create tailored materials** — Resumes and cover letters that sound like YOU (grounded in your `resume_facts.yml`)
4. **Answer screening questions** — Using your real accomplishments from `resume_facts.yml` and `star_stories.yml`
5. **Apply appropriately** — Following your `route_policy.yml` and `execution_policy.yml`

---

## Tips for a Great Profile

- **Be honest** — Authentic beats impressive. JobOS works best with real information.
- **Include metrics** — Numbers make accomplishments concrete. "Increased retention by 12%" is stronger than "Improved retention."
- **Be specific about constraints** — If you definitely don't want K-12 roles, say so. This saves time filtering later.
- **Prioritize lanes** — Marking 2-3 lanes as "Top priority" helps JobOS focus on what matters most.
- **Set autonomy levels thoughtfully** — If you're new to JobOS, start with lower autonomy (review everything). You can increase it as you get comfortable.

---

## Next Steps After Setup

Once your profile is complete:

```bash
# 1. Start finding jobs
/jobos-find

# 2. See what jobs were found
# Jobs appear in state/queues/inbound_jobs.jsonl

# 3. Classify application routes
/jobos-check-route

# 4. Score and rank jobs by fit
/jobos-score

# 5. Prepare tailored materials
/jobos-prepare <job-id>

# 6. Quality review
/jobos-check <job-id>

# 7. Submit applications
/jobos-submit <job-id>
```

---

## Can I Update My Profile Later?

Yes! Run `/jobos-setup` anytime to:
- Update specific phases (like adding new skills or adjusting constraints)
- Refresh your experience after a new role
- Change search preferences based on what you're seeing
- Adjust autonomy levels as you get comfortable with JobOS

Your profile files live in `state/candidate/` — you can also edit them directly if you prefer.

---

## What If I Skip Phases?

That's okay! If you say "skip" for any phase, JobOS uses sensible defaults and you can update it later. The most important phases are:
- **Phase 3 (Experience Inventory)** — Essential for creating resumes and cover letters
- **Phase 4 (Target Roles)** — Essential for finding relevant jobs
- **Phase 5 (Constraints)** — Essential for avoiding wrong roles

Everything else can be refined over time.
