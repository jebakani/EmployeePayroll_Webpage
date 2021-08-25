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
const save = () => {
    try {
        let employeeData = createEmployeePayRoll();
        UpdateAndSaveData(employeeData);
        window.location.replace(siteProperties.home_Page);
    }
    catch (e) {
        alert(e);
    }
}
//method to set the value to employee payRoll object
const createEmployeePayRoll = () => {
    let employeePayrollData = new EmployeeDetail();
    employeePayrollData.name = getInputValueById('#Name');
    employeePayrollData.profilePic = getSelectedValues('[name=profilePic]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=Department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayrollData.startDate = new Date(Date.parse(date));
    alert(employeePayrollData.toString());
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
function UpdateAndSaveData(employeePayrollData) {
    let employeePayRollList = JSON.parse(localStorage.getItem('EmployeePayRoll'));
    if (employeePayRollList != null) {
        employeePayRollList.push(employeePayrollData);
    }
    else {
        employeePayRollList = [employeePayrollData];
    }
    localStorage.setItem("EmployeePayRoll", JSON.stringify(employeePayRollList));
}
// Reset the value
Reset = () => {
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