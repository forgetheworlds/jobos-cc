# Installation Guide

## For New Users (Setting Up on a New Computer)

### Step 1: Install Prerequisites

1. **Install Claude Code** — [Download here](https://www.anthropic.com/claude-code)

2. **Install Bun** (faster) or Node.js:
   ```bash
   # Option A: Bun (recommended)
   curl -fsSL https://bun.sh/install | bash

   # Option B: Node.js
   # Download from https://nodejs.org
   ```

### Step 2: Get JobOS-CC

**Option A: Clone from GitHub (recommended)**
```bash
git clone https://github.com/YOUR_USERNAME/jobos-cc.git
cd jobos-cc
```

**Option B: Download ZIP**
1. Download ZIP from GitHub
2. Extract to `~/jobos-cc` (or wherever you want)
3. Open terminal in that folder

### Step 3: Install the Plugin

```bash
# Create the symlink to Claude Code's plugins folder
ln -sf "$(pwd)/.claude/plugins/jobos" ~/.claude/plugins/jobos

# Verify it worked
ls -la ~/.claude/plugins/jobos
```

You should see the plugin files listed.

### Step 4: Enable in Claude Code

Edit your Claude Code settings file:

```bash
# Open settings in your editor
# Or manually edit ~/.claude/settings.json
```

Add this to your `settings.json`:

```json
{
  "enabledPlugins": {
    "jobos@local": true
  }
}
```

If you already have other plugins enabled, just add `"jobos@local": true` to the list.

### Step 5: Initialize the System

```bash
cd .claude/plugins/jobos
bun run scripts/init-jobos.ts
```

You should see: "State initialized successfully."

### Step 6: Start Using JobOS

Open Claude Code in your project directory:

```bash
# In the jobos-cc folder
claude
```

Then run:
```
/jobos-setup
```

Follow the interview to build your profile. This takes 20-40 minutes.

---

## Quick Reference

### All Commands

| Command | Purpose | When to use |
|---------|---------|-------------|
| `/jobos-setup` | Build your profile | First time, or when updating |
| `/jobos-find` | Search for jobs | When you want new opportunities |
| `/jobos-check-route` | Check how to apply | After finding jobs |
| `/jobos-score` | Score jobs by fit | To rank opportunities |
| `/jobos-prepare` | Create materials | Before applying |
| `/jobos-check` | Quality check | Before submitting |
| `/jobos-submit` | Submit application | When ready to apply |
| `/jobos-analyze` | Get feedback | To improve your search |

### File Locations

Your data is stored in:
```
.claude/plugins/jobos/state/
  candidate/          # Your profile
  jobs/               # Job records
  queues/             # Pipeline tracking
  outputs/            # Generated resumes, cover letters
```

### Common Issues

**"Command not found"**
- Make sure the plugin is linked: `ls -la ~/.claude/plugins/jobos`
- Make sure it's enabled in settings.json
- Restart Claude Code

**"bun: command not found"**
- Install Bun: `curl -fsSL https://bun.sh/install | bash`
- Or use npm instead: `npm install && npm run init`

**"State not initialized"**
- Run: `bun run scripts/init-jobos.ts` in the plugin directory

---

## Updating JobOS

If you cloned from GitHub:

```bash
git pull origin main
# The symlink stays active, so changes are immediate
```

If you downloaded ZIP, just extract the new version over the old one.

---

## Uninstalling

```bash
rm ~/.claude/plugins/jobos
```

Your data stays in the `state/` folder if you want to keep it.

---

## Getting Help

- Check the README.md for detailed usage
- Look in `.claude/plugins/jobos/skills/` for skill documentation
- Review `.omc/validation/` for implementation notes
