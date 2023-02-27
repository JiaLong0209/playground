// 1. Make a rough structure                                        2022/05/30 v0.10
// 2. Add keypress listener                                         2022/06/05 v0.20
// 3. Make track container                                          2022/06/06 v0.30
// 4. Setup notes                                                   2022/06/10 v0.40
// 5. Load music, make a map and start button                       2022/06/11 v0.60
// 6. SetupNotesMiss, displayAccuracy and hitEffect                 2022/06/12 v0.70
// 7. Fix judgment delay bug                                        2022/06/19 v0.71
// 8. Note Speed, Song Speed UI                                     2022/06/26 v0.80
// 9. Add background image, simplify code (noteKeys = [d,f,j,k])    2022/09/25 v0.81
// 10. Update map                                                   2022/12/03 v0.82
// 11. Add noteSpeed and musicSpeed to localStorage                 2023/02/23 v0.83
// 12. Add perfect+ judgement                                       2023/02/27 v0.84

// 解決的Bug或值得注意的點
// 1.已解決音符速度越快時，判定區越小的Bug
// 2.已解決音符下落到判定線後不能判定的Bug
// 3.已解決重複按下Start按鈕，判定時間重置的Bug
// 
// 
// 

const noteSpeedDownBtn = document.querySelector('.btn--noteSpeedDown');
const noteSpeedUpBtn = document.querySelector('.btn--noteSpeedUp');
const noteSpeedTxt = document.querySelector('.noteSpeedTxt');

const songSpeedDownBtn = document.querySelector('.btn--songSpeedDown');
const songSpeedUpBtn = document.querySelector('.btn--songSpeedUp');
const songSpeedTxt = document.querySelector('.songSpeedTxt');

const songOffsetDownBtn = document.querySelector('.btn--songOffsetDown');
const songOffsetUpBtn = document.querySelector('.btn--songOffsetUp');
const songOffsetTxt = document.querySelector('.songOffsetTxt')

const background = document.querySelector(".background");

let keyCharacters = ['d','f','j','k']


let isHolding = {
    'd': false,
    'f': false, 
    'j': false,
    'k': false
}

let hits = {
    perfectPlus: 0,
    perfect: 0, 
    good: 0,
    bad: 0,
    miss: 0
};

let multiplier = {
    perfectPlus:1,
    perfect:0.9,
    good:0.6,
    bad:0.3,
    miss:0
}
let music = document.querySelector('.song');
console.log(localStorage['noteSpeed'],localStorage['musicSpeed']);
let noteSpeed = Number(localStorage['noteSpeed']) || 2.4;
let musicSpeed = Number(localStorage['musicSpeed']) || 1;
let songOffset = 0;
music.playbackRate = musicSpeed;
let songPrepareTime = 2000;

let isPlaying = false;
let combo = 0;
let maxCombo = 0;
let score = 0;
let animation = 'moveDown';
let startTime;
let trackContainer;
let tracks;
let comboText;
let keypress;


function initializeNotes (){
    let noteElement;
    let trackElement;

    while(trackContainer.hasChildNodes()){  //當trackContainer有任何的子節點時，就清除該節點
        trackContainer.removeChild(trackContainer.lastChild);
    }
    song.sheet.forEach((key,index)=>{
        trackElement = document.createElement('div');
        trackElement.classList.add('track');

        key.notes.forEach((note)=>{
            noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.classList.add('note--' + index);
            noteElement.style.backgroundColor = key.color;
            noteElement.style.animationName = animation; //即為'moveDown'
            noteElement.style.animationTimingFunction = 'linear';
            noteElement.style.animationDuration = note.duration - noteSpeed + 's';
            noteElement.style.animationDelay = note.delay + noteSpeed + 's';  
            noteElement.style.animationPlayState = 'paused';
            trackElement.appendChild(noteElement);  //.track 增加.note子節點

        });
        trackContainer.appendChild(trackElement);  //在trackContainer增加.track子節點，沒有這行的話.track 跟 .note 會顯示不出來
        tracks = document.querySelectorAll('.track');
    })
};

function setupStartButton(){
    let startButton = document.querySelector('.btn--start');
    startButton.addEventListener('click',()=>{
        if(!isPlaying){   //避免startBtn被點兩下，導致startTime重置。
            startTime = Date.now();
        }
        isPlaying = true;
        document.querySelector('.menu').style.opacity = 0;
        document.querySelectorAll('.note').forEach((note)=>{
            note.style.animationPlayState = 'running';
        })
        background.style.filter = "blur(1.4px) brightness(0.5)";
        background.style.transform = "scale(1.3)";
        setTimeout(() => {
            music.play();
        }, songPrepareTime);
    })
} 

function setupNoteMiss(){
    trackContainer.addEventListener('animationend',(event)=>{
        setTimeout(() => {
            if(!event.target.parentNode) return;
            if(event.target.parentNode.firstChild != event.target) return; //避免在setTimeout移除該note前，已被玩家移除,而導致點擊後又多一個miss，但是這種方法還是會出錯，但不引響遊戲。

            let index = event.target.classList.item(1)[6]; //item(1)[6]是指該標籤的第二個class，也就是note--[index],[6]就代表該class的第七個字母，即為[index] 0~3。
            displayAccuracy('miss');
            updateHits('miss');
            updateCombo('miss');
            updateMaxCombo();
            removeNoteFromTrack(event.target.parentNode, event.target);
            updateNext(index);
        }, 170);

    })
}

function setupKeys (){
    document.addEventListener('keydown',(event)=>{ //當手壓下鍵盤的瞬間
        let keyIndex = getKeyIndex(event.key);
        if(Object.keys(isHolding)[keyIndex] && !isHolding[event.key]){  //當壓下的鍵在isHolding裡的index不為0 以及 該鍵isHolding不為true時
            isHolding[event.key] = true;
            keypress[keyIndex].style.display = 'block';
            if(isPlaying && tracks[keyIndex].firstChild){   //當遊戲開始以及該軌道有note時
                judge(keyIndex);
            }
        }
    })

    document.addEventListener("keyup",(event)=>{ //當手放開鍵盤時
        if(Object.keys(isHolding).indexOf(event.key) !== -1){
            let keyIndex = getKeyIndex(event.key);
            isHolding[event.key] = false;
            keypress[keyIndex].style.display = 'none';
        }
    })
}


function getKeyIndex (key){
    if (key == keyCharacters[0]){
        return 0;
    }else if(key == keyCharacters[1]){
        return 1;
    }else if(key == keyCharacters[2]){
        return 2;
    }else if(key == keyCharacters[3]){
        return 3;
    }
}

function judge(index){
    let timeInSecond = (Date.now() - startTime) / 1000; 
    let nextNoteIndex = song.sheet[index].next; //是指sheet[index]裡面的next，並不是函式next();
    let nextNote = song.sheet[index].notes[nextNoteIndex];
    let perfectTime = nextNote.duration + nextNote.delay;
    let accuracy = timeInSecond - perfectTime;
    let hitJudgement;
    console.log(accuracy)
    if(Math.abs(accuracy) > 0.160){ 
        return;
    }
    console.log(getHitJudgement(accuracy));
    hitJudgement = getHitJudgement(accuracy);
    displayAccuracy(hitJudgement);
    showHitEffect(index);
    updateHits(hitJudgement);
    updateCombo(hitJudgement);
    updateMaxCombo();
    console.log(hits)
    removeNoteFromTrack(tracks[index],tracks[index].firstChild);
    updateNext(index);


}

function getHitJudgement(accuracy){
    accuracy = Math.abs(accuracy);
    if(accuracy < 0.020){
        return 'perfectPlus'
    }else if(accuracy < 0.040){ 
        return 'perfect';
    }else if(accuracy < 0.080){ 
        return 'good';
    }else if(accuracy < 0.120){ 
        return 'bad';
    }else{
        return 'miss';
    }
}
// displayAccuracy('perfectPlus')
function displayAccuracy(accuracy){
    let accuracyText = document.createElement('div');
    document.querySelector('.hit__accuracy').remove();
    accuracyText.classList.add('hit__accuracy');
    accuracyText.classList.add('hit__accuracy--' + accuracy);
    accuracyText.innerHTML = accuracy === 'perfectPlus' ? 'perfect+' : accuracy;
    document.querySelector('.hit').appendChild(accuracyText);
}

function showHitEffect(index){
    let key = document.querySelectorAll('.key')[index];
    let hitEffect = document.createElement('div');
    hitEffect.classList.add('key__hit');
    key.appendChild(hitEffect);
    setTimeout(()=>{
        key.removeChild(hitEffect)
    },1000)
}

function updateHits(judgement){
    hits[judgement]++;
}

function updateCombo(judgement){
    if(judgement === 'bad' || judgement === 'miss'){
        combo = 0;
        comboText.innerHTML = '';
    }else{
        comboText.innerHTML = ++combo;
    }
}

function updateMaxCombo(){
    maxCombo = maxCombo < combo ? combo : maxCombo; //(條件)三元運算子，當maxCombo小於combo時，maxCombo指定為combo，否則保持原來的值。
}

function removeNoteFromTrack(parent, child){
    parent.removeChild(child);
}

function updateNext(index){
    song.sheet[index].next++;
}
function fixSongSpeed(preMusicSpeed){
    noteKeys.forEach(key => {
        key.notes.forEach(item => {
            item.delay-= songStartTime;
            item.delay*= preMusicSpeed;
            item.delay/= musicSpeed;
            item.delay+= songStartTime;
        });
    })

    // d.notes.forEach(item => {
    //     item.delay-= songStartTime;
    //     item.delay*= preMusicSpeed;
    //     item.delay/= musicSpeed; 
    //     item.delay+= songStartTime;
    //     // console.log(item.delay)
    // });
    
    // f.notes.forEach(item => {
    //     item.delay-= songStartTime;
    //     item.delay*= preMusicSpeed;
    //     item.delay/= musicSpeed;
    //     item.delay+= songStartTime;
    // });
    
    // j.notes.forEach(item => {
    //     item.delay-= songStartTime;
    //     item.delay*= preMusicSpeed;
    //     item.delay/= musicSpeed;
    //     item.delay+= songStartTime;
    // });
    
    // k.notes.forEach(item => {
    //     item.delay-= songStartTime;
    //     item.delay*= preMusicSpeed;
    //     item.delay/= musicSpeed;
    //     item.delay+= songStartTime;
    // });
}

function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15)); 
    return Math.round(m) / 100 * Math.sign(num);
}

function setupSpeed(){
    noteSpeedTxt.innerHTML = "Note Speed:"+noteSpeed;
    songSpeedTxt.innerHTML = "Song Speed:"+musicSpeed;
}

function setupSpeedBtnClickListener(){
    noteSpeedDownBtn.addEventListener("click",()=>{
        if(noteSpeed <= -3) return;
        noteSpeed-=0.05;
        noteSpeed = round(noteSpeed);
        initializeUI()
        initializeNotes();
        saveToLocal()
    })
    noteSpeedUpBtn.addEventListener("click",()=>{
        if(noteSpeed >= 3) return;
        noteSpeed+=0.05;
        noteSpeed = round(noteSpeed);
        
        initializeUI()
        initializeNotes();
        saveToLocal()
    })

    songSpeedDownBtn.addEventListener("click",()=>{
        if(musicSpeed <= 0.25) return;
        let preMusicSpeed = musicSpeed;
        musicSpeed-=0.1;
        musicSpeed = round(musicSpeed);
        music.playbackRate = musicSpeed;
        fixSongSpeed(preMusicSpeed);
        initializeUI()
        initializeNotes();
        saveToLocal()
    })
    songSpeedUpBtn.addEventListener("click",()=>{
        if(musicSpeed >= 5) return;
        let preMusicSpeed = musicSpeed;
        musicSpeed += 0.1;
        musicSpeed = round(musicSpeed);
        music.playbackRate = musicSpeed;
        fixSongSpeed(preMusicSpeed);
        initializeUI()
        initializeNotes();
        saveToLocal()
    })
}

function initializeUI(){
    noteSpeedTxt.innerHTML = "Note Speed:"+noteSpeed;
    songSpeedTxt.innerHTML = "Song Speed:"+musicSpeed;
}

function saveToLocal(){
    console.log(noteSpeed,musicSpeed)
    localStorage['noteSpeed'] = noteSpeed;
    localStorage['musicSpeed'] = musicSpeed;
}

window.onload = function(){
    trackContainer = document.querySelector('.track-container');
    keypress = document.querySelectorAll(".keypress");
    comboText = document.querySelector('.hit__combo');
    document.querySelector('.btn--start').style.opacity = '100%';
    fixSongSpeed(1);
    initializeNotes();
    initializeUI();
    saveToLocal();
    setupKeys();    
    setupStartButton();
    setupNoteMiss();
    setupSpeed(); 
    setupSpeedBtnClickListener();
    console.log(localStorage['noteSpeed'])
    console.log(localStorage['musicSpeed'])
}