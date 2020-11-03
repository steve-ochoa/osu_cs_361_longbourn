module.exports = app => {
    const expertBySkillName = require('../controllers/fetchExpertBySkillName.controller');

    //Retrieve Expert By Skill Name
    app.get("/fetchExperts/skillName/:skillName", expertBySkillName.fetchExpertBySkillName);

};