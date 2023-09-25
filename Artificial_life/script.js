// Reference: https://www.youtube.com/watch?v=0Kx4Y9TVMGg&ab_channel=Brainxyz

let canvas = document.querySelector('#life');
let m = canvas.getContext('2d');
let particles = [];
let canvasWidth = window.innerWidth - 0;
let canvasHeight = window.innerHeight - 5;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

function draw(x, y, c, s){
    m.fillStyle = c;
    m.fillRect(x, y, s, s);
}

function particle(x, y, c){
    return {x, y, 'vx':0, 'vy':0, 'color':c};
}

function random(){
    return Math.random() * Math.min(canvasWidth, canvasHeight) + 10;
}

function create(number, color){
    let group = [];
    for(let i = 0; i < number; i++){
        group.push(particle(random(), random(), color));
        particles.push(group[i]);
    }
    return group
}

function rule(particle1, particle2, g){
    particle1.forEach((i) => {
        let a, b ,dx ,dy, d;
        let fx = 0, fy = 0, shrink = 0.998, acc = 0.1, speedLimit = 16;
        particle2.forEach((j) => {
            a = i;
            b = j;
            dx = a.x - b.x;
            dy = a.y - b.y;
            d = Math.sqrt(dx**2 + dy**2);
            if(d > 0){
                if(d > 250) return;
                let F = g * 1/(d*1) * acc;
                fx += (F * dx);
                fy += (F * dy);
            }
        })
        a.vx = (a.vx + fx) * shrink;
        a.vy = (a.vy + fy) * shrink;
        a.x += a.vx;
        a.y += a.vy;
        if(a.x <= 0 || a.x > canvasWidth){
            // Assign which one of a.x is closer to the left or right bounding
            // To avoid the particles go out of boundary
            a.x = Math.abs(a.x) > Math.abs(a.x - canvasWidth) ?  canvasWidth : 0;
            a.vx *= -1;
            
        }
        if(a.y <= 0 || a.y > canvasHeight){
            a.y = Math.abs(a.y) > Math.abs(a.y - canvasHeight) ? canvasHeight : 0;
            a.vy *= -1;
        }
        if(Math.sqrt(a.vx**2 + a.vy**2) > speedLimit) a.vx *= 0, a.vy *= 0
        // if(a.x <= 0 || a.x > canvasWidth) a.vx *= -1;
        // if(a.y <= 0 || a.y > canvasHeight) a.vy *= -1;
    })

}

yellow = create(200, 'yellow');
red = create(170, 'red');
blue = create(200, 'blue');
white = create(1, 'white');
function update(){
    m.clearRect(0, 0, canvasWidth, canvasHeight);
    rule(yellow, yellow, -0.008);
    rule(yellow, red, -0.032);
    rule(yellow, blue, 0.04);
    rule(yellow, white, 1.4);
    rule(red, red, -0.01);
    rule(red, yellow, -0.04);
    rule(red, blue, -0.04);
    rule(red, white, 1.4);
    rule(blue, blue, -0.01);
    rule(blue, red, -0.024);
    rule(blue, yellow, 0.04);
    rule(blue, white, 1.4);
    rule(white, white, 0.001);
    rule(white, yellow, -0.005);
    rule(white, red, -0.005);
    rule(white, blue, -0.005);

    draw(0, 0, '#000', Math.max(canvasWidth, canvasHeight));
    particles.forEach((i)=>{
        if(i.color == 'white'){
            draw(i.x, i.y, i.color, 10);
        }else{
            draw(i.x, i.y, i.color, 4);
        }
    })
    requestAnimationFrame(update);
}

update()



