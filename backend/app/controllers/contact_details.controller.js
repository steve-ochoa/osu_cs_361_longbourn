const cd = require('../models/contact_details.model');
const ContactDetails = cd.ContactDetails;

// Find ContactDetails for one Expert
exports.findOneByExpertId = (req, res) => {
    ContactDetails.fetchByExpertId(req.params.expertId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No ContactDetails with expert_id ${req.params.expertId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving ContactDetails with expert_id " + req.params.expertId
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};
