#!/usr/bin/env bash
# Compiles the design-system stylesheet for /design-sync (cfg.cssEntry).
# @siplist/ui ships source-only (no dist) and is styled with Tailwind v4 (CSS-first).
# This scans the component source so every utility a component can emit is generated,
# pulls in the shared theme tokens (@siplist/tailwind-config) and the Source Sans 3 font,
# and stages the font files next to the css so the @font-face ./files/*.woff2 urls resolve.
#
# Run from the repo root (it cds there itself). Re-run before package-build on any re-sync.
set -euo pipefail
cd "$(dirname "$0")/.."

# Output lives INSIDE packages/ui: the converter bounds cfg.cssEntry to the
# package dir (PKG_DIR), so a repo-root path would be rejected. packages/ui/.cache
# is gitignored (repo .gitignore: ".cache"), and buildCmd regenerates it each run.
OUTDIR="packages/ui/.cache/ds-sync"
mkdir -p "$OUTDIR"

# Temp Tailwind entry lives inside apps/frontend so bare @imports
# (tw-animate-css, @fontsource-variable/source-sans-3) resolve via its node_modules.
INPUT="apps/frontend/.ds-styles.input.css"
cat > "$INPUT" <<'CSS'
@import "tailwindcss";
@import "tw-animate-css";
@import "@siplist/tailwind-config/theme";
@import "@fontsource-variable/source-sans-3";

@custom-variant dark (&:where(.dark, .dark *));
@custom-variant light (&:where(.light, .light *));
@custom-variant auto (&:where(.auto, .auto *));

@source "../../packages/ui/src/components/*.{ts,tsx}";
@source "../../.design-sync/previews/*.{ts,tsx}";
CSS

npx -y @tailwindcss/cli@4.2.4 -i "$INPUT" -o "$OUTDIR/ds-styles.css" --optimize
rm -f "$INPUT"

# Stage the woff2 files so the compiled @font-face url("./files/*.woff2") resolve
# relative to ds-styles.css; the converter copies referenced ones into fonts/.
rm -rf "$OUTDIR/files"
cp -r apps/frontend/node_modules/@fontsource-variable/source-sans-3/files "$OUTDIR/files"

echo "ds-styles.css: $(wc -c < "$OUTDIR/ds-styles.css") bytes; fonts staged: $(ls "$OUTDIR/files" | wc -l)"
