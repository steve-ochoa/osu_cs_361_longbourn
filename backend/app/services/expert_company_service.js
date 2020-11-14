const ExpertCompany = require('../models/expert_company.model');
const ExpertCompanyDao = require('../daos/expert_company_dao');


exports.create = (req, res) => {
    // Get req.body 
    const expertCompany = req.body;    

     // Send expertCompany (req.body) to ExpertCompanyDao.create 
    ExpertCompanyDao.create(expertCompany, (err, newExpertCompany) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the expert_companies"
            });
        else 
        {
            // console.log(newExpertCompany);            
            res.send(newExpertCompany);
        }
    });
};


exports.fetchByExpertId = (req, res) => {
    ExpertCompanyDao.fetchByExpertId(req.params.expertId, (err, data) => {
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