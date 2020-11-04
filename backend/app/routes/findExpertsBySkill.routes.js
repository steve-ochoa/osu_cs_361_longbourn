module.exports = app => {
    const expertsBySkill = require('../controllers/findExpertsBySkill.controller');

    //Retrieve all Skills
    app.get("/findExperts/skill/:skillId", expertsBySkill.fetchExpertBySkillId);

};