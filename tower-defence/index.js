// 1.Create a player
// 2.Shoot projectiles
// 3.Create enemies
// 4.Detect collision on enemy / projectile hit
// 5.Detect collision on enemy / player hit
// 6.Remove off screen projectiles
// 7.Colorize game
// 8.Shrink enemies on hit
// 9.Create particle explosion on hit 
// 10.Add score
// 11.Add game over UI
// 12.Add restart button
// 13.Add start game button

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');  //ctx api

canvas.width = innerWidth ;
canvas.height = innerHeight -4;

class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
}

class Projectile {
    constructor (x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    update(){
        this.draw();
        this.x += this.velocity.x * speed;
        this.y += this.velocity.y * speed;
    }
}

// const projectile = new Projectile(
//     canvas.width /2,
//     canvas.height /2,
//     5,
//     'white',
//     {x:1,y:1}
//     )
    
const projectiles = [];
function animate (){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width ,canvas.height);
    player.draw();
    projectiles.forEach((projectile) =>{
        projectile.update();
    })
    
}
const speed = 5;
const x = canvas.width / 2;
const y = canvas.height / 2;
const player = new Player(x, y, 31, '#09f9f9');
// player.draw();

addEventListener('click',(e)=>{
    const angle = Math.atan2(
        e.clientY - canvas.height / 2,
        e.clientX - canvas.width / 2 
        )
    console.log(angle);
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    projectiles.push(
        new Projectile(canvas.width /2,canvas.height /2,
            5,'white',velocity)     
    )
})
animate();





