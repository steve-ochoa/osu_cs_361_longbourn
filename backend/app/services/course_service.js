const CourseModel = require('../models/course.model.js');
const Course = CourseModel.Course;
const CourseDao = require('../daos/course_dao');


//Create a new Course
exports.create = (req, res) => {

    // Create a Course
    const course = Course.fromReqBody(req.body);

    // Save Course in the database
    CorseDao.create(course, (err, newCourse) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Expert."
            });

        else res.send(newCourse);
        console.log('newCourse: ', newCourse)
    });
};

//Retrieve all Courses from the database.
exports.findAll = (req, res) => {
    CourseDao.fetchAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving skills."
            });
        else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};

exports.update = (req, res) => {
    
    // Create a course 
    const course = Course.fromReqBody(req.body);

    // Update Course in the database
    CourseDao.updateById(course.courseId, course, (err, data) => {
        if(err){
            if (err.kind  === "not_found"){
                res.status(404).send({
                    message: `No Course with course_id ${course.courseId}`
                });
            }

            else{
                res.status(500).send({
                    message: `Error updating Course with course_id ${course.courseId}`
                });
            };
        } else res.send(data);
               
    });
};

