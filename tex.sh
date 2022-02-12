#!/bin/bash

FilePath="$1"
BaseName="$(basename $FilePath)"
TYPE_SLASH="${FilePath/$BaseName/}"

# echo "FilePath=$FilePath"
# echo "BaseName=$BaseName"
# echo "TYPE_SLASH=$TYPE_SLASH"

xelatex -output-directory=_dist/tex-tmp --shell-escape "$FilePath"

mkdir -p "_dist/$TYPE_SLASH"
mv _dist/tex-tmp/*.pdf "_dist/$TYPE_SLASH"

REALPATH=$(realpath "_dist/${FilePath/.tex/.pdf}")
du -h "$REALPATH"
