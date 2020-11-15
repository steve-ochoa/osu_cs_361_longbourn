const sql = require('./db');


const expertSkillModels = require('../models/expert_skill.model');
const ExpertSkill = expertSkillModels.ExpertSkill;
const ExpertSkillDb = expertSkillModels.ExpertSkillDbDto;


exports.create = (newExpertSkill, result) => {
    // using req.body rececived, create new ExpertSkillDb
    let expertSkillDB = new ExpertSkillDb(newExpertSkill);
    console.log("Inserting new expert_skills:");
    console.log(expertSkillDB);

    // connect to sql and crate new entry in database
    sql.getConnection(function (err, connection) {
        connection.beginTransaction(function (err) {
            connection.query("INSERT INTO expert_skills (expert_skill_id, expert_id, skill_id, experience_years) VALUES (?,?,?,?)",
            [0, expertSkillDB.expert_id, expertSkillDB.skill_id, expertSkillDB.experience_years],


            (err, res) => {        
                    if (err) {
                        connection.rollback();
                        connection.release();
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }

                connection.commit();
                connection.release();
                console.log("New expert_skills inserted in DB: ", newExpertSkill);
                result(null, newExpertSkill);
            });
        })
    });


}


exports.fetchByExpertId = (expertId, result) => {
    sql.query("SELECT es.expert_id, es.skill_id, s.name, s.description, es.experience_years FROM expert_skills es " +
        "JOIN skills s ON es.skill_id = s.skill_id WHERE es.expert_id = ?",
        [expertId],
		(err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

			if (res.length){
				var expertSkillsArr = [];
				res.forEach(expertSkillRow => expertSkillsArr.push(ExpertSkill.fromExpertSkillRow(expertSkillRow)));
				console.log("expertSkills:");
				console.log(expertSkillsArr);
				result(null, expertSkillsArr);
				return;
			}
            else
    			result({kind: "not_found"}, null)

    });
};
