// 1. make a rough structure 2022/05/30 v0.10
// 2. add keypress listener 2022/06/06 v0.20
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

function setupKeys (){
    document.addEventListener('keydown',(event)=>{
        let keyIndex = getKeyIndex(event.key);
        if(Object.keys(isHolding).indexOf(event.key) !== -1 && !isHolding[event.key]){
            isHolding[event.key] = true;
            keypress[keyIndex].style.display = 'block';
            console.log(Object.keys(isHolding))
        }

    })

        
    document.addEventListener("keyup",(event)=>{
        if(Object.keys(isHolding).indexOf(event.key) !== -1){
            let keyIndex = getKeyIndex(event.key);
            isHolding[event.key] = false;
            keypress[keyIndex].style.display = 'none';
            console.log(Object.keys(isHolding))
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


    setupKeys();
}