// 1. make a rough structure 2022/05/30 v0.10
// 2. add keypress listener 2022/06/05 v0.20
// 3. make track container 2022/06/06 v0.30
let isHolding = {
    d: false,
    f: false,
    j: false,
    k: false
}
let hits = {
    perfect: 0, 
    good: 0,
    bad: 0,
    miss: 0
};

// let isPlaying = false;
let speed = 0;
let combo = 0;
let maxCombo = 0;
let score = 0;
let animation = 'moveDown';
let startTime;
let trackContainer;
let tracks;
let combotText;
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
            console.log('add note');
            noteElement.classList.add('note--' + index);
            noteElement.style.backgroundColor = key.color;
            noteElement.style.animationName = animation; //即為'moveDown'
            noteElement.style.animationTimingFunction = 'linear';
            noteElement.style.animationDuration = note.duration - speed + 's';
            noteElement.style.animationDelay = note.delay + speed + 's';  
            // noteElement.style.animationPlayState = 'paused';
            trackElement.appendChild(noteElement);  //.track 增加.note子節點

        });

        trackContainer.appendChild(trackElement);  //在trackContainer增加.track子節點，沒有這行的話.track 跟 .note 會顯示不出來
        tracks = document.querySelectorAll('.track');
    })
};

function setupKeys (){
    document.addEventListener('keydown',(event)=>{ //當手壓下鍵盤的瞬間
        let keyIndex = getKeyIndex(event.key);
        if(Object.keys(isHolding).indexOf(event.key) !== -1 && !isHolding[event.key]){  //當壓下的鍵在isHolding裡的index不為0 以及 該鍵isHolding不為true時
            isHolding[event.key] = true;
            keypress[keyIndex].style.display = 'block';

            // console.log(Object.keys(isHolding))
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
    if (key === 'd'){
        return 0;
    }else if(key === 'f'){
        return 1;
    }else if(key === 'j'){
        return 2;
    }else if(key === 'k'){
        return 3;
    }
}


window.onload = function(){
    trackContainer = document.querySelector('.track-container');
    keypress = document.querySelectorAll(".keypress");

    initializeNotes();
    setupKeys();
}