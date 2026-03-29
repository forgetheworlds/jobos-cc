---
name: setup-orchestrator
description: >
  A friendly conversation that builds your complete candidate profile, step by step.
  Warm, phased interview producing 14 profile files that JobOS uses to find jobs,
  score fit, create materials, and apply. Non-technical and accessible.

triggers:
  - setup profile
  - run setup
  - configure candidate
  - initialize profile
  - candidate setup
  - profile wizard
references:
  - interview-blueprint.md
---

# Setup Orchestrator — Your Profile Builder

**This skill guides you through building your complete candidate profile, step by step.**

---

## What This Does

Think of this as a friendly conversation that helps JobOS understand who you are, what you've done, and what you're looking for. We'll go through 10 phases, and each phase focuses on one part of your profile.

You can skip any phase if you want — we'll use sensible defaults and you can always update things later.

---

## How It Works

### At the Start
- Welcome you and explain what we're doing
- Offer to let you update an existing profile or start fresh

### Each Phase
1. Explain what we're covering in simple terms
2. Ask you questions in a warm, conversational way
3. Show you what we captured before saving
4. Let you confirm or edit before we write to your profile
5. Save immediately to the right file (no waiting until the end!)

### If You Say "Skip"
- We'll use reasonable defaults for that section
- You can come back and update it anytime

### What Gets Created
After we finish, you'll have **14 profile files** that JobOS uses to:
- Find jobs that match your background
- Score how well jobs fit you
- Create tailored resumes and cover letters
- Answer screening questions using your actual experience
- Apply to jobs in a way that sounds authentic to you

---

## The 10 Phases

| Phase | What We Cover | File We Create |
|-------|---------------|----------------|
| 1 | Your name, contact info, current role | `candidate_profile.yml` |
| 2 | Your professional story — elevator pitch and career journey | `candidate_profile.yml` |
| 3 | Your experience inventory — jobs, degrees, accomplishments, skills | `resume_facts.yml` |
| 4 | Which academic job lanes interest you most | `target_roles.yml` |
| 5 | What types of jobs to avoid | `constraints.yml` |
| 6 | Where to search and what to look for | `search_preferences.yml` |
| 7 | Comfort level with different application methods | `route_policy.yml` |
| 8 | How you want your written materials to sound | `writing_style.md` |
| 9 | Your behavioral strengths and work style | `behavioral_profile.md` |
| 10 | Application preferences — email signature, form defaults, autonomy | `execution_policy.yml`, `email_defaults.yml`, `application_defaults.yml` |

---

## Your Role

Just be yourself and answer honestly. There are no wrong answers.

- **Don't worry about perfection** — You can update anything later
- **Don't worry about sounding impressive** — Authentic beats flashy
- **Ask questions anytime** — If something isn't clear, just ask

---

## What JobOS Does With Your Profile

Once your profile is built, JobOS uses it to:

1. **Find relevant jobs** — Based on your target lanes, locations, and search terms
2. **Score job fit** — Match jobs against your experience, constraints, and preferences
3. **Create tailored materials** — Resumes and cover letters that sound like YOU
4. **Answer screening questions** — Using your real accomplishments, not made-up claims
5. **Apply appropriately** — Following your comfort level with automation and review

---

## Getting Started

When you run `/setup`, this skill activates and begins Phase 1. You'll see a warm welcome and we'll take it one phase at a time.

**Estimated time:** 20–40 minutes (depending on how much detail you want to provide)
**Can be saved:** Yes — each phase saves immediately. Stop anytime and pick up later.

---

## Files to Read

- `interview-blueprint.md` — Detailed guide with exact questions, example answers, and validation rules for each phase

---

## Important Notes

- **All information stays local** — Nothing is sent to external services
- **You're in control** — You can review and edit anything before it's saved
- **No technical knowledge needed** — Just answer questions conversationationally
- **Skip freely** — Use defaults for anything you want to figure out later
