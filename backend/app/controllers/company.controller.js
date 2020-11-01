const companies = require("../models/company.model.js");
const Company = companies.Company;

//Create a new Company
exports.create = (req,res) => {
	//Validate requrest
	if(!reqBody){
		res.status(400).send({
			message: "Content can not be empty"
		});
	}

	//Create a Company
	const company = Company.fromReqBody(req.body);

	//Save Company in the database
	Company.create(company, (err, newCompany) => {
		if(err){
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the Company."
			});
		}
		else res.send(newCompany);
	});
};

//Retrieve all Companies from the database
exports.findAll = (req, res) => {
	Company.fetchAll((err, data) => {
		if(err){
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving Companies"
			})
		};
		else{
			res.setHeader('Content-Type', 'application/json');
			res.send(data)
		}
	})
}
