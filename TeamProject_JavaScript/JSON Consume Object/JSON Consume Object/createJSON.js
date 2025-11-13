//Create a JavaScript object with student data
const students = {
  students: [
    {
      student_id: 332443,
      student_gpa: 3.6,
      student_courses: ["WDV101", "WDV131", "WDV105"]
    },
    {
      student_id: 545467,
      student_gpa: 2.7,
      student_courses: ["WDV101", "WDV131", "WDV105", "WDV221", "WDV205"]
    },
    {
      student_id: 128574,
      student_gpa: 3.4,
      student_courses: ["WDV101", "WDV131", "WDV105", "WDV221", "WDV205", "WDV341"]
    }
  ]
};

//Convert the object into a JSON string
const jsonStudents = JSON.stringify(students);

//Store in localStorage
localStorage.setItem("studentData", jsonStudents);

//Retrieve and parse JSON from localStorage
const retrievedData = localStorage.getItem("studentData");
const parsedStudents = JSON.parse(retrievedData);

function displayStudents(studentList) {
  const container = document.getElementById("studentContainer");
  container.innerHTML = ""; 
  studentList.students.forEach(student => {

    let card = document.createElement("div");
    card.classList.add("studentCard");

    let courses = student.student_courses
      .map(course => `<li>${course}</li>`)
      .join("");

    card.innerHTML = `
      <ul>
        <li><strong>Student ID:</strong> ${student.student_id}</li>
        <li><strong>GPA:</strong> ${student.student_gpa}</li>
        <li><strong>Courses:</strong>
          <ul>
            ${courses}
          </ul>
        </li>
      </ul>
    `;

    container.appendChild(card);
  });
}

// Display students immediately when the page loads
displayStudents(parsedStudents);
