const sql = require('./db');

class ExpertsByCourse {

    constructor(expertId, firstName, lastName, email, description, photoUrl) {
        this.expertId = expertId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.description = description;
        this.photoUrl = photoUrl;
    }

    static fromExpertsByCourseRow(expertsByCourseRow) {
        return new ExpertsByCourse(
            expertsByCourseRow.expert_id,
            expertsByCourseRow.first_name,
            expertsByCourseRow.last_name,
            expertsByCourseRow.email,
            expertsByCourseRow.description,
            expertsByCourseRow.photoUrl)
    }

    static fromReqBody(reqBody) {
        return new ExpertsByCourse(
            reqBody.expertId,
            reqBody.firstName,
            reqBody.lastname,
            reqBody.email,
            reqBody.description,
            reqBody.photoUrl
        )
    }
}

ExpertsByCourse.fetchExpertsByCourseId = (courseId, result) => {
    sql.query("SELECT e.expert_id, e.first_name, e.last_name, e.email, e.description, e.photo_url FROM experts e JOIN expert_courses ec ON e.expert_id = ec.expert_id WHERE ec.expert_course_id = ?",
        [courseId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                var expertsByCourseArr = [];
                res.forEach(expertsByCourseRow => expertsByCourseArr.push(ExpertsByCourse.fromExpertsByCourseRow(expertsByCourseRow)));
                console.log("expertsByCourse:");
                console.log(expertsByCourseArr);
                result(null, expertsByCourseArr);
                return;
            }


            result({kind: "not_found"}, null);
        });
};

module.exports = ExpertsByCourse;

