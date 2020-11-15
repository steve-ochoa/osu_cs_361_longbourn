const CourseService = require('../services/course_service')

//Create a new Course
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    CourseService.create(req,res);
};

//Retrieve all Courses from the database.
exports.findAll = (req, res) => {
    CourseService.findAll(req,res);
};

exports.update = (req, res) => {
    //Validate request
    if(!req.body)
        res.status(400).send({
            message: "Content can not be empty!"
        });

    CourseService.update(req,res);
    
   
    
};

