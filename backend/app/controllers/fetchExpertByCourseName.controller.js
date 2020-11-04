
const ExpertByCourseName = require('../models/fetchExpertByCourseName.model');


// Find Expert By Course Name
exports.fetchExpertByCourseName = (req, res) => {
    ExpertByCourseName.fetchExpertByCourseName(req.params.courseName, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Experts with that course name ${req.params.courseName}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Expert with such course_name " + req.params.courseName
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};