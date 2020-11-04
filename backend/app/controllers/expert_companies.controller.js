// SHC notes: 
// creates/retrieves expert_companies on DB
// From Slack group discussion: (2) controllers - implements the callback methods from the route
// (code adapted from expert_skill.controller.js)

const ExpertCompanies = require('../models/expert_companies.model');

//Create a new company
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create an ExpertCompanies
    const expertCompanies = ExpertCompanies.fromReqBody(req.body);

    // Save Expert in the database
    ExpertCompanies.create(expertCompanies, (err, newExpertCompanies) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the ExpertCompanies."
            });
        else res.send(newExpertCompanies);
    });
};

// Find Expert By ID
exports.findByExpertId = (req, res) => {
    ExpertCompanies.fetchByExpertId(req.params.expertId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No ExpertCompanies with expert_id ${req.params.expertId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving ExpertCompanies with expert_id " + req.params.expertId
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};