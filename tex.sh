#!/bin/bash

XELATEXARGS=""
#####################################################################
### Parse arguments. Magic; do not touch.
POSITIONAL_ARGS=()
while [[ $# -gt 0 ]]; do
  case $1 in
    --png)
        TOIMG="png"
        shift # past argument
        ;;
    --jpg)
        TOIMG="jpg"
        shift # past argument
        ;;
    --oss)
        TONASOOS="y"
        shift # past argument
        ;;
    -*|--*)
        echo "Unknown option $1"
        exit 1
        ;;
    *)
        POSITIONAL_ARGS+=("$1") # save positional arg
        shift # past argument
        ;;
  esac
done
set -- "${POSITIONAL_ARGS[@]}" # restore positional parameters
#####################################################################



FilePath="$1"
BaseName="$(basename $FilePath)"
TYPE_SLASH="${FilePath/$BaseName/}"

# echo "FilePath=$FilePath"
# echo "BaseName=$BaseName"
# echo "TYPE_SLASH=$TYPE_SLASH"

xelatex $XELATEXARGS \
    -output-directory=_dist/tex-tmp \
    -shell-escape \
    "$FilePath"

mkdir -p "_dist/$TYPE_SLASH"
mv _dist/tex-tmp/*.pdf "_dist/$TYPE_SLASH"

REALPATH=$(realpath "_dist/${FilePath/.tex/.pdf}")

echo -e "\nDocument Size:"
du -h "$REALPATH"

if [[ $TONASOOS == y ]]; then
    echo -e "\nDocument URLs:"
    OSS_SUBDIR=ntexdb/ saveFileToNasOSS "$REALPATH" -p
fi

case "$TOIMG" in
    jpg|png)
        IMGPATH="/tmp/$(basename "$REALPATH").$TOIMG"
        if [[ -e "$IMGPATH" ]]; then
            rm "$IMGPATH" 2>/dev/null
        fi
        pdftoimg "$REALPATH" "$IMGPATH" >/dev/null 2>&1
        echo "Made image:" "$IMGPATH"
        if [[ $TONASOOS == y ]]; then
            echo -e "\nImage URLs:"
            OSS_SUBDIR=ntexdb-img/ saveFileToNasOSS "$IMGPATH"
        fi
        ;;
esac
