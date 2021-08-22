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
        UpdateAndSaveData(employeeData);
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
    employeePayrollData.name=getInputValueById('#Name');
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
function UpdateAndSaveData(employeePayrollData)
{
    let employeePayRollList=JSON.parse(localStorage.getItem('EmployeePayRoll'));
    if(employeePayRollList!=null)
    {
        employeePayRollList.push(employeePayrollData);
    }
    else
    {
        employeePayRollList=[employeePayrollData];
    }
    localStorage.setItem("EmployeePayRoll",JSON.stringify(employeePayRollList));
}
// Reset the value
Reset=()=>
{
    setTextValue('#Name','');
    UncheckValue('[name=gender]');
    UncheckValue('[name=profilePic]');
    UncheckValue('[name=Department]');
    setValue("#salary",'');
    setValue("#day",'Day');
    setValue("#month",'Month');
    setValue("#year","Year");
    setValue("#notes",'');
}
//setting text value text field
const setTextValue=(id,value)=>
{
   let element=document.querySelector(id);
   element.textContent=value;
}
//Uncheck the value
const unCheckValue=(propertyValue)=>
{
   let allData=document.querySelectorAll(propertyValue);
   allData.forEach(item=>{item.checked=false});
}
//set value other than text field
const setValue=(id,value)=>
{
    let ElementValue=document.querySelector(id);
    ElementValue.value=value;
}