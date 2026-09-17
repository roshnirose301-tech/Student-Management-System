```javascript
// Student records
let students = [
    {
        id: 1,
        name: "Roshni",
        email: "roshni@gmail.com",
        department: "AIDS",
        year: "1st Year"
    }
];


// Get HTML elements
const studentForm = document.getElementById("studentForm");
const studentTableBody = document.getElementById("studentTableBody");


// Display students when page loads
displayStudents();


// CREATE and UPDATE
studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const department = document.getElementById("department").value;
    const year = document.getElementById("year").value;
    const studentId = document.getElementById("studentId").value;


    // Validation
    if (name === "") {
        alert("Please enter student name.");
        return;
    }

    if (email === "") {
        alert("Please enter email.");
        return;
    }

    if (department === "") {
        alert("Please select department.");
        return;
    }

    if (year === "") {
        alert("Please select year.");
        return;
    }


    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email.");
        return;
    }


    // UPDATE
    if (studentId !== "") {

        const index = students.findIndex(
            student => student.id == studentId
        );

        if (index !== -1) {

            students[index] = {
                id: Number(studentId),
                name: name,
                email: email,
                department: department,
                year: year
            };

            alert("Student updated successfully.");
        }

    }

    // CREATE
    else {

        const newStudent = {
            id: generateId(),
            name: name,
            email: email,
            department: department,
            year: year
        };

        students.push(newStudent);

        alert("Student added successfully.");
    }


    // Refresh table
    displayStudents();

    // Clear form
    studentForm.reset();

    document.getElementById("studentId").value = "";

    document.getElementById("formTitle").innerText = "Add Student";

    document.getElementById("submitButton").innerText = "Add Student";

});


// Generate new ID
function generateId() {

    if (students.length === 0) {
        return 1;
    }

    return Math.max(...students.map(student => student.id)) + 1;
}


// READ
function displayStudents() {

    studentTableBody.innerHTML = "";

    const emptyMessage = document.getElementById("emptyMessage");

    if (students.length === 0) {

        emptyMessage.style.display = "block";
        return;

    } else {

        emptyMessage.style.display = "none";
    }


    students.forEach(function(student) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.department}</td>
            <td>${student.year}</td>

            <td>
                <button
                    class="edit-btn"
                    onclick="editStudent(${student.id})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
        `;

        studentTableBody.appendChild(row);

    });

}


// UPDATE - Edit student
function editStudent(id) {

    const student = students.find(
        student => student.id === id
    );

    if (!student) {
        return;
    }


    document.getElementById("studentId").value = student.id;

    document.getElementById("name").value = student.name;

    document.getElementById("email").value = student.email;

    document.getElementById("department").value =
        student.department;

    document.getElementById("year").value =
        student.year;


    document.getElementById("formTitle").innerText =
        "Update Student";

    document.getElementById("submitButton").innerText =
        "Update Student";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// DELETE
function deleteStudent(id) {

    const student = students.find(
        student => student.id === id
    );

    if (!student) {
        return;
    }


    const confirmDelete = confirm(
        "Are you sure you want to delete " +
        student.name + "?"
    );


    if (confirmDelete) {

        students = students.filter(
            student => student.id !== id
        );

        displayStudents();

        alert("Student deleted successfully.");
    }

}


// Cancel update
function cancelEdit() {

    studentForm.reset();

    document.getElementById("studentId").value = "";

    document.getElementById("formTitle").innerText =
        "Add Student";

    document.getElementById("submitButton").innerText =
        "Add Student";

}


// SEARCH
function searchStudents() {

    const searchValue =
        document.getElementById("searchInput")
        .value
        .toLowerCase();


    const rows =
        studentTableBody.getElementsByTagName("tr");


    for (let i = 0; i < rows.length; i++) {

        const rowText =
            rows[i].textContent.toLowerCase();


        if (rowText.includes(searchValue)) {

            rows[i].style.display = "";

        } else {

            rows[i].style.display = "none";
        }
    }

}
```
