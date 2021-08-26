let isUpdate = false;
let employeePayRollObj = {};
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#Name');
    const texterror = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            texterror.textContent = "";
        }
        else {
            try {
                (new EmployeeDetail()).name = name.value;
                texterror.textContent = "";
            }
            catch (e) {
                texterror.textContent = e;
            }
        }
    });
    const salary = document.querySelector('#salary');
    const salaryOutput = document.querySelector('.salary-output');
    salary.addEventListener('input', function () {
        salaryOutput.textContent = salary.value;
    });
    const date = document.querySelector("#date");
    date.addEventListener("input", function () {
        let startdate = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
        try {
            new EmployeeDetail().startDate = new Date(Date.parse(startdate));
            setTextValue(".error-Date", "");
        } catch (e) {
            setTextValue(".error-Date", e);
        }
    });
    checkForUpdate();
});
// Check if it is update or new form
const checkForUpdate = () => {
    const employeePayrollDetail = localStorage.getItem('editEmp');
    isUpdate = employeePayrollDetail ? true : false;
    if (!isUpdate) return;
    employeePayRollObj = JSON.parse(employeePayrollDetail);
    setForm();
}
// save the data
const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setEmployeePayRollObject();
        createAndUpdateStorage();
        Reset();
        window.location.replace(siteProperties.home_Page);
    }
    catch (e) {
        alert(e);
    }
}

const setEmployeePayRollObject=()=>
{
    employeePayRollObj._name = getInputValueById('#Name');
    employeePayRollObj._profilePic = getSelectedValues('[name=profilePic]').pop();
    employeePayRollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayRollObj._department = getSelectedValues('[name=Department]');
    employeePayRollObj._salary = getInputValueById('#salary');
    employeePayRollObj._note = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayRollObj._startDate = new Date(Date.parse(date));
}
const createAndUpdateStorage=()=>
{
    let employeeDataList=JSON.parse(localStorage.getItem('EmployeePayRoll'));
    if(employeeDataList)
    {
        let empData=employeeDataList.find(x=>x._id==employeePayRollObj._id);
        if(!empData)
        {
            employeeDataList.push(createEmployeePayRollData());
        }
        else
        {
            const index=employeeDataList.map(emp=>emp._id).indexOf(empData._id);
            employeeDataList.splice(index,1,createEmployeePayRollData(empData._id));
        }
    }
    else
    {
        employeeDataList=[createEmployeePayRollData()];
    }
    localStorage.setItem("EmployeePayRoll",JSON.stringify(employeeDataList));
}

const createNewEmpId=()=>
{
    let empId=localStorage.getItem("EmployeeId");
    empId=!empId?1:(parseInt(empId)+1).toString();
    localStorage.setItem("EmployeeId",empId);
    return empId;
}
const createEmployeePayRollData=(id)=>
{
    let employeePayrollData = new EmployeeDetail();
    if(!id) employeePayrollData.id=createNewEmpId();
    else employeePayrollData.id=id;
    setEmployeePayRoll(employeePayrollData);
    return employeePayrollData;
}

// geting the value when id is passed
const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}
const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}
//geting the checked value from radio button or checkbox
const getSelectedValues = (propertyValue) => {
    let allItem = document.querySelectorAll(propertyValue);
    let setItem = [];
    allItem.forEach(item => {
        if (item.checked) {
            setItem.push(item.value);
        }
    });
    return setItem;
}

// Reset the value
const Reset = () => {
    setTextValue('#Name', '');
    unCheckValue('[name=gender]');
    unCheckValue('[name=profilePic]');
    unCheckValue('[name=Department]');
    setValue("#salary", '');
    setTextValue('#salary-output', '40000')
    setValue("#day", 'Day');
    setValue("#month", 'Month');
    setValue("#year", "Year");
    setValue("#notes", '');
}
//setting text value text field
const setTextValue = (id, value) => {
    let element = document.querySelector(id);
    element.textContent = value;
}
//Uncheck the value
const unCheckValue = (propertyValue) => {
    let allData = document.querySelectorAll(propertyValue);
    allData.forEach(item => { item.checked = false });
}
//set value other than text field
const setValue = (id, value) => {
    let ElementValue = document.querySelector(id);
    ElementValue.value = value;
}
// setting the form from the received value
const setForm = () => {
    setValue('#Name', employeePayRollObj._name);
    setSelectedValue('[name=gender]', employeePayRollObj._gender);
    setSelectedValue('[name=profilePic]', employeePayRollObj._profilePic);
    setSelectedValue('[name=Department]', employeePayRollObj._department);
    setValue("#salary", employeePayRollObj._salary);
    setValue('#salary-output', employeePayRollObj._salary);
    let date = stringifyDate(employeePayRollObj._startDate).split(" ");
    setValue("#day", date[0]);
    setValue("#month", date[1]);
    setValue("#year", date[2]);
    setValue("#notes", employeePayRollObj._note);
}
// check the selected value
const setSelectedValue = (propertyValue, value) => {
    let allData = document.querySelectorAll(propertyValue);
    allData.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value == value) {
            item.checked = true;
        }
    });
}