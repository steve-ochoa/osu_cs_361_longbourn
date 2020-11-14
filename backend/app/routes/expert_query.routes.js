module.exports = app => {
    const expertQueryController = require('../controllers/expert_query_controller');

    //TODO: Rename all "fetch" to "find". All methods/routes should be named "find". Only the DAO has named "fetch".
    //TODO: "Experts" should be plural, since we are returning many Experts for each query.
    /*
    Experts By Course
     */
    app.get("/findExperts/courseNumber/:courseNumber", expertQueryController.findExpertsByCourseNumber);
    app.get("/findExperts/courseId/:courseId", expertQueryController.findExpertsByCourseId);
    app.get("/findExperts/courseName/:courseName", expertQueryController.findExpertsByCourseName);

};