#!/bin/bash

TYPE=$1
HINT=$2

mkdir -p _dist/tex-tmp
xelatex -output-directory=_dist/tex-tmp $TYPE/$HINT*.tex

mkdir -p _dist/$TYPE
mv _dist/tex-tmp/*.pdf _dist/$TYPE/
