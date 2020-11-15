module.exports = app => {
    const expertQueryController = require('../controllers/expert_query_controller');

    //TODO: Rename all "fetch" to "find". All methods/routes should be named "find". Only the DAO has named "fetch".
    //TODO: "Experts" should be plural, since we are returning many Experts for each query.

    /*
    Experts By Course
     */
    app.get("/findExperts/courseId/:courseId", expertQueryController.findExpertsByCourseId);
    app.get("/findExperts/courseNumber/:courseNumber", expertQueryController.findExpertsByCourseNumber);
    app.get("/findExperts/courseName/:courseName", expertQueryController.findExpertsByCourseName);

    /*
    Experts By Company
     */
    app.get("/findExperts/companyId/:companyId", expertQueryController.findExpertsByCompanyId);
    app.get("/findExperts/companyName/:companyName", expertQueryController.findExpertsByCompanyName);
    app.get("/findExperts/companyIndustry/:companyIndustry", expertQueryController.findExpertsByCompanyIndustry);


     /*
    Experts By Skill
     */
    app.get("/findExperts/skillId/:skillId", expertQueryController.findExpertsBySkillId);
    app.get("/findExperts/skillName/:skillName", expertQueryController.findExpertsBySkillName);

};