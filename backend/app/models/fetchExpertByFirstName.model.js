const sql = require('./db');

class ExpertByFirstName {

    constructor(expertId, firstName, lastName, email, description, photoUrl) {
        this.expertId = expertId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.description = description;
        this.photoUrl = photoUrl;
    }

    static fromExpertByFirstNameRow(expertByFirstNameRow) {
        return new ExpertByFirstName(
            expertByFirstNameRow.expert_id,
            expertByFirstNameRow.first_name,
            expertByFirstNameRow.last_name,
            expertByFirstNameRow.email,
            expertByFirstNameRow.description,
            expertByFirstNameRow.photoUrl)
    }

    static fromReqBody(reqBody) {
        return new ExpertByFirstName(
            reqBody.expertId,
            reqBody.firstName,
            reqBody.lastname,
            reqBody.email,
            reqBody.description,
            reqBody.photoUrl
        )
    }
}

ExpertByFirstName.fetchExpertByFirstName = (firstName, result) => {
    let q = "SELECT e.expert_id, e.first_name, e.last_name, e.email, e.description, e.photo_url FROM experts e WHERE e.first_name = ?";
    sql.query(q,
            [firstName],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log(res);
                var expertByFirstNameArr = [];
                res.forEach(expertByFirstNameRow => expertByFirstNameArr.push(ExpertByFirstName.fromExpertByFirstNameRow(expertByFirstNameRow)));
                console.log("expertByFirstName:");
                console.log(expertByFirstNameArr);
                result(null, expertByFirstNameArr);
                return;
            }


            result({kind: "not_found"}, null);
        });
};

module.exports = ExpertByFirstName;

