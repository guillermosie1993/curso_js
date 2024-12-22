import { User, Institute } from "./index.js";

//students
let users = localStorage.getItem('users', []);
let institutes = localStorage.getItem('institutes', []);
let institutesList = JSON.parse(institutes);

let currentUser = localStorage.getItem('current_user');
let currentUserParse = JSON.parse(currentUser);

let showPassword = document.getElementById('inputRegister-password_show');
let inputPassword = document.getElementById(showPassword.previousElementSibling.id);

let showPasswordCheck = document.getElementById('inputRegister-password_check_show');
let inputPasswordCheck = document.getElementById(showPasswordCheck.previousElementSibling.id);

let inputUserName = document.getElementById('inputRegister-username');
let inputUserDni = document.getElementById('inputRegister-dni');
let inputSubmit = document.getElementById('inputRegisterStudent-submit');

let notification = document.getElementById('loginRegister_notification');

let addUserButton = document.getElementById('addNewStudent');

let tableStudent = document.getElementById('studentTable');

let inputSelectCourse = document.getElementById('inputRegister-course');
let inputSelectButtonCourseLabel = document.getElementById('inputRegister-course_label');

let instituteCurrentUser = institutesList.filter(institute => institute.id == currentUserParse.institute);

inputSelectCourse.innerHTML = instituteCurrentUser[0].classRooms.map(classRoom => `<li><a class="dropdown-item course" id="${classRoom.grade}">${classRoom.grade}</a></li>`)

let inputSelect = document.getElementById('inputRegister-institute');
let inputSelectButtonLabel = document.getElementById('inputRegister-insitute_label');
let inputSelectOptions = document.getElementsByClassName('dropdown-item');
let inputSelectOptionSelected = '';
inputSelect.innerHTML = institutesList.map(institute => `<li><a class="dropdown-item" id="${institute.id}" href="#">${institute.name}</a></li>`).join('');

for (const element of inputSelectOptions) {
    element.addEventListener('click', (e)=>{
        let optionSelect = e.target.id;
    if (e.target.classList.contains('course')) {
        inputSelectButtonCourseLabel.innerText = e.target.innerText
        inputSelectButtonCourseLabel.id = optionSelect;
    }else{
        inputSelectButtonLabel.innerText = e.target.innerText
        inputSelectButtonLabel.id = optionSelect;
    }
    })
}

showPassword.addEventListener('click', (e)=>{
    if (inputPassword.type === 'password') {
        inputPassword.type = 'text';
        showPassword.classList.remove('hide');
        showPassword.classList.add('show');
        e.target.classList.remove('bi-eye-slash');
        e.target.classList.add('bi-eye');
    } else {
        inputPassword.type = 'password';
        showPassword.classList.remove('show');
        showPassword.classList.add('hide');
        e.target.classList.add('bi-eye-slash');
        e.target.classList.remove('bi-eye');
    }
});

showPasswordCheck.addEventListener('click', (e)=>{
    if (inputPasswordCheck.type === 'password') {
        inputPasswordCheck.type = 'text';
        showPassword.classList.remove('hide');
        showPassword.classList.add('show');
        e.target.classList.remove('bi-eye-slash');
        e.target.classList.add('bi-eye');
    } else {
        inputPasswordCheck.type = 'password';
        showPasswordCheck.classList.remove('show');
        showPasswordCheck.classList.add('hide');
        e.target.classList.add('bi-eye-slash');
        e.target.classList.remove('bi-eye');assistance
    }
});

inputSubmit.addEventListener('click', (e)=>{
    let usersList = JSON.parse(users);
    if (inputUserName.value != '' && inputPassword != '' && inputPasswordCheck != '' && inputUserDni != '' && inputSelectCourse.id != '') {    
        if (inputPassword.value == inputPasswordCheck.value) {
            let newUser = new User(inputUserDni.value, inputUserName.value, inputPassword.value, inputSelectButtonLabel.id, 'authenticated');    
            if (usersList != []) {
                let is_user_register = usersList.some(user => user.dni == newUser.dni)
                if (!is_user_register) {                   
                    usersList.push(newUser);
                    localStorage.setItem('users', JSON.stringify(usersList))
                    let instituteForStudent = institutesList.filter(institute => institute.id == inputSelectButtonLabel.id);
                    let newInstitute = instituteForStudent[0] = Object.assign(new Institute(), instituteForStudent[0]);
                    newInstitute.addNewStudent(
                        inputUserName.value,
                        inputUserDni.value,
                        inputSelectButtonCourseLabel.id,
                        [],
                        inputSelectButtonLabel.id
                    );
                    let instituteIndex = institutesList.findIndex(institute => institute.id == newInstitute.id);
                    if (instituteIndex > -1) {
                        institutesList[instituteIndex] = newInstitute;
                    } else {
                        institutesList.push(newInstitute);
                    }
                    localStorage.setItem('institutes', JSON.stringify(institutesList))
                   
                    notification.classList.remove('d-none');
                }else{
                    notification.classList.remove('d-none');
                    notification.classList.remove('alert-success');
                    notification.classList.add('alert-danger');
                    notification.innerText = 'El usuario ingresado ya se encuentra registrado!'
                    notification.style.zIndex = 1000
                }
            }
        }else{
            e.preventDefault();
            inputPasswordCheck.style.borderColor = '#ff4e48';
        }
    }else{
        e.preventDefault();
        if (inputUserName.value == '') {
            inputUserName.style.borderColor = '#ff4e48';
        }
        if (inputPassword.value == '') {
            inputPassword.style.borderColor = '#ff4e48';
        }
        if (inputPasswordCheck.value == '') {
            inputPasswordCheck.style.borderColor = '#ff4e48';
        }
        if (inputUserDni.value == '') {
            inputUserDni.style.borderColor = '#ff4e48';
        }
        if (inputSelectButtonCourseLabel.id == '') {
            inputUserDni.style.borderColor = '#ff4e48';
        }
        if (inputSelectButtonLabel.id == '') {
            inputUserDni.style.borderColor = '#ff4e48';
        }
    }
});

if (currentUserParse.role != 'principal' && currentUserParse.role != 'admin') {
    addUserButton.remove();
}

let instituteStudent = localStorage.getItem('institutes', []);
let instituteListStudent = JSON.parse(instituteStudent);
let currentInstitute = instituteListStudent.filter(institute => institute.id == currentUserParse.institute);
console.log(currentInstitute);

tableStudent.innerHTML = currentInstitute[0].students.map(student =>
    `
    <tr>
        <th scope="row">${student.dni}</th>
        <td>${student.name}</td>
        <td>${student.course}</td>
        <td>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalAssitencies${student.dni}">
                Asistencias
            </button>
            <div class="modal fade" id="modalAssitencies${student.dni}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Asistencias de ${student.name}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table">
                            <thead>
                                <th>Fecha</th>
                                <th>Asistencia</th>
                            </thead>
                            <tbody>
                        ${student.assistances.map(assistence => 
                            `
                                <tr>
                                    <td scope="row">${assistence.date}</td>
                                    <td>${assistence.status}</td>
                                </tr>
                            `).join('')}
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Understood</button>
                    </div>
                    </div>
                </div>
            </div>
        </td>
    </tr>
    `)

//end student