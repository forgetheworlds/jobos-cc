#!/bin/bash
# Post-upload log hook
# Logs when documents are uploaded to a portal
# Reference: spec §19.2 PostToolUse hook

LOG_DIR="$HOME/.applypilot-plus/logs"
mkdir -p "$LOG_DIR"

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
LOG_FILE="$LOG_DIR/upload_log.jsonl"

RESUME_VERSION="${1:-unknown}"
COVER_LETTER_VERSION="${2:-unknown}"
PORTAL="${3:-unknown}"
JOB_URL="${4:-unknown}"
JOB_TITLE="${5:-unknown}"

echo "{\"timestamp\":\"$TIMESTAMP\",\"event\":\"document_upload\",\"resume_version\":\"$RESUME_VERSION\",\"cover_letter_version\":\"$COVER_LETTER_VERSION\",\"portal\":\"$PORTAL\",\"job_url\":\"$JOB_URL\",\"job_title\":\"$JOB_TITLE\"}" >> "$LOG_FILE"

echo "Logged upload: $RESUME_VERSION → $PORTAL ($JOB_TITLE)"
