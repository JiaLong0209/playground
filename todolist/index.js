let data = localStorage["data"] != "[]" && localStorage["data"] ? JSON.parse(localStorage["data"]) : [];
// let data = [];
let nowStatus = 0;
let preData = [];
console.log(localStorage)

/*
function rec(...node){
  console.log(...node);
  if(!node) return;
  for(let i of node){
    if(i.localName == 'script'){
      return;
    }else{
      virus(i);
      rec(...i.children);
    }
  }
}
function virus(i){
  let random = [Math.random()*360,Math.random()-0.5,Math.random()+0.5];
    i.style.backgroundImage='url(https://img.ltn.com.tw/Upload/news/600/2017/05/24/215.jpg)';
    i.style.backgroundSize = `${(Math.random()+0.5)*300}px ${(Math.random()+0.5)*500}px`;
    i.style.transform = `rotate(${random[0]}deg)`;
    i.style.transform += `translate(${(Math.random()-0.5)*700}px, ${(Math.random()-0.5)*700}px`;
    i.style.filter = `contrast(${(Math.random()+0.5)*120}%) hue-rotate(${(Math.random()+0.5)*360}deg)`;
}
rec(document.body);
*/

// i.innerHTML += `<img src='https://img.ltn.com.tw/Upload/news/600/2017/05/24/215.jpg' width='${300*(Math.random()-0.5)}' height='${600*(Math.random()-0.5)}' style='transform:rotate(${random[0]}deg)'>`;

// DOM
const addInput = document.querySelector("#input_data");
const addBtn = document.querySelector(".btn_add");
const tab = document.querySelectorAll(".tab li");
const list = document.querySelector(".list");
const todoNum = document.querySelector("#todo_num");
const clearList = document.querySelector("#remove_all_completed_data");

// 渲染資料
function render(mode = 0, filteredData = []) {
  let str = "";
  let newData = mode == 0 ? data : mode == 1 ? data.filter(i => i.status == "" ) : data.filter(i => i.status == "checked");
  if(mode == 1 && filteredData) for(let i of filteredData) newData.push(i);
  newData.sort((a,b) => a.id - b.id).forEach((i) => {
    str += `<li data-id="${i.id}">
              <label class="checkbox">
                <input type="checkbox" ${i.status}>
                <span>${i.content}</span>
              </label>
              <a href="#" class="delete">X</a>
            </li>`;
  });
  list.innerHTML = str;
  // 待完成項目數
  todoNum.textContent = data.filter((i) => i.status === "").length;
  updateLocalStorage(data);
}

// 新增 List
function addTodo() {
  let content = addInput.value.trim();
  if (!content) return ;
  data.push({ id: new Date().getTime(), content, status: "" });
  render(nowStatus,preData);
  addInput.value = "";
}
addBtn.addEventListener("click", () => addTodo());
addInput.addEventListener("keyup", (e) =>
  e.key == "Enter" ? addTodo() : null
);

// 刪除 List
list.addEventListener("click", (e) => {
  let id = e.target.closest("li").dataset.id;
  if(e.target.getAttribute("class") == "delete"){
    data.splice(data.findIndex(i => id == i.id),1);
    preData = preData.filter(i => i.id != id);
    render(nowStatus, preData);
  }else {
    let item = data.find(i => i.id == id);
    if(item.status === "checked"){
      item.status = "";
      if(preData && nowStatus == 1) preData.splice(preData.indexOf(item), 1);
    }else{
      item.status = "checked";
      if(nowStatus == 1) preData.push(item);
    }
    todoNum.textContent = data.filter((i) => i.status === "").length;
  }
  updateLocalStorage(data);
});

// 清除已完成 List
clearList.addEventListener("click", (e) => {
  data = data.filter(i => i.status !== "checked");
  render(nowStatus);
  preData = [];
});

tab.forEach( (item, index) => {
  item.addEventListener('click', () => {
    for(let i of tab) i.classList.remove('active');
    tab[index].classList.add('active');
    nowStatus = index;
    render(index)
    preData = [];
  })
})

function updateLocalStorage(data){
  localStorage["data"] = JSON.stringify(data)
}

render(0);

// 1. click + push data v
// 2. classify the data into all_data, uncompleted_data and completed_data v
// 3. render different type of data v
// 4. calculate the number of uncompleted_data v
// 5. check btn v
// 6. clear all of completed_data v
// 7. delete btn v


// let allData = {
//   "uncompleted_data": [],
//   "completed_data": []
// }
// let states = ['uncompleted_data','completed_data'];
// let state = 0;  // 0 = all_data, 1 = uncompleted_data ,2 completed_data 

// const  tab = document.querySelectorAll('.tab li');
// const  removeAllCompletedDataBtn = document.querySelector('#remove_all_completed_data');
// const  uncompletedDataCount = document.querySelector('#todo_num');
// const  addBtn = document.querySelector('.btn_add');
// const  inputData = document.querySelector('#input_data');
// const  dataList = document.querySelector('.list');

// tab.forEach( (item, index)=>{
//   item.addEventListener('click', () => {render(index);});
// })

// function render(n){
//   state = n;
//   for(let i of tab){
//     i.classList.remove('active');
//   }
//   tab[n].classList.add('active')
//   let key = n == 1 ? 'uncompleted_data' : n == 2 ? 'completed_data' : 'uncompleted_data';
//   let data = [];
//   dataList.innerHTML = '';
//   if (n == 0){
//     data = allData['uncompleted_data'];
//     for(let item of data) dataList.innerHTML += addToList(item);
//     key = 'completed_data';
//   }
//   data = allData[key];
  
//   for(let item of data) dataList.innerHTML += addToList(item, key == 'completed_data' ? 'checked' : '');
//   uncompletedDataCount.value = allData['uncompleted_data'].length;
//   addCheckListener();
//   addDeleteListener();
// }

// function push_data(){
//   let data = inputData.value;
//   let key = 'uncompleted_data';
//   if(data == '') return;
//   inputData.value = '';
//   allData[key].push(data);
//   uncompletedDataCount.innerHTML = allData["uncompleted_data"].length;
//   render(state);
// }

// function addToList(name, type = ""){
//   return `
//         <li>
//           <label class="checkbox" for="">
//             <input type="checkbox" ${type} />
//             <span>${name}</span>
//           </label>
//           <a href="#" class="delete">X</a>
//         </li>`
// }

// function removeAllCompletedData(){
//   allData['completed_data'] = [];
//   console.log(allData)
//   render(state);
// }

// removeAllCompletedDataBtn.addEventListener('click', removeAllCompletedData);
// addBtn.addEventListener('click', push_data);
// inputData.addEventListener('keyup', (e) => {
//     if(e.code == "Enter"){
//         push_data();
//     }
// })

// function addDeleteListener(){
//   let deleteBtns = document.querySelectorAll('li a');
//   deleteBtns.forEach((el, i) => {
//     el.addEventListener('click', () => {
//       let findIndexFromUncompletedData = allData[states[0]].indexOf(document.querySelectorAll('.list span')[i].innerHTML);
//       let findIndexFromCompletedData = allData[states[1]].indexOf(document.querySelectorAll('.list span')[i].innerHTML)   
//       console.log(findIndexFromUncompletedData)
//       console.log(findIndexFromCompletedData)
//       if(findIndexFromUncompletedData != -1){
//         allData[states[0]].splice(findIndexFromUncompletedData,1);
//         uncompletedDataCount.innerHTML = allData['uncompleted_data'].length;
//       }else{
//         allData[states[1]].splice(findIndexFromCompletedData,1);
//       }
//       console.log(allData)
//       render(state);
//     })
// })
// }

// function addCheckListener(){
//   let els = document.querySelectorAll('.list input');
//   els.forEach( (el, i) => {
//     el.addEventListener('change', () => {
//       if(el.checked){
//         let findIndex = allData[states[0]].indexOf(document.querySelectorAll('.list span')[i].innerHTML);
//         allData[states[1]].push(allData[states[0]][findIndex]);
//         allData[states[0]].splice(findIndex,1);
//         uncompletedDataCount.innerHTML = allData[states[0]].length;
//         console.log(allData)
//       }else{
//         let findIndex = allData[states[1]].indexOf(document.querySelectorAll('.list span')[i].innerHTML);
//         allData[states[0]].push(allData[states[1]][findIndex]);
//         allData[states[1]].splice(findIndex,1);
//         uncompletedDataCount.innerHTML = allData[states[0]].length;
//         console.log(allData)
//       }
//     })
//   })
// }



