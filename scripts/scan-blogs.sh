#!/usr/bin/env bash
# Regenerate blog/index.json from all blog/*.html meta tags.
# Run from anywhere inside the repo — the script resolves the root automatically.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "→ Scanning blogs in ${REPO_ROOT}/blog/"
node "${REPO_ROOT}/scripts/scan-blogs.js"
echo "✓ Done"
