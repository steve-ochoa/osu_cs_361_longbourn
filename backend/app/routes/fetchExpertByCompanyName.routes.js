module.exports = app => {

    const expertByCompanyName = require('../controllers/fetchExpertByCompanyName.controller');

    //Retrieve Expert By Company Name
    app.get("/fetchExperts/companyName/:companyName", expertByCompanyName.fetchExpertByCompanyName);

};