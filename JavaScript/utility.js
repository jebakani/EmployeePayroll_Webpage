let stringifyDate=(date)=>
{
    const option={year:"numeric",month:"short",day:"numeric"};
    const joinDate=!date?"undefined":new Date(Date.parse(date)).toLocaleDateString("en-GB",option);
    return joinDate;
}
let checkName=(name)=> {
    let nameRegex=RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
     if(nameRegex.test(name))
     {
         throw 'Name is incorrect';
     }
}

let checkStartDate=(date)=> {
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
}