module.exports = app => {
    const expertsByCompany = require('../controllers/findExpertsByCompany.controller');

    //Retrieve Expert By Company
    app.get("/findExperts/company/:companyId", expertsByCompany.fetchExpertByCompanyId);

};