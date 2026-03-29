#!/bin/bash
# install.sh — Automated JobOS-CC Installation
# Run this script to install JobOS-CC automatically

set -e  # Exit on error

echo "=== JobOS-CC Automated Installation ==="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PLUGIN_SOURCE="$SCRIPT_DIR/.claude/plugins/jobos"
PLUGIN_DEST="$HOME/.claude/plugins/jobos"

# Check prerequisites
echo "Checking prerequisites..."

# Check for Claude Code
if ! command -v claude &> /dev/null; then
    echo -e "${RED}❌ Claude Code not found${NC}"
    echo "Please install Claude Code first: https://www.anthropic.com/claude-code"
    exit 1
fi
echo -e "${GREEN}✓ Claude Code found${NC}"

# Check for Bun or Node
if command -v bun &> /dev/null; then
    RUNTIME="bun"
    echo -e "${GREEN}✓ Bun found${NC}"
elif command -v node &> /dev/null; then
    RUNTIME="node"
    echo -e "${GREEN}✓ Node.js found${NC}"
else
    echo -e "${RED}❌ Neither Bun nor Node.js found${NC}"
    echo "Please install Bun (recommended): curl -fsSL https://bun.sh/install | bash"
    echo "Or install Node.js: https://nodejs.org"
    exit 1
fi

# Check if plugin source exists
if [ ! -d "$PLUGIN_SOURCE" ]; then
    echo -e "${RED}❌ Plugin not found at $PLUGIN_SOURCE${NC}"
    echo "Make sure you're running this script from the jobos-cc directory"
    exit 1
fi

# Create plugins directory if needed
mkdir -p "$HOME/.claude/plugins"

# Remove old symlink if exists
if [ -L "$PLUGIN_DEST" ]; then
    echo "Removing old plugin link..."
    rm "$PLUGIN_DEST"
fi

# Create symlink
echo "Linking plugin to Claude Code..."
ln -sf "$PLUGIN_SOURCE" "$PLUGIN_DEST"
echo -e "${GREEN}✓ Plugin linked${NC}"

# Update Claude Code settings
echo "Updating Claude Code settings..."
SETTINGS_FILE="$HOME/.claude/settings.json"
SETTINGS_LOCAL="$SCRIPT_DIR/.claude/settings.local.json"

# Create settings.json if it doesn't exist
if [ ! -f "$SETTINGS_FILE" ]; then
    echo '{}' > "$SETTINGS_FILE"
fi

# Check if jobos is already enabled
if grep -q "jobos@local" "$SETTINGS_FILE" 2>/dev/null; then
    echo -e "${GREEN}✓ Plugin already enabled in settings${NC}"
else
    # Add jobos to enabledPlugins
    echo "Enabling plugin in settings..."

    # Use Python or jq if available, otherwise manual edit
    if command -v python3 &> /dev/null; then
        python3 << 'EOF'
import json
import sys

settings_file = sys.argv[1]

try:
    with open(settings_file, 'r') as f:
        settings = json.load(f)
except:
    settings = {}

if 'enabledPlugins' not in settings:
    settings['enabledPlugins'] = {}

settings['enabledPlugins']['jobos@local'] = True

with open(settings_file, 'w') as f:
    json.dump(settings, f, indent=2)

print("Settings updated")
EOF
        "$SETTINGS_FILE"
    else
        echo -e "${YELLOW}⚠ Please manually add to $SETTINGS_FILE:${NC}"
        echo '{"enabledPlugins": {"jobos@local": true}}'
    fi
fi

# Initialize the system
echo ""
echo "Initializing JobOS-CC..."
cd "$PLUGIN_DEST"

if [ "$RUNTIME" = "bun" ]; then
    if [ ! -d "node_modules" ]; then
        echo "Installing dependencies with Bun..."
        bun install
    fi
    bun run scripts/init-jobos.ts
else
    if [ ! -d "node_modules" ]; then
        echo "Installing dependencies with npm..."
        npm install
    fi
    npm run init
fi

echo -e "${GREEN}✓ System initialized${NC}"

# Copy sample profile if no profile exists
if [ ! -f "$PLUGIN_DEST/state/candidate/candidate_profile.yml" ]; then
    echo ""
    echo -e "${YELLOW}ℹ No candidate profile found${NC}"
    echo "Run /jobos-setup in Claude Code to create your profile"
fi

# Success message
echo ""
echo -e "${GREEN}=== Installation Complete! ===${NC}"
echo ""
echo "Next steps:"
echo "1. Open Claude Code in your project: claude"
echo "2. Run: /jobos-setup"
echo "3. Follow the interview to build your profile"
echo ""
echo "Quick commands:"
echo "  /jobos-setup      — Build your profile"
echo "  /jobos-find       — Search for jobs"
echo "  /jobos-score      — Score job fit"
echo "  /jobos-prepare    — Create materials"
echo "  /jobos-submit     — Submit applications"
echo ""
echo -e "${GREEN}Happy job hunting!${NC}"
