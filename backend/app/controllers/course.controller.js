const CourseService = require('../services/course_service');
const Course = require('../models/course.model').Course;

// Create and Save a new Course
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Instantiate an Course from incoming HTTP Request
    let course = Course.fromReqBody(req.body);

    CourseService.create(course, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Course."
            });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }
    });
};

// Retrieve all Courses from the database.
exports.findAll = (req, res) => {
    CourseService.findAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving courses."
            });
        else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};


// Update a Course identified by the courseId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    let courseToUpdate = Course.fromReqBody(req.body);

    console.log(courseToUpdate);

    CourseService.update(req.params.courseId, courseToUpdate, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `No Course with course_id ${req.params.courseId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Course with course_id " + req.params.courseId
                    });
                }
            } else res.send(data);
        }
    );
};