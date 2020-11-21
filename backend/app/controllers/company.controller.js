const CompanyService = require("../services/company_service");
const Company = require("../models/company.model").Company;

//Create a new Company
exports.create = (req, res) => {
    //Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        });
    }

	// Instantiate a Company from incoming HTTP Request
    let company = Company.fromReqBody(req.body);

    CompanyService.create(company, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Company."
            });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }
    });
};

        

// Retrieve all Companies from the database.
exports.findAll = (req, res) => {
    CompanyService.findAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving companies."
            });
        else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};

// Update a Company identified by the companyId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    let companyToUpdate = Company.fromReqBody(req.body);

    console.log(companyToUpdate);

    CompanyService.update(req.params.companyId, companyToUpdate, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `No Company with company_id ${req.params.companyId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Company with company_id " + req.params.companyId
                    });
                }
            } else res.send(data);
        }
    );
};
