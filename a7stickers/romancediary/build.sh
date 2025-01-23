#!/bin/bash


# Legacy code
# We no longer use Figma; we use ready-made icons.

# function svg_remask() {
#     mkdir -p a7stickers/romancediary/remasked
#     figmapath="$1"
#     remaskedpath="${figmapath/figma/remasked}"
#     figmapath="$figmapath" remaskedpath="$remaskedpath" node a7stickers/romancediary/remask.js
# }

# find a7stickers/romancediary/figma -name "icon-*.svg" | while read -r line; do
#     outpath="a7stickers/romancediary/png/$(basename "$line" | sed 's/svg$/png/')"
#     svg_remask "$line"
#     echo rsvg-convert "${line/figma/remasked}" -z1 -o "$outpath"
#     rsvg-convert "${line/figma/remasked}" -z1 -o "$outpath"
# done







# Generate png3
# If we change icons, this section still needs to be run.

# mkdir -p a7stickers/romancediary/png3
# ls a7stickers/romancediary/png2/*.png | while read -r infile;
#     do magick "$infile" -fuzz 10% -fill '#FFF1C6' -colorize 100 "${infile/png2/png3}"
# done






# What really matters
node a7stickers/romancediary/make_entropy.js
