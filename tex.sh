#!/bin/bash

FilePath=$1
BaseName=$(basename $FilePath)
TYPE_SLASH=${FilePath/$BaseName/}

echo "FilePath=$FilePath"
echo "BaseName=$BaseName"
echo "TYPE_SLASH=$TYPE_SLASH"

xelatex -output-directory=_dist/tex-tmp $FilePath

mkdir -p _dist/$TYPE_SLASH
mv _dist/tex-tmp/*.pdf _dist/$TYPE_SLASH

realpath "_dist/${FilePath/.tex/.pdf}"