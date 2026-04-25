#!/usr/bin/env bash
set -euo pipefail

SOURCE_URL="${1:-http://127.0.0.1:4173}"
DEST_DIR="${2:-uploaded-site}"
SPA_ROUTES="${3:-react-editor}"

rm -rf "$DEST_DIR"
mkdir -p "$DEST_DIR"

# Mirror the entire static site from the local server.
wget \
  --mirror \
  --convert-links \
  --adjust-extension \
  --page-requisites \
  --no-host-directories \
  --no-parent \
  --directory-prefix "$DEST_DIR" \
  "$SOURCE_URL"

# Ensure key SPA routes can be opened directly in the browser address bar.
# This copies the mirrored root index.html to route-specific index.html files,
# which works on static hosts that do not support rewrite rules.
ROOT_INDEX="$DEST_DIR/index.html"
if [[ -f "$ROOT_INDEX" ]]; then
  IFS=',' read -ra ROUTE_LIST <<< "$SPA_ROUTES"
  for route in "${ROUTE_LIST[@]}"; do
    route="${route#/}"
    [[ -z "$route" ]] && continue
    mkdir -p "$DEST_DIR/$route"
    cp "$ROOT_INDEX" "$DEST_DIR/$route/index.html"
  done
fi

echo "Mirrored $SOURCE_URL into $DEST_DIR (SPA fallbacks: $SPA_ROUTES)"
