module.exports = app => {
    const expertByCourseNumber = require('../controllers/fetchExpertByCourseNumber.controller');

    //Retrieve Expert By Course Number
    app.get("/fetchExperts/courseNumber/:courseNumber", expertByCourseNumber.fetchExpertByCourseNumber);

};