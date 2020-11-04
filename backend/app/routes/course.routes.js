module.exports = app => {
    const course = require('../controllers/course.controller.js');

    //Create a new Course
    app.post("/courses", course.create);

    //Retrieve all Courses
    app.get("/courses", course.findAll);

    //Updade Course by CourseId
    app.put("/courses/:courseId", course.update)
};