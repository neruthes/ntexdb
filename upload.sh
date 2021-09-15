#!/bin/bash

# ssh root@ndvs1.wan.neruthes.xyz 'mkdir -p /root/WEB/githubdist/ntexdb'
# proxychains -q 
rsync -av --delete _dist/ root@ndvs1.wan.neruthes.xyz:/root/WEB/githubdist/ntexdb/ --exclude={'tex-tmp','.git'}

tar cvf dist.tar.xz --exclude tex-tmp --exclude .git _dist

scp dist.tar.xz root@ndvs1.wan.neruthes.xyz:/root/WEB/githubdist/ntexdb/dist.tar.xz