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
    --range=*)
        PAGES_RANGE="${1/--range=/}"
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
PDFFN="$(basename "$REALPATH")"

echo -e "\nDocument Size:"
du -h "$REALPATH"


### --oss
if [[ $TONASOOS == y ]]; then
    TMPFILE=/tmp/9915e62e-3d15-41cd-9d67-008487ec22ee
    echo -e "\nDocument URLs:"
    OSS_SUBDIR=ntexdb/ saveFileToNasOSS "$REALPATH" -p > $TMPFILE
    cat $TMPFILE
    echo "$TYPE_SLASH$PDFFN  $(grep "oss.udon.pw:2096/p/" $TMPFILE)" >> .osslist
    sort -u .osslist -o .osslist
    rm $TMPFILE
fi

### --jpg | --png
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

### --range
if [[ ! -z "$PAGES_RANGE" ]]; then
    echo "Generating ranged subset."
    RANGED_PDF_PATH="/tmp/${PDFFN/.pdf/}_$PAGES_RANGE"
    pdftk "$REALPATH" cat $PAGES_RANGE output "$RANGED_PDF_PATH".pdf
    du -h "$RANGED_PDF_PATH".pdf
fi
