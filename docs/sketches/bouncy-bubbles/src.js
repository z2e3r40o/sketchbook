let sketch = function(p) {
    let numBalls = 13;
    let spring = 0.05;
    let gravity = 0.03;
    let friction = -0.9;
    let balls = [];

    p.setup = function() {
        p.createCanvas(720, 400);
        for (let i = 0; i < numBalls; i++) {
            balls[i] = new Ball(
                p.random(p.width),
                p.random(p.height),
                p.random(30, 70),
                i,
                balls
            );
        }
        p.noStroke();
        p.fill(255, 204);
    }

    p.draw = function() {
        p.background(0);
        balls.forEach(ball => {
            ball.collide();
            ball.move();
            ball.display();
        });
    }

    class Ball {
        constructor(xin, yin, din, idin, oin) {
            this.x = xin;
            this.y = yin;
            this.vx = 0;
            this.vy = 0;
            this.diameter = din;
            this.id = idin;
            this.others = oin;
        }

        collide() {
            for (let i = this.id + 1; i < numBalls; i++) {
                // console.log(others[i]);
                let dx = this.others[i].x - this.x;
                let dy = this.others[i].y - this.y;
                let distance = p.sqrt(dx * dx + dy * dy);
                let minDist = this.others[i].diameter / 2 + this.diameter / 2;
                //   console.log(distance);
                //console.log(minDist);
                if (distance < minDist) {
                    //console.log("2");
                    let angle = p.atan2(dy, dx);
                    let targetX = this.x + p.cos(angle) * minDist;
                    let targetY = this.y + p.sin(angle) * minDist;
                    let ax = (targetX - this.others[i].x) * spring;
                    let ay = (targetY - this.others[i].y) * spring;
                    this.vx -= ax;
                    this.vy -= ay;
                    this.others[i].vx += ax;
                    this.others[i].vy += ay;
                }
            }
        }

        move() {
            this.vy += gravity;
            this.x += this.vx;
            this.y += this.vy;
            if (this.x + this.diameter / 2 > p.width) {
                this.x = p.width - this.diameter / 2;
                this.vx *= friction;
            } else if (this.x - this.diameter / 2 < 0) {
                this.x = this.diameter / 2;
                this.vx *= friction;
            }
            if (this.y + this.diameter / 2 > p.height) {
                this.y = p.height - this.diameter / 2;
                this.vy *= friction;
            } else if (this.y - this.diameter / 2 < 0) {
                this.y = this.diameter / 2;
                this.vy *= friction;
            }
        }

        display() {
            p.ellipse(this.x, this.y, this.diameter, this.diameter);
        }
    }

};

new p5(sketch, window.document.getElementById('sketch'));
