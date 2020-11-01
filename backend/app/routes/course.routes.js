module.exports = app => {
    const course = require('../controllers/course.controller.js');

    //Create a new Skill
    app.post("/courses", course.create);

    //Retrieve all Skills
    app.get("/courses", course.findAll);
};