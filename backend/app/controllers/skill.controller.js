const skills = require('../models/skill.model');
const Skill = skills.Skill;


//Create a new Skill
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Expert
    const skill = Skill.fromReqBody(req.body);

    // Save Expert in the database
    Skill.create(skill, (err, newSkill) => {
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
    Skill.fetchAll((err, data) => {
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
