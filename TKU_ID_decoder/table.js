let departmentTable = document.querySelector('#departmentTable table tbody');

function appendDepartmentTable(){

    for (let i of Object.entries(TKU.departmentMap).sort(sortByKey)){
        if(!i[1]) continue;
        
        let tr = document.createElement('tr');
        let num = document.createElement('td');
        let college = document.createElement('td');
        let department = document.createElement('td');
        let temp = document.createElement('td');
        
        num.innerText = ~~i[0];
        college.innerText =  TKU.collegeMap[i[0]];
        department.innerText = i[1];
        temp.innerText = '';
    
        tr.appendChild(num);
        tr.appendChild(college);
        tr.appendChild(department);
        tr.appendChild(temp);

        departmentTable.appendChild(tr);

    }
}

appendDepartmentTable()

console.log(departmentTable)