// 1. Project setup v
// 2. Create a player v
// 3. Move the player v                     2022/3/6
// 4. Create projectiles v
// 5. Create an invader v
// 6. Create and move grids of invaders v   2022/3/13
// 7. Spawn grids at intvervals v
// 7a.Take into account new grid width v
// 8. Shoot invaders v                      2022/3/27
// 9. Invaders shoot back, player automatic shooting, shooting tilt (take careful case-sensitive) v 2022/4/5  
// 10. Enemy explosions
// 11. Create background stars (care array name)v 2022/4/9
// 12. Lose condition v
// 13. Score v
// 14. Fixed-width canvas v 
// ex. Add life and damage function v 2022/4/10




const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const scoreNum = document.querySelector('.scoreNum');

canvas.width = innerWidth - 3.2;
canvas.height = innerHeight - 3.2;
// canvas.width = 800;
// canvas.height = 450;

// particle
let particleCounts = 15;
let particleSpeed = 4;
let particleSize = 4;

// bullet
let bulletDamage = 100;
let bulletCounts = 1;
let bulletSpeed = 10;
let bulletSize = 6;
let bulletTilt = 1;

// player
let playerLife = 300;
let playerSpeedX = 10;
let playerSpeedY = 10;
let playerShootTime = 300;
let isPlayerAutoShoot = true;

// invader
let invaderDamage = 100;
let invaderLife = 200;
let invaderScale = 0.8;
let invaderWidth = 50;
let invaderHeight = 30;
let invaderAttackFrames = 30;
let invaderProjectilesSpeed = 10;
let invaderSpeedY = 30;
let invaderSpeedX = 5;
let invaderColumns = 1;
let invaderRows = 1;
let invaderRandomColumns = 4;
let invaderRandomRows = 5;
let SpawnFrames = 100;
let randomSpawnFrames = 100;

// Background
let BGParticleCounts = 50;
let BGParticleSpeed = 0.5;

// game
let score = 0;
let frames = 0;
let randomInterval = Math.floor(Math.random() * randomSpawnFrames + SpawnFrames)
let gamePauseTime = 1600;
let game = {
    over: false,
    active: true
}

// --------------devMode ---------------
let devMode = false;
if (devMode) {

particleCounts = 15;
particleSpeed = 4;
particleSize = 4;

bulletDamage = 100;
bulletCounts = 3;
bulletSpeed = 15;
bulletSize = 6;
bulletTilt = 1;

playerLife = 3000;
playerSpeedX = 10;
playerSpeedY = 10;
playerShootTime = 20;
isPlayerAutoShoot = true;

invaderDamage = 100;
invaderLife = 100;
invaderScale = 0.8;
invaderWidth = 50;
invaderHeight = 30;
invaderAttackFrames = 30;
invaderProjectilesSpeed = 10;
invaderSpeedY = 30;
invaderSpeedX = 5;
invaderColumns = 24;
invaderRows = 24;
invaderRandomColumns = 10;
invaderRandomRows = 10;
SpawnFrames = 100;
randomSpawnFrames = 100;

BGParticleCounts = 50;
BGParticleSpeed = 0.5;

}


class Player {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }

        this.rotation = 0;
        this.opacity = 1;

        const image = new Image();
        image.src = './img/spaceship01.png';
        image.onload = () => {
            const scale = 1;
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height
            }

        }
    }
    draw() {

        c.save();
        c.globalAlpha = this.opacity
        c.translate(player.position.x + player.width / 2, player.position.y + player.height / 2);

        c.rotate(this.rotation);


        c.translate(-player.position.x - player.width / 2, - player.position.y - player.height / 2);


        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);


        c.restore();
    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;

        }
    }
}

class Projectile {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.radius = bulletSize
    }
    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = "yellow"
        c.fill()

    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

    }
}


class Particle {
    constructor({ position, velocity, radius, color, fades }) {
        this.position = position
        this.velocity = velocity
        this.radius = radius
        this.color = color
        this.opacity = 1
        this.fades = fades
    }
    draw() {
        c.save()
        c.globalAlpha = this.opacity
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color
        c.fill()
        c.closePath()
        c.restore()
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.fades) {

            this.opacity -= 0.01
        }
    }
}


class Invader {
    constructor({ position, life }) {
        this.velocity = {
            x: 0,
            y: 0
        }
        const image = new Image();
        image.src = './img/spacemonster01.png';
        image.onload = () => {
            this.image = image;
            this.width = image.width * invaderScale;
            this.height = image.height * invaderScale;
            this.position = {
                x: position.x,
                y: position.y
            }
        }
        this.life = life
    }
    draw() {

        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    update({ velocity }) {
        if (this.image) {
            this.draw()
            this.position.x += velocity.x;
            this.position.y += velocity.y;
        }
    }

    shoot(invaderProjectiles) {
        invaderProjectiles.push(new InvaderProjectile({
            position: {
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height
            },
            velocity: {
                x: 0,
                y: invaderProjectilesSpeed
            }
        }))
    }
}

class InvaderProjectile {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity

        this.width = 8
        this.height = 16

    }
    draw() {
        c.fillStyle = "white"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

    }
}
class Grid {
    constructor(life) {
        this.position = {
            x: 0,
            y: 0
        }
        this.velocity = {
            x: invaderSpeedX,
            y: 0
        }
        let width = invaderWidth;
        let height = invaderHeight;
        this.invaders = []

        let columns = Math.floor(Math.random() * invaderRandomColumns) + invaderColumns
        let rows = Math.floor(Math.random() * invaderRandomRows) + invaderRows

        this.width = columns * width

        for (let i = 0; i < rows; i++) {
            for (let y = 0; y < columns; y++) {
                this.invaders.push(
                    new Invader({
                        position: { x: i * width, y: y * height },
                        life
                    }))
            }

        }
    }
    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.velocity.y = 0
        if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x
            this.velocity.y = invaderSpeedY
        }
    }
}

const player = new Player();
const projectiles = []
const grids = []
const invaderProjectiles = []
const particles = []

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    space: {
        pressed: false
    },
    j: {
        pressed: false
    },
    k: {
        pressed: false
    }
}





// Bakcground
for (let i = 0; i < BGParticleCounts; i++) {
    particles.push(new Particle({
        position: {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        },
        velocity: {
            x: 0,
            y: BGParticleSpeed
        },
        radius: Math.random() * 2,
        color: "white",
        fades: false
    }))
}

function createParticles({
    object, color, fades
}) {
    particles.push(new Particle({
        position: {
            x: object.position.x + object.width / 2,
            y: object.position.y + object.height / 2
        },
        velocity: {
            x: (Math.random() - 0.5) * particleSpeed,
            y: (Math.random() - 0.1) * particleSpeed
        },
        radius: Math.random() * particleSize,
        color: color || "#AAA8DE",
        fades: fades
    }))
}

function animate() {
    if (!game.active) return;
    requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    // invader.update();
    player.update();

    particles.forEach((particle, i) => {
        if (particle.position.y - particle.radius >= canvas.height) {
            particle.position.x = Math.random() * canvas.width
            particle.position.y = -particle.radius
        }
        if (particle.opacity <= 0) {
            particles.splice(i, 1)
        } else {
            particle.update()
        }
    })

    invaderProjectiles.forEach((invaderProjectile, index) => {
        if (invaderProjectile.position.y + invaderProjectile.height >= canvas.height) {
            invaderProjectiles.splice(index, 1)
        } else {

            invaderProjectile.update()
        }
        // projectiles hits player
        if (invaderProjectile.position.y + invaderProjectile.height >= player.position.y && invaderProjectile.position.x + invaderProjectile.width >= player.position.x && invaderProjectile.position.x <= player.position.x + player.width) {
            // player lose
            playerLife -= invaderDamage;
            invaderProjectiles.splice(index, 1)
            
            for (let i = 0; i < 15; i++) {
                createParticles({
                    object: player,
                    color: 'white',
                    fades: true
                })
            }
            if (playerLife <= 0) {
                player.opacity = 0;
                game.over = true;
                setTimeout(() => {
                    game.active = false;
                }, gamePauseTime)
            }
        }
    })

    projectiles.forEach((projectile, index) => {
        if (projectile.position.y + projectile.radius <= 0) {
            projectiles.splice(index, 1)
        } else {
            projectile.update()

        }

    })
    grids.forEach((grid, gridIndex) => {
        grid.update()

        // spawn projectiles
        if (frames % invaderAttackFrames === 0 && grid.invaders.length > 0) {
            let invaderAttack = Math.floor(Math.random() * grid.invaders.length);

            grid.invaders[invaderAttack].shoot(invaderProjectiles)
        }
        grid.invaders.forEach((invader, i) => {
            invader.update({ velocity: grid.velocity })
            // projectiles hit enemy
            projectiles.forEach((projectile, j) => {
                if (projectile.position.y - projectile.radius <= invader.position.y + invader.height &&
                    projectile.position.x + projectile.radius >= invader.position.x &&
                    projectile.position.x - projectile.radius <= invader.position.x + invader.width &&
                    projectile.position.y + projectile.radius >= invader.position.y) {

                    for (let i = 0; i < particleCounts; i++) {
                        createParticles({
                            object: invader,
                            fades: true
                        });
                    }
                    // setTimeout(()=>{
                    //     const invaderFound = grid.invaders.find(
                    //     (invader2) => invader2 === invader
                    //     )
                    //     const projectileFound = projectiles.find(projectile2 => projectile2 == projectile)

                    // remove invader and projectile
                    //     if(invaderFound){
                    projectiles.splice(j, 1);
                    score += 100;
                    scoreNum.innerHTML = score;
                    invader.life -= bulletDamage;
                    if (invader.life <= 0) {
                        grid.invaders.splice(i, 1);
                    }

                    if (grid.invaders.length > 0) {
                        const firstInvader = grid.invaders[0];
                        const lastInvader = grid.invaders[grid.invaders.length - 1];

                        grid.width = lastInvader.position.x - firstInvader.position.x + lastInvader.width;
                        grid.position.x = firstInvader.position.x;
                    } else {
                        grids.splice(gridIndex, 1);
                    }
                    //     }
                    // },0)
                }
            })
        })
    })

    if (keys.a.pressed && player.position.x >= 0) {
        player.velocity.x = playerSpeedX * -1;
        player.rotation = -0.15;
    }
    else if (keys.d.pressed && player.position.x <= canvas.width - player.width) {
        player.velocity.x = playerSpeedX * 1;
        player.rotation = 0.15;
    }
    else if (keys.w.pressed && player.position.y >= 0) {
        player.velocity.y = playerSpeedY * -1;
    }
    else if (keys.s.pressed && player.position.y <= canvas.height - player.height) {
        player.velocity.y = playerSpeedY * 1;
    }
    else {
        player.velocity.x = 0;
        player.velocity.y = 0;
        player.rotation = 0;
    }
    // spawning enemies
    if (frames % randomInterval === 0) {
        grids.push(new Grid(invaderLife))
        randomInterval = Math.floor(Math.random() * randomSpawnFrames + SpawnFrames);
        frames = 0;
        console.log(randomInterval)
    }
    frames++;


}

animate();

function playerShootFn() {
    for (let i = 0; i < bulletCounts; i++) {
        projectiles.push(new Projectile({
            position: {
                x: player.position.x + player.width / 2,
                y: player.position.y
            },
            velocity: {
                x: Math.random() * bulletTilt - bulletTilt / 2,
                y: bulletSpeed * -1
            }
        }))
    }
}

window.addEventListener("keydown", ({ key }) => {
    if (game.over) return;
    switch (key) {

        case 'a':
            keys.a.pressed = true;
            break;

        case 'd':
            keys.d.pressed = true;

            break;

        case 'w':
            keys.w.pressed = true;

            break;

        case 's':
            keys.s.pressed = true;

            break;

        case ' ':
            keys.space.pressed = true;
            playerShootFn();
            break;
        case 'j':
            keys.j.pressed = true;
            playerShootFn();
            break;
        case 'k':
            keys.k.pressed = true;
            playerShootFn();
            break;
    }
});

let playerShoot;

if (isPlayerAutoShoot) {
    playerShoot = setInterval(playerShootFn, playerShootTime);

}

window.addEventListener("keyup", ({ key }) => {
    switch (key) {

        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;

            break;
        case 'w':
            keys.w.pressed = false;

            break;
        case 's':
            keys.s.pressed = false;

            break;
        case ' ':
            keys.space.pressed = false;

            break;
        case 'j':
            keys.space.pressed = false;

            break;
        case 'k':
            keys.space.pressed = false;

            break;
    }

});

