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
// 13.Add start game 

// Level system     v
// Skill system     v
// Skill reset      v
// Player move      v (= and ==)
// Bullet move with player  v (playerX player.x)
// Add Player Speed skill 
// Close particle effects
// Show damage
// Enemy information
// Skill level up click effects;    
// Weapon system
// Add unique skill
// Add different enemy 
// Add tower


const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');  //ctx api

canvas.width = innerWidth;
canvas.height = innerHeight - 4; //avoid scroll

const levelNumber = document.querySelector('.levelNumber')
const scoreNumber = document.querySelector('.scoreNumber');
const goldNumber = document.querySelector('.goldNumber');
const lifeNumber = document.querySelector('.lifeNumber')

const startBtn = document.querySelector('#startBtn');
const container = document.querySelector('.container');
const endScore = document.querySelector("#endScore");
const timeCount = document.querySelector('.timeCount');
const levelUp = document.querySelector('.levelUp');
const levelDown = document.querySelector('.levelDown');
const breakText = document.querySelector('#breakText');
const lastLevel = document.querySelector('#lastLevel');
const skillReset = document.querySelector('.resetBtn');
const closeBtn = document.querySelector('.closeBtn');
const introBox = document.querySelector('.introBox');
const placeContainer = document.querySelector('.placeContainer');

const skill1 = document.querySelector('.skill1');
const skill2 = document.querySelector('.skill2');
const skill3 = document.querySelector('.skill3');
const skill4 = document.querySelector('.skill4');
const skill5 = document.querySelector('.skill5');
const skill6 = document.querySelector('.skill6');

let skill1LV = document.querySelector('.skill1Level');
let skill2LV = document.querySelector('.skill2Level');
let skill3LV = document.querySelector('.skill3Level');
let skill4LV = document.querySelector('.skill4Level');
let skill5LV = document.querySelector('.skill5Level');
let skill6LV = document.querySelector('.skill6Level');

let skill1GD = document.querySelector('.skill1Gold');
let skill2GD = document.querySelector('.skill2Gold');
let skill3GD = document.querySelector('.skill3Gold');
let skill4GD = document.querySelector('.skill4Gold');
let skill5GD = document.querySelector('.skill5Gold');
let skill6GD = document.querySelector('.skill6Gold');

let skill1Gold = 100;
let skill2Gold = 200;
let skill3Gold = 700;
let skill4Gold = 8000;
let skill5Gold = 1000;
let skill6Gold = 100;

let skill1GoldReset = 100;
let skill2GoldReset = 200;
let skill3GoldReset = 700;
let skill4GoldReset = 8000;
let skill5GoldReset = 1000;
let skill6GoldReset = 100;

let up1Gold = skill1Gold;
let up2Gold = skill2Gold;
let up3Gold = skill3Gold;
let up4Gold = skill4Gold;
let up5Gold = skill5Gold;
let up6Gold = skill6Gold;

let skill1Level = 1;
let skill2Level = 1;
let skill3Level = 1;
let skill4Level = 1;
let skill5Level = 1;
let skill6Level = 1;

let skill1buff = 2;
let skill2buff = 1;
let skill3buff = 2;
let skill4buff = 1;
let skill5buff = 5;
let skill6buff = 1;

let gameStart = false;
let time = 30;
let levelBreak = [false];
let skillTotalGold = 0;
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
    update() {
        this.draw();
        this.x += playerSpeedX;
        this.y += playerSpeedY;

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
        if (this.radius < 0) return; //avoid enemy with negative radius causing collapses
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
let bulletDamage = 8;
let bulletCount = 1;
let enemyTime = 800;
let enemySpeed = 1;
let enemySize = 30;
let particleSpeed = bulletSpeed * 1.5 + enemySpeed;
let particleCount = 10;
let particleSize = 2;
let playerX = canvas.width / 2;
let playerY = canvas.height / 2;
let playerSpeed = 3;
let playerSpeedX = 0;
let playerSpeedY = 0;

let life = 3;
let relife = 3;
let timer = 1000;
let clearTime = 300;
let shrinkTime = 20;

let score = 0;
let gold = 1000;
let hitScore = 10;
let killScore = 25;
let hitGold = 10;
let killGold = 25;
let level = 1;
let maxLevel = 15;

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
        const radius = Math.random() * (enemySize * level / 2) + (20 * level / 3);
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
            x: (Math.cos(angle)),
            y: (Math.sin(angle))
        }

        enemies.push(new Enemy(x, y, radius, color, velocity));
    }, enemyTime - level * 45)
}

let animationId
function animate() {
    animationId = requestAnimationFrame(animate);
    c.fillStyle = "rgba(0,0,0,0.2)"
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.draw();
    player.update();


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

        if (enemy.x + enemy.radius < 0 ||
            enemy.x - enemy.radius > canvas.width ||
            enemy.y + enemy.radius < 0 ||
            enemy.y - enemy.radius > canvas.height) {
            enemies.splice(index, 1);
            console.log(enemies);
        }

        //end game 
        const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        if (distance - player.radius - enemy.radius < -1) {
            enemies.splice(index, 1);
            life -= 1 * level;
            lifeNumber.innerHTML = life;
            for (let i = 0; i < particleCount + enemy.radius / 20; i++) {
                particles.push(new Particle(enemy.x,
                    enemy.y,
                    Math.random() * particleSize * 0.1 + enemy.radius * 0.1 + 1,
                    enemy.color,
                    {
                        x: (Math.random() - 0.5) * (Math.random() * particleSpeed) * 2,
                        y: (Math.random() - 0.5) * (Math.random() * particleSpeed) * 2
                    }))
            };
            if (life <= 0) {
                cancelAnimationFrame(animationId);
                clearInterval(spawnEnemy);
                container.style.display = 'flex';
                endScore.innerHTML = score;
                gameStart = false;
                life = relife;
            }
        }
        projectiles.forEach((projectile, projectileIndex) => {
            const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);   //hypotenuse , the x and y distance

            //  when projectile touch enemy
            if (distance - projectile.radius - enemy.radius < -3) {  //數字越大就越外面觸發

                // create explosions
                for (let i = 0; i < particleCount + enemy.radius / 40; i++) {
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

                let enemyShrink;
                if (enemy.radius - bulletDamage > 10) {

                    // increase our score
                    score += hitScore;
                    scoreNumber.innerHTML = score;
                    gold += hitGold + level * 2;
                    goldNumber.innerHTML = gold;
                    //shrink animation
                    enemyShrink = setInterval(() => {
                        enemy.radius -= bulletDamage / (clearTime / shrinkTime);
                        console.log('shrink');
                    }, shrinkTime);
                    setTimeout(() => {
                        clearInterval(enemyShrink);
                        console.log('clear');
                    }, clearTime);
                    // gsap.to(enemy, {
                    //     radius: enemy.radius - bulletDamage
                    // })
                }
                else if (enemy.radius - bulletDamage < 10) {
                    clearInterval(enemyShrink);
                    for (let i = 0; i < particleCount + enemy.radius / 20; i++) {
                        particles.push(new Particle(enemy.x,
                            enemy.y,
                            Math.random() * particleSize * 0.1 + enemy.radius * 0.1 + 1,
                            enemy.color,
                            {
                                x: (Math.random() - 0.5) * (Math.random() * particleSpeed) * 2,
                                y: (Math.random() - 0.5) * (Math.random() * particleSpeed) * 2
                            }))
                    };
                    // remove from scene altogether
                    score += killScore;
                    scoreNumber.innerHTML = score;
                    gold += killGold + level * 5;
                    goldNumber.innerHTML = gold;
                    // setTimeout(() => {
                    enemies.splice(index, 1);
                    // }, 0)
                }

            }

        })

    })

}
// skill up
skill1.addEventListener("click", () => {
    if (gold >= skill1Gold) {
        gold -= skill1Gold;
        goldNumber.innerHTML = gold;
        skillTotalGold += skill1Gold;
        up1Gold *= 1.1;
        skill1Gold += Math.floor(up1Gold);
        skill1GD.innerHTML = skill1Gold;
        skill1Level++;
        skill1LV.innerHTML = skill1Level;
        bulletDamage += skill1buff;
        particleSize += 0.1;
    };
})
skill2.addEventListener("click", () => {
    if (gold >= skill2Gold) {
        gold -= skill2Gold;
        goldNumber.innerHTML = gold;
        skillTotalGold += skill2Gold;
        up2Gold *= 1.1;
        skill2Gold += Math.floor(up2Gold);
        skill2GD.innerHTML = skill2Gold;
        skill2Level++;
        skill2LV.innerHTML = skill2Level;
        bulletSpeed += skill2buff;
        particleSpeed += 0.8;
    };
})
skill3.addEventListener("click", () => {
    if (gold >= skill3Gold) {
        gold -= skill3Gold;
        goldNumber.innerHTML = gold;
        skillTotalGold += skill3Gold;
        up3Gold *= 1.07;
        skill3Gold += Math.floor(up3Gold);
        skill3GD.innerHTML = skill3Gold;
        skill3Level++;
        skill3LV.innerHTML = skill3Level;
        bulletSize += skill3buff;
        particleSize += 0.2;
        particleCount += 1;
    };
})
skill4.addEventListener("click", () => {
    if (gold >= skill4Gold) {
        gold -= skill4Gold;
        goldNumber.innerHTML = gold;
        skillTotalGold += skill4Gold;
        up4Gold *= 1.07;
        skill4Gold += Math.floor(up4Gold);
        skill4GD.innerHTML = skill4Gold;
        skill4Level++;
        skill4LV.innerHTML = skill4Level;
        bulletCount += skill4buff;
    };
})
skill5.addEventListener("click", () => {
    if (gold >= skill5Gold) {
        gold -= skill5Gold;
        goldNumber.innerHTML = gold;
        skillTotalGold += skill5Gold;
        up5Gold *= 1.03;
        skill5Gold += Math.floor(up5Gold);
        skill5GD.innerHTML = skill5Gold;
        skill5Level++;
        skill5LV.innerHTML = skill5Level;
        hitGold += skill5buff;
        killGold += skill5buff * 2;
    };
})
skill6.addEventListener("click", () => {
    if (gold >= skill6Gold) {
        gold -= skill6Gold;
        goldNumber.innerHTML = gold;
        skillTotalGold += skill6Gold;
        up6Gold *= 1.05;
        skill6Gold += Math.floor(up6Gold);
        skill6GD.innerHTML = skill6Gold;
        skill6Level++;
        skill6LV.innerHTML = skill6Level;
        life++;
        relife++;
        lifeNumber.innerHTML = relife;
    };
})
// skill reset
skillReset.addEventListener('click', () => {
    gold += skillTotalGold;
    goldNumber.innerHTML = gold;
    skillTotalGold = 0;

    // skill 1 
    bulletDamage -= (skill1Level - 1) * skill1buff;
    particleSize -= (skill1Level - 1) * 0.1;

    skill1Gold = skill1GoldReset;
    skill1GD.innerHTML = skill1Gold;
    skill1Level = 1;
    skill1LV.innerHTML = skill1Level;

    // skill 2
    bulletSpeed -= (skill2Level - 1) * skill2buff;
    particleSpeed -= (skill2Level - 1) * 0.8;

    skill2Gold = skill2GoldReset;
    skill2GD.innerHTML = skill2Gold;
    skill2Level = 1;
    skill2LV.innerHTML = skill2Level;

    // skill 3
    bulletSize -= (skill3Level - 1) * skill3buff;
    particleSize -= (skill3Level - 1) * 0.2;
    particleCount -= (skill3Level - 1) * 1;

    skill3Gold = skill3GoldReset;
    skill3GD.innerHTML = skill3Gold;
    skill3Level = 1;
    skill3LV.innerHTML = skill3Level;

    // skill 4
    bulletCount -= (skill4Level - 1) * skill4buff;
    skill4Gold = skill4GoldReset;
    skill4GD.innerHTML = skill4Gold;
    skill4Level = 1;
    skill4LV.innerHTML = skill4Level;

    // skill 5
    hitGold -= (skill5Level - 1) * skill5buff;
    killGold -= (skill5Level - 1) * skill5buff * 2;
    skill5Gold = skill5GoldReset;
    skill5GD.innerHTML = skill5Gold;
    skill5Level = 1;
    skill5LV.innerHTML = skill5Level;
    // skill 6
    life -= (skill6Level - 1) * skill6buff;
    relife -= (skill6Level - 1) * skill6buff;
    lifeNumber.innerHTML = life;
    skill6Gold = skill6GoldReset;
    skill6GD.innerHTML = skill6Gold;
    skill6Level = 1;
    skill6LV.innerHTML = skill6Level;
})



// shoot projectile
window.addEventListener('click', shootFn);
function shootFn(e) {
    console.log('shoot')
    let angle = Math.atan2(
        e.clientY - player.y,
        e.clientX - player.x
    )
    let velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    for (let i = 0; i < bulletCount; i++) {
        setTimeout(() => {
            projectiles.push(
                new Projectile(player.x, player.y,
                    bulletSize, 'white', velocity)
            )
        }, 250 * i)
    }
}
// start game
startBtn.addEventListener("click", () => {
    init();
    animate();
    spawnEnemies();
    life = relife;
    lifeNumber.innerHTML = life;
    container.style.display = 'none';
    gameStart = true;
    if (levelBreak[level - 1]) {
        time = -1;
        timeCount.innerHTML = time;
        gameStart = false;
    } else {
        time = 30;
        timeCount.innerHTML = time;
        gameStart = true;
    }
})
//adjust enemy level 
levelUp.addEventListener('click', () => {
    life = relife;
    lifeNumber.innerHTML = life;
    if (level == maxLevel || !levelBreak[level - 1]) return;
    level++;
    levelNumber.innerHTML = level;

    if (level == maxLevel && !levelBreak[level - 1]) {
        time = 30;
        timeCount.innerHTML = time;
        cancelAnimationFrame(animationId);
        clearInterval(spawnEnemy);
        container.style.display = 'flex';
        endScore.innerHTML = score;
        gameStart = false;
        levelDown.style.backgroundColor = '#fff';
        levelUp.style.backgroundColor = '#fff7';
        lastLevel.style.display = 'inline';
        breakText.style.display = 'none';
    }
    else if (level == maxLevel && levelBreak[level - 1]) {
        time = -1;
        timeCount.innerHTML = time;
        cancelAnimationFrame(animationId);
        clearInterval(spawnEnemy);
        container.style.display = 'flex';
        endScore.innerHTML = score;
        gameStart = false;
        lastLevel.style.display = 'inline';
        levelUp.style.backgroundColor = '#fff7';
        lastLevel.style.display = 'inline';
        breakText.style.display = 'none';
    }
    else if (levelBreak[level - 1]) {

        time = -1;
        timeCount.innerHTML = time;
        cancelAnimationFrame(animationId);
        clearInterval(spawnEnemy);
        container.style.display = 'flex';
        endScore.innerHTML = score;
        gameStart = false;
        levelUp.style.backgroundColor = '#fff';
        levelDown.style.backgroundColor = '#fff';
        lastLevel.style.display = 'none';
        breakText.style.display = 'inline';
    }
    else if (!levelBreak[level]) {
        time = 30;
        timeCount.innerHTML = time;
        cancelAnimationFrame(animationId);
        clearInterval(spawnEnemy);
        container.style.display = 'flex';
        endScore.innerHTML = score;
        gameStart = false;
        levelUp.style.backgroundColor = '#fff7';
        levelDown.style.backgroundColor = '#fff';
        lastLevel.style.display = 'none';
        breakText.style.display = 'none';

    }
})
levelDown.addEventListener('click', () => {
    life = relife;
    lifeNumber.innerHTML = life;
    levelUp.style.backgroundColor = '#fff';

    if (level == 1) {
        levelDown.style.backgroundColor = '#fff7';
        return;
    };
    level--;
    levelNumber.innerHTML = level;
    time = -1;
    timeCount.innerHTML = time;
    cancelAnimationFrame(animationId);
    clearInterval(spawnEnemy);
    container.style.display = 'flex';
    endScore.innerHTML = score;
    breakText.style.display = 'inline';
    gameStart = false;
    lastLevel.style.display = 'none';

})

//close and open game introduction
closeBtn.addEventListener('click', () => {
    placeContainer.style.display = 'none';
})

introBox.addEventListener('click', () => {
    placeContainer.style.display = 'flex';
})


// player move
window.addEventListener('keydown', keydownFn);
window.addEventListener('keyup', keyupFn);
// A = 65 ,D = 68 ,S = 83 ,W = 87  
function keydownFn(e) {

    switch (e.keyCode) {
        case 65:
            if (player.x - player.radius < 0) return;
            playerSpeedX = -1 * playerSpeed;

            break;
        case 68:
            if (player.x + player.radius > canvas.width) return;
            playerSpeedX = 1 * playerSpeed;
            break;
        case 83:
            if (player.y + player.radius > canvas.height) return;
            playerSpeedY = 1 * playerSpeed;
            break;
        case 87:
            if (player.y - player.radius < 0) return;
            playerSpeedY = -1 * playerSpeed;
            break;
    }
}
function keyupFn(e) {

    switch (e.keyCode) {
        case 65:
            if (playerSpeedX == 1 * playerSpeed) return;
            playerSpeedX = 0;
            break;

        case 68:
            if (playerSpeedX == -1 * playerSpeed) return;
            playerSpeedX = 0;
            break;

        case 83:
            if (playerSpeedY == -1 * playerSpeed) return;
            playerSpeedY = 0;
            break;

        case 87:
            if (playerSpeedY == 1 * playerSpeed) return;
            playerSpeedY = 0;
            break;
    }

}





// timer
let timeCountDown;
timeCountDown = window.setInterval(() => {
    if (gameStart) {
        if (time > 0 && !levelBreak[level - 1]) {
            time -= 1;
            timeCount.innerHTML = time;
        }
        if (level == maxLevel && time == 0) {
            cancelAnimationFrame(animationId);
            clearInterval(spawnEnemy);
            container.style.display = 'flex';
            endScore.innerHTML = score;
            gameStart = false;
            levelBreak[level - 1] = true;
            lastLevel.innerHTML = 'This is the last level !! Thanks for playing !!!';
            // Clearance reward;
            gold += 9999999999;
            goldNumber.innerHTML = gold;
        }
        else if (time == 0) {
            cancelAnimationFrame(animationId);
            clearInterval(spawnEnemy);
            container.style.display = 'flex';
            endScore.innerHTML = score;
            gameStart = false;
            levelBreak[level - 1] = true;
        }
        if (time == -1) {
            gameStart = false;
        }
        if (levelBreak[level - 1] == true && level != maxLevel) {
            levelUp.style.backgroundColor = '#fff';
            breakText.style.display = 'inline';
        }
        else {
            levelUp.style.backgroundColor = '#fff7';
            breakText.style.display = 'none';
        }
    }
}, timer)

