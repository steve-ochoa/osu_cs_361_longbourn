
const ExpertByLastName = require('../models/fetchExpertByLastName.model');


// Find Expert By Last Name
exports.fetchExpertByLastName = (req, res) => {
    ExpertByLastName.fetchExpertByLastName(req.params.lastName, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Experts with that Last name ${req.params.lastName}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Expert with such last_name " + req.params.lastName
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};