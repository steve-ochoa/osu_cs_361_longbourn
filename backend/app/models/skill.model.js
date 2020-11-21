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


module.exports = {
    Skill, SkillDbDto
};