const sql = require('./db');

class ExpertByCompanyName {

    constructor(expertId, firstName, lastName, email, description, photo_url) {
        this.expertId = expertId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.description = description;
        this.photo_url = photo_url;
    }

    static fromExpertByCompanyNameRow(expertByCompanyNameRow) {
        return new ExpertByCompanyName(
            expertByCompanyNameRow.expert_id,
            expertByCompanyNameRow.first_name,
            expertByCompanyNameRow.last_name,
            expertByCompanyNameRow.email,
            expertByCompanyNameRow.description,
            expertByCompanyNameRow.photo_url)
    }

    static fromReqBody(reqBody) {
        return new ExpertByCompanyName(
            reqBody.expertId,
            reqBody.firstName,
            reqBody.lastname,
            reqBody.email,
            reqBody.description,
            reqBody.photo_url
        )
    }
}

// SQL -good
ExpertByCompanyName.fetchExpertByCompanyName = (companyName, result) => {
    let q = "SELECT e.expert_id, e.first_name, e.last_name, e.email, e.description, e.photo_url FROM experts e JOIN companies c JOIN expert_companies ec ON e.expert_id = ec.expert_id AND c.company_id = ec.company_id WHERE c.name = ?";
    sql.query(q,
            [companyName],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log(res);
                var expertByCompanyNameArr = [];
                res.forEach(expertByCompanyNameRow => expertByCompanyNameArr.push(ExpertByCompanyName.fromExpertByCompanyNameRow(expertByCompanyNameRow)));
                console.log("expertByCompanyName:");
                console.log(expertByCompanyNameArr);
                result(null, expertByCompanyNameArr);
                return;
            }


            result({kind: "not_found"}, null);
        });
};

module.exports = ExpertByCompanyName;

