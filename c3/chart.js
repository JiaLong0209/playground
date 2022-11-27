
window.onload = ()=>{
  let data = [["data1", 30, 200, 100, 400, 150, 250],["data2", 50, 20, 10, 40, 15, 25]]
  // let data3 =  ["data3", 550, 205, 150, 430, 135, 25]
  let categories = {};
  for(let i of data){
    categories[i[0]] = i;
  }
  
  let selectCat = data[0][0];
  // console.log(selectCat)
  const addValue = document.querySelector('#value');
  const categorySelector = document.querySelector('#category');
  const send = document.querySelector('#send');
  const columnsInput = document.querySelector('#column');
  const sendColumn = document.querySelector('#sendColumn');
  var chart = c3.generate({
      bindto: "#chart",
      data: {
        columns: data
      },
  });

  // change select category
  categorySelector.addEventListener('change',(e)=>{
    selectCat = e.target.value;
  })

  // add data to selected category
  send.addEventListener('click',()=>{
    if(addValue.value == ''){
      alert('Please enter a valid value!');
      return;
    }
    categories[selectCat].push(addValue.value);
    render(data);
  })

  // add new category to chart
  sendColumn.addEventListener('click',()=>{
    let str = columnsInput.value;
    let arr = [];
    if(str=='') alert("Please enter the valid values !")
    str = str.trim().replace(/[ \[\]]/g,'').split(",");
    for(let i in str){
      i == 0? arr.push(str[i].slice(1,str[i].length-1)) : arr.push(Number(str[i]));
    }
    data.push(arr);
    categories[arr[0]] = arr;
    categorySelector.innerHTML += `<option value ="${arr[0]}">${arr[0]}</option>`;
    str != '' ? render(data) : null;
  })


  function render(data){
    chart = c3.generate({
      bindto: "#chart",
      data: {
        columns: data
      },
    });
  }
  
}

