module.exports = app => {
    const skill = require('../controllers/skill.controller');

    //Create a new Skill
    app.post("/skills", skill.create);

    //Retrieve all Skills
    app.get("/skills", skill.findAll);

    //Update Skill
    app.put("/skills/:skillId", skill.update)
};