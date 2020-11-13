const sql = require('./db');

class ExpertByCourseName {

    constructor(expertId, firstName, lastName, email, description, photoUrl) {
        this.expertId = expertId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.description = description;
        this.photoUrl = photoUrl;
    }

    static fromExpertByCourseNameRow(expertByCourseNameRow) {
        return new ExpertByCourseName(
            expertByCourseNameRow.expert_id,
            expertByCourseNameRow.first_name,
            expertByCourseNameRow.last_name,
            expertByCourseNameRow.email,
            expertByCourseNameRow.description,
            expertByCourseNameRow.photoUrl)
    }

    static fromReqBody(reqBody) {
        return new ExpertByCourseName(
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
ExpertByCourseName.fetchExpertByCourseName = (courseName, result) => {
    let q = "SELECT e.expert_id, e.first_name, e.last_name, e.email, e.description, e.photo_url FROM experts e JOIN courses c JOIN expert_courses ec ON e.expert_id = ec.expert_id AND ec.course_id = c.course_id WHERE c.name = ?";
    sql.query(q,
            [courseName],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log(res);
                var expertByCourseNameArr = [];
                res.forEach(expertByCourseNameRow => expertByCourseNameArr.push(ExpertByCourseName.fromExpertByCourseNameRow(expertByCourseNameRow)));
                console.log("expertByCourseName:");
                console.log(expertByCourseNameArr);
                result(null, expertByCourseNameArr);
                return;
            }


            result({kind: "not_found"}, null);
        });
};

module.exports = ExpertByCourseName;

