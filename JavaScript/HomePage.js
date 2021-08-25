let employeeDataList;
window.addEventListener('DOMContentLoaded',(event)=>
{
    employeeDataList=getEmployeePayrollDataFromStrorage();
    document.querySelector('.empCount').textContent=employeeDataList.length;
    creatInnerHtml();
    localStorage.removeItem('editEmp');

});
const getEmployeePayrollDataFromStrorage=()=>
{
    return localStorage.getItem('EmployeePayRoll')?JSON.parse(localStorage.getItem('EmployeePayRoll')):[];
}
const creatInnerHtml=()=>
{
    // separating the header from body
    const headerHtml="<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml=`${headerHtml}`;
    for(const employeeData of employeeDataList)
    {
    // Passing the header in the innerhtml
    innerHtml= `${innerHtml} 
            <tr>
                <td><img class="profile" alt="" src="${employeeData._profilePic}"></td>
                <td>${employeeData._name}</td>
                <td>${employeeData._gender}</td>
                <td>${getDeptHtml(employeeData._department)}</td>
                <td>${employeeData._salary}</td>
                <td>${employeeData._startDate}</td>
                <td>
                    <img id=${employeeData._name} onclick="remove(this)" alt="delete" src="../Assets/icons/delete-black-18dp.svg">
                    <img  alt="edit" src="../Assets/icons/create-black-18dp.svg">
                </td>
            </tr>
     `;
    document.querySelector('#empTable').innerHTML=innerHtml;
    }
}
const getDeptHtml=(deptList)=>
{
    let deptHtml='';
    for(const dept of deptList)
    {
        deptHtml=`${deptHtml}<div class="department">${dept}</div>`;
    }
    return deptHtml;
}
// deleting the data from local storage
const remove=(node)=>
{
    let employeeDetail=employeeDataList.find(data=>data._name == node.id);
    if(!employeeDetail) return;
    let index=employeeDataList.map(x=>x._name).indexOf(employeeDetail._name);
    employeeDataList.splice(index,1);
    localStorage.setItem('EmployeePayRoll',JSON.stringify(employeeDataList));
    document.querySelector('.empCount').textContent=employeeDataList.length;
    creatInnerHtml();
}