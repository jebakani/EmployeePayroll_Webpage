class EmployeeDetail {
    //getter setter
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
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
            this._startDate = date;
    }
    get note() {
        return this._note;
    }
    set note(note) {
            this._note = note;
    }
    toString() {
        const option={year:"numeric",month:"long",day:"numeric"};
        const joinDate=this.startDate?"undefined":this.startDate.toLocalDateString("en-US",option);
        return 'name:' + this.name+'\tProfile pic:'+this.profilePic+'\tDepartment:'+this.department+'\t salary :' + this.salary + "\t gender:" + this.gender + "\t startDate:" + this.startDate +"\t notes:"+this.note;
    }
}
