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

canvas.width = innerWidth;
canvas.height = innerHeight - 4;

const levelNumber = document.querySelector('.levelNumber')
const scoreNumber = document.querySelector('.scoreNumber');
const goldNumber = document.querySelector('.goldNumber');
const startBtn = document.querySelector('#startBtn');
const container = document.querySelector('.container');
const endScore = document.querySelector("#endScore");

const skill1 = document.querySelector('.skill1');
const skill2 = document.querySelector('.skill2');
const skill3 = document.querySelector('.skill3');
const skill4 = document.querySelector('.skill4');
const skill5 = document.querySelector('.skill5');

let skill1LV = document.querySelector('.skill1Level');
let skill2LV = document.querySelector('.skill2Level');
let skill3LV = document.querySelector('.skill3Level');
let skill4LV = document.querySelector('.skill4Level');
let skill5LV = document.querySelector('.skill5Level');

let skill1GD = document.querySelector('.skill1Gold');
let skill2GD = document.querySelector('.skill2Gold');
let skill3GD = document.querySelector('.skill3Gold');
let skill4GD = document.querySelector('.skill4Gold');
let skill5GD = document.querySelector('.skill5Gold');

let skill1Gold = 100;
let skill2Gold = 100;
let skill3Gold = 1000;
let skill4Gold = 10000;
let skill5Gold = 1000;
let skill1Level = 1;
let skill2Level = 1;
let skill3Level = 1;
let skill4Level = 1;
let skill5Level = 1;

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
    constructor(x, y, radius, color, velocity) {
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

    update() {
        this.draw();
        this.x += this.velocity.x * bulletSpeed;
        this.y += this.velocity.y * bulletSpeed;
    }
}

// Enemy
class Enemy {
    constructor(x, y, radius, color, velocity) {
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

    update() {
        this.draw();
        this.x += this.velocity.x * enemySpeed;
        this.y += this.velocity.y * enemySpeed;
    }
}
// the touch particle
class Particle {
    constructor(x, y, radius, color, velocity, alpha) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }

    draw() {
        c.save();
        c.beginPath();
        c.globalAlpha = this.alpha;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.restore();
    }

    update() {
        this.draw();
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.x += this.velocity.x * enemySpeed;
        this.y += this.velocity.y * enemySpeed;
        this.alpha -= 0.01;
    }
}
let friction = 0.96;
let bulletSpeed = 3;
let bulletSize = 5;
let bulletDamage = bulletSize * 3.5;
let BulletCount = 1;
let enemyTime = 500;
let enemySpeed = 1;
let enemySize = 30;
let particleSpeed = bulletSpeed * 1.5 + enemySpeed;
let particleCount = 50;
let particleSize = bulletSize / 3;
let playerX = canvas.width / 2;
let playerY = canvas.height / 2;

let score = 0;
let gold = 0;
let hitScore = 10;
let killScore = 25;
let hitGold = 10;
let killGold = 25;
let level = 1;

const skill1buff = 5;
const skill2buff = 1;
const skill3buff = 1;
const skill4buff = 1;
const skill5buff = 5;


let enemies = [];
let projectiles = [];
let particles = [];
let player = new Player(playerX, playerY, 20, '#09f9f9');

function init() {
    enemies = [];
    projectiles = [];
    particles = [];
    player = new Player(playerX, playerY, 20, '#09f9f9');
    score = 0;
    scoreNumber.innerHTML = score;
    endScore.innerHTML = score;
}

let spawnEnemy;
// spawnEnemies 
function spawnEnemies() {
    spawnEnemy = window.setInterval(() => {
        const radius = Math.random() * enemySize + 20;
        let x;
        let y;
        let color;
        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;
        }
        else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }
        if (Math.random() < 0.5) {
            if (Math.random() < 0.5) {
                color = "hsl(4, 79%, 30%)"
            }
            else {
                color = "hsl(271, 34%, 35%)"
            }
        }
        else {
            if (Math.random() < 0.2) {
                color = "hsl(71, 100%, 69%)"
            }
            else {
                color = `hsl(${Math.random() * 360}, 58%, 58%)`
            }
        }
        const angle = Math.atan2(
            playerY - y,
            playerX - x
        )
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        enemies.push(new Enemy(x, y, radius, color, velocity))
        // console.log(enemies);
    }, enemyTime)
}

let animationId
function animate() {
    animationId = requestAnimationFrame(animate);
    c.fillStyle = "rgba(0,0,0,0.3)"
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.draw();
    particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
            particles.splice(index, 1);
        } else {
            particle.update();
        }
    });
    projectiles.forEach((projectile, index) => {
        projectile.update();

        // remove from edges of screen
        if (projectile.x - projectile.radius < -30 || //left
            projectile.x + projectile.radius > canvas.width + 30 || //right
            projectile.y - projectile.radius < -30 ||  //top
            projectile.y + projectile.radius > canvas.height + 30  //bottom
        ) {
            // setTimeout(()=>{
            projectiles.splice(index, 1)
            // },0)
        }
    })

    enemies.forEach((enemy, index) => {
        enemy.update();
        const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        //end game 
        if (distance - player.radius - enemy.radius < -1) {
            cancelAnimationFrame(animationId);
            clearInterval(spawnEnemy);
            container.style.display = 'flex';
            endScore.innerHTML = score;
        }
        // particles.forEach((particle, particleIndex)=>{
        //     const distance = Math.hypot(particle.x - enemy.x, particle.y - enemy.y);
        //     if(distance - particle.radius - enemy.radius < -1 ){
        //         particles.splice(particleIndex,1);
        //         if(enemy.raidus - 5 > 10){
        //             gsap.to(enemy, {
        //                 radius: enemy.radius - 5
        //             })
        //         }else{
        //             enemies.splice(index,1);
        //         }
        //     }
        // })
        projectiles.forEach((projectile, projectileIndex) => {
            const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);   //hypotenuse , the x and y distance

            //  when projectile touch enemy
            if (distance - projectile.radius - enemy.radius < -3) {  //數字越大就越外面觸發

                // create explosions
                for (let i = 0; i < enemy.radius * 0.5; i++) {
                    particles.push(new Particle(projectile.x,
                        projectile.y,
                        Math.random() * particleSize + enemy.radius * 0.02 + 1,
                        enemy.color,
                        {
                            x: (Math.random() - 0.5) * (Math.random() * particleSpeed),
                            y: (Math.random() - 0.5) * (Math.random() * particleSpeed)
                        }))
                };
                projectiles.splice(projectileIndex, 1);
                if (enemy.radius - bulletDamage > 10) {

                    // increase our score
                    score += hitScore;
                    scoreNumber.innerHTML = score;
                    gold += hitGold;
                    goldNumber.innerHTML = gold;

                    gsap.to(enemy, {
                        radius: enemy.radius - bulletDamage
                    })
                }
                else {
                    for (let i = 0; i < enemy.radius * 1; i++) {
                        particles.push(new Particle(enemy.x,
                            enemy.y,
                            Math.random() * particleSize + enemy.radius * 0.08 + 1,
                            enemy.color,
                            {
                                x: (Math.random() - 0.5) * (Math.random() * particleSpeed) * 2,
                                y: (Math.random() - 0.5) * (Math.random() * particleSpeed) * 2
                            }))
                    };
                    // remove from scene altogether
                    score += killScore;
                    scoreNumber.innerHTML = score;
                    gold += killGold;
                    goldNumber.innerHTML = gold;
                    // setTimeout(() => {
                    enemies.splice(index, 1);
                    // }, 0)
                }

            }
        })
    })

}
window.addEventListener('click', (e) => {
    const angle = Math.atan2(
        e.clientY - playerY,
        e.clientX - playerX
    )
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    projectiles.push(
        new Projectile(playerX, playerY,
            bulletSize, 'white', velocity)
    )
})
skill1.addEventListener("click", () => {
    if (gold >= skill1Gold) {
        gold -= skill1Gold;
        goldNumber.innerHTML = gold;
        skill1Gold += 100;
        skill1GD.innerHTML = skill1Gold;
        skill1Level++;
        skill1LV.innerHTML = skill1Level;
        bulletDamage += skill1buff;
    };
})
skill2.addEventListener("click", () => {
    if (gold >= skill2Gold) {
        gold -= skill2Gold;
        goldNumber.innerHTML = gold;
        skill2Gold += 100;
        skill2GD.innerHTML = skill2Gold;
        skill2Level++;
        skill2LV.innerHTML = skill2Level;
        bulletSpeed += skill2buff;
    };
})
skill3.addEventListener("click", () => {
    if (gold >= skill3Gold) {
        gold -= skill3Gold;
        goldNumber.innerHTML = gold;
        skill3Gold += 1000;
        skill3GD.innerHTML = skill3Gold;
        skill3Level++;
        skill3LV.innerHTML = skill3Level;
        bulletSize += skill3buff;
    };
})
skill4.addEventListener("click", () => {
    if (gold >= skill4Gold) {
        gold -= skill4Gold;
        goldNumber.innerHTML = gold;
        skill4Gold += 10000;
        skill4GD.innerHTML = skill4Gold;
        skill4Level++;
        skill4LV.innerHTML = skill4Level;
        BulletCount += skill4buff;
    };
})
skill5.addEventListener("click", () => {
    if (gold >= skill5Gold) {
        gold -= skill5Gold;
        goldNumber.innerHTML = gold;
        skill5Gold += 1000;
        skill5GD.innerHTML = skill5Gold;
        skill5Level++;
        skill5LV.innerHTML = skill5Level;
        hitGold += skill5buff;
        killGold += skill5buff;
    };
})
startBtn.addEventListener("click", () => {
    init();
    animate();
    spawnEnemies();
    container.style.display = 'none';
})





