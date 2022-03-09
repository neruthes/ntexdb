private:
    bash -c "cd $PWD/private; git add .; git commit -m 'autocommit'; git push"


rphm:
    bash private/.rphm/2022/build.sh


rphmbuildall:
    ntex private/rphm-book-2022-draft.tex
    ntex private/rphm-book-2022-draft.tex --oss
    ntex private/rphm-book-2022.tex
    ntex private/rphm-book-2022.tex --oss
