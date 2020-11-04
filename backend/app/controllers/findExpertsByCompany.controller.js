const ExpertsByCompany = require('../models/findExpertsByCompany.model');


// Find Expert By Company ID
exports.fetchExpertByCompanyId = (req, res) => {
    ExpertsByCompany.fetchExpertsByCompanyId(req.params.companyId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Experts with company_id ${req.params.companyId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Expert with company_id " + req.params.companyId
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};