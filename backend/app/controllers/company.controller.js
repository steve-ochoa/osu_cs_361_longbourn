const CompanyService = require("../services/company_service");

//Create a new Company
exports.create = (req, res) => {
    //Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        });
    }

    //Save Company in the database
    CompanyService.create(req, res);
        
};

//Retrieve all Companies from the database
exports.findAll = (req, res) => {
    CompanyService.findAll(req,res);
}

exports.update = (req, res) => {
    //Validate request
    if (!req.body)
        res.status(400).send({
            message: "Content can not be empty!"
        });

    CompanyService.update(req,res);
};
