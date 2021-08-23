window.addEventListener('DOMContentLoaded',(event)=>
{
    creatInnerHtml();
});

const creatInnerHtml=()=>
{
    // separating the header from body
    const headerHtml="<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
    let employeeData=createEmployeePayrollJSON()[0];
    // Passing the header in the innerhtml
    const innerHtml= `${headerHtml} 
            <tr>
                <td><img class="profile" alt="" src="${employeeData._profilePic}"></td>
                <td>${employeeData._name}</td>
                <td>${employeeData._gender}</td>
                <td><div class="department">${employeeData._department[0]}</div>
                    <div class="department">${employeeData._department[1]}</div></td>
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