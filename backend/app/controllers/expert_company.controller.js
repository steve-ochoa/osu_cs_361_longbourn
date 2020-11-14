const ExpertCompany = require('../services/expert_company_service')

//Create new ExpertCompany
exports.create = (req, res) => {
	//Validate request
	if(!req.body) {
		res.status(400).send({
			message:"Content cannot be empty!"
		});
	}
	ExpertCompany.create(req, res);

}

exports.fetchByExpertId = (req, res) => {
	ExpertCompany.fetchByExpertId(req, res);	
}