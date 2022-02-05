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

// Player
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
// Projectile
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
        this.x += this.velocity.x * bulletSpeed;
        this.y += this.velocity.y * bulletSpeed;
    }
}

// const projectile = new Projectile(
//     canvas.width /2,
//     canvas.height /2,
//     5,
//     'white',
//     {x:1,y:1}
//     )
    
// Enemy
class Enemy {
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
        this.x += this.velocity.x ;
        this.y += this.velocity.y ;
    }
}
const enemies = [];
const projectiles = [];

// spawnEnemies 
function spawnEnemies(){
    setInterval(()=> {
        const radius = Math.random() * 20 + 10;
        let x;
        let y;
        if ( Math.random() < 0.5 ){   
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height ;
        }
        else{
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }
        const color = "#f6f394"
        const angle = Math.atan2(
            playerY - y,
            playerX - x 
            )
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        enemies.push(new Enemy(x,y,radius,color,velocity))
        // console.log(enemies);
    },10)
}
let animationId
function animate (){
    animationId = requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width ,canvas.height);
    player.draw();
    projectiles.forEach((projectile,index) =>{
        projectile.update();

        // remove from edges of screen
        if(projectile.x - projectile.radius < 0){  //left 
            setTimeout(()=>{
                projectiles.splice(index,1);
            },0)
        }
        if(projectile.x + projectile.radius > canvas.width ){ //right
            setTimeout(()=>{
                projectiles.splice(index,1);

            },0)
        }
        if(projectile.y - projectile.radius < 0){  //top
            setTimeout(()=>{
                projectiles.splice(index,1);
            },0)
        }
        if(projectile.y + projectile.radius > canvas.height){  //top
            setTimeout(()=>{
                projectiles.splice(index,1);
            },0)
        }
    })
    
    enemies.forEach((enemy, index) =>{
        enemy.update();

        const distance = Math.hypot(player.x - enemy.x,player.y - enemy.y);
        if(distance - player.radius - enemy.radius < -1 ){
            cancelAnimationFrame(animationId);
        }
        projectiles.forEach((projectile,projectileIndex)=>{
            const distance = Math.hypot(projectile.x - enemy.x ,projectile.y - enemy.y);   //hypotenuse , the x and y distance
            
            //  objects touch
            if(distance - projectile.radius - enemy.radius < -1  ){  //數字越大就越外面觸發
                setTimeout(()=> {
                    enemies.splice(index, 1);
                    projectiles.splice(projectileIndex, 1);
                },0)

            }
        })
    })
    
}
const bulletSpeed = 3;
const playerX = canvas.width / 2;
const playerY = canvas.height / 2;
const player = new Player(playerX, playerY, 31, '#09f9f9');

addEventListener('mousemove',(e)=>{
    const angle = Math.atan2(
        e.clientY - playerY,
        e.clientX - playerX 
        )
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    projectiles.push(
        new Projectile(playerX,playerY,
            5,'white',velocity)     
    )
})
animate();
spawnEnemies();





