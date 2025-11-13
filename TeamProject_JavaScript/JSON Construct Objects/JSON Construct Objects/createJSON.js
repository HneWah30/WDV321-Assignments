// JavaScript Document

/*
    This file will:
    - Create a JavaScript object including an array
    - Convert the JavaScript object into a JSON object
    - Store the JSON object into local storage

    Goal: Provide an example of how to create JSON objects in JavaScript
    Goal: Provide an example of how to consume JSON objects in JavaScript
*/

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

//Convert the JavaScript object into a JSON string
const jsonStudents = JSON.stringify(students);

// Store the JSON string in localStorage
localStorage.setItem("studentData", jsonStudents);

console.log("Student data has been saved to localStorage.");

//Retrieve and use (consume) the JSON data
const retrievedData = localStorage.getItem("studentData");

//Convert JSON string back to a JavaScript object
const parsedStudents = JSON.parse(retrievedData);

console.log("Retrieved Student Data:", parsedStudents);

// Example of consuming the JSON object
parsedStudents.students.forEach(student => {
  console.log(`Student ID: ${student.student_id}`);
  console.log(`GPA: ${student.student_gpa}`);
  console.log(`Courses: ${student.student_courses.join(", ")}`);
  console.log("-----------------------");
});
