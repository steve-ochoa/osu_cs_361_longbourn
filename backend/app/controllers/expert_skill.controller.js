const ExpertSkill = require('../models/expert_skill.model');

//Create a new Skill
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create an ExpertSkill
    const expertSkill = ExpertSkill.fromReqBody(req.body);

    // Save Expert in the database
    ExpertSkill.create(expertSkill, (err, newExpertSkill) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the ExpertSkill."
            });
        else res.send(newExpertSkill);
    });
};

exports.findByExpertId = (req, res) => {
    ExpertSkill.fetchByExpertId(req.params.expertId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No ExpertSkills with expert_id ${req.params.expertId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving ExpertSkills with expert_id " + req.params.expertId
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};