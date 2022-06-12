let BPM = 78; 
let offset = 0.16;
let songStartTime = -1 + offset; //歌曲第一個音出現的時機

let oneBeatTime = 1/(BPM/60); //0.76923...s
let beat = oneBeatTime;    //以一拍統一為四分音符以便製作圖譜
let QN = oneBeatTime;      //四分音符 quarterNote
let EN = oneBeatTime / 2;  //八分音符 eighthNote
let TN = oneBeatTime / 3;  //十二分音符 twelfthNote
let SN = oneBeatTime / 4;  //十六分音符 sixteenthNote
let TFN = oneBeatTime / 4; //二十四分音符 twentyFourthNote
let TSN = oneBeatTime / 8; //三十二分音符 thirtySecondNote
let SFN= oneBeatTime / 16; //六十四分音符  sixtyFourthNote

let d = {
    color: "rgb(255,255,255)",
    next: 0,
    notes: [
        {duration: 3, delay: songStartTime},
        {duration: 3, delay: songStartTime + beat*3},
        {duration: 3, delay: songStartTime + beat*3 + EN + SN},
        {duration: 3, delay: songStartTime + beat*6},
        {duration: 3, delay: songStartTime + beat*7 + TN},
        {duration: 3, delay: songStartTime + beat*8 + EN},
        {duration: 3, delay: songStartTime + beat*10},
        {duration: 3, delay: songStartTime + beat*10 + EN + SN},
        {duration: 3, delay: songStartTime + beat*12},
        {duration: 3, delay: songStartTime + beat*12 + EN},
        {duration: 3, delay: songStartTime + beat*13 + EN + SN},
        {duration: 3, delay: songStartTime + beat*15 + EN + SN},
        {duration: 3, delay: songStartTime + beat*16 + EN},
        {duration: 3, delay: songStartTime + beat*18},
        {duration: 3, delay: songStartTime + beat*19 + EN + SN},
        {duration: 3, delay: songStartTime + beat*20 + EN},
        {duration: 3, delay: songStartTime + beat*22},
        {duration: 3, delay: songStartTime + beat*23},
        {duration: 3, delay: songStartTime + beat*23 + EN + SN},
        {duration: 3, delay: songStartTime + beat*25},
        {duration: 3, delay: songStartTime + beat*26},
        {duration: 3, delay: songStartTime + beat*27 + EN},
        {duration: 3, delay: songStartTime + beat*28},
        {duration: 3, delay: songStartTime + beat*28 + EN},
        {duration: 3, delay: songStartTime + beat*29},
        {duration: 3, delay: songStartTime + beat*30},

        {duration: 3, delay: songStartTime + beat*36},
        {duration: 3, delay: songStartTime + beat*36 + EN},
        {duration: 3, delay: songStartTime + beat*39},
        {duration: 3, delay: songStartTime + beat*40},
        {duration: 3, delay: songStartTime + beat*41},
        {duration: 3, delay: songStartTime + beat*43 + SN},
        {duration: 3, delay: songStartTime + beat*44},
        {duration: 3, delay: songStartTime + beat*45},
        {duration: 3, delay: songStartTime + beat*46},
        {duration: 3, delay: songStartTime + beat*48 + EN + SN},
        {duration: 3, delay: songStartTime + beat*49 + EN + SN},
        {duration: 3, delay: songStartTime + beat*51 + TN},
        {duration: 3, delay: songStartTime + beat*52},
        {duration: 3, delay: songStartTime + beat*53},
        {duration: 3, delay: songStartTime + beat*55 + TN},
        {duration: 3, delay: songStartTime + beat*56 + EN},
        {duration: 3, delay: songStartTime + beat*58},
        {duration: 3, delay: songStartTime + beat*60 + SN},
        {duration: 3, delay: songStartTime + beat*61},
        {duration: 3, delay: songStartTime + beat*61 + EN + SN},

    ]
};

let f = {
    color: "rgb(255,255,255)",
    next: 0,
    notes: [
        {duration: 3, delay: songStartTime + beat},
        {duration: 3, delay: songStartTime + beat*4},
        {duration: 3, delay: songStartTime + beat*4 + EN},
        {duration: 3, delay: songStartTime + beat*7},
        {duration: 3, delay: songStartTime + beat*8},
        {duration: 3, delay: songStartTime + beat*9},
        {duration: 3, delay: songStartTime + beat*11 + SN},
        {duration: 3, delay: songStartTime + beat*12},
        {duration: 3, delay: songStartTime + beat*13},
        {duration: 3, delay: songStartTime + beat*14},
        {duration: 3, delay: songStartTime + beat*16 + EN + SN},
        {duration: 3, delay: songStartTime + beat*17 + EN + SN},
        {duration: 3, delay: songStartTime + beat*19 + TN},
        {duration: 3, delay: songStartTime + beat*20},
        {duration: 3, delay: songStartTime + beat*21},
        {duration: 3, delay: songStartTime + beat*23 + TN},
        {duration: 3, delay: songStartTime + beat*24 + EN},
        {duration: 3, delay: songStartTime + beat*26},
        {duration: 3, delay: songStartTime + beat*28 + SN},
        {duration: 3, delay: songStartTime + beat*29 + EN + SN},

        
        {duration: 3, delay: songStartTime + beat*35},
        {duration: 3, delay: songStartTime + beat*35 + EN + SN},
        {duration: 3, delay: songStartTime + beat*38},
        {duration: 3, delay: songStartTime + beat*39 + TN},
        {duration: 3, delay: songStartTime + beat*40 + EN},
        {duration: 3, delay: songStartTime + beat*42},
        {duration: 3, delay: songStartTime + beat*42 + EN + SN},
        {duration: 3, delay: songStartTime + beat*44},
        {duration: 3, delay: songStartTime + beat*44 + EN},
        {duration: 3, delay: songStartTime + beat*45 + EN + SN},
        {duration: 3, delay: songStartTime + beat*47 + EN + SN},
        {duration: 3, delay: songStartTime + beat*48 + EN},
        {duration: 3, delay: songStartTime + beat*50},
        {duration: 3, delay: songStartTime + beat*51 + EN + SN},
        {duration: 3, delay: songStartTime + beat*52 + EN},
        {duration: 3, delay: songStartTime + beat*54},
        {duration: 3, delay: songStartTime + beat*55},
        {duration: 3, delay: songStartTime + beat*55 + EN + SN},
        {duration: 3, delay: songStartTime + beat*57},
        {duration: 3, delay: songStartTime + beat*58},
        {duration: 3, delay: songStartTime + beat*59 + EN},
        {duration: 3, delay: songStartTime + beat*60},
        {duration: 3, delay: songStartTime + beat*60 + EN},
        {duration: 3, delay: songStartTime + beat*62},


    ]
};

let j = {
    color: "rgb(255,255,255)",
    next: 0,
    notes: [
        {duration: 3, delay: songStartTime + beat*2},
        {duration: 3, delay: songStartTime + beat*3 + TN},
        {duration: 3, delay: songStartTime + beat*6},
        {duration: 3, delay: songStartTime + beat*7},
        {duration: 3, delay: songStartTime + beat*8},
        {duration: 3, delay: songStartTime + beat*9 + EN},
        {duration: 3, delay: songStartTime + beat*10 + EN + SN},
        {duration: 3, delay: songStartTime + beat*11 + EN},
        {duration: 3, delay: songStartTime + beat*12 + SN},
        {duration: 3, delay: songStartTime + beat*13 + SN},
        {duration: 3, delay: songStartTime + beat*17},
        {duration: 3, delay: songStartTime + beat*18},
        {duration: 3, delay: songStartTime + beat*19},
        {duration: 3, delay: songStartTime + beat*21},
        {duration: 3, delay: songStartTime + beat*23},
        {duration: 3, delay: songStartTime + beat*24},
        {duration: 3, delay: songStartTime + beat*25 + EN},
        {duration: 3, delay: songStartTime + beat*27 + SN},
        {duration: 3, delay: songStartTime + beat*28},
        {duration: 3, delay: songStartTime + beat*28 + EN},
        {duration: 3, delay: songStartTime + beat*29},
        {duration: 3, delay: songStartTime + beat*30},

        {duration: 3, delay: songStartTime + beat*34},
        {duration: 3, delay: songStartTime + beat*35 + TN},
        {duration: 3, delay: songStartTime + beat*38},
        {duration: 3, delay: songStartTime + beat*39},
        {duration: 3, delay: songStartTime + beat*40},
        {duration: 3, delay: songStartTime + beat*41 + EN},
        {duration: 3, delay: songStartTime + beat*42 + EN + SN},
        {duration: 3, delay: songStartTime + beat*43 + EN},
        {duration: 3, delay: songStartTime + beat*44 + SN},
        {duration: 3, delay: songStartTime + beat*45 + SN},
        {duration: 3, delay: songStartTime + beat*49},
        {duration: 3, delay: songStartTime + beat*50},
        {duration: 3, delay: songStartTime + beat*51},
        {duration: 3, delay: songStartTime + beat*53},
        {duration: 3, delay: songStartTime + beat*55},
        {duration: 3, delay: songStartTime + beat*56},
        {duration: 3, delay: songStartTime + beat*57 + EN},
        {duration: 3, delay: songStartTime + beat*59 + SN},
        {duration: 3, delay: songStartTime + beat*60},
        {duration: 3, delay: songStartTime + beat*60 + EN},
        {duration: 3, delay: songStartTime + beat*61},
        {duration: 3, delay: songStartTime + beat*62},
    ]
};

let k = {
    color: "rgb(255,255,255)",
    next: 0,
    notes: [
        {duration: 3, delay: songStartTime + beat*3},
        {duration: 3, delay: songStartTime + beat*4},
        {duration: 3, delay: songStartTime + beat*5},
        {duration: 3, delay: songStartTime + beat*7 + EN + SN},
        {duration: 3, delay: songStartTime + beat*10},
        {duration: 3, delay: songStartTime + beat*11 + EN + SN},
        {duration: 3, delay: songStartTime + beat*14},
        {duration: 3, delay: songStartTime + beat*16 + SN},
        {duration: 3, delay: songStartTime + beat*17 + SN},
        {duration: 3, delay: songStartTime + beat*19},
        {duration: 3, delay: songStartTime + beat*20},
        {duration: 3, delay: songStartTime + beat*22},
        {duration: 3, delay: songStartTime + beat*24},
        {duration: 3, delay: songStartTime + beat*25},
        {duration: 3, delay: songStartTime + beat*26 + EN + SN},
        {duration: 3, delay: songStartTime + beat*27 + EN + SN},
        {duration: 3, delay: songStartTime + beat*29 + SN},
        {duration: 3, delay: songStartTime + beat*30},

        {duration: 3, delay: songStartTime + beat*35},
        {duration: 3, delay: songStartTime + beat*36},
        {duration: 3, delay: songStartTime + beat*37},
        {duration: 3, delay: songStartTime + beat*39 + EN + SN},
        {duration: 3, delay: songStartTime + beat*42},
        {duration: 3, delay: songStartTime + beat*43 + EN + SN},
        {duration: 3, delay: songStartTime + beat*46},
        {duration: 3, delay: songStartTime + beat*48 + SN},
        {duration: 3, delay: songStartTime + beat*49 + SN},
        {duration: 3, delay: songStartTime + beat*51},
        {duration: 3, delay: songStartTime + beat*52},
        {duration: 3, delay: songStartTime + beat*54},
        {duration: 3, delay: songStartTime + beat*56},
        {duration: 3, delay: songStartTime + beat*57},
        {duration: 3, delay: songStartTime + beat*58 + EN + SN},
        {duration: 3, delay: songStartTime + beat*59 + EN + SN},
        {duration: 3, delay: songStartTime + beat*61 + SN},
        {duration: 3, delay: songStartTime + beat*62},
    ]
};

let song = {
    duration: 30,
    sheet: [d, f, j, k]
};

let totalNotes = d.notes.length + f.notes.length + j.notes.length + k.notes.length;