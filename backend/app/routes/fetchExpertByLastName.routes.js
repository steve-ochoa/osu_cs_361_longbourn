module.exports = app => {
    const expertByLastName = require('../controllers/fetchExpertByLastName.controller');

    //Retrieve Expert By Company
    app.get("/fetchExperts/lastName/:lastName", expertByLastName.fetchExpertByLastName);

};