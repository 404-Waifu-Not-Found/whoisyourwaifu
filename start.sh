#!/usr/bin/env bash
# Local dev launcher for macOS. Installs deps if needed, then runs `vite`.

set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")"

if ! command -v node >/dev/null 2>&1; then
  echo "node is not installed. Install it from https://nodejs.org or via 'brew install node', then retry." >&2
  exit 1
fi

if [ ! -d node_modules ] || [ package-lock.json -nt node_modules ]; then
  echo "==> Installing dependencies"
  npm install
fi

echo "==> Starting dev server (Ctrl-C to stop)"
exec npm run dev -- "$@"
