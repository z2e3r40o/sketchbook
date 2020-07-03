#!/usr/bin/env sh

# exit
#   0 - ok
#   1 - incorrect usage
#   2 - sketch already exists

if [ -z "$1" ]
then
    echo "Usage: new-sketch <sketch-name>"
    exit 1
fi

sketchpath="docs/$1"
if [ -d "$sketchpath" ]
then
    echo "sketch '$1' already exists"
    exit 2
else
    mkdir "$sketchpath"
    cp templates/sketch.html "$sketchpath/index.html"
    cp templates/sketch.js   "$sketchpath/src.js"
    echo "sketch '$1' created at '$sketchpath'"
    exit 0
fi
