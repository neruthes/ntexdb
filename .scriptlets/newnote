#!/bin/bash

# cp "notes/.tmpl.tex" "notes/note-$(date +%Y%m%d)-$RANDOM.tex"


NEWFN="notes/note-$(date +%Y%m%d)-$RANDOM.tex"

sed "s|DATESTRING|$(date '+%Y-%m-%d')|" notes/.tmpl.tex > "$NEWFN"
