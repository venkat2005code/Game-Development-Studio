#!/bin/zsh
# PixelForge — Quick push script
# Usage: ./push.sh "optional commit message"

REPO="/Users/venkatragavn/june slot3/ Game Development Studio"
cd "$REPO" || exit 1

MSG=${1:-"chore: auto-update $(date '+%Y-%m-%d %H:%M')"}

git add -A
git commit -m "$MSG"
git push

echo ""
echo "✓ Pushed to GitHub: $MSG"
