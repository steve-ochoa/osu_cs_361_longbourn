const sql = require('../daos/db');

const SkillModel = require('../models/skill.model');
const Skill = SkillModel.Skill;
const SkillDbDto = SkillModel.SkillDbDto;

exports.create = (newSkill, result) => {
    let skillDbDto = new SkillDbDto(newSkill);
    console.log("Creating skill:");
    console.log(skillDbDto);

    sql.getConnection(function (err, connection) {

        connection.beginTransaction(function (err) {

            sql.query("INSERT INTO skills SET ?", skillDbDto, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }

                connection.commit();
                connection.release();

                var newSkillResult = Skill.fromNewSkillDbDto(res.insertId, skillDbDto);

                console.log("Created skill: ", newSkillResult);
                result(null, newSkillResult);
            });
        });

    });
};

exports.fetchAll = result => {
    sql.query("SELECT * FROM skills", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        var skillsArray = [];
        res.forEach(skillDbDto => skillsArray.push(Skill.fromSkillDbDto(skillDbDto)));
        console.log("skills: ", skillsArray);
        result(null, skillsArray);
    });
};