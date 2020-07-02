
main() {
    rm -rf ./docs
    mkdir ./docs
    for f in ./sketches/*.js
    do
        file="$(basename $f)"
        sketchpath="./docs/${file%.*}"
        mkdir -p "$sketchpath"
        export CODE=$(cat $f)
        cat ./templates/sketches/index.html | perl -p -e 's/\$\{([^}]+)\}/defined $ENV{$1} ? $ENV{$1} : $&/eg' > "$sketchpath/index.html"
    done
}

main
