const ExpertSkill = require('../services/expert_skill_service');

//Create new ExpertCourse
exports.create = (req, res) => {
	//Validate request
	if(!req.body) {
		res.status(400).send({
			message:"Content cannot be empty!"
		});
	}
	ExpertSkill.create(req, res);

}

exports.fetchByExpertId = (req, res) => {
	ExpertSkill.fetchByExpertId(req, res);	
}

