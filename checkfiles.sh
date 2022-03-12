#!/bin/bash

DIRLIST=""
for DIR in $(ls _dist); do
    if [[ -d "$DIR" ]] && [[ "$DIR" != "tex-tmp" ]]; then
        DIRLIST="$DIRLIST $DIR "
    fi
done

function _checkdir() {
    DIR="$1"
    echo "[INFO] Checkding directory '$DIR'..."
    for FN in $(ls _dist/$DIR | grep .pdf); do
        _checkfile "$DIR" ${FN/.pdf/.tex}
    done
}
function _checkfile() {
    DIR="$1"
    FN="$2"
    if [[ -e "$DIR/$FN" ]]; then
        printf ""
        # echo "    Found $DIR/$FN"
    else
        echo "!!  Cannot find $DIR/$FN"
    fi
}

# echo "DIRLIST='$DIRLIST'"
for DIR in $DIRLIST; do
    _checkdir "$DIR"
done
