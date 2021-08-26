let employeeDataList;
window.addEventListener('DOMContentLoaded',(event)=>
{
    //check if the data is from local storage or json server
    if(siteProperties.use_local_Storage.match("true"))
    {
        getEmployeePayrollDataFromStrorage();
    }
    else
      getEmployeePayrollDataFromServer();

});
//check for the response 
const processEmployeePayrollDataResponse=()=>
{
    document.querySelector('.empCount').textContent=employeeDataList.length;
    creatInnerHtml();
    localStorage.removeItem('editEmp');
}
//method to get data from local storage
const getEmployeePayrollDataFromStrorage=()=>
{
    employeeDataList= localStorage.getItem('EmployeePayRoll')?JSON.parse(localStorage.getItem('EmployeePayRoll')):[];
    processEmployeePayrollDataResponse();
}
// method to get the employee payroll details from the json server
const getEmployeePayrollDataFromServer=()=>
{
    makePromiseCall("GET",siteProperties.server_url,true)
    .then(responseText=>{
        employeeDataList=JSON.parse(responseText);
        processEmployeePayrollDataResponse();
    })
    .catch(error=>{
        console.log("GET Error Status:"+JSON.stringify(error));
        employeeDataList=[];
        processEmployeePayrollDataResponse();
    });

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
                    <img id=${employeeData.id} onclick="remove(this)" alt="delete" src="../Assets/icons/delete-black-18dp.svg">
                    <img id=${employeeData.id} onclick="edit(this)" alt="edit" src="../Assets/icons/create-black-18dp.svg">
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
    let employeeDetail=employeeDataList.find(data=>data.id == node.id);
    if(!employeeDetail) return;
    let index=employeeDataList.map(x=>x.id).indexOf(employeeDetail.id);
    employeeDataList.splice(index,1);
    // check if the storage is local or json server
    if(siteProperties.use_local_Storage.match("true"))
    {
    localStorage.setItem('EmployeePayRoll',JSON.stringify(employeeDataList));
    document.querySelector('.empCount').textContent=employeeDataList.length;
    creatInnerHtml();
    }
    // if server then execute DELETE method
    else
    {
        const deleteUrl=siteProperties.server_url+employeeDetail.id.toString();
        makePromiseCall("DELETE",deleteUrl,false)
        .then(responseText=>{
            creatInnerHtml();
        })
        .catch(error=>{
            alert(JSON.stringify(error));
        })
    }
}
const edit=(node)=>
{
    let employeeDetail=employeeDataList.find(data=>data.id == node.id);
    if(!employeeDetail) return;
    localStorage.setItem('editEmp',JSON.stringify(employeeDetail));
    window.location.replace(siteProperties.register_Page);
    
}