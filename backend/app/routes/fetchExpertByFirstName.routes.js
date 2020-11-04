module.exports = app => {
    const expertByFirstName = require('../controllers/fetchExpertByFirstName.controller');

    //Retrieve Expert By Company
    app.get("/fetchExperts/firstName/:firstName", expertByFirstName.fetchExpertByFirstName);

};