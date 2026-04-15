#!/usr/bin/env bash
# compress-videos.sh
# Compresses videos for web deployment.
#
# Usage:
#   ./scripts/compress-videos.sh [input_dir] [output_dir]
#
# Defaults:
#   input_dir  — public/media  (searches recursively for .mp4 / .mov / .webm)
#   output_dir — same as input (overwrites originals after backup)
#
# What it does:
#   - Re-encodes to H.264, scale width to 720px max (portrait: height to 960px max)
#   - CRF 28 (good quality / small size tradeoff)
#   - Strips audio (muted web videos)
#   - Adds faststart moov atom (streaming-friendly)
#   - Keeps a .bak original alongside the file
#   - Skips files that are already small (< SIZE_THRESHOLD_KB)
#   - Generates a WebP poster from the first frame

set -euo pipefail

# ── Config ─────────────────────────────────────────────────────────────────────
INPUT_DIR="${1:-public/media}"
OUTPUT_DIR="${2:-}"           # empty = overwrite in-place (with .bak backup)
CRF=28
MAX_DIM=960                   # max width (landscape) or max height (portrait)
SIZE_THRESHOLD_KB=500         # skip files already under this size
# ───────────────────────────────────────────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
INPUT_DIR="$PROJECT_ROOT/$INPUT_DIR"

if ! command -v ffmpeg &>/dev/null; then
  echo "❌  ffmpeg not found. Install with: brew install ffmpeg"
  exit 1
fi

shopt -s nullglob
mapfile -d '' FILES < <(find "$INPUT_DIR" -type f \( -iname "*.mp4" -o -iname "*.mov" -o -iname "*.webm" \) -print0)

if [[ ${#FILES[@]} -eq 0 ]]; then
  echo "No video files found in $INPUT_DIR"
  exit 0
fi

echo "Found ${#FILES[@]} video(s) in $INPUT_DIR"
echo ""

COMPRESSED=0
SKIPPED=0

for SRC in "${FILES[@]}"; do
  FILENAME="$(basename "$SRC")"
  BASENAME="${FILENAME%.*}"
  DIR="$(dirname "$SRC")"

  # Determine output path
  if [[ -n "$OUTPUT_DIR" ]]; then
    DEST_DIR="$PROJECT_ROOT/$OUTPUT_DIR/$(realpath --relative-to="$INPUT_DIR" "$DIR")"
    mkdir -p "$DEST_DIR"
    DEST="$DEST_DIR/${BASENAME}.mp4"
  else
    DEST="$SRC"
  fi

  SIZE_KB=$(( $(wc -c < "$SRC") / 1024 ))

  # Skip already-small files
  if [[ "$DEST" == "$SRC" && $SIZE_KB -lt $SIZE_THRESHOLD_KB ]]; then
    echo "⏭  Skip  $FILENAME  (${SIZE_KB} KB — already under ${SIZE_THRESHOLD_KB} KB)"
    (( SKIPPED++ )) || true
    continue
  fi

  echo "🎬  Compressing  $FILENAME  (${SIZE_KB} KB) …"

  # Detect orientation and set scale filter
  WIDTH=$(ffprobe -v quiet -select_streams v:0 -show_entries stream=width -of csv=p=0 "$SRC")
  HEIGHT=$(ffprobe -v quiet -select_streams v:0 -show_entries stream=height -of csv=p=0 "$SRC")

  if [[ $HEIGHT -gt $WIDTH ]]; then
    # Portrait — limit height
    SCALE="scale=-2:min(ih\\,${MAX_DIM})"
  else
    # Landscape — limit width
    SCALE="scale=min(iw\\,${MAX_DIM}):-2"
  fi

  # Backup original when overwriting in-place
  if [[ "$DEST" == "$SRC" ]]; then
    cp "$SRC" "${SRC%.mp4}.bak.mp4" 2>/dev/null || cp "$SRC" "${SRC}.bak"
    TMP="${SRC}.tmp.mp4"
    ffmpeg -y -i "$SRC" \
      -c:v libx264 -crf "$CRF" -preset slow \
      -vf "$SCALE" \
      -movflags +faststart \
      -an \
      "$TMP" 2>/dev/null
    mv "$TMP" "$DEST"
  else
    ffmpeg -y -i "$SRC" \
      -c:v libx264 -crf "$CRF" -preset slow \
      -vf "$SCALE" \
      -movflags +faststart \
      -an \
      "${DEST%.mp4}.mp4" 2>/dev/null
    DEST="${DEST%.mp4}.mp4"
  fi

  NEW_SIZE_KB=$(( $(wc -c < "$DEST") / 1024 ))
  SAVED=$(( SIZE_KB - NEW_SIZE_KB ))
  echo "   ✅  ${SIZE_KB} KB → ${NEW_SIZE_KB} KB  (saved ${SAVED} KB)"

  # Generate WebP poster from first frame
  POSTER="${DEST%.*}-poster.webp"
  if [[ ! -f "$POSTER" ]]; then
    ffmpeg -y -i "$DEST" -vframes 1 -vf "${SCALE},format=yuv420p" "$POSTER" 2>/dev/null
    POSTER_KB=$(( $(wc -c < "$POSTER") / 1024 ))
    echo "   🖼   Poster → $(basename "$POSTER")  (${POSTER_KB} KB)"
  fi

  echo ""
  (( COMPRESSED++ )) || true
done

echo "Done — compressed: $COMPRESSED, skipped: $SKIPPED"
