const students = [];
let id = 0;

const addStudentForm = document.querySelector(".add-student-form");
const addStudentInputs = [...document.querySelectorAll("#add-student-inp")];

document.querySelector(".add-student-button").addEventListener("click", addStudentToArray)

// Додавання студента

function addStudentToArray() {
    if (addStudentInputs.every(input => input.value !== "")) {
        id += 1;
        let studentData = new FormData(addStudentForm);
        students.push(JSON.stringify({
            name: studentData.get("name"),
            surname: studentData.get("surname"),
            age: studentData.get("age"),
            year: studentData.get("year"),
            faculty: studentData.get("faculty"),
            id: id
        }))
        addStudentToTable(JSON.parse(students[students.length - 1]))
    } else {
        alert("Заповніть всі поля")
    }    
}

function addStudentToTable(student) {
    let tr = document.createElement("tr")
    tr.setAttribute("data-id", student.id)
    for (const key in student) {
        if (key !== "id") {
            let td = document.createElement("td");
            td.textContent = student[key];
            tr.append(td);
        } else {
            continue;
        }
    }
    document.querySelector(".student-list").append(tr)
    
}

// Пошук студента

document.querySelector(".search-student-button").addEventListener("click", () => {
    if (document.querySelector('[name="id-to-search"]').value !== "") {
        let idToSearch = document.querySelector('[name="id-to-search"]').value;
        students.forEach((studentJSON) => {
            let student = JSON.parse(studentJSON);
            if (student.id === Number(idToSearch)) {
                console.log("Знайдений студент :>>>", student);
                document.querySelectorAll('[data-id]').forEach((tr) => {
                    if (tr.getAttribute('data-id') === idToSearch) {
                        tr.style.backgroundColor = "rgb(160, 159, 159)"
                        setTimeout(() => {
                            tr.style.backgroundColor = "white";
                        }, 5000)
                    }
                })
            }
        })
    } else {
        alert("Введіть айді в поле")
    }
})

// Видалення студента

document.querySelector(".delete-student-button").addEventListener("click", () => {
    if (document.querySelector('[name="id-to-delete"]').value !== "") {
        let idToDelete = document.querySelector('[name="id-to-delete"]').value;
        students.forEach((studentJSON) => {
            let student = JSON.parse(studentJSON);
            if (student.id === Number(idToDelete)) {
                students.splice(students.indexOf(studentJSON, 1))
                console.log("Видалений студент :>>>", student);
                document.querySelectorAll('[data-id]').forEach((tr) => {
                    if (tr.getAttribute('data-id') === idToDelete) {
                        tr.remove()
                    }
                })
            }
        })
    } else {
        alert("Введіть айді в поле")
    }
})