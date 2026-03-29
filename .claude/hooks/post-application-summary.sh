#!/bin/bash
# Post-application summary hook
# Emits a compact summary at end of session
# Reference: spec §19.2 Stop hook

echo "=== ApplyPilot++ Session Summary ==="

python3 -c "
import sqlite3, json
from pathlib import Path
from datetime import datetime, timezone, timedelta

db_path = Path.home() / '.applypilot-plus' / 'applypilot.db'
if not db_path.exists():
    print('No database found — nothing to report.')
    exit(0)

conn = sqlite3.connect(str(db_path))
conn.row_factory = sqlite3.Row

# Today's activity
today = datetime.now(timezone.utc).strftime('%Y-%m-%d')

new_today = conn.execute(
    \"SELECT COUNT(*) FROM jobs WHERE discovered_at LIKE ?\", (f'{today}%',)
).fetchone()[0]

scored_today = conn.execute(
    \"SELECT COUNT(*) FROM jobs WHERE scored_at LIKE ?\", (f'{today}%',)
).fetchone()[0]

tailored_today = conn.execute(
    \"SELECT COUNT(*) FROM jobs WHERE tailored_at LIKE ?\", (f'{today}%',)
).fetchone()[0]

applied_today = conn.execute(
    \"SELECT COUNT(*) FROM jobs WHERE applied_at LIKE ?\", (f'{today}%',)
).fetchone()[0]

reviewed_today = conn.execute(
    \"SELECT COUNT(*) FROM jobs WHERE reviewed_at LIKE ?\", (f'{today}%',)
).fetchone()[0]

# Overall pipeline
total = conn.execute('SELECT COUNT(*) FROM jobs').fetchone()[0]
high_fit = conn.execute('SELECT COUNT(*) FROM jobs WHERE fit_score >= 7').fetchone()[0]
total_applied = conn.execute('SELECT COUNT(*) FROM jobs WHERE apply_status = \"applied\"').fetchone()[0]

print(f'Today: {new_today} discovered, {scored_today} scored, {tailored_today} tailored, {reviewed_today} reviewed, {applied_today} applied')
print(f'Overall: {total} total jobs, {high_fit} high-fit, {total_applied} applications submitted')

# Recent high-fit jobs
high_fit_today = conn.execute(
    \"SELECT title, fit_score, role_family FROM jobs WHERE scored_at LIKE ? AND fit_score >= 7 ORDER BY fit_score DESC LIMIT 5\",
    (f'{today}%',)
).fetchall()

if high_fit_today:
    print('\\nTop matches today:')
    for job in high_fit_today:
        print(f'  [{job[\"fit_score\"]}/10] {job[\"title\"]} ({job[\"role_family\"]})')

conn.close()
" 2>/dev/null || echo "Summary generation failed."

echo "=== End Summary ==="
