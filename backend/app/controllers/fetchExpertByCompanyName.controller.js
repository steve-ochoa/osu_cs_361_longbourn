
const ExpertByCompanyName = require('../models/fetchExpertByCompanyName.model');


// Find Expert By Company Name
exports.fetchExpertByCompanyName = (req, res) => {
    ExpertByCompanyName.fetchExpertByCompanyName(req.params.companyName, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Experts with that company name ${req.params.companyName}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Expert with such company name " + req.params.companyName
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};