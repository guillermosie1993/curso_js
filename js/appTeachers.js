import { User, Institute } from "./index.js";

//teachers
let users = localStorage.getItem('users', []);
let institutes = localStorage.getItem('institutes', []);
let institutesList = JSON.parse(institutes);

let currentUser = localStorage.getItem('current_user');
let currentUserParse = JSON.parse(currentUser);

let showPassword = document.getElementById('inputRegisterTeacher-password_show');
let inputPassword = document.getElementById(showPassword.previousElementSibling.id);

let showPasswordCheck = document.getElementById('inputRegisterTeacher-password_check_show');
let inputPasswordCheck = document.getElementById(showPasswordCheck.previousElementSibling.id);

let inputUserName = document.getElementById('inputRegisterTeacher-username');
let inputUserDni = document.getElementById('inputRegisterTeacher-dni');
let inputSubmit = document.getElementById('inputRegisterTeacher-submit');

let notification = document.getElementById('loginRegisterTeacher_notification');

let addUserButton = document.getElementById('addNewteacher');

let tableteacher = document.getElementById('teacherTable');

let inputSelect = document.getElementById('inputRegisterTeacher-institute');
let inputSelectButtonLabel = document.getElementById('inputRegisterTeacher-insitute_label');
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
        e.target.classList.remove('bi-eye');
    }
});

inputSubmit.addEventListener('click', (e)=>{
    let usersList = JSON.parse(users);
    if (inputUserName.value != '' && inputPassword != '' && inputPasswordCheck != '' && inputUserDni != '' && inputSelectButtonLabel.id != '') {    
        if (inputPassword.value == inputPasswordCheck.value) {
            let newUser = new User(inputUserDni.value, inputUserName.value, inputPassword.value, inputSelectButtonLabel.id, 'authenticated');    
            if (usersList != []) {
                console.log('hola');
                let is_user_register = usersList.some(user => user.dni == newUser.dni)
                if (!is_user_register) {                   
                    usersList.push(newUser);
                    localStorage.setItem('users', JSON.stringify(usersList))
                    let instituteForteacher = institutesList.filter(institute => institute.id == inputSelectButtonLabel.id);
                    let newInstitute = instituteForteacher[0] = Object.assign(new Institute(), instituteForteacher[0]);
                    newInstitute.addNewTeacher(
                        inputUserName.value,
                        inputUserDni.value,
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
        console.log('hola else');
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

let instituteteacher = localStorage.getItem('institutes', []);
let instituteListteacher = JSON.parse(instituteteacher);
let currentInstitute = instituteListteacher.filter(institute => institute.id == currentUserParse.institute);
console.log(currentInstitute);

tableteacher.innerHTML = currentInstitute[0].teachers.map(teacher =>`<tr><th scope="row">${teacher.dni}</th><td>${teacher.name}</td><td>${teacher.course}</td></tr>`)

//end teacher