#!/bin/bash

ENDING="$1"

# Generate background
# node a7stickers/gift-io/svg/giftiobg.js
# rsvg-convert a7stickers/gift-io/svg/giftiobg.js.svg --format=pdf -w3000 -o a7stickers/gift-io/svg/giftiobg.js.svg.pdf

node a7stickers/gift-io/svg/giftiobg-v2.js; rsvg-convert a7stickers/gift-io/svg/giftiobg-v2.js.svg -z2 -o a7stickers/gift-io/svg/giftiobg-v2.js.svg.png


[[ $ENDING == 1 ]] && exit 0

# Make single items...
ntex a7stickers/gift-io/single/GiftIn.tex
# ntex a7stickers/gift-io/single/GiftOut.tex

[[ $ENDING == 2 ]] && exit 0


ntex a7stickers/gift-io/SheetIn.tex
# ntex a7stickers/gift-io/SheetOut.tex

