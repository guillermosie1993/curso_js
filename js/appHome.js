import { Institute } from "./index.js";

let currentUser = JSON.parse(localStorage.getItem('current_user'));
let instituteList = JSON.parse(localStorage.getItem('institutes'));
let bannerName = document.getElementById('heroBanner-name');
let bannerCourse = document.getElementById('heroBanner-course');
let bannerInstitute = document.getElementById('heroBanner-institute');
let homeInfo = document.getElementById('homeInfo');

let getInstitute = instituteList.find(institute => institute.id == currentUser.institute)
let getCourseCurrentUser = getInstitute.students.find(student => student.dni == currentUser.dni)

if (currentUser.role != 'principal' && currentUser.role != 'teacher' && currentUser.role != 'admin') {
    

let getCurrentUserAssitance = getCourseCurrentUser.assistances;
let dayOfClasses = getCurrentUserAssitance.length;

let assitancesNumber = 0;

getCurrentUserAssitance.forEach(assistance => assistance.status.toLowerCase() == 'presente' ? assitancesNumber++ : null);


bannerName.innerText = `Hola, ${currentUser.userName}`;
bannerCourse.innerText = `Curso: ${getCourseCurrentUser.course}`;
bannerInstitute.innerText = `Instituto: ${getInstitute.name}`;

homeInfo.innerHTML = `
    <div class="home-info_card">
        <p><i class="bi bi-person-arms-up" class="home-info_card_title"></i> Asistencias:</p>
        <span>Dias de clase: ${dayOfClasses}</span>
        <span>Total de presente: ${assitancesNumber}</span>
    </div>
    <div class="home-info_card">
        <p class="home-info_card_title"><i class="bi bi-calendar-event"></i> Eventos:</p>
        ${getInstitute.events.map(event => `<li><span>${event.start}</span><span>${event.title}</span></li>`)}
    </div>
`

}else if(currentUser.role == 'admin'){
    bannerName.innerText = `Hola, ${currentUser.userName}`;

}
else{
    bannerName.innerText = `Hola, ${currentUser.userName}`;
    bannerInstitute.innerText = `Instituto: ${getInstitute.name}`;
}
