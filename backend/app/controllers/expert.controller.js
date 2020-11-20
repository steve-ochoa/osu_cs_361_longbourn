const ExpertService = require('../services/expert_service');
const expertModel = require('../models/expert.model');
const Expert = expertModel.Expert;

// Create and Save a new Expert
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Instantiate an Expert from incoming HTTP Request
    let expert = Expert.fromReqBody(req.body);

    ExpertService.create(expert, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Expert."
            });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }
    });
};

// Retrieve all Experts from the database.
exports.findAll = (req, res) => {
    ExpertService.findAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving experts."
            });
        else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};

// Find a single Expert with a expertId
exports.findById = (req, res) => {
    ExpertService.findById(req.params.expertId, (err, data) => {
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

// Update a Expert identified by the expertId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    let expertToUpdate = Expert.fromReqBody(req.body);

    console.log(expertToUpdate);

    ExpertService.update(req.params.expertId, expertToUpdate, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `No Expert with expert_id ${req.params.expertId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Expert with expert_id " + req.params.expertId
                    });
                }
            } else res.send(data);
        }
    );
};
