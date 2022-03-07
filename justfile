rphm:
    ### Feed the draft into base
    cat private/rphm-book-2022-draft.tex > private/rphm-book-2022.tex
    echo "And now run ./tex.sh private/rphm-book-2022.tex"

private:
    bash -c "cd $PWD/private; git add .; git commit -m 'autocommit'; git push"
