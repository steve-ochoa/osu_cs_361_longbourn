const Skill = require('../models/skill.model').Skill;
const SkillDao = require('../daos/skill_dao');


//Create a new Skill
exports.create = (req, res) => {

    // Create a Expert
    const skill = Skill.fromReqBody(req.body);

    // Save Expert in the database
    SkillDao.create(skill, (err, newSkill) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Skill."
            });
        else res.send(newSkill);
    });
};

//Retrieve all Skills from the database.
exports.findAll = (req, res) => {
    SkillDao.fetchAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving skills."
            });
        else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};
