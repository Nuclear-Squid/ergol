#!/usr/bin/env sh
kalamine bmp.yaml --out bmp.keylayout && git restore -p && cp bmp.keylayout ~/Library/Keyboard\ Layouts/
