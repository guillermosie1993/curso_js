import { Institute, Classroom } from './index.js'
let currentUserInstitute = JSON.parse(localStorage.getItem('current_user')).institute;
let instituteList = JSON.parse(localStorage.getItem('institutes'));

let teacherList = instituteList[0].teachers;

let accordionParent = document.getElementById('accordionCourses');

let currentInstitute = instituteList.filter(institute => institute.id == currentUserInstitute);

let courseInput = document.getElementById('inputRegisterCourse-course');
let teacherLabel = document.getElementById('inputRegisterCourse-teachers_label');
let teacherListSelect = document.getElementById('inputRegisterCourse-teachers');
let courseRegisterSubmit = document.getElementById('inputRegisterCourse-submit');


let date = new Date();

// Obtener día, mes y año
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

if (currentInstitute.length > 0) {
    let courses = currentInstitute[0].classRooms;
    let students = currentInstitute[0].students;

    courses.forEach(course => {
        // Crear los elementos del acordeón
        let accordionItem = document.createElement('div');
        accordionItem.classList.add('accordion-item');

        accordionItem.innerHTML = `
            <h2 class="accordion-header">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${course.grade}" aria-expanded="true" aria-controls="collapse${course.grade}">
                ${course.grade} - ${course.teacherName}
              </button>
            </h2>
            <div id="collapse${course.grade}" class="accordion-collapse collapse" data-bs-parent="#accordionCourses">
              <div class="accordion-body">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">DNI</th>
                            <th scope="col">Nombre y Apellido</th>
                            <th scope="col">Curso</th>
                            <th scope="col">Asistencias</th>
                        </tr>
                    </thead>
                    <tbody id="studentsCourseTable${course.grade}">
                        ${students
                            .filter(student => student.course.toLowerCase() == course.grade.toLowerCase())
                            .map(studentData => 
                                `<tr>
                                    <th scope="row">${studentData.dni}</th>
                                    <td>${studentData.name}</td>
                                    <td>${studentData.course}</td>
                                    <td><button>Ver Asistencias</button></td>
                                </tr>`
                            ).join('')}
                    </tbody>
                </table>
              </div>
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#assitencie-${course.grade}">
                Tomar Asistencia
              </button>
              <div class="modal fade" id="assitencie-${course.grade}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Asistencia de ${course.grade}</p>
                            <table class="table">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">Nombre y Apellido</th>
                                        <th scope="col">${formattedDate}</th>
                                    </tr>
                                </thead>
                    <tbody id="studentsAssistenceCourseTable${course.grade}">
                        ${students
                            .filter(student => student.course.toLowerCase() == course.grade.toLowerCase())
                            .map(studentData => 
                                `<tr>
                                    <td>${studentData.name}</td>
                                    <td><input type="checkbox" name="assitencie${studentData.dni}" id="${studentData.dni}" class="form_input-checkbox-assitance"/></td>
                                </tr>`
                            ).join('')}
                    </tbody>
                            </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button id="asssitances${course.grade}" type="button" class="form_input-submit submitAssistance accent">Save changes</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        `;
        accordionParent.appendChild(accordionItem);
    });
} else {
    accordionParent.innerHTML = `<p>No se encontró información del instituto actual.</p>`;
}

//agregar formulario de añadir un nuevo curso.
teacherListSelect.innerHTML = teacherList.map(teacher => `<li><a class="dropdown-item" id="${teacher.dni}">${teacher.name}</a></li> </li>`)
let teacherSelected = document.getElementsByClassName('dropdown-item');

Array.from(teacherSelected).forEach(teacher => teacher.addEventListener('click', (e)=> {
    let teacherDni = e.target.id;
    let teacherName = e.target.innerText;
    teacherLabel.innerHTML = `<span id="${teacherDni}">${teacherName}</span>`
}))

courseRegisterSubmit.addEventListener('click', (e)=> {   
    if (courseInput.value != '' && teacherLabel.firstChild.id ) {
        let currentInstitute = instituteList.filter(institute => institute.id == currentUserInstitute)
        let newInstitute = currentInstitute[0] = Object.assign(new Institute(), currentInstitute[0]);
        newInstitute.addNewClassRoom(teacherLabel.firstChild.id, teacherLabel.firstChild.innerText, courseInput.value);
        let instituteIndex = instituteList.findIndex(institute => institute.id == newInstitute.id);
        
        if (instituteIndex > -1) {
           } else {
            instituteList.push(newInstitute);
        }        
        localStorage.setItem('institutes', JSON.stringify(instituteList));
    }
});

let submitAssistance = document.getElementsByClassName('submitAssistance');
Array.from(submitAssistance).forEach(input => input.addEventListener('click', (e)=>{
    let modalBody = e.target.parentNode.parentNode;
    let checkboxs = modalBody.getElementsByClassName('form_input-checkbox-assitance');
    let assistance = [];
    Array.from(checkboxs).forEach(checkbox => assistance.push({student: checkbox.id, assitance: checkbox.checked}));
    console.log(assistance);
    
    let newInstitute = currentInstitute[0] = Object.assign(new Institute(), currentInstitute[0]);

    newInstitute.passList(newInstitute, assistance, formattedDate);

    let instituteIndex = instituteList.findIndex(institute => institute.id == newInstitute.id);
        
    if (instituteIndex > -1) {
       } else {
        instituteList.push(newInstitute);
    }        
    localStorage.setItem('institutes', JSON.stringify(instituteList));

    
}))

