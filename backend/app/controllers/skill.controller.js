const SkillService = require('../services/skill_service')
const Skill = require('../models/skill.model').Skill


// Create and Save a new Skill
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Instantiate an Skill from incoming HTTP Request
    let skill = Skill.fromReqBody(req.body);

    SkillService.create(skill, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Skill."
            });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }
    });
};

// Retrieve all Skills from the database.
exports.findAll = (req, res) => {
    SkillService.findAll((err, data) => {
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

// Find a single Skill with a skillId
exports.findById = (req, res) => {
    SkillService.findById(req.params.skillId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Skill with id ${req.params.skillId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Skill with id " + req.params.skillId
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};

// Update a Skill identified by the skillId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    let skillToUpdate = Skill.fromReqBody(req.body);

    console.log(skillToUpdate);

    SkillService.update(req.params.skillId, skillToUpdate, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `No Skill with skill_id ${req.params.skillId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Skill with skill_id " + req.params.skillId
                    });
                }
            } else res.send(data);
        }
    );
};