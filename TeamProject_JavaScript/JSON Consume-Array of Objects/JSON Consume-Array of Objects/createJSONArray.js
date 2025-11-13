// JavaScript Document
/*
	This file will:
	
	- Create a Javascript object containing an array of records with each record including an array
	- Convert the Javascript object into a JSON object
	- Store the JSON object into local storage
	
	This will be given to students to run as part of a web page that will consume the JSON object
	Goal: Provide an example of how to create a JSON object in JS
	Goal: Provide an example of how to consume a JSON object in JS

	Use the following data for this object:
	
		student_id = 332443
		student_gpa = 3.6
		student_courses = ["WDV101","WDV131","WDV105"]	

		student_id = 545467
		student_gpa = 2.7
		student_courses = ["WDV101","WDV131","WDV105","WDV221","WDV205"]	
		
		student_id = 128574
		student_gpa = 3.4
		student_courses = ["WDV101","WDV131","WDV105","WDV221","WDV205","WDV341"]	
	
		student_id = 750056
		student_gpa = 1.85
		student_courses = ["WDV101","WDV131","WDV105","WDV221","WDV205"]		
		
		
*/
// Create a JavaScript object with student data
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

localStorage.setItem("studentData", jsonStudents);

const retrievedData = localStorage.getItem("studentData");
const parsedStudents = JSON.parse(retrievedData);

//Use jQuery to display student info dynamically
$(document).ready(function() {
  $(".studentCard").remove();

  //Loop through each student and create a new card
  $.each(parsedStudents.students, function(index, student) {
    // Create a new card div
    const $card = $("<div>").addClass("studentCard");

    //Add student info
    $card.append(`<h3>Student ID: ${student.student_id}</h3>`);
    $card.append(`<p>Student GPA: ${student.student_gpa}</p>`);

    //Create a list for the courses
    const $ul = $("<ul>");
    $.each(student.student_courses, function(i, course) {
      $ul.append(`<li>${course}</li>`);
    });

    //Add list to the card
    $card.append("<p>Student Courses:</p>");
    $card.append($ul);

    //Append the card to the body (or another container)
    $("body").append($card);
  });
});


