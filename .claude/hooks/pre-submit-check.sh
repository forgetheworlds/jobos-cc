#!/bin/bash
# Pre-submit safety check hook
# Blocks submission if materials are incomplete or unreviewed

set -e

JOB_URL="$1"

if [ -z "$JOB_URL" ]; then
    echo "ERROR: No job URL provided"
    exit 1
fi

# Check via Python
python3 -c "
import sqlite3, sys, json
from pathlib import Path

db_path = Path.home() / '.applypilot-plus' / 'applypilot.db'
if not db_path.exists():
    print('ERROR: Database not found')
    sys.exit(1)

conn = sqlite3.connect(str(db_path))
conn.row_factory = sqlite3.Row
row = conn.execute('SELECT * FROM jobs WHERE url = ?', ('$JOB_URL',)).fetchone()

if not row:
    print(f'ERROR: Job not found: $JOB_URL')
    sys.exit(1)

job = dict(row)
errors = []

# Check resume exists
if not job.get('tailored_resume_path') or not Path(job['tailored_resume_path']).exists():
    errors.append('Tailored resume missing')

# Check cover letter exists
if not job.get('cover_letter_path') or not Path(job['cover_letter_path']).exists():
    errors.append('Cover letter missing')

# Check review passed
if job.get('review_status') != 'passed':
    errors.append(f'Review status: {job.get(\"review_status\", \"not reviewed\")}')

# Check fit score
score = job.get('fit_score', 0) or 0
if score < 5:
    errors.append(f'Fit score too low: {score}')

if errors:
    print('SUBMISSION BLOCKED:')
    for e in errors:
        print(f'  - {e}')
    sys.exit(1)
else:
    print('Pre-submit checks passed')
    sys.exit(0)
"
