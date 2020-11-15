module.exports = app => {
    const expertSkill = require('../controllers/expert_skill.controller.js');

    //Create new ExpertSkill
    app.post("/expertSkills", expertSkill.create);

    //Retrieve ExpertSkills by expertId
    app.get("/expertSkills/:expertId", expertSkill.fetchByExpertId);
}


