const ExpertService = require('../services/expert_service');

// Create and Save a new Expert
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    ExpertService.create(req, res);
};

// Retrieve all Experts from the database.
exports.findAll = (req, res) => {
    ExpertService.findAll(req, res);
};

// Find a single Expert with a expertId
exports.findOne = (req, res) => {
    ExpertService.findOne(req, res);
};

// Update a Expert identified by the expertId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    ExpertService.update(req, res);
};
