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