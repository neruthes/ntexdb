private:
    bash -c "cd $PWD/private; git add .; git commit -m 'autocommit'; git push"
    rsync -av --delete _dist/private/ /home/neruthes/DEV/WEB/githubdist/ntexdb-private-$(cat private/.privatediruuid)/
    pushgithubdistweb


rphmpre:        # RpHM Book 2022: Preprocessing
    bash private/.rphm/2022/build.sh

rphmmake:       # RpHM Book 2022: Actual building
    bash private/.rphm/2022/build.sh
    ntex private/rphm-book-2022-draft.tex
    ntex private/rphm-book-2022-draft.tex --oss
    ntex private/rphm-book-2022.tex
    ntex private/rphm-book-2022.tex --oss


