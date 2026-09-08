#!/usr/bin/env bash

while :; do
	$(dirname ${BASH_SOURCE[0]})/kitsune
	echo "Restarting..."
	sleep 0.1
done
