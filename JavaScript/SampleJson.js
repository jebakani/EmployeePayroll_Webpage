const createEmployeePayrollJSON=()=>
{
    let employeePayrollList=[
        {
            _name: "mohit kumar new",
            _gender: "male",
            _department : [
              "HR", "Salse"
            ],
            _salary: "30000",
            _startDate: "1 Jan 2020",
            _note: "",
            _id: new Date().getTime(),
            _profilePic: "../Assets/profile-images/Ellipse -2.png"
          },
          {
            _name: "mohit kumar test",
            _gender: "male",
            _department: [
              "HR"
            ],
            _salary: "30000",
            _startDate: "1 Jan 2020",
            _note: "",
            _id: new Date().getTime()+1,
            _profilePic: "../Assets/profile-images/Ellipse 1.png"
          }
    ];
    return employeePayrollList;
}