var WIDTH = 600;
var HEIGHT = 400;

var UNIT = 10;

var COLUMNS = WIDTH / UNIT;
var ROWS = HEIGHT / UNIT;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    background(255);

    fill(0);
    strokeWeight(2);
    stroke(255);

    var size = ceil(random(5));
    print(size);
    square(0, 0, size * UNIT);
}

function draw() {
}
