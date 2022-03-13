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
        this.radius = 10
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
    constructor({position}) {
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
    update({velocity}) {
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

        const columns = Math.floor(Math.random() * 13) +10
        const rows = Math.floor(Math.random() * 7) +1

        this.width = columns * width

        for (let i = 0; i < columns; i++) {
            for (let y = 0; y < rows; y++){
                this.invaders.push(
                new Invader({
                    position: {
                        x: i * width,
                        y: y * height
                    }
                }))
            }

        }
        console.log(this.invaders)
    }
    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.velocity.y = 0
        if(this.position.x + this.width >= canvas.width || this.position.x <= 0){
            this.velocity.x = -this.velocity.x
            this.velocity.y = 5
        }
    }
}


const player = new Player();
const projectiles = []
const grids = [new Grid()]
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
    grids.forEach((grid) => {
        grid.update()
        grid.invaders.forEach(invader => {
            invader.update({velocity:grid.velocity})
        })
    })

    if (keys.a.pressed && player.position.x >= 0) {
        player.velocity.x = -7;
        player.rotation = -0.15;
    }
    else if (keys.d.pressed && player.position.x <= canvas.width - player.width) {
        player.velocity.x = 7;
        player.rotation = 0.15;
    }
    else if (keys.w.pressed && player.position.y >= 0) {
        player.velocity.y = -7;
    }
    else if (keys.s.pressed && player.position.y <= canvas.height - player.height) {
        player.velocity.y = 7;
    }
    else {
        player.velocity.x = 0;
        player.velocity.y = 0;
        player.rotation = 0;
    }
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
                    y: -10
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

