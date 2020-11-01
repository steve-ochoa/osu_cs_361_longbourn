var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var ec_request = new XMLHttpRequest();

ec_request.open('POST', "http://localhost:6997/expertCompanies", false);
ec_request.setRequestHeader('Content-Type', 'application/json');
ec_payload = ({
	expertId: 1,
	companyId: 2,
	name: "Test Company Name",
	description: "Test Company Description",
	industry: "Test Company Industry",
	current: 1,
	position: "Test Position",
	employed_years: 14
});

ec_request.send(JSON.stringify(ec_payload));
console.log(JSON.parse(ec_request.responseText));
var ec_request = new XMLHttpRequest();

// ec_request.open('POST', "http://localhost:6997/expertCourses", false);
// ec_request.setRequestHeader('Content-Type', 'application/json');
// ec_payload = ({
// 	expertId: 1,
// 	courseId: 5,
// 	name: "Test Course Name",
// 	description: "Test Course Description",
// 	term: "Fall",
// 	grade: "F"
// });

// ec_request.send(JSON.stringify(ec_payload));
// console.log(JSON.parse(ec_request.responseText));

// var course_request = new XMLHttpRequest();

// course_request.open('POST', "http://localhost:6997/courses", false);
// course_request.setRequestHeader('Content-Type', 'application/json');
// course_payload = ({
// 	courseId: 0,
// 	courseNumber: '12345',
// 	name: 'Test Course Name',
// 	description: 'Test Course Description',
// });

// course_request.send(JSON.stringify(course_payload));
// console.log(JSON.parse(course_request.responseText));


// company_request = open('POST', "http://localhost:6997/companies", false);
// company_request.setRequestHeader('Content-Type', 'application/json');
// company_payload = ({
// 	companyId: 0,
// 	name: 'Test Company',
// 	description: 'Test Company Description',
// 	industry: 'Test Company Industry'
// });

// company_request.send(String(company_payload));
// console.log(JSON.parse(company_request.responseText));
