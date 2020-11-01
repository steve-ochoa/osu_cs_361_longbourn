module.exports = app => {
    const company = require('../controllers/company.controller');

    //Create a new Company
    app.post("/companies", company.create);

    //Retrieve all Companies
    app.get("/companies", company.findAll);
};