
const ExpertBySkillName = require('../models/fetchExpertBySkillName.model');


// Find Expert By Skill Name
exports.fetchExpertBySkillName = (req, res) => {
    ExpertBySkillName.fetchExpertBySkillName(req.params.skillName, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Experts with that skill name ${req.params.skillName}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Expert with such skill_name " + req.params.skillName
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};