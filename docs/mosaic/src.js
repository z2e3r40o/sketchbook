let sketch = function(p) {
    let WIDTH = 1000;
    let HEIGHT = 600;

    let UNIT = 20;

    let COLUMNS = WIDTH / UNIT;
    let ROWS = HEIGHT / UNIT;

    let EMPTY = 0;

    let MAX_BOX_SIZE = 5;

    function makegrid(columns, rows) {
        var grid = new Array(columns);
        for (var x=0; x<columns; x++) {
            grid[x] = new Array(rows);
            grid[x].fill(EMPTY);
        }
        return grid;
    }

    function lookahead(grid, fromx, fromy, limit) {
        var countx = 0;
        var county = 0;
        for (var x=fromx; x<p.min(fromx+limit, COLUMNS); x++) {
            if (grid[x][fromy] == EMPTY) {
                countx++;
            } else {
                break;
            }
        }
        for (var y=fromy; y<p.min(fromy+limit, ROWS); y++) {
            if (grid[fromx][y] == EMPTY) {
                county++;
            } else {
                break;
            }
        }
        return p.min(countx, county);
    }

    function populate(grid, topx, topy, size, boxid) {
        let bottomx = topx + size;
        let bottomy = topy + size;
        for (var x=topx; x<bottomx; x++) {
            for (var y=topy; y<bottomy; y++) {
                grid[x][y] = boxid;
            }
        }
    }

    function boxcolor(colors, id) {
        if (!(id in colors)) {
            // cluster around the grays
            let gray = p.randomGaussian(150, 90);
            colors[id] = p.color(gray);
        }
        return colors[id];
    }

    function mosaic() {
        p.createCanvas(WIDTH, HEIGHT);
        p.noStroke();

        // initialize grid memory
        var grid = makegrid(COLUMNS, ROWS);

        // populate grid
        var boxid = 1;
        var colors = {};
        for (var y=0; y<ROWS; y++) {
            for (var x=0; x<COLUMNS; x++) {
                if (grid[x][y] != EMPTY) {
                    continue;
                }

                // track box
                //
                // before a size can be picked, it must be known which of
                // these has the smallest value:
                //  - max size
                //  - the number of empty cells to the right
                //  - the total number of cells remaining to the right and below
                var emptycells = lookahead(grid, x, y, MAX_BOX_SIZE);
                var factor = p.min(emptycells, COLUMNS-x, ROWS-y);
                var size = p.ceil(p.random(factor));
                populate(grid, x, y, size, boxid);

                // draw box
                p.fill(boxcolor(colors, boxid));
                p.square(x * UNIT, y * UNIT, size * UNIT);

                // new box
                boxid++;
                // move x ahead
                x += size-1;
            }
        }
    }

    p.setup = mosaic;
    p.mousePressed = mosaic;
};

new p5(sketch, window.document.getElementById('sketch'));
