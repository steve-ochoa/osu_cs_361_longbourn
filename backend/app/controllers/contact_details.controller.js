const ContactDetailsService = require('../services/contact_details_service')

// Find a single ContactDetail with a expertId
exports.findOneByExpertId = (req, res) => {
    ContactDetailsService.findOneByExpertId(req.params.expertId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No ContactDetails with id ${req.params.expertId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving ContactDetails with expertId " + req.params.expertId
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};

