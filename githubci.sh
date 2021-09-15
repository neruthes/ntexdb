#!/bin/bash

echo "Welcome to <githubci.sh> script."

mkdir -p _dist
rm -rf _dist
mkdir -p _dist

# rsync -av rsync://ndvs1.wan.neruthes.xyz/githubdist/ntexdb/ _dist/ --exclude={'tex-tmp','.git'}

rm -f *.tar.xz 2>/dev/null
wget https://githubdist.neruthes.xyz/ntexdb/dist.tar.xz
tar -pxvf dist.tar.xz