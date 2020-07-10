let sketch = function(p) {
    let WIDTH = 1000;
    let HEIGHT = 600;

    let MIN_STAR_COUNT = 100
    let MAX_STAR_COUNT = 1000;

    let MAX_STAR_SIZE = 2;
    let STAR_COUNT = MIN_STAR_COUNT + p.round(p.random(MAX_STAR_COUNT-MIN_STAR_COUNT));

    function star(originX, originY, size) {
        let dots = 5 * MAX_STAR_SIZE;
        for (var i=0; i<dots; i++) {
            var x = p.random(MAX_STAR_SIZE)-(MAX_STAR_SIZE/2);
            var y = p.random(MAX_STAR_SIZE)-(MAX_STAR_SIZE/2);
            p.point(originX + x, originY + y);
        }
    }

    function nightsky() {
        p.createCanvas(WIDTH, HEIGHT);
        p.background(0);

        for (var i=0; i<STAR_COUNT; i++) {
            var x = p.round(p.random(WIDTH));
            var y = p.round(p.random(HEIGHT));

            var size = 1 + p.abs(p.round(p.randomGaussian(0, MAX_STAR_SIZE)));
            var brightness = (size/MAX_STAR_SIZE) * 100
            p.strokeWeight(1);
            p.stroke(brightness);
            star(x, y, size);
        }
    }

    p.setup = nightsky; 
    p.mousePressed = nightsky;
};

new p5(sketch, window.document.getElementById('sketch'));
