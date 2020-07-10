let sketch = function(p) {
    let WIDTH = 1000;
    let HEIGHT = 600;

    let STAR_COUNT = 1000;
    let MAX_STAR_SIZE = 2;

    function nightsky() {
        p.createCanvas(WIDTH, HEIGHT);
        p.background(0);

        for (var i=0; i<STAR_COUNT; i++) {
            var x = p.random(WIDTH);
            var y = p.random(HEIGHT);

            var size = p.round(p.randomGaussian(0, MAX_STAR_SIZE));
            var brightness = (size/MAX_STAR_SIZE) * 255

            p.strokeWeight(size);
            p.stroke(brightness);
            p.point(x, y);
        }
    }

    p.setup = nightsky; 
    p.mousePressed = nightsky;
};

new p5(sketch, window.document.getElementById('sketch'));
