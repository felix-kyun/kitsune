#!/usr/bin/env bash

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

while :; do
	"${ROOT}"/kitsune
	echo "Exited, Restarting..."
	sleep 1
done
