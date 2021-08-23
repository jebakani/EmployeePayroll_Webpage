window.addEventListener('DOMContentLoaded',(event)=>
{
    creatInnerHtml();
});

const creatInnerHtml=()=>
{
    const innerHtml= ` <tr>
                <th></th>
                <th>Name</th>
                <th>Gender</th>
                <th>Department</th> 
                <th>Salary</th>
                <th>Start Date</th>
                <th>Actions</th>
            </tr>
            <tr>
                <td><img class="profile" alt="" src="../Assets/profile-images/Ellipse -1.png"></td>
                <td>Jebakani Ishwarya</td>
                <td>Female</td>
                <td><div class="department">HR</div>
                    <div class="department">Engineering</div></td>
                <td>300000</td>
                <td>17 Aug 2021</td>
                <td>
                    <img id="delete" onclick="" alt="delete" src="../Assets/icons/delete-black-18dp.svg">
                    <img id="edit" onclick="" alt="edit" src="../Assets/icons/create-black-18dp.svg">
                </td>
            </tr>
     `;
    document.querySelector('#empTable').innerHTML=innerHtml;
}