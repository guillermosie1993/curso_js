class Student {
    constructor(dni, name, surname, course, assistances = [], institute) {
        this.dni = dni,
        this.name = name,
        this.surname = surname,
        this.course = course,
        this.institute = institute,
        this.assistances = assistances
    }
    addAssitance(date ,status){
        this.assistances.push({'FECHA': date, 'ASISTENCIA': status});
    }
}

class Teacher {
    constructor(dni, name, surname) {
        this.dni = dni,
        this.name = name,
        this.surname = surname
    }

}
class Classroom{
    constructor(teacher, grade){
        this.teacher = teacher,
        this.grade = grade
    }

}

class Institute {
    constructor(name, students = [], classRooms = [], teachers = []) {
        this.name = name,
        this.classRooms = classRooms
        this.students = students
        this.teachers = teachers
    }
    addNewClassRoom(teacher, grade){
        const newClassroom = new Classroom(teacher, grade);
        this.classRooms.push(newClassroom);
    }
    addNewTeacher(dni,name, surname){
        const newTeacher = new Teacher(dni, name, surname);
        this.teachers.push(newTeacher);
    }
    addNewStudent(dni,name, surname, course, assistance,institute){
        console.log(course);
        
        const newStudent = new Student(dni, name, surname, course, assistance,institute);
        this.students.push(newStudent);
    }
    passList(students,date){
        students.forEach(student => {
            let assistance = prompt(`Alumno:+ ${student.surname} + ${student.name} \n\¿Está presente?(responder p -para presente-; a -para ausente-`);
            if (assistance.toLocaleLowerCase() == 'p') {
                student.addAssitance(date, assistance);
            }
        });
    }
    getAllStudents(institute){
        let has_students = institute.students;
        if (has_students.length > 0) {
            let studentList = has_students.map(student => `${student.dni} | ${student.surname} | ${student.name} | ${student.course}` ).join(' \n\ ');
            alert(`|---dni---|--apellido--|---nombre---|--curso--| \n\ ${studentList}`);
        }else{
            alert('No tenes alumnos registrados en este instituto');
        }
    }
}
let app = [];

function is_institute(inst){   
    return app.filter(institute => {
        return institute.name == inst;
    })
}

alert('Hola Bienvenido a MasterApp!!');
alert('Pasos para comenzar:\n\ 1- Cree un Instituto \n\ 2- Cree por lo menos un docente \n\ 3- Cree una clase \n\ 4- Cree un Alumno' );
let screen1 = prompt('¿Que desea hacer?\n\ 1-Pasar lista \n\ 2-Agregar alumno \n\ 3- Crear clase \n\ 4- Ver todos los alumnos \n\ 6- Ver los alumnos de una clase \n\ 7- Crear nuevo instituto \n\ 8- Crear Docente \n\ 9- Salir');


while (screen1 != '9') {
    if (screen1 == '7'){
        let InstituteName = prompt('Introduce el nombre del instituto');
        let newInstitute = new Institute(InstituteName, [], [], []);
        app.push(newInstitute);
        alert('Haz creado con exito un nuevo insituto');       
    }
    if (screen1 == '3') {
        let how_institute = prompt('Ingrese el nombre de su intituto o ingrese 0 para salir');
        let institute = is_institute(how_institute)[0];
        let has_teacher = institute.teachers
        while (how_institute != '0' ) {
            if (is_institute(how_institute).length > 0 && has_teacher.length > 0) {
                let gradeClassRoom = prompt ('Ingrese el grado de la clase');
                let teacherList = is_institute(how_institute)[0].teachers.map((teacher, index) => `${teacher.dni}: ${teacher.surname}, ${teacher.name}`).join('\n');
                let teacherSelect = prompt(`Escriba el dni del docente a cargo: \n\ ${teacherList}`);
                console.log(institute);
                
                let teacherClassRoom = institute.teachers.filter(teacher => teacher.dni == teacherSelect);
                is_institute(how_institute)[0].addNewClassRoom(teacherClassRoom[0], gradeClassRoom);               
                alert('Se guardo con exito!');
                break;
            }else{
                alert(`El instituto ${how_institute} no se encuentra registrado o no tiene ningun docente a quien asignar la clase`);
                how_institute = prompt('Ingrese el nombre de su intituto o ingrese 0 para salir');
            }
        }
    }
    if (screen1 === '2') {
        let how_institute = prompt('Ingrese el nombre de su instituto o ingrese 0 para salir');
        let institute = is_institute(how_institute);
        let classrooms = institute[0].classRooms;
        while (how_institute !== '0') {
            if (classrooms && classrooms.length > 0) {
                let classroomListGrade = classrooms.map((classes, index) => `${index + 1}: ${classes.grade}`)
                    .join('\n');
                let studentDni = prompt('Ingrese el DNI del alumno');
                let studentName = prompt('Ingrese el Nombre del alumno');
                let studentSurname = prompt('Ingrese el Apellido del alumno');
                let studentClassrooms = prompt(`Asignar a un curso: \n\ ${classroomListGrade}`);              
                institute[0].addNewStudent(studentDni, studentName, studentSurname, studentClassrooms, [],institute.name);
                alert('Se ha añadido con éxito!')
            } else {
                alert('No se encontró el instituto o no tiene aulas disponibles.');
            }
            break;
        }
    }
    if (screen1 == '8') {
        let how_institute = prompt('Ingrese el nombre de su instituto o ingrese 0 para salir');
    
        while (how_institute !== '0') {
            let institute = is_institute(how_institute);
            
            if (institute && institute.length > 0) {
                let teacherDni = prompt('Ingrese el DNI del docente');
                let teacherName = prompt('Ingrese el Nombre del docente');
                let teacherSurname = prompt('Ingrese el apellido del docente');
                institute[0].addNewTeacher(teacherDni, teacherName, teacherSurname);
                alert('Se guardo con éxito!');
                break;
            } else {
                console.log('No se encontró el instituto o no tiene aulas disponibles.');
                how_institute = prompt('Ingrese el nombre de su instituto o ingrese 0 para salir');
            }
        }
    }
    if (screen1 == '1') {
        let how_institute = prompt('Ingrese el nombre de su instituto o ingrese 0 para salir');
        while (how_institute !== '0') {
            let institute = is_institute(how_institute);
            let classrooms = institute[0].classRooms;
            
            if (institute && institute.length > 0) {
                let classroomListGrade = classrooms.map((classes, index) => `${index + 1}: ${classes.grade}`)
                .join('\n');
                let course = prompt(`Ingrese el nombre del Curso que quiere tomar asistencia. \n\ ${classroomListGrade}`).toLocaleLowerCase();

                let today = Date.now()
                let date = new Date(today);
                
                let studentInstitute = institute[0].students.filter(student => {return student.course == course});              
                
                institute[0].passList(studentInstitute, date.toLocaleDateString());
                break;
            } else {
                alert('No se encontró el instituto o no tiene aulas disponibles.');
                how_institute = prompt('Ingrese el nombre de su instituto o ingrese 0 para salir');
            }
        }
    }
    if (screen1 == '4') {
        let how_institute = prompt('Ingrese el nombre de su instituto o ingrese 0 para salir');
        let institute = is_institute(how_institute)[0];
        console.log(institute.length);
        console.log(institute);
        
        while(how_institute !== '0'){
            if (institute) {
                institute.getAllStudents(institute);
                break;
            }else{
                alert('No se encontro el instituto o no tiene alumnos cargados');
                how_institute = prompt('Ingrese el nombre de su instituto o ingrese 0 para salir');
            }
        }
    }
    screen1 = prompt('¿Que desea hacer?\n\ 1-Pasar lista \n\ 2-Agregar alumno \n\ 3- Crear clase \n\ 4- Ver todos los alumnos \n\ 6- Ver los alumnos de una clase \n\ 7- Crear nuevo instituto \n\ 8- Crear Docente \n\ 9- Salir');
}
console.log(app);
