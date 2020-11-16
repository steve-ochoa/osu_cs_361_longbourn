const ExpertCompany = require('../services/expert_company_service')

//Create new ExpertCompany
exports.create = (req, res) => {
    ExpertCompany.create(req.body, (err, data) => {
        if (err) {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the expert_companies"
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


// Get Company by ExpertId
exports.fetchByExpertId = (req, res) => {
	ExpertCompany.fetchByExpertId(req.params.expertId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Company with that expertId ${req.params.expertId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Company with such expertId " + req.params.expertId
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
}


