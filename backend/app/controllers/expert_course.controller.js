const ExpertCourse = require('../services/expert_course_service');

//Create new ExpertCourse
exports.create = (req, res) => {
    ExpertCourse.create(req.body, (err, data) => {
        if (err) {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the expert_courses"
			});
		}
		else if(!req.body){
			res.status(404).send({
				message:"Content cannot be empty!"
			});
		}
        else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });

}



// Get Course by ExpertId
exports.fetchByExpertId = (req, res) => {
	ExpertCourse.fetchByExpertId(req.params.expertId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Experts with that expertId ${req.params.expertId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Expert with such expertId " + req.params.expertId
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
}


