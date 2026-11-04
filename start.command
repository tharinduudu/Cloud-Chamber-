#!/bin/sh
cd -- "$(dirname -- "$0")" || exit 1
python3 -m http.server 8792 --bind 127.0.0.1
