const SkillService = require('../services/skill_service')


//Create a new Skill
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    SkillService.create(req,res);
   
};

//Retrieve all Skills from the database.
exports.findAll = (req, res) => {
    SkillService.findAll(req, res);
};
