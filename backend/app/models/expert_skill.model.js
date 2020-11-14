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

module.exports = {
	ExpertSkill, ExpertSkillDbDto
};
