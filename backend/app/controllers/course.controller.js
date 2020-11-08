const courses = require('../models/course.model.js');
const Course = courses.Course;


//Create a new Course
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Course
    const course = Course.fromReqBody(req.body);

    // Save Course in the database
    Course.create(course, (err, newCourse) => {
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
    Course.fetchAll((err, data) => {
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
    //Validate request
    if(!req.body)
        res.status(400).send({
            message: "Content can not be empty!"
        });
    
    // Create a course 
    const course = Course.fromReqBody(req.body);

    // Update Course in the database
    Course.updateById(course.courseId, course, (err, data) => {
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

