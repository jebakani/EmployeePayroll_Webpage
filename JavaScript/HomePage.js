window.addEventListener('DOMContentLoaded',(event)=>
{
    creatInnerHtml();
});

const creatInnerHtml=()=>
{
    // separating the header from body
    const headerHtml="<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
    let employeeDataList=createEmployeePayrollJSON();
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
                    <img id=${employeeData._id[0]} onclick="remove(this)" alt="delete" src="../Assets/icons/delete-black-18dp.svg">
                    <img id=${employeeData._id[1]} onclick="delete(this)" alt="edit" src="../Assets/icons/create-black-18dp.svg">
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