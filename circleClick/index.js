const circles = [
    document.querySelector(".circle1"),
    document.querySelector(".circle2"),
    document.querySelector(".circle3")
]
const settingCloseBtn = document.querySelector('#settingCloseBtn');
const settingBtn = document.querySelector('.settingBtn');
const settingContainer = document.querySelector('#settingContainer');
const closeBtn = document.querySelector('.closeBtn')
const scoreNum = document.querySelector('#scoreNum');
const bestScoreNum = document.querySelector("#bestScoreNum");
const accuracyNum = document.querySelector('#accuracyNum');
const timeupTxt = document.querySelector('.timeup');
const settingChecks = [document.querySelector('#check1'),
 document.querySelector("#check2")];
const timeNum = document.querySelector("#timeNum");
const startBtn = document.querySelector(".startBtn");
const body = document.querySelector('body');
const BoxWidth = 400;
const BoxHeight = 400;
let isCheck = [true, true, true];
let bestScore = 0;
let score = 0;
let time = 30;
let accuracy = 0;
let clickTimes = 0;
let hitTimes = 0;
let enableClickAn = true;
let animationDuringTime = 400;
let timer = setInterval(() => {
    time--;
    if (time >= 0) {
        timeNum.innerHTML = time;
    }
    if(time <= 0){
        timeupTxt.style.display = "block";
    }
}, 1000)
let clientHeight = document.body.offsetHeight;
let clientWidth = document.body.offsetWidth;
let fontHeight;
if(clientWidth > 770){
    fontHeight = 28;
}else if(clientWidth <= 770 && clientWidth > 500){
    fontHeight = 22;
}else{
    fontHeight = 18;
}
let marginHeight = (clientHeight - (BoxHeight+10+60+fontHeight))/2 ;
let marginWidth = (clientWidth - BoxWidth+10)/2 ;

window.onload = reset();
window.addEventListener("mousedown", clickAnFn);
startBtn.addEventListener("mousedown", reset);
closeBtn.addEventListener("click",()=> {
    if(isCheck[1]) {
        circles.forEach(item => {
            item.style.transition = "all 0.1s";
        });
    }else{
        circles.forEach(item => {
            item.style.transition = "none";
        });
    }
})

function clickAnFn(e) {
    if(time > 0 && 
        e.clientY < clientHeight - marginHeight - 60 - fontHeight - 10 &&
        e.clientY > marginHeight - 10 &&
        e.clientX > marginWidth &&
        e.clientX < clientWidth - marginWidth) {
        console.log(clientHeight,marginHeight)
        clickTimes++;
        accuracy = accuracyCalculationFn(clickTimes,hitTimes);
        accuracyNum.innerHTML = accuracy + "%";
    }
    if (!isCheck[0]) return;
    let clickAnEl = document.createElement('i');
    let clickAnElTwo = document.createElement('p');
    clickAnEl.style.left = e.clientX + "px";
    clickAnEl.style.top = e.clientY + "px";
    clickAnElTwo.style.left = e.clientX + "px";
    clickAnElTwo.style.top = e.clientY + "px";
    body.appendChild(clickAnEl);
    body.appendChild(clickAnElTwo);
    setTimeout(() => {
        body.removeChild(clickAnEl);
        body.removeChild(clickAnElTwo);
    }, animationDuringTime)
}

function accuracyCalculationFn(clickTimes,hitTimes){
    return Math.round(hitTimes/clickTimes*10000)/100 
}

circles.forEach((item, index) => {
    item.addEventListener("mousedown", () => {
        hitTimes++;
        if (time <= 0) return;
        let randomRadius = Math.random() * 0 + 100;
        let randomX = Math.random() * BoxWidth - 50;
        let randomY = Math.random() * BoxHeight - 50;
        circles[index].style.backgroundColor = `hsl(${Math.random() * 360},${Math.random() * 80}%,${Math.random() * 80}%,${Math.random() * 70 + 50}%)`;

        if (randomX + randomRadius > BoxWidth) {
            randomX -= randomX + randomRadius - BoxWidth;
        }
        if (randomX < 0) {
            randomX += 0 - randomX;
        }
        if (randomY + randomRadius > BoxHeight) {
            randomY -= randomY + randomRadius - BoxHeight;
        }
        if (randomY < 0) {
            randomY += 0 - randomY;
        }
        circles[index].style.width = randomRadius + "px";
        circles[index].style.height = randomRadius + "px";
        circles[index].style.left = randomX + "px";
        circles[index].style.top = randomY + "px";
        score++;
        scoreNum.innerHTML = score;
    })
})

settingCloseBtn.addEventListener('click', () => {
    settingContainer.style.display = 'none';
})
settingBtn.addEventListener('click', () => {
    settingContainer.style.display = 'flex';
})
//setting check 
settingChecks.forEach(function (item, i) {
    item.addEventListener('click', () => {
        CheckFn(i);
    })
})

function CheckFn(i) {
    if (isCheck[i] == true) {
        isCheck[i] = false;
        settingChecks[i].style.backgroundColor = '#fff0';
    } else {
        isCheck[i] = true;
        settingChecks[i].style.backgroundColor = '#fff';
    }
}
function reset() {
    hitTimes = 0;
    clickTimes = 0;
    accuracy = 100;
    accuracyNum.innerHTML = accuracy + "%";
    timeupTxt.style.display = "none";
    if (score > bestScore) {
        bestScore = score;
        bestScoreNum.innerHTML = bestScore;
    }
    score = 0;
    scoreNum.innerHTML = score;
    time = 30;
    timeNum.innerHTML = time;
    circles.forEach((item) => {
        let randomRadius = Math.random() * 0 + 100;
        let randomX = Math.random() * BoxWidth - 50;
        let randomY = Math.random() * BoxHeight - 50;
        item.style.backgroundColor = `hsl(${Math.random() * 360},${Math.random() * 80}%,${Math.random() * 80}%,${Math.random() * 70 + 50}%)`;

        if (randomX + randomRadius > BoxWidth) {
            randomX -= randomX + randomRadius - BoxWidth;
        }
        if (randomX < 0) {
            randomX += 0 - randomX;
        }
        if (randomY + randomRadius > BoxHeight) {
            randomY -= randomY + randomRadius - BoxHeight;
        }
        if (randomY < 0) {
            randomY += 0 - randomY;
        }
        item.style.width = randomRadius + "px";
        item.style.height = randomRadius + "px";
        item.style.left = randomX + "px";
        item.style.top = randomY + "px";
    })
}
