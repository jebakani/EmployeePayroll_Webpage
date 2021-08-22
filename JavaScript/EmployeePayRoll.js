window.addEventListener('DOMContentLoaded',(event)=>{

    const name=document.querySelector('#Name');
     const texterror=document.querySelector('.text-error');
     name.addEventListener('input',function()
     {
         if(name.value.length == 0)
         {
             texterror.textContent="";
         }
         else
         {
         try
         {
             (new EmployeeDetail()).name=name.value;
             texterror.textContent="";
         }
         catch(e)
         {
             texterror.textContent=e;
         }
        }
     });

    const salary=document.querySelector('#salary');
     const salaryOutput=document.querySelector('.salary-output');
     salary.addEventListener('input',function()
     {
         salaryOutput.textContent=salary.value;
     });
});
const save=()=>
{
    try{
        let employeeData=createEmployeePayRoll();
    }
    catch(e)
    {
        alert(e);
    }
}
//method to set the value to employee payRoll object
const createEmployeePayRoll=()=>
{
    let employeePayrollData=new EmployeeDetail();
    try
    {
        employeePayrollData.name=getInputValueById('#Name');
    }
    catch(e)
    {
        setTextValue('.text-error',e);
    }
    employeePayrollData.profilePic=getSelectedValues('[name=profilePic]').pop();
    employeePayrollData.gender=getSelectedValues('[name=gender]').pop();
    employeePayrollData.department=getSelectedValues('[name=Department]');
    employeePayrollData.salary=getInputValueById('#salary');
    employeePayrollData.note=getInputValueById('#notes');
    let date=getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollData.startDate=Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}
// geting the value when id is passed
const getInputValueById=(id)=>
{
    let value=document.querySelector(id).value;
    return value;
}
const getInputElementValue=(id)=>{
    let value=document.getElementById(id).value;
    return value;
}
//geting the checked value from radio button or checkbox
const getSelectedValues=(propertyValue)=>
{
    let allItem=document.querySelectorAll(propertyValue);
    let setItem=[];
    allItem.forEach(item=>{
        if(item.checked)
        {
            setItem.push(item.value);
        }
    });
    return setItem;
}
//setting text value in error field
const setTextValue=(id,value)=>
{
   let error=document.querySelector(id);
   error.textContent=value;
}