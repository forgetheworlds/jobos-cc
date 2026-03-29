#!/bin/bash
# Session start context loader
# Loads candidate profile summary and pipeline stats at session start

echo "=== ApplyPilot++ Session Context ==="

python3 -c "
import yaml, sys
from pathlib import Path

project_root = Path('$(pwd)')
data_dir = project_root / 'data' / 'candidate'

# Load profile
profile_path = data_dir / 'candidate_profile.yml'
if profile_path.exists():
    with open(profile_path) as f:
        profile = yaml.safe_load(f)
    name = profile.get('identity', {}).get('full_name', 'Unknown')
    narrative = profile.get('professional_narrative', {}).get('one_sentence', '')
    print(f'Candidate: Dr. {name}')
    print(f'Focus: {narrative[:100]}...')
else:
    print('WARNING: No candidate profile found. Run /setup first.')

# Load pipeline stats
import sqlite3
db_path = Path.home() / '.applypilot-plus' / 'applypilot.db'
if db_path.exists():
    conn = sqlite3.connect(str(db_path))
    total = conn.execute('SELECT COUNT(*) FROM jobs').fetchone()[0]
    high_fit = conn.execute('SELECT COUNT(*) FROM jobs WHERE fit_score >= 7').fetchone()[0]
    applied = conn.execute('SELECT COUNT(*) FROM jobs WHERE apply_status = \"applied\"').fetchone()[0]
    print(f'Pipeline: {total} jobs discovered, {high_fit} high-fit, {applied} applied')
else:
    print('Pipeline: No jobs tracked yet')

print('=== End Context ===')
" 2>/dev/null || echo "Context loading failed — continuing without context"
