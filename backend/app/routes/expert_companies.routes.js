// SHC notes: 
// creates/retrieves expert_companies on DB
// From Slack group discussion: (1) routes - define the route and have a callback method from one of the controllers
// (code adapted from expert_skill.routes.js)


module.exports = app => {
	const expertCompanies = require('../controllers/expert_companies.controller.js');

	//Create new ExpertCompanies
	app.post("/expertCompanies", expertCompanies.create);

	//Retrieve ExpertCompanies by expertId
	app.get("/expertCompanies/:expertId", expertCompanies.findByExpertId);
}
