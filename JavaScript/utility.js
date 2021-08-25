let stringifyDate=(date)=>
{
    const option={year:"numeric",month:"short",day:"numeric"};
    const joinDate=!date?"undefined":new Date(Date.parse(date)).toLocaleDateString("en-GB",option);
    return joinDate;
}