const sql = require('./db');

class ExpertByLastName {

    constructor(expertId, firstName, lastName, email, description, photoUrl) {
        this.expertId = expertId;
        this.lastName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.description = description;
        this.photoUrl = photoUrl;
    }

    static fromExpertByLastNameRow(expertByLastNameRow) {
        return new ExpertByLastName(
            expertByLastNameRow.expert_id,
            expertByLastNameRow.first_name,
            expertByLastNameRow.last_name,
            expertByLastNameRow.email,
            expertByLastNameRow.description,
            expertByLastNameRow.photoUrl)
    }

    static fromReqBody(reqBody) {
        return new ExpertByLastName(
            reqBody.expertId,
            reqBody.firstName,
            reqBody.lastname,
            reqBody.email,
            reqBody.description,
            reqBody.photoUrl
        )
    }
}

ExpertByLastName.fetchExpertByLastName = (lastName, result) => {
    console.log(lastName);
    let q = "SELECT e.expert_id, e.first_name, e.last_name, e.email, e.description, e.photo_url FROM experts e WHERE e.last_name = ?";
    sql.query(q,
            [lastName],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log(res);
                var expertByLastNameArr = [];
                res.forEach(expertByLastNameRow => expertByLastNameArr.push(ExpertByLastName.fromExpertByLastNameRow(expertByLastNameRow)));
                console.log("expertByLastName:");
                console.log(expertByLastNameArr);
                result(null, expertByLastNameArr);
                return;
            }


            result({kind: "not_found"}, null);
        });
};

module.exports = ExpertByLastName;

