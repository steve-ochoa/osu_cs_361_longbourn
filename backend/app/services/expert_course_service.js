const ExpertCourse = require('../models/expert_course.model');
const ExpertCourseDao = require('../daos/expert_course_dao');


exports.create = (req, res) => {
    // Get req.body 
    const expertCourse = req.body;    

     // Send expertCourse (req.body) to ExpertCourseDao.create 
    ExpertCourseDao.create(expertCourse, (err, newExpertCourse) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the expert_courses"
            });
        else 
        {
            // console.log(newExpertCourse);            
            res.send(newExpertCourse);
        }
    });
};


exports.fetchByExpertId = (req, res) => {
    ExpertCourseDao.fetchByExpertId(req.params.expertId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Expert with id ${req.params.expertId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Expert with id " + req.params.expertId
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};