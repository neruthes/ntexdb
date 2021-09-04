#!/bin/bash

# ssh root@ndvs1.wan.neruthes.xyz 'mkdir -p /root/WEB/ntexdb_dist'
# proxychains -q 
rsync -av --delete _dist/ root@ndvs1.wan.neruthes.xyz:/root/WEB/ntexdb_dist/ --exclude={'tex-tmp','.git'} --delete