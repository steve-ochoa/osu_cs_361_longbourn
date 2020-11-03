const ExpertsBySkill = require('../models/findExpertsBySkill.model');


// Find Expert By Skill ID
exports.fetchExpertBySkillId = (req, res) => {
    ExpertsBySkill.fetchExpertsBySkillId(req.params.skillId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Experts with skill_id ${req.params.skillId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving ExpertCompanies with expert_id " + req.params.skillId
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};