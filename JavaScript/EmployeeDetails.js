class EmployeeDetail {
    get id()
    {
        return this._id;
    }
    set id(id)
    {
        this._id=id;
    }
    //getter setter
    get name() {
        return this._name;
    }
    set name(name) {
        let nameRegex=RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
         if(nameRegex.test(name))
         {
             this._name=name;
         }
         else
         {
             throw 'Name is incorrect';
         }
    }
    get profilePic() {
        return this._profilePic;
    }
    set profilePic(profilePic) {
        this._profilePic = profilePic;
    }
    get gender() {
        return this._gender;
    }
    set gender(gender) {
        this._gender = gender;
    } 
     get department() {
        return this._department;
    }
    set department(department) {
        this._department = department;
    }
    get salary() {
        return this._salary;
    }
    set salary(pay) {
        this._salary = pay;
    }
    get startDate() {
        return this._startDate;
    }
    set startDate(date) {
            let now=new Date();
            if(date>now)
            {
                throw 'start date is future date';
            }
            var diff=Math.abs(now.getTime()-date);
            if(diff/(1000*60*60*24)>30)
            {
             throw 'Start Date Beyond 30 Days!';
            }
            this._startDate=stringifyDate(date);
    }
    get note() {
        return this._note;
    }
    set note(note) {
            this._note = note;
    }
    toString() {
        
        return 'name:' + this.name+'\nProfile pic:'+this.profilePic+'\nDepartment:'+this.department+'\nsalary :' + this.salary + "\ngender:" + this.gender + "\nstartDate:" + this._startDate +"\nnotes:"+this.note;
    }
}
