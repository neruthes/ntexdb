rphm:
    ### Feed the draft into base
    cat private/rphm-book-2022-draft.tex > private/rphm-book-2022.tex
    ./tex.sh private/rphm-book-2022-draft.tex
    ./tex.sh private/rphm-book-2022-draft.tex --oss
    echo "./tex.sh private/rphm-book-2022.tex"
