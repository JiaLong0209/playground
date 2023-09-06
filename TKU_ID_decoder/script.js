console.log('hello TKU');

let idInput = document.querySelector('#tkuId');
let classInput = document.querySelector('#totalClasses')
let send = document.querySelector('#send');
let info = document.querySelector('#info');

let TKU = {
    academicSystem:{'2': '進學班', '4': '學士生', '6': '碩士生', '7': '大二轉進或碩士在職專班', '8': '大三轉進或博士生'},
    enrollmentYearROC: (number) => calcYear(number,'ROC'),
    enrollmentYearAD: (number) => calcYear(number,'AD'),
    college:{"10":"外語學院","11":"外語學院","12":"外語學院","13":"外語學院","16":"理學院","17":"理學院","19":"理學院","20":"理學院","21":"理學院","22":"理學院","23":"理學院","33":"國際研究學院","35":"工學院","36":"工學院","37":"工學院","38":"工學院","40":"工學院","41":"工學院","43":"工學院","44":"工學院","48":"工學院","49":"工學院","50":"工學院","51":"工學院","53":"商管學院","54":"商管學院","55":"商管學院","56":"商管學院","57":"商管學院","59":"商管學院","60":"商管學院","61":"商管學院","62":"商管學院","63":"商管學院","64":"商管學院","65":"商管學院","66":"商管學院","68":"商管學院","71":"教育學院","73":"教育學院","77":"AI創智學院","80":"國際事務學院","81":"外語學院","82":"國際事務學院","84":"","85":"工學院","86":"國際事務學院","00":"文學院","01":"文學院","03":"文學院","04":"文學院","05":"文學院","08":"外語學院","09":"外語學院",},
    department:{"10":"日文系（日）","11":"英文系（日）","12":"西語系（日）","13":"俄文系（日）","16":"化學系生化組（日）","17":"化學系材化組（日）","19":"數學系數學組（日）","20":"數學系資統組（日）","21":"物理系光電組（日）","22":"物理系應物組（日）","23":"尖端材料科學學程","33":"戰略所碩專班","35":"機械系精密機械組","36":"建築系","37":"機械系光機電整合","38":"土木系碩士班","40":"化材系（日）","41":"資工系（日）","43":"航太系（日）","44":"電機系電資（日）","48":"水環系水資源組","49":"電機系電通組","50":"電機系電機（日）","51":"水環系環工組","53":"財金系（日）","54":"產經","55":"國際企業系經貿管理組","56":"風保","57":"經濟系（日）","59":"國際企業系國際商學組","60":"會計","61":"企管系（日）","62":"管科","63":"資管系（日）","64":"公行系（日）","65":"統計系（進學）","66":"運管系（日）","68":"全財管學程","71":"教設","73":"教科系（日）","77":"人工智慧學系","80":"外交","81":"英文英語","82":"政經","84":"","85":"資工系資工英語","86":"觀光","00":"資圖系（日）","01":"中文系（日）","03":"歷史系（日）","04":"資傳系（日）","05":"大眾傳播學系","08":"法文系（日）","09":"德文系（日）",},
    studentSerial: (number) => number,
    class: (number, totalClasses) => calcClass(number, totalClasses),
    seatNumber: (number, totalClasses) => calcSeatNumber(number, totalClasses)
}
function calcYear(num, mode = "ROC"){
    num = Number(num);
    if(mode == "AD"){
        return num < 85 ? num + 2011 : num + 1911
    }else if(mode == "ROC"){
        return num < 85 ? ~~`1${num}` : num;
    }
}

function calcSeatNumber(num, total){
    return Number(total == 1 ? num : ~~(num / total)+1);
}

function calcClass(num, total){
    let classes = {"1":"A", "2":"B", "3":"C", "4":"D", "5":"E"};
    return classes[!(num % total) ? total : num % total];
}

function analyzeId(id, totalClasses){
    str = `
    學號: ${id}
    學制: ${TKU.academicSystem[id[0]]}
    入學之年次(民國年): ${TKU.enrollmentYearROC(id.slice(1,3))}
    入學之年次(公元年): ${TKU.enrollmentYearAD(id.slice(1,3))}
    學院: ${TKU.college[id.slice(3,5)]}
    科系: ${TKU.department[id.slice(3,5)]}
    班級: ${TKU.class(id.slice(5,8),totalClasses)}
    座號: ${TKU.seatNumber(id.slice(5,8),totalClasses)}
    流水號: ${TKU.studentSerial(id.slice(5,8))}
    `
    console.log(str)
    info.innerText = str;

}

function isValid(e){
    return (!isNaN(Number(e.key)) && idInput.value.length <= 8)
}

idInput.addEventListener('keypress', (e)=>{
    if(!isValid(e)) e.preventDefault();
    if(e.key == 'Enter'){
        send.click();
    }
})

classInput.addEventListener('keypress', (e)=>{
    if(e.key == 'Enter'){
        send.click();
    }
})
send.addEventListener('click', ()=>{analyzeId(idInput.value, classInput.value)})




// Execute in DevTool
// url: https://tku.fandom.com/wiki/%E6%B7%A1%E6%B1%9F%E5%A4%A7%E5%AD%B8%E5%AD%B8%E8%99%9F

tables = document.querySelectorAll('table tbody');
AS = tables[1]; // Academic System
EY = tables[2]; // Enrollment Year
DP = tables[3]; // Department


function analyzeTable(table,mode='AS'){
    let array = [];
    for (let i of table.children){
        let arr =  i.innerText.split('\t');
        if(mode == 'AD' || mode == 'DP'){
            array = [...array,[arr[0],arr[2]]]
        }else{
            array.push(arr);
        }
    }
    array = array.slice(1);
    console.log(array)
    let object = Object.fromEntries(array);
    printObject(object);
}

function printObject(obj){
    let str = '';
    for(let [key,value] of Object.entries(obj)){
        str+=`"${key}":"${value}",`;
    }
    console.log(`${str}`);
}

analyzeTable(AS)
analyzeTable(EY, 'AD');
analyzeTable(DP, 'CL');   // college
analyzeTable(DP, 'DP');   // department


// AS_array = []
// for (let i of AS.children){
//     let arr =  i.innerText.split('\t');
//     AS_array.push(arr.slice(0,2))
//     console.log(arr);
// }
// AS_array = AS_array.slice(1)
// AS_object = Object.fromEntries(AS_array);
// console.log(AS_object)
