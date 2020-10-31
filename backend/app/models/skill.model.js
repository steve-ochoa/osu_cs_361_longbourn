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

    static fromSkillDb(skillDb) {
        return new Skill(
            skillDb.skill_id,
            skillDb.name,
            skillDb.description)
    }

    static fromNewSkillDb(skillId, newSkillDb) {
        return new Skill(
            skillId,
            newSkillDb.name,
            newSkillDb.description
        )
    }
}

class SkillDb {
    constructor(skill) {
        this.skill_id = skill.skillId;
        this.name = skill.name;
        this.description = skill.description;
    }
}

Skill.create = (newSkill, result) => {
    let skillDb = new SkillDb(newSkill);
    console.log("Creating skill:");
    console.log(skillDb);

    sql.query("INSERT INTO skills SET ?", skillDb, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        var newSkillResult = Skill.fromNewSkillDb(res.insertId, skillDb);

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
        res.forEach(skillDb => skillsArray.push(Skill.fromSkillDb(skillDb)));
        console.log("skills: ", skillsArray);
        result(null, skillsArray);
    });
};

module.exports = {
    Skill, SkillDb
};