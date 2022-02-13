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
// Bullet move with player   v (playerX player.x)
// Skill level up click effects;   v
// Show damage      v
// Add random damage
// Add physical collision effects 
// Add setting button
// Add Player Speed skill 
// Enemy information
// Weapon system
// Add unique skill
// Add different enemy 

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');  //ctx api

canvas.width = innerWidth;
canvas.height = innerHeight - 4; //avoid scroll

const levelNumber = document.querySelector('.levelNumber')
const scoreNumber = document.querySelector('.scoreNumber');
const goldNumber = document.querySelector('.goldNumber');
const lifeNumber = document.querySelector('.lifeNumber');

const body = document.querySelector('body');
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

const skills = [document.querySelector('.skill1'),
document.querySelector('.skill2'),
document.querySelector('.skill3'),
document.querySelector('.skill4'),
document.querySelector('.skill5'),
document.querySelector('.skill6'),
document.querySelector('.skill7'),
document.querySelector('.skill8')];

let skillLVs = [0, document.querySelector('.skill1Level'),
    document.querySelector('.skill2Level'),
    document.querySelector('.skill3Level'),
    document.querySelector('.skill4Level'),
    document.querySelector('.skill5Level'),
    document.querySelector('.skill6Level'),
    document.querySelector('.skill7Level'),
    document.querySelector('.skill8Level')];

let skillGDs = [0, document.querySelector('.skill1Gold'),
    document.querySelector('.skill2Gold'),
    document.querySelector('.skill3Gold'),
    document.querySelector('.skill4Gold'),
    document.querySelector('.skill5Gold'),
    document.querySelector('.skill6Gold'),
    document.querySelector('.skill7Gold'),
    document.querySelector('.skill8Gold')];

let skillGolds = [0, 100, 200, 400, 8000, 1000, 100, 1000, 500];
let skillGoldResets = [0, 100, 200, 400, 8000, 1000, 100, 1000, 500];
let upGolds = [0, skillGolds[1], skillGolds[2], skillGolds[3], skillGolds[4], skillGolds[5], skillGolds[6], skillGolds[7], skillGolds[8]];
let upGoldMultiples = [0, 1.07, 1.1, 1.1, 1.07, 1.03, 1.03, 1.2, 1.1];
let skillLevels = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let skillBuffs = [0, 2, 1, 1, 1, 5, 1, 0.05, 0.1];
let skillMaxLevels = [0, -1, 100, 100, 100, -1, -1, 19, -1]
let skillTotal = 8;
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
        if (this.radius < 2) return; //avoid enemy with negative radius causing collapses
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
let bulletSpeed = 3;
let bulletSize = 5;
let bulletDamage = 8;
let bulletCount = 1;
let criticalRate = 0.05;
let criticalDamage = 1.5;

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
let levelUpTime = 700;
let showDamageTime = 500;

let score = 0;
let gold = 1000;
let hitScore = 10;
let killScore = 25;
let hitGold = 10;
let killGold = 25;
let friction = 0.96;
let level = 1;
let maxLevel = 15;
let stage = 1;

let developerMode = false;
if (developerMode) {
    gold = 1000000000000;
    bulletSpeed = 5;
    bulletSize = 5;
    bulletDamage = 8;
    bulletCount = 1;
    criticalRate = 0.1;
    criticalDamage = 2;
    level = 3;
    timer = 10;
    life = 10000;
    levelBreak = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
}
let enemies = [];
let projectiles = [];
let particles = [];
let playerSize = 20;
let player = new Player(playerX, playerY, playerSize, '#09f9f9');

function init() {
    enemies = [];
    projectiles = [];
    particles = [];
    player = new Player(playerX, playerY, playerSize, '#09f9f9');
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
        }

        //when enemy touch player
        const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        if (distance - player.radius - enemy.radius < -1) {
            enemies.splice(index, 1);
            life -= 1 * level;
            lifeNumber.innerHTML = life;
            let showDamageElement = document.createElement('i');
            let showDamageText = document.createTextNode(`-999999999`);
            showDamageElement.appendChild(showDamageText);
            showDamageElement.classList.add('showDamage');
            showDamageElement.style.left = enemy.x + 'px';
            showDamageElement.style.top = enemy.y + 'px';
            showDamageElement.style.fontSize = 10 + bulletDamage / 4 + 'px';
            body.appendChild(showDamageElement);
            setTimeout(() => {
                body.removeChild(showDamageElement);
            }, showDamageTime)
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
            if (distance - projectile.radius - enemy.radius < -1) {  //數字越大就越外面觸發
                let finalDamage = bulletDamage + Math.floor(Math.random() * bulletDamage / 4);
                let isCritical;
                // When critical
                if (Math.random() < criticalRate) {
                    console.log('critical');
                    finalDamage *= criticalDamage;
                    finalDamage = Math.floor(finalDamage);
                    isCritical = true;
                }
                else {
                    isCritical = false;
                }
                console.log(finalDamage);
                // show bullet Damage 
                let showDamageElement = document.createElement('i');
                let showDamageText = document.createTextNode(`-${finalDamage}`);
                showDamageElement.appendChild(showDamageText);
                if (isCritical) {
                    showDamageElement.classList.add('showCriticalDamage');
                    showDamageElement.style.fontSize = 15 + bulletDamage / 4 + 'px';
                } else {
                    showDamageElement.classList.add('showDamage');
                    showDamageElement.style.fontSize = 15 + bulletDamage / 8 + 'px';
                }
                showDamageElement.style.left = projectile.x + 'px';
                showDamageElement.style.top = projectile.y + 'px';
                body.appendChild(showDamageElement);
                setTimeout(() => {
                    body.removeChild(showDamageElement);
                }, showDamageTime)

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
                if (enemy.radius - finalDamage > 10) {

                    // increase our score
                    score += hitScore;
                    scoreNumber.innerHTML = score;
                    gold += hitGold + level * 2;
                    goldNumber.innerHTML = gold;
                    //shrink animation
                    // enemyShrink = setInterval(() => {
                    //     enemy.radius -= bulletDamage / (clearTime / shrinkTime);

                    // }, shrinkTime);
                    // setTimeout(() => {
                    //     clearInterval(enemyShrink);
                    // }, clearTime);
                    gsap.to(enemy, {
                        radius: enemy.radius - finalDamage
                    })
                }
                else if (enemy.radius - finalDamage < 10) {
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
function levelUpAnFn(e) {
    let levelUpElement = document.createElement('i');
    let levelUpText = document.createTextNode(' Level + 1');
    levelUpElement.appendChild(levelUpText);
    levelUpElement.classList.add('skillLevelUp');
    levelUpElement.style.left = e.clientX + 'px';
    levelUpElement.style.top = e.clientY + 'px';
    levelUpElement.style.backgroundColor = `hsl(${Math.random() * 360}, ${Math.random() * 50 + 20 + '%'}, ${Math.random() * 40 + 20 + '%'},0.9)`;
    body.appendChild(levelUpElement);
    setTimeout(() => {
        body.removeChild(levelUpElement);
    }, levelUpTime)
}
function skillLevelUpFn(i) {
    if (skillLevels[i] == skillMaxLevels[i]) return;
    if (gold >= skillGolds[i]) {
        gold -= skillGolds[i];
        goldNumber.innerHTML = gold;
        skillTotalGold += skillGolds[i];
        upGolds[i] *= upGoldMultiples[i];
        skillGolds[i] += Math.floor(upGolds[i]);
        skillGDs[i].innerHTML = skillGolds[i];
        skillLevels[i]++;
        skillLVs[i].innerHTML = skillLevels[i];
        
    switch (i) {
        case 1://skill 1
            bulletDamage += skillBuffs[i];
            particleSize += 0.1;
            break;
        case 2:
            bulletSpeed += skillBuffs[i];
            particleSpeed += 0.8;
            break;
        case 3:
            bulletSize += skillBuffs[i];
            particleSize += 0.2;
            particleCount += 1;
            break;
        case 4:
            bulletCount += skillBuffs[i];
            break;
        case 5:
            hitGold += skillBuffs[i];
            killGold += skillBuffs[i];
            break;
        case 6:
            life += skillBuffs[i];
            relife += skillBuffs[i];
            lifeNumber.innerHTML = relife;
            break;
        case 7:
            criticalRate += skillBuffs[i];
            break;
        case 8:
            criticalDamage += skillBuffs[i];
            break;
    }
    }
    if (skillLevels[i] == skillMaxLevels[i]) {
        skillGDs[i].innerHTML = 'Max Level';
        skillLVs[i].innerHTML = 'Max';
        return;
    }
};
skills.forEach(function (item, i) {
    item.addEventListener('click', (e) => {
        skillLevelUpFn(i + 1); //index 0 is skill 1
        if (gold < skillGolds[i + 1]) return;
        levelUpAnFn(e);
    })
})
// skill reset
skillReset.addEventListener('click', () => {
    gold += skillTotalGold;
    goldNumber.innerHTML = gold;
    skillTotalGold = 0;

    // skill 1 
    bulletDamage -= (skillLevels[1]) * skillBuffs[1];
    particleSize -= (skillLevels[1]) * 0.1;

    // skill 2
    bulletSpeed -= (skillLevels[2]) * skillBuffs[2];
    particleSpeed -= (skillLevels[2]) * 0.8;

    // skill 3
    bulletSize -= (skillLevels[3]) * skillBuffs[3];
    particleSize -= (skillLevels[3]) * 0.2;
    particleCount -= (skillLevels[3]) * 1;

    // skill 4
    bulletCount -= (skillLevels[4]) * skillBuffs[4];

    // skill 5
    hitGold -= (skillLevels[5]) * skillBuffs[5];
    killGold -= (skillLevels[5]) * skillBuffs[5] * 2;

    // skill 6
    life -= (skillLevels[6]) * skillBuffs[6];
    relife -= (skillLevels[6]) * skillBuffs[6];
    lifeNumber.innerHTML = life;

    // skill 7
    criticalRate -= (skillLevels[7]) * skillBuffs[7];

    // skill 8
    criticalDamage -= (skillLevels[8]) * skillBuffs[8];

    for (let i = 1; i <= skillTotal; i++) {
        skillGolds[i] = skillGoldResets[i];
        skillGDs[i].innerHTML = skillGolds[i];
        skillLevels[i] = 0;
        skillLVs[i].innerHTML = skillLevels[i];
    }
})
// shoot projectile
window.addEventListener('click', shootFn);
function shootFn(e) {
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
    timeCount.innerHTML = time;
    cancelAnimationFrame(animationId);
    clearInterval(spawnEnemy);
    container.style.display = 'flex';
    endScore.innerHTML = score;
    gameStart = false;
    if (level == maxLevel && !levelBreak[level - 1]) {
        time = 30;
        levelUp.style.backgroundColor = '#fff7';
        levelDown.style.backgroundColor = '#fff';
        lastLevel.style.display = 'inline';
        breakText.style.display = 'none';
    }
    else if (level == maxLevel && levelBreak[level - 1]) {
        time = -1;
        levelUp.style.backgroundColor = '#fff7';
        levelDown.style.backgroundColor = '#fff';
        lastLevel.style.display = 'inline';
        breakText.style.display = 'none';
    }
    else if (levelBreak[level - 1]) {
        time = -1;
        levelUp.style.backgroundColor = '#fff';
        levelDown.style.backgroundColor = '#fff';
        lastLevel.style.display = 'none';
        breakText.style.display = 'inline';
    }
    else if (!levelBreak[level]) {
        time = 30;
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
// left = 37 right = 39 up = 38 down = 40
let left = false;
let right = false;
let up = false;
let down = false;
function keydownFn(e) {
    switch (e.keyCode) {
        case 65: //A
            if (player.x - player.radius < 0) return;
            playerSpeedX = -1 * playerSpeed;
            left = true;

            break;
        case 68: //D
            if (player.x + player.radius > canvas.width) return;
            playerSpeedX = 1 * playerSpeed;
            right = true;
            break;

        case 83: //S
            if (player.y + player.radius > canvas.height) return;
            playerSpeedY = 1 * playerSpeed;
            down = true;
            break;
        case 87: //W
            if (player.y - player.radius < 0) return;
            playerSpeedY = -1 * playerSpeed;
            up = true;
            break;

        case 37: //left
            if (player.x - player.radius < 0) return;
            playerSpeedX = -1 * playerSpeed;
            left = true;

            break;
        case 39: //right
            if (player.x + player.radius > canvas.width) return;
            playerSpeedX = 1 * playerSpeed;
            right = true;
            break;

        case 40: //down
            if (player.y + player.radius > canvas.height) return;
            playerSpeedY = 1 * playerSpeed;
            down = true;
            break;
        case 38: //up
            if (player.y - player.radius < 0) return;
            playerSpeedY = -1 * playerSpeed;
            up = true;
            break;
    }
}
function keyupFn(e) {
    switch (e.keyCode) {
        case 65:
            left = false;
            if (right) {
                playerSpeedX = 1 * playerSpeed;
                return;
            };
            playerSpeedX = 0;
            break;
        case 68:
            right = false;
            if (left) {
                playerSpeedX = -1 * playerSpeed;
                return;
            };
            playerSpeedX = 0;
            break;
        case 83:
            down = false;
            if (up) {
                playerSpeedY = -1 * playerSpeed;
                return;
            };
            playerSpeedY = 0;
            break;
        case 87:
            up = false;
            if (down) {
                playerSpeedY = 1 * playerSpeed;
                return;
            };
            playerSpeedY = 0;
            break;

        case 37:
            left = false;
            if (right) {
                playerSpeedX = 1 * playerSpeed;
                return;
            };
            playerSpeedX = 0;
            break;
        case 39:
            right = false;
            if (left) {
                playerSpeedX = -1 * playerSpeed;
                return;
            };
            playerSpeedX = 0;
            break;
        case 40:
            down = false;
            if (up) {
                playerSpeedY = -1 * playerSpeed;
                return;
            };
            playerSpeedY = 0;
            break;
        case 38:
            up = false;
            if (down) {
                playerSpeedY = 1 * playerSpeed;
                return;
            };
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