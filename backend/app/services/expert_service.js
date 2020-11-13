const Expert = require('../models/expert.model');

exports.create = (req, res) => {
    // Create an Expert
    const expert = Expert.fromReqBody(req.body);

    // Save Expert in the database
    Expert.create(expert, (err, newExpert) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Expert."
            });
        else res.send(newExpert);
    });
};

exports.findAll = (req, res) => {
    Expert.fetchAll((err, data) => {
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

exports.findOne = (req, res) => {
    Expert.fetchById(req.params.expertId, (err, data) => {
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

exports.update = (req, res) => {
    const expert = Expert.fromReqBody(req.body);

    console.log(expert);

    Expert.updateById(req.params.expertId, expert, (err, data) => {
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
