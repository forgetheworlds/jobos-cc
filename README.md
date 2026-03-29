# JobOS-CC

**Higher Education Job Search Assistant for Claude Code**

JobOS-CC helps higher education professionals find, evaluate, and apply for academic jobs. It searches across job boards, scores opportunities by fit, creates tailored application materials, and manages your entire job search pipeline.

**🌐 GitHub:** https://github.com/forgetheworlds/jobos-cc

## One-Line Installation

### macOS / Linux

```bash
curl -fsSL https://raw.githubusercontent.com/forgetheworlds/jobos-cc/main/install.sh | bash
```

Or manually:

```bash
git clone https://github.com/forgetheworlds/jobos-cc.git
cd jobos-cc
./install.sh
```

### Windows

```powershell
# Download and run
Invoke-WebRequest -Uri https://raw.githubusercontent.com/forgetheworlds/jobos-cc/main/install.ps1 -OutFile install.ps1
.\install.ps1
```

### What the installer does

1. ✅ Checks for Claude Code and Bun/Node.js
2. ✅ Links the plugin to `~/.claude/plugins/`
3. ✅ Enables it in Claude Code settings
4. ✅ Installs dependencies
5. ✅ Initializes the system

**That's it!** Then just run `/jobos-setup` in Claude Code.

---

## Quick Start

Once installed, open Claude Code and run:

```
/jobos-setup
```

This starts a friendly interview (20-40 minutes) that creates your complete candidate profile.

### All Commands

| Command | What it does |
|---------|--------------|
| `/jobos-setup` | Build your candidate profile (run this first!) |
| `/jobos-find` | Search for job openings |
| `/jobos-check-route` | Check how to apply for each job |
| `/jobos-score` | Score jobs by fit and rank them |
| `/jobos-prepare` | Create tailored resume and cover letter |
| `/jobos-check` | Quality-check materials before submitting |
| `/jobos-submit` | Submit your application |
| `/jobos-analyze` | Review search progress and get tips |

### Example Workflow

```
/jobos-setup                    # Answer questions about your background
/jobos-find                     # Search for jobs
/jobos-check-route              # Check how each job accepts applications
/jobos-score                    # Score fit and rank jobs
/jobos-prepare <job-id>         # Create tailored materials
/jobos-check <job-id>           # Quality check
/jobos-submit <job-id>          # Submit (with your approval)
```

---

## Features

- **Job Discovery** — Searches LinkedIn, Indeed, Google Jobs, and university websites
- **Fit Scoring** — Evaluates jobs using a 10-dimension academic-focused rubric
- **Tailored Materials** — Creates customized resumes and cover letters for each job
- **Quality Review** — Checks materials before submission with a 10-point checklist
- **Application Submission** — Handles online forms, email, and document uploads
- **Pipeline Tracking** — Tracks every job from discovery to submission

---

## How It Works

JobOS-CC uses a pipeline approach:

1. **Discovery** — Finds jobs matching your criteria
2. **Inspection** — Determines how to apply (online form, email, etc.)
3. **Scoring** — Ranks jobs by fit using 10 dimensions
4. **Preparation** — Creates tailored materials grounded in your real experience
5. **Review** — Quality check with strict no-fabrication rules
6. **Execution** — Submits applications with your approval

All data is stored locally in `.claude/plugins/jobos/state/`.

---

## Requirements

- [Claude Code](https://www.anthropic.com/claude-code) (free during beta)
- [Bun](https://bun.sh) or [Node.js](https://nodejs.org)
- Higher education background (tailored for academic/administrative roles)

---

## Safety Features

- **Never fabricates** — All claims must be grounded in your profile
- **Veto power** — Reviewer can block submissions if quality issues found
- **Human approval** — System asks before every submission
- **Local storage** — All data stays on your computer

---

## Troubleshooting

**Plugin not showing up?**
```bash
# Re-run the install script
./install.sh
```

**"bun: command not found"**
```bash
# Install Bun
curl -fsSL https://bun.sh/install | bash
```

**Commands not recognized?**
- Make sure you're in a Claude Code session: `claude`
- Try: `/jobos-setup` (not `/setup`)

---

## Documentation

- `INSTALL.md` — Detailed installation instructions
- `.claude/plugins/jobos/skills/` — Skill documentation
- `.omc/validation/` — Implementation notes

---

## Project Structure

```
jobos-cc/
  install.sh              # One-line installer (macOS/Linux)
  install.ps1             # One-line installer (Windows)
  README.md               # This file
  .claude/plugins/jobos/  # The plugin
    commands/             # 8 slash commands
    skills/               # 11 skills with docs
    agents/                 # 7 specialized agents
    scripts/              # Framework scripts
    state/                # Your data
```

---

## License

MIT — Free for personal and educational use.

---

Built for higher education professionals seeking their next academic role.
