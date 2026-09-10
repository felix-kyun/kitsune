#!/usr/bin/env bash

set -euo pipefail
trap cleanup EXIT
cleanup() {
	echo "Cleaning up..."
	# rm -rf "$ICON_WORKING"
}

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ICON_TARGET="${ROOT}/icons/hicolor/scalable/actions"
ICON_SOURCE="${ROOT}/node_modules/lucide-static/icons"

# install deps
pnpm install

# build icons
ICON_WORKING=$(mktemp -d)
mkdir -p "${ICON_TARGET}"
pnpx oslllo-svg-fixer -s "${ICON_SOURCE}" -d "${ICON_WORKING}"

for file in "${ICON_WORKING}"/*; do
	name=$(basename "${file}")
	mv "${file}" "${ICON_TARGET}/${name%.*}-symbolic.${name##*.}"
done
