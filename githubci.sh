#!/bin/bash

### Install dependencies

yes | apt install latex-cjk-all texlive-full


### Real compilation

function normalBuild() {
    for FileName in $(ls $1); do
        bash tex.sh $1/$FileName       
    done
}

for FileType in letters office; do
    normalBuild $FileType
done