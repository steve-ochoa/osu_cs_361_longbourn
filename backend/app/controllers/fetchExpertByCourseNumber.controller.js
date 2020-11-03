const ExpertByCourseNumber = require('../models/fetchExpertByCourseNumber.model');


// Find Expert By Course Number
exports.fetchExpertByCourseNumber = (req, res) => {
    ExpertByCourseNumber.fetchExpertByCourseNumber(req.params.courseNumber, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Experts with that course mumber ${req.params.courseNumber}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Expert with such course_number " + req.params.courseName
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};