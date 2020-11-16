const ExpertSkill = require('../services/expert_skill_service');


//Create new expert_skills
exports.create = (req, res) => {
    ExpertSkill.create(req.body, (err, data) => {
        if (err) {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the expert_skills"
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

// Get Skill by ExpertId
exports.fetchByExpertId = (req, res) => {
	ExpertSkill.fetchByExpertId(req.params.expertId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Skill with that expertId ${req.params.expertId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Skill with such expertId " + req.params.expertId
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
}