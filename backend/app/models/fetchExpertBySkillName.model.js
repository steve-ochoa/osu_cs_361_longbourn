const sql = require('./db');

class ExpertBySkillName {

    constructor(expertId, firstName, lastName, email, description, photo_url) {
        this.expertId = expertId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.description = description;
        this.photo_url = photo_url;
    }

    static fromExpertBySkillNameRow(expertBySkillNameRow) {
        return new ExpertBySkillName(
            expertBySkillNameRow.expert_id,
            expertBySkillNameRow.first_name,
            expertBySkillNameRow.last_name,
            expertBySkillNameRow.email,
            expertBySkillNameRow.description,
            expertBySkillNameRow.photo_url)
    }

    static fromReqBody(reqBody) {
        return new ExpertBySkillName(
            reqBody.expertId,
            reqBody.firstName,
            reqBody.lastname,
            reqBody.email,
            reqBody.description,
            reqBody.photo_url
        )
    }
}

//SQL checked
ExpertBySkillName.fetchExpertBySkillName = (skillName, result) => {
    let q = "SELECT e.expert_id, e.first_name, e.last_name, e.email, e.description, e.photo_url FROM experts e JOIN skills s JOIN expert_skills es ON e.expert_id = es.expert_id AND es.skill_id = s.skill_id WHERE s.name = ?";
    sql.query(q,
            [skillName],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log(res);
                var expertBySkillNameArr = [];
                res.forEach(expertBySkillNameRow => expertBySkillNameArr.push(ExpertBySkillName.fromExpertBySkillNameRow(expertBySkillNameRow)));
                console.log("expertBySkillName:");
                console.log(expertBySkillNameArr);
                result(null, expertBySkillNameArr);
                return;
            }


            result({kind: "not_found"}, null);
        });
};

module.exports = ExpertBySkillName;

