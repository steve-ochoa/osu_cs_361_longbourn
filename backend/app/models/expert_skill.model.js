const sql = require('../daos/db');

class ExpertSkill {
    constructor(expertId, skillId, name, description, experienceYears) {
        this.expertId = expertId;
        this.skillId = skillId;
        this.name = name;
        this.description = description;
        this.experienceYears = experienceYears;
    }

    static fromExpertSkillRow(expertSkillRow) {
        return new ExpertSkill(
            expertSkillRow.expert_id,
            expertSkillRow.skill_id,
            expertSkillRow.name,
            expertSkillRow.description,
            expertSkillRow.experience_years
        );
    }

    static fromReqBody(reqBody) {
        return new ExpertSkill(
            reqBody.expertId,
            reqBody.skillId,
            reqBody.name,
            reqBody.description,
            reqBody.experienceYears
        )
    }
}

class ExpertSkillDbDto {
    constructor(expertSkill) {
        this.expert_id = expertSkill.expertId;
        this.skill_id = expertSkill.skillId;
        this.experience_years = expertSkill.experienceYears;
    }
}


/*
ManyToMany Experts<->Skills relationship table INSERT.

We should never overwrite an Expert's fields nor a Skill's fields from this query.

Instead only INSERT records into the relationship table to assign
Skills<->Experts.
 */
ExpertSkill.create = (newExpertSkill, result) => {
    let expertSkillDb = new ExpertSkillDbDto(newExpertSkill);
    console.log('Creating expertSkill:');
    console.log(expertSkillDb);

    sql.query("INSERT INTO expert_skills (expert_skill_id, expert_id, skill_id, experience_years) VALUES (?,?,?,?)",
        [0, expertSkillDb.expert_id, expertSkillDb.skill_id, expertSkillDb.experience_years],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("Created expertSkill: ", newExpertSkill);
            result(null, newExpertSkill);
        });
};

ExpertSkill.fetchByExpertId = (expertId, result) => {
    sql.query("SELECT es.expert_id, es.skill_id, s.name, s.description, es.experience_years FROM expert_skills es " +
        "JOIN skills s ON es.skill_id = s.skill_id WHERE es.expert_id = ?",
        [expertId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                var expertSkillsArr = [];
                res.forEach(expertSkillRow => expertSkillsArr.push(ExpertSkill.fromExpertSkillRow(expertSkillRow)));
                console.log("expertSkills:");
                console.log(expertSkillsArr);
                result(null, expertSkillsArr);
                return;
            }

            result({kind: "not_found"}, null);
        });
};

module.exports = ExpertSkill;