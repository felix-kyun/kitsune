#!/usr/bin/env bash

set -euo pipefail
shopt -s nullglob

trap cleanup EXIT
cleanup() {
	rm -rf "$ICON_WORKING"
}

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# install deps
pnpm install

# icons
ICON_TARGET="${ROOT}/icons/hicolor/scalable/actions"
ICON_SOURCE="${ROOT}/node_modules/lucide-static/icons"
ICON_WORKING=$(mktemp -d)
mkdir -p "${ICON_TARGET}"
pnpx oslllo-svg-fixer -s "${ICON_SOURCE}" -d "${ICON_WORKING}"

for file in "${ICON_WORKING}"/*; do
	name=$(basename "${file}")
	mv "${file}" "${ICON_TARGET}/${name%.*}-symbolic.${name##*.}"
done

# fonts
FONT_SOURCE="${ROOT}/assets/fonts"
FONT_TARGET="${HOME}/.fonts"
mkdir -p "${FONT_TARGET}"
find "${FONT_SOURCE}" -type f -print0 | xargs -0 cp -t "${FONT_TARGET}"
fc-cache -f

# build
pnpm build
