const sql = require('./db');

class ExpertsByCompany {

    constructor(expertId, firstName, lastName, email, description, photoUrl) {
        this.expertId = expertId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.description = description;
        this.photoUrl = photoUrl;
    }

    static fromExpertsByCompanyRow(expertsByCompanyRow) {
        return new ExpertsByCompany(
            expertsByCompanyRow.expert_id,
            expertsByCompanyRow.first_name,
            expertsByCompanyRow.last_name,
            expertsByCompanyRow.email,
            expertsByCompanyRow.description,
            expertsByCompanyRow.photoUrl)
    }

    static fromReqBody(reqBody) {
        return new ExpertsByCompany(
            reqBody.expertId,
            reqBody.firstName,
            reqBody.lastname,
            reqBody.email,
            reqBody.description,
            reqBody.photoUrl
        )
    }
}

ExpertsByCompany.fetchExpertsByCompanyId = (companyId, result) => {
    sql.query("SELECT e.expert_id, e.first_name, e.last_name, e.email, e.description, e.photo_url FROM experts e JOIN expert_companies ec ON e.expert_id = ec.expert_id WHERE ec.expert_company_id = ?",
        [companyId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                var expertsByCompanyArr = [];
                res.forEach(expertsByCompanyRow => expertsByCompanyArr.push(ExpertsByCompany.fromExpertsByCompanyRow(expertsByCompanyRow)));
                console.log("expertsByCompany:");
                console.log(expertsByCompanyArr);
                result(null, expertsByCompanyArr);
                return;
            }


            result({kind: "not_found"}, null);
        });
};

module.exports = ExpertsByCompany;

