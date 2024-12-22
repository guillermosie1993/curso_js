import { User } from "./index.js";
let users = localStorage.getItem('users', []);
let institutes = localStorage.getItem('institutes', []);


let showPassword = document.getElementById('inputRegister-password_show');
let inputPassword = document.getElementById(showPassword.previousElementSibling.id);

let showPasswordCheck = document.getElementById('inputRegister-password_check_show');
let inputPasswordCheck = document.getElementById(showPasswordCheck.previousElementSibling.id);

let inputUserName = document.getElementById('inputRegister-username');
let inputUserDni = document.getElementById('inputRegister-dni');
let inputSubmit = document.getElementById('inputRegister-submit');

let notification = document.getElementById('loginRegister_notification');

let inputSelect = document.getElementById('inputRegister-institute');
let inputSelectButtonLabel = document.getElementById('inputRegister-insitute_label');
let inputSelectOptions = document.getElementsByClassName('dropdown-item');
let inputSelectOptionSelected = '';
inputSelect.innerHTML = JSON.parse(institutes).map(institute => `<li><a class="dropdown-item" id="${institute.id}" href="#">${institute.name}</a></li>`).join('');

for (const element of inputSelectOptions) {
        element.addEventListener('click', (e)=>{
            let optionSelect = e.target.id;
            inputSelectButtonLabel.innerText = e.target.innerText
            inputSelectButtonLabel.id = optionSelect;
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
    if (inputUserName.value != '' && inputPassword != '' && inputPasswordCheck != '' && inputUserDni != '') {    
        if (inputPassword.value == inputPasswordCheck.value) {
            let newUser = new User(inputUserDni.value, inputUserName.value, inputPassword.value, inputSelectButtonLabel.id, 'authenticated');    
            if (usersList != []) {
                let is_user_register = usersList.some(user => user.dni == newUser.dni)
                if (!is_user_register) {                   
                    usersList.push(newUser);
                    localStorage.setItem('users', JSON.stringify(usersList))
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
    }
});


