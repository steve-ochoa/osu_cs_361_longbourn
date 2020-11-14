module.exports = app => {
	const expertCompany = require('../controllers/expert_company.controller.js');

	//Create new ExpertCompany
	app.post("/expertCompanies", expertCompany.create);

	//Retrieve ExpertCompany by expertId
	app.get("/expertCompanies/:expertId", expertCompany.fetchByExpertId);
}
