import { Institute } from "./index.js";

let currentUser = JSON.parse(localStorage.getItem('current_user'));
let institutesList = JSON.parse(localStorage.getItem('institutes'));
let currentInstitute = institutesList.find(institute => institute.id == currentUser.institute);

const api_key = '49RhfYtFZnw57pfywzKuHiLvG3rXQhg9';
const api_url = `https://calendarific.com/api/v2/holidays?api_key=${api_key}&country=AR&year=2025&languages=ES`;

let addNewEventButton = document.getElementById('addNewEvent');
let inputStartDate = document.getElementById('inputEvent-startDate');
let inputEndDate = document.getElementById('inputEvent-endDate');
let inputCourse = document.getElementById('inputEvent-courseCheboxs');
let inputTitle = document.getElementById('inputEvent-title');
let inputSubmit = document.getElementById('inputEvent-submit');
let notification = document.getElementById('addNewEvent_notification');

const calendarEl = document.getElementById('calendar'); 

let calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    selectable: true,
    events: []
});


calendar.render();


currentInstitute.events.forEach(event => {
    calendar.addEvent({
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
    });
});
calendar.refetchEvents();
inputCourse.innerHTML = currentInstitute.classRooms.map(classroom => `<label for=""><input type="checkbox" name="options[]" id="${classroom.grade}">${classroom.grade}</label>`)

inputSubmit.addEventListener('click', (e)=> {
    if(inputStartDate.value != '' && inputEndDate.value != '' && inputTitle.value != ''){
        const selectedOptions = Array.from(inputCourse.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => ({ id: checkbox.id, value: checkbox.value }));
        console.log(selectedOptions);
         let newInstitute = Object.assign(new Institute(), currentInstitute);
        newInstitute.addNewEvent(inputTitle.value, inputStartDate.value, inputEndDate.value, selectedOptions == [] ? 'todos': selectedOptions.map(option => option.id));

        let instituteIndex = institutesList.findIndex(institute => institute.id == newInstitute.id);
        if (instituteIndex > -1) {
            institutesList[instituteIndex] = newInstitute;
        } else {
            institutesList.push(newInstitute);
        }
        localStorage.setItem('institutes', JSON.stringify(institutesList))
        if (notification.classList.contains('d-none')) {
            notification.classList.remove('d-none')
        }
    }
})


if (currentUser.role != 'principal' && currentUser.role != 'teacher') {
    addNewEventButton.remove();
}

/* fetch('../data/feriados.json')
.then(response => response.json())
.then(data => {
    data
    data.forEach(event => {
        calendar.addEvent({
            title: event.title,
            start: new Date(event.start),
            end: new Date(event.end),
        });
    });
}) */

async function getHoliday(url) {
    try{
        const response = await fetch(url);
        const data = await response.json()
        const holidays = data.response.holidays;

        holidays.forEach(holiday => {
            calendar.addEvent({
                title: holiday.name,
                start: new Date(holiday.date.iso),
            })
        })
    }
    catch{
        console.log('error');
    }
}

getHoliday(api_url);
calendar.refetchEvents();