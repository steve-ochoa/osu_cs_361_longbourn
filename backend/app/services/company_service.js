const companyModel = require("../models/company.model");
const Company = companyModel.Company;
const CompanyDao = require("../daos/company_dao");

//Create a new Company
exports.create = (req, res) => {
    //Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        });
    }

    //Create a Company
    const company = Company.fromReqBody(req.body);

    //Save Company in the database
    CompanyDao.create(company, (err, newCompany) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Company."
            });
        } else res.send(newCompany);
    });
};

//Retrieve all Companies from the database
exports.findAll = (req, res) => {
    CompanyDao.fetchAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Companies"
            })
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    })
}

exports.update = (req, res) => {

    // Create a Company
    const company = Company.fromReqBody(req.body);

    console.log(company);

    // Update Company in the database
    CompanyDao.updateById(company.companyId, company, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Company with company_id ${company.company}`
                });
            } else {
                res.status(500).send({
                    message: `Error updating Company with company_id ${company.companyId}`
                });
            };
        } else res.send(data);

    });
};
