const sql = require('./db');

class ExpertByCourseNumber {

    constructor(expertId, firstName, lastName, email, description, photoUrl) {
        this.expertId = expertId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.description = description;
        this.photoUrl = photoUrl;
    }

    static fromExpertByCourseNumberRow(expertByCourseNumberRow) {
        return new ExpertByCourseNumber(
            expertByCourseNumberRow.expert_id,
            expertByCourseNumberRow.first_name,
            expertByCourseNumberRow.last_name,
            expertByCourseNumberRow.email,
            expertByCourseNumberRow.description,
            expertByCourseNumberRow.photoUrl)
    }

    static fromReqBody(reqBody) {
        return new ExpertByCourseNumber(
            reqBody.expertId,
            reqBody.firstName,
            reqBody.lastname,
            reqBody.email,
            reqBody.description,
            reqBody.photoUrl
        )
    }
}

// SQL checked for course number
ExpertByCourseNumber.fetchExpertByCourseNumber = (courseNumber, result) => {
    let q = "SELECT e.expert_id, e.first_name, e.last_name, e.email, e.description, e.photo_url FROM experts e JOIN courses c JOIN expert_courses ec ON e.expert_id = ec.expert_id AND ec.course_id = c.course_id WHERE c.course_number = ?";
    sql.query(q,
            [courseNumber],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log(res);
                var expertByCourseNumberArr = [];
                res.forEach(expertByCourseNumberRow => expertByCourseNumberArr.push(ExpertByCourseNumber.fromExpertByCourseNumberRow(expertByCourseNumberRow)));
                console.log("expertByCourseNumber:");
                console.log(expertByCourseNumberArr);
                result(null, expertByCourseNumberArr);
                return;
            }


            result({kind: "not_found"}, null);
        });
};

module.exports = ExpertByCourseNumber;

