const ExpertCourse = require('../models/expert_course.model');

//Create new ExpertCourse
exports.create = (req, res) => {
	//Validate request
	if(!req.body) {
		res.status(400).send({
			message:"Conent cannot be empty!"
		});
	}

	//Create ExpertCourse
	const expertCourse = ExpertCourse.fromReqBody(req.body);

	//Save ExpertCourse in database
	ExpertCourse.create(expertCourse, (err, newExpertCourse) => {
		if(err)
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the ExpertCourse."
			});

		else res.send(newExpertCourse);
	});
};

exports.findByExpertId = (req, res) => {
	ExpertCourse.fetchByExpertId(req.params.expertId, (err, data) => {
		if (err) {
			if (err.kind === "not_found"){
				res.status(404).send({
					message: `No ExpertCourses with expert_id ${req.params.expertId}.`
				});
			}

			else {
				res.status(500).send({
					message: "Error retrieving ExpertCourses with expert_id " + req.params.expertId
				});
			}
		}

		else {
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		}
	});
};
