let idInput = document.querySelector('#tkuId');
let classInput = document.querySelector('#totalClasses')
let send = document.querySelector('#send');
let info = document.querySelector('#info');
let item_box = document.querySelector('.item_box');
let timeoutArray = [];

function getAcademicSystem(num) {
    return TKU.academicSystemMap[num];
}

function getCollege(num) {
    return TKU.collegeMap[num];
}

function getDepartment(num) {
    return TKU.departmentMap[num];
}

function calcYear(num, mode = "ROC") {
    num = Number(num);
    if (mode == "AD") {
        return num < 85 ? num + 2011 : num + 1911
    } else if (mode == "ROC") {
        return num < 85 ? ~~num + 100 : num;
    }
}

function calcSeatNumber(num) {
    return Number(TKU.totalClasses == 1 ? num : ~~(num / TKU.totalClasses) + 1);
}

function calcClass(num) {
    let classes = Object.assign({}, 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split(''));
    return classes[(!(num % TKU.totalClasses) ? TKU.totalClasses : num % TKU.totalClasses) - 1];
}


function render(){
    function tagTemplate(string, ...args){
        return `${args[0]}： ${args[1]}`
    }

    for (let i of timeoutArray){
        clearTimeout(i);
    }

    item_box.innerHTML = '';
    let j = 0;
    for (let i in ID_decode) {
        timeoutArray.push(setTimeout(() => {
            let e = document.createElement('div');
            e.classList.add('item');
            e.textContent = tagTemplate`${chinese_term[i]}${ID_decode[i]}`;
            item_box.appendChild(e);
        }, j * 60))
        j += 1; 
    }
}

function analyzeId(id, totalClasses) {
    [TKU.id, TKU.totalClasses] = [id, totalClasses]
    for (let i of Object.keys(ID_decode)) {
        if (typeof TKU[i] == 'function') {
            ID_decode[i] = TKU[i]();
        } else {
            ID_decode[i] = TKU[i];
        }
    }

    render();

}

function isValid(e) {
    var selection = e.target.value.substr(e.target.selectionStart, e.target.selectionEnd - e.target.selectionStart);
    return (!isNaN(Number(e.key)) && idInput.value.length <= 8) || selection
}

function submit(){length = idInput.value.length;
    if(length < 9){
        idInput.value = `${idInput.value}${'0'.repeat(9-length)}`
    }
    if(!classInput.value){
        classInput.value = 1
    }
    analyzeId(idInput.value, classInput.value);
}

idInput.addEventListener('keypress', (e) => {
    if (!isValid(e)) e.preventDefault();
    if (e.key == 'Enter') {
        send.click();
    }
})

classInput.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        send.click();
    }
})

classInput.addEventListener('change', (e) => {
    if(e.target.value <= 0 ){
        e.target.value = 1
    }
})

send.addEventListener('click', submit)

window.onload = () =>{
    send.click()
}






/*
// Execute in DevTool (get the data of tables)
// url: https://tku.fandom.com/wiki/%E6%B7%A1%E6%B1%9F%E5%A4%A7%E5%AD%B8%E5%AD%B8%E8%99%9F

tables = document.querySelectorAll('table tbody');
AS = tables[1]; // Academic System
EY = tables[2]; // Enrollment Year
DP = tables[3]; // Department


function getTable(table, mode = 'AS') {
    let array = [];
    for (let i of table.children) {
        let arr = i.innerText.split('\t');
        if (mode == 'AD' || mode == 'DP') {
            array = [...array, [arr[0], arr[2]]]
        } else {
            array.push(arr);
        }
    }
    array = array.slice(1);
    console.log(array)
    let object = Object.fromEntries(array);
    printObject(object);
}

function printObject(obj) {
    let str = '';
    for (let [key, value] of Object.entries(obj)) {
        str += `"${key}":"${value}",`;
    }
    console.log(`${str}`);
}

getTable(AS)
getTable(EY, 'AD');
getTable(DP, 'CL');   // college
getTable(DP, 'DP');   // department

*/

// AS_array = []
// for (let i of AS.children){
//     let arr =  i.innerText.split('\t');
//     AS_array.push(arr.slice(0,2))
//     console.log(arr);
// }
// AS_array = AS_array.slice(1)
// AS_object = Object.fromEntries(AS_array);
// console.log(AS_object)

// Dev Log 
// 230907 v1.0.0 create TKU_ID_decoder
// 230908 v1.0.1 fix the enrollment year (ROC) display bug


// str = `
// 學號: ${ID_decode.id}
// 學制: ${ID_decode.academicSystem}
// 入學之年次(民國年): ${ID_decode.enrollmentYearROC}
// 入學之年次(公元年): ${ID_decode.enrollmentYearAD}
// 學院: ${ID_decode.college}
// 科系: ${ID_decode.department}
// 班級: ${ID_decode.class}
// 座號: ${ID_decode.seatNumber}
// 序號: ${ID_decode.studentSerial}
// `