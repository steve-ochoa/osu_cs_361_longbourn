const ExpertSkill = require('../models/expert_skill.model');
const ExpertSkillDao = require('../daos/expert_skill_dao');

exports.create = (req, res) => {
    // Get req.body 
    const expertSkill = req.body;    

     // Send expertSkill (req.body) to ExpertSkillDao.create 
    ExpertSkillDao.create(expertSkill, (err, newExpertSkill) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the expert_skills"
            });
        else 
        {
            res.send(newExpertSkill);
        }
    });
};


exports.fetchByExpertId = (req, res) => {
    ExpertSkillDao.fetchByExpertId(req.params.expertId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Expert with id ${req.params.expertId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Expert with id " + req.params.expertId
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};