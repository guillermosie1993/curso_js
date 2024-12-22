class Student {
    constructor(dni, name, course, assistances = [], institute) {
        this.dni = dni,
        this.name = name,
        this.course = course,
        this.institute = institute,
        this.assistances = assistances
    }
    addAssitance(date ,status){
        this.assistances.push({'date': date, 'status': status});
    }
}

class Teacher {
    constructor(dni, name, institute) {
        this.dni = dni,
        this.name = name
        this.institute = institute
    }

}
export class Classroom{
    constructor(teacherDNI, teacherName, grade){
        this.teacherDNI = teacherDNI,
        this.teacherName = teacherName,
        this.grade = grade
    }

}

export class Institute {
    constructor(id, name, students = [], classRooms = [], teachers = []) {
        this.id = id,
        this.name = name,
        this.classRooms = classRooms
        this.students = students
        this.teachers = teachers
    }
    addNewClassRoom(dni, teacher, grade){
        const newClassroom = new Classroom(dni, teacher, grade);
        this.classRooms.push(newClassroom);
    }
    addNewTeacher(dni,name, institute){
        const newTeacher = new Teacher(dni, name, institute);
        this.teachers.push(newTeacher);
    }
    addNewStudent(dni,name, course, assistance,institute){
        const newStudent = new Student(dni, name, course, assistance,institute);
        this.students.push(newStudent);
    }
    passList(institute, students,date){
        students.forEach(student => {
            let is_student = institute.students.find(user => student.student == user.dni);
            Object.assign(new Student(), is_student).addAssitance(date, student.assitance == true ? 'Presente' : 'Ausente');
        });
        return institute;
        
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
function is_institute(inst){   
    return app.filter(institute => {
        return institute.name == inst;
    })
}


export class User {
    constructor(userName, dni, password, institute, role) {
        this.userName = userName,
        this.dni = dni;
        this.password = password,
        this.institute = institute,
        this.role = role
    }
}