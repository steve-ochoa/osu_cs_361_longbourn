const sql = require('./db');

class ExpertsBySkill {

    constructor(expertId, firstName, lastName, email, description, photo_url) {
        this.expertId = expertId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.description = description;
        this.photo_url = photo_url;
    }

    static fromExpertsBySkillRow(expertsBySkillRow) {
        return new ExpertsBySkill(
            expertsBySkillRow.expert_id,
            expertsBySkillRow.first_name,
            expertsBySkillRow.last_name,
            expertsBySkillRow.email,
            expertsBySkillRow.description,
            expertsBySkillRow.photo_url)
    }

    static fromReqBody(reqBody) {
        return new ExpertsBySkill(
            reqBody.expertId,
            reqBody.firstName,
            reqBody.lastname,
            reqBody.email,
            reqBody.description,
            reqBody.photo_url
        )
    }
}

ExpertsBySkill.fetchExpertsBySkillId = (skillId, result) => {
    sql.query("SELECT e.expert_id, e.first_name, e.last_name, e.email, e.description, e.photo_url FROM experts e JOIN expert_skills es ON e.expert_id = es.expert_id WHERE es.expert_skill_id = ?",
        [skillId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                var expertsBySkillArr = [];
                res.forEach(expertsBySkillRow => expertsBySkillArr.push(ExpertsBySkill.fromExpertsBySkillRow(expertsBySkillRow)));
                console.log("expertsBySkill:");
                console.log(expertsBySkillArr);
                result(null, expertsBySkillArr);
                return;
            }


            result({kind: "not_found"}, null);
        });
};

module.exports = ExpertsBySkill;

