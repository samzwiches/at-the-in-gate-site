#!/usr/bin/env bash
set -euo pipefail

SOURCE_URL="${1:-http://127.0.0.1:4173}"
DEST_DIR="${2:-uploaded-site}"

rm -rf "$DEST_DIR"
mkdir -p "$DEST_DIR"

# Mirror the entire static site from the local server.
wget \
  --mirror \
  --convert-links \
  --adjust-extension \
  --page-requisites \
  --no-parent \
  --directory-prefix "$DEST_DIR" \
  "$SOURCE_URL"

echo "Mirrored $SOURCE_URL into $DEST_DIR"
