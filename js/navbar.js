let expandNavBar = document.getElementById('expandNavBar');
let navLinks = document.getElementsByClassName('nav-button');
let navBar = document.getElementById('v-pills-tab');

let currentUser = JSON.parse(localStorage.getItem('current_user'))

let studentTabs = document.getElementById('v-pills-students-tab');
let teacherTabs = document.getElementById('v-pills-teachers-tab');
let courseTabs = document.getElementById('v-pills-classes-tab');
let instituteTabs = document.getElementById('v-pills-institutes-tab');
expandNavBar.addEventListener('click', (e) => {
    let is_expanded = expandNavBar.classList.contains('show')
    for (const element of navLinks) {
        let childrensNavLink = element.children;
        for (const children of childrensNavLink) {
            if (children.localName == 'span') {
                if (is_expanded) {
                    navBar.style.width = '200px';
                    element.style.width = "150px";
                    children.classList.remove('d-none');

                } else {
                    navBar.style.width = '84px';
                    element.style.width = "50px";
                    children.classList.add('d-none');
                }
            }
        }
    }
    expandNavBar.classList.toggle('show', !is_expanded);
    expandNavBar.classList.toggle('hide', is_expanded);
});


if (currentUser.role != 'principal' && currentUser.role != 'admin') {
    studentTabs.remove();
    teacherTabs.remove();
    courseTabs.remove();
}

if (currentUser.role != 'admin') {
    instituteTabs.remove();
}