import { Institute, User } from './index.js';

let showPassword = document.getElementById('inputlogin-password_show');
let inputPassword = document.getElementById(showPassword.previousElementSibling.id);
let inputUserName = document.getElementById('inputlogin-username');
let inputSubmit = document.getElementById('inputlogin-submit');

localStorage.setItem('users', []);
localStorage.setItem('institutes', []);

const superUser = new User('admin','1', 'superadmin', '1000', 'admin');
const principalUser = new User('Carmen Perez', '12326511', 'instituto1', '0', 'principal');
const studentUser = new User('Guillermo Siegel', '37450960', '123456', '0', 'student');


const institute1 = new Institute('0', 'Instituto Superior "J.J Urquiza"', [],[],[]);
const institute2 = new Institute('1', 'Instituto Superior "Gral. Jose de San Martin"', [],[],[]);

let newSuperUser = JSON.parse(localStorage.getItem('users') || '[]');
newSuperUser.push(superUser, principalUser, studentUser);
localStorage.setItem('users', JSON.stringify(newSuperUser));

institute1.addNewStudent('37450960', 'Guillermo Siegel', 'tercero', [], 0);
institute1.addNewTeacher('12326511', 'Carmen Perez');
institute1.addNewClassRoom('12326511', 'Carmen Perez','tercero');


let institutes = JSON.parse(localStorage.getItem('institutes') || '[]');
institutes.push(institute1, institute2);
localStorage.setItem('institutes', JSON.stringify(institutes));

showPassword.addEventListener('click', (e)=>{
    if (inputPassword.type === 'password') {
        inputPassword.type = 'text'; // Mostrar contraseña
        showPassword.classList.remove('hide');
        showPassword.classList.add('show');
        e.target.classList.remove('bi-eye-slash');
        e.target.classList.add('bi-eye');
    } else {
        inputPassword.type = 'password'; // Ocultar contraseña
        showPassword.classList.remove('show');
        showPassword.classList.add('hide');
        e.target.classList.add('bi-eye-slash');
        e.target.classList.remove('bi-eye');
    }
});

inputSubmit.addEventListener('click', (e)=>{
    if (inputUserName.value != '' && inputPassword.value != '') {
        // usar localstorage para almacenar una cuenta y luego compararla
        let is_username = newSuperUser.some(user => user.dni == inputUserName.value)
        let userLogin = newSuperUser.find(user => user.dni == inputUserName.value)
        if (!is_username) {
            inputUserName.style.borderColor = '#ff4e48';
               e.preventDefault()
        }else{
            let is_password = userLogin.password == inputPassword.value;
            if (!is_password) {
                inputPassword.style.borderColor = '#ff4e48';    
                e.preventDefault()
            }else{
                localStorage.setItem('current_user', JSON.stringify(userLogin));
            }
        }
    }else{
        e.preventDefault();
        if (inputUserName.value == '') {
            inputUserName.style.borderColor = '#ff4e48';
        }
        if (inputPassword.value == '') {
            inputPassword.style.borderColor = '#ff4e48';
        }
    }
});



