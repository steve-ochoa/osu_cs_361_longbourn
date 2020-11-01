const sql = require('./db');

class Skill {
    constructor(skillId, name, description) {
        this.skillId = skillId;
        this.name = name;
        this.description = description;
    }

    static fromReqBody(reqBody) {
        return new Skill(
            reqBody.skillId,
            reqBody.name,
            reqBody.description,
        )
    }

    static fromSkillDbDto(skillDbDto) {
        return new Skill(
            skillDbDto.skill_id,
            skillDbDto.name,
            skillDbDto.description)
    }

    static fromNewSkillDbDto(skillId, newSkillDbDto) {
        return new Skill(
            skillId,
            newSkillDbDto.name,
            newSkillDbDto.description
        )
    }
}

class SkillDbDto {
    constructor(skill) {
        this.skill_id = skill.skillId;
        this.name = skill.name;
        this.description = skill.description;
    }
}

Skill.create = (newSkill, result) => {
    let skillDbDto = new SkillDbDto(newSkill);
    console.log("Creating skill:");
    console.log(skillDbDto);

    sql.query("INSERT INTO skills SET ?", skillDbDto, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        var newSkillResult = Skill.fromNewSkillDbDto(res.insertId, skillDbDto);

        console.log("Created skill: ", newSkillResult);
        result(null, newSkillResult);
    });
};

Skill.fetchAll = result => {
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

module.exports = {
    Skill, SkillDbDto
};