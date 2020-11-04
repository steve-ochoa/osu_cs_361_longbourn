
const ExpertByFirstName = require('../models/fetchExpertByFirstName.model');


// Find Expert By First Name
exports.fetchExpertByFirstName = (req, res) => {
    ExpertByFirstName.fetchExpertByFirstName(req.params.firstName, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Experts with that first name ${req.params.firstName}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Expert with such first_name " + req.params.firstName
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};