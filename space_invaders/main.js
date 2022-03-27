// 1. Project setup
// 2. Create a player
// 3. Move the player
// 4. Create projectiles
// 5. Create an invader
// 6. Create and move grids of invaders
// 7. Spawn grids at intvervals
// 7a.Take into account new grid width
// 8. Shoot invaders
// 9. Invaders shoot back
// 10. Enemy explosions
// 11. Create background stars
// 12. Lose condition
// 13. Score 
// 14. Fixed-width canvas






const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth - 3.2;
canvas.height = innerHeight - 3.2;

class Player {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }

        this.rotation = 0;

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

class Invader {
    constructor({ position }) {
        this.velocity = {
            x: 0,
            y: 0
        }
        const image = new Image();
        image.src = './img/spacemonster01.png';
        image.onload = () => {
            const scale = 0.9;
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position = {
                x: position.x,
                y: position.y
            }
        }
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
}

class Grid {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }
        this.velocity = {
            x: 3,
            y: 0
        }
        let width = 55;
        let height = 35;
        this.invaders = []

        const columns = Math.floor(Math.random() * 11) + 5
        const rows = Math.floor(Math.random() * 7) + 1

        this.width = columns * width

        for (let i = 0; i < columns; i++) {
            for (let y = 0; y < rows; y++) {
                this.invaders.push(
                    new Invader({
                        position: {
                            x: i * width,
                            y: y * height
                        }
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
            this.velocity.y = 5
        }
    }
}

let bulletSpeed = 20;
let bulletSize = 10;
let playerSpeedX = 10;
let playerSpeedY = 10;

let SpawnFrames = 50;
let randomSpawnFrames = 100;

const player = new Player();
const projectiles = []
const grids = []
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
    }
}

let frames = 0;
let randomInterval = Math.floor(Math.random() * 500 + 300);
console.log(randomInterval)
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    // invader.update();
    player.update();

    projectiles.forEach((projectile, index) => {
        if (projectile.position.y + projectile.radius <= 0) {
            setTimeout(() => {

                projectiles.splice(index, 1)
            }, 0)
        } else {
            projectile.update()

        }

    })
    grids.forEach((grid, gridIndex) => {
        grid.update()
        grid.invaders.forEach((invader, i) => {
            invader.update({ velocity: grid.velocity })
            projectiles.forEach((projectile, j) => {
                if (projectile.position.y - projectile.radius <= invader.position.y + invader.height &&
                    projectile.position.x + projectile.radius >= invader.position.x - invader.width &&
                    projectile.position.x - projectile.radius <= invader.position.x + invader.width &&
                    projectile.position.y + projectile.radius >= invader.position.y) {

                    // setTimeout(()=>{
                    //     const invaderFound = grid.invaders.find(
                    //     (invader2) => invader2 === invader
                    //     )
                    //     const projectileFound = projectiles.find(projectile2 => projectile2 == projectile)

                    // remove invader and projectile
                    //     if(invaderFound){
                    grid.invaders.splice(i, 1);
                    projectiles.splice(j, 1);

                    if(grid.invaders.length > 0){
                        const firstInvader = grid.invaders[0];
                        const lastInvader = grid.invaders[grid.invaders.length - 1];

                        grid.width = lastInvader.position.x - firstInvader.position.x + lastInvader.width;
                        grid.position.x = firstInvader.position.x;
                    }else{
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
        grids.push(new Grid())
        randomInterval = Math.floor(Math.random() * randomSpawnFrames + SpawnFrames);
        frames = 0;
        console.log(randomInterval)
    }
    console.log(frames);
    frames++;

}

animate();

window.addEventListener("keydown", ({ key }) => {
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
            projectiles.push(new Projectile({
                position: {
                    x: player.position.x + player.width / 2,
                    y: player.position.y
                },
                velocity: {
                    x: 0,
                    y: bulletSpeed * -1
                }
            }))
            break;
    }
});

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
    }

});

