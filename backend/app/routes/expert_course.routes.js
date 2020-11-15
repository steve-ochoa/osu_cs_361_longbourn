module.exports = app => {
	const expertCourse = require('../controllers/expert_course.controller.js');

	//Create new ExpertCourse
	app.post("/expertCourses", expertCourse.create);

	//Retrieve ExpertCourses by expertId
	app.get("/expertCourses/:expertId", expertCourse.fetchByExpertId);
}
