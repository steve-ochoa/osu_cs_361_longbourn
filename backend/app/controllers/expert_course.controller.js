const ExpertCourse = require('../services/expert_course_service');

//Create new ExpertCourse
exports.create = (req, res) => {
	//Validate request
	if(!req.body) {
		res.status(400).send({
			message:"Content cannot be empty!"
		});
	}
	ExpertCourse.create(req, res);

}

exports.fetchByExpertId = (req, res) => {
	ExpertCourse.fetchByExpertId(req, res);	
}


