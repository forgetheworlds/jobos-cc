# JobOS-CC — AI-Assisted Higher-Education Job Search System

## Project Purpose

This is a **specialized, multi-agent, higher-education-focused job application system** for Dr. Mohamed Sambul. It is **not** a generic mass-apply bot. Built as a Claude Code plugin with Bun/TypeScript framework:

- **JobOS-CC Plugin** (`.claude/plugins/jobos/`) — 11 skills, 7 agents, 8 commands, hooks, MCP config
- **Framework Scripts** — State machine validation, queue management, event logging, packet validation
- **Route-aware pipeline** — ATS browser, email, redirect, document-led, and manual application routes
- **8-lane academic taxonomy** — Role classification, 10-dimension fit scoring, lane-specific tailoring

## Candidate Context

Dr. Mohamed Sambul is an experienced higher education leader and educator with deep experience in:
- Academic program coordination and management
- First-year student success and transition programming
- Curriculum development and assessment
- Faculty coordination, training, and support
- Student advising and multicultural education
- Community-academic partnerships and practicum supervision
- Multilingual communication (20+ years in education)

He holds a **doctoral degree** and targets roles in higher education administration, academic programs, student success, curriculum development, and related areas.

## Target Outcome

The system should:
1. Search for relevant higher-ed jobs continuously or on demand
2. Identify and rank best-fit opportunities using academic role taxonomy
3. Reject weak or misleading matches (K-12, sales-heavy, corporate training)
4. Tailor resume and cover letter credibly per role family
5. Draft strong, factual screening responses from answer memory
6. Fill applications efficiently via browser automation
7. Preserve human review checkpoint before submission
8. Track every job and every action
9. Learn from outcomes and improve continuously

## Repo Structure

```
.claude/plugins/jobos/           — JobOS-CC Plugin (v2.0)
  .claude-plugin/plugin.json     — Plugin manifest
  scripts/                       — Bun/TypeScript framework (state machine, queues, events)
  state/
    schema/                      — 6 JSON schemas (job FSM, canonical job, packet, route, queue, event)
    candidate/                   — 14 candidate profile files (YAML + Markdown)
    queues/                      — 7 JSONL pipeline queues (inbound → inspected → ... → followup)
    jobs/                        — Job records (raw, normalized, packets, reports)
    memory/                      — Dedup, portal memory, answer memory, strategy notes
    logs/                        — Append-only event log + session summaries
    outputs/                     — Generated resumes, cover letters, emails, screening, packets
  skills/                        — 11 skills with SKILL.md + references/
  agents/                        — 7 agents with modular loading protocol
  commands/                      — 8 slash commands (/setup, /discover, /inspect, /shortlist, /prepare, /review, /execute, /improve)
  hooks/                         — SessionStart, PreToolUse submit guard, PostToolUse audit, Stop summary
  .mcp.json                      — Playwright MCP config

data/candidate/                  — Original candidate data (migrated to plugin state/)
data/jobs/                       — Legacy job records
src/applypilot/                  — Legacy Python pipeline (superseded by JobOS-CC)
.claude/plugins/applypilot-plugin/ — Legacy ApplyPilot plugin (source for ported content)
```

## Safety Constraints (Non-Negotiable)

1. **Never fabricate facts** — all claims must be grounded in resume_facts.yml
2. **Never submit low-confidence applications automatically** — human approval required
3. **Never apply to excluded role families** — respect constraints.yml
4. **Never lose track of uploaded materials** — maintain full audit trail
5. **Never treat browser layer as source of truth** — structured data is authoritative
6. Always prefer structured candidate data over inferred guesses
7. Always preserve a clear audit trail
8. Always allow the system to suggest better framing, but never invent experience
9. Always give the reviewer meaningful veto power
10. Always allow architecture improvements to be proposed

## Quality Standards

- **Fit over keyword coincidence** — academic admin ≠ generic "education" role
- **Credibility over flashy autonomy** — letters should sound like a real professional
- **Reusability over one-off hacks** — answer library, resume variants, portal memory
- **Quality over blind volume** — fewer good applications beat many bad ones
- **Specialization over generic AI behavior** — the system knows higher-ed

## Workflows

### New Job Application Pipeline
1. `/discover` — Discovery Scout searches sources via Playwright, normalizes to canonical job records
2. `/inspect` — Route Inspector classifies application route (ATS/email/redirect/document/manual)
3. `/shortlist` — Fit Analyst scores using 8-lane taxonomy + 10-dimension rubric, assigns lanes
4. `/prepare` — Tailorer generates resume variant + cover letter + screening answers per route type
5. `/review` — Reviewer runs strict 10-point checklist with veto power, saves verdict report
6. `/execute` — Execution Agent performs route-specific submission (browser fill, email packet, or manual brief)
7. `/improve` — Strategy Analyst reviews outcomes, updates search/answer/policy files

Every state transition validated by FSM. Every action logged to append-only event log. Every file tracked in packet manifests.

### Key Commands
- `/setup`    — Phased interview producing all 14 candidate profile files
- `/discover` — Search for jobs across LinkedIn, Indeed, Google Jobs, institutional sites
- `/inspect`  — Classify application routes for each job
- `/shortlist` — Score fit and assign lanes
- `/prepare`  — Generate tailored resume, cover letter, screening answers
- `/review`   — Quality review with 10-point checklist and veto power
- `/execute`  — Route-specific submission with approval gates
- `/improve`  — Strategy improvement from outcomes
