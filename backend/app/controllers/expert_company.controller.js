const ExpertCompany = require('../models/expert_company.model')

exports.create = (req,res) => {
	//Validate request
	if(!req.body) 
		res.status(400).send({
			message:"Conent cannot be empty!"
		});
	
	//Create new ExpertCompany
	const expertCompany = ExpertCompany.fromReqBody(req.body);

	ExpertCompany.create(expertCompany, (err, newExpertCourse) => {

		if(err)
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the ExpertCourse."
			});

		else res.send(newExpertCourse);
	});
};

exports.findByExpertId = (req, res) => {
	ExpertCompany.fetchByExpertId(req.params.expertId, (err, data) => {
		if (err) {
			if (err.kind === "not_found"){
				res.status(404).send({
					message: `No ExpertCompanies with expert_id ${req.params.expertId}.`
				});
			}

			else {
				res.status(500).send({
					message: "Error retrieving ExpertCompanies with expert_id " + req.params.expertId
				});
			}
		}

		else {
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		}
	});
};
