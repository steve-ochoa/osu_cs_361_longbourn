module.exports = app => {
    const expertByCourseName = require('../controllers/fetchExpertByCourseName.controller');

    //Retrieve Expert By Course Name
    app.get("/fetchExperts/courseName/:courseName", expertByCourseName.fetchExpertByCourseName);

};