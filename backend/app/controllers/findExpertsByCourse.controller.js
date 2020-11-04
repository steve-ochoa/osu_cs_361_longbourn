const ExpertsByCourse = require('../models/findExpertsByCourse.model');


// Find Expert By Course ID
exports.fetchExpertByCourseId = (req, res) => {
    ExpertsByCourse.fetchExpertsByCourseId(req.params.courseId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Experts with course_id ${req.params.courseId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Expert with course_id " + req.params.courseId
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};