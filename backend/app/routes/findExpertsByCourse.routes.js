module.exports = app => {
    const expertsByCourse = require('../controllers/findExpertsByCourse.controller');

    //Retrieve Expert By Course
    app.get("/findExperts/course/:courseId", expertsByCourse.fetchExpertByCourseId);

};