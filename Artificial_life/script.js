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
    return Math.random() * 500 + 50;
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
        let fx = 0, fy = 0
        particle2.forEach((j) => {
            a = i;
            b = j;
            dx = a.x - b.x;
            dy = a.y - b.y;
            d = Math.sqrt(dx**2 + dy**2);
            if(d > 0){
                let F = g * 1/d;
                fx += (F * dx);
                fy += (F * dy);
            }
        })
        a.vx = (a.vx + fx);
        a.vy = (a.vy + fy);
        a.x += a.vx;
        a.y += a.vy;
        if(a.x <= 0 || a.x > canvasWidth) a.vx *= -1;
        if(a.y <= 0 || a.y > canvasHeight) a.vy *= -1;
    })

}

yellow = create(10, 'yellow');

function update(){
    m.clearRect(0, 0, canvasWidth, canvasHeight);
    rule(yellow, yellow, -0.05);
    draw(0, 0, '#000', Math.max(canvasWidth, canvasHeight));
    particles.forEach((i)=>{
        draw(i.x, i.y, i.color, 5);
    })
    requestAnimationFrame(update);
}

update()



