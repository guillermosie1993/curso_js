import { Institute } from './index.js';

let institutesList = JSON.parse(localStorage.getItem('institutes'));
let inputInstituteName = document.getElementById('inputInstitute-name');
let inputInstituteNumber = document.getElementById('inputInstitute-number');
let submitInstitutes = document.getElementById('inputInstitute-submit');
let tableInstitutes = document.getElementById('table-institutes');
let notification = document.getElementById('addNewInstitute_notification');

tableInstitutes.innerHTML = institutesList.map(institute => {   
   return `
    <tr>
        <td scope="row">${institute.id}</td>
        <td>${institute.name}</td>
        <td>${institute.students.length}</td>
        <td>${institute.teachers.length}</td>
        <td>${institute.classRooms.length}</td>
    </tr>
    `
}).join()

submitInstitutes.addEventListener('click', (e)=> {
    if (inputInstituteName.value != '') {
        if (inputInstituteNumber.value != '') {
            let instituteNew = new Institute(inputInstituteNumber.value, inputInstituteName.value, [], [],[],[]);
            institutesList.push(instituteNew);
            notification.classList.contains('d-none') ? notification.classList.remove('d-none') : notification.classList.remove('d-flex');
        }else{
            let instituteNew = new Institute(institutesList.length + 1, inputInstituteName.value, [], [],[],[]);
            institutesList.push(instituteNew);
            notification.classList.contains('d-none') ? notification.classList.remove('d-none') : notification.classList.remove('d-flex');
        }
        localStorage.setItem('institutes', JSON.stringify(institutesList));
    }
})

