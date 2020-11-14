const sql = require('./db');
const expertModels = require('../models/expert.model');
const Expert = expertModels.Expert;

/*
Experts By Course
 */
exports.fetchExpertsByCourseNumber = (courseNumber, result) => {
    let q = "SELECT e.expert_id, e.first_name, e.last_name, e.email, e.description, e.photo_url FROM experts e JOIN courses c JOIN expert_courses ec ON e.expert_id = ec.expert_id AND ec.course_id = c.course_id WHERE e.active=true AND c.course_number = ?";
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
                res.forEach(expertByCourseNumberRow => expertByCourseNumberArr.push(Expert.fromExpertDb(expertByCourseNumberRow)));
                console.log("expertByCourseNumber:");
                console.log(expertByCourseNumberArr);
                result(null, expertByCourseNumberArr);
                return;
            }

            result({kind: "not_found"}, null);
        });
};

exports.fetchExpertsByCourseId = (courseId, result) => {
    let q = "SELECT e.expert_id, e.first_name, e.last_name, e.email, e.description, e.photo_url FROM experts e JOIN courses c JOIN expert_courses ec ON e.expert_id = ec.expert_id AND ec.course_id = c.course_id WHERE e.active=true AND c.course_id = ?";
    sql.query(q,
        [courseId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                var expertsByCourseIdArr = [];
                res.forEach(expertsByCourseIdRow => expertsByCourseIdArr.push(Expert.fromExpertDb(expertsByCourseIdRow)));
                console.log("expertsByCourseId:");
                console.log(expertsByCourseIdArr);
                result(null, expertsByCourseIdArr);
                return;
            }

            result({kind: "not_found"}, null);
        });
};

exports.fetchExpertsByCourseName = (courseName, result) => {
    let q = "SELECT e.expert_id, e.first_name, e.last_name, e.email, e.description, e.photo_url FROM experts e JOIN courses c JOIN expert_courses ec ON e.expert_id = ec.expert_id AND ec.course_id = c.course_id WHERE e.active=true AND c.name = ?";
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
                res.forEach(expertByCourseNameRow => expertByCourseNameArr.push(Expert.fromExpertDb(expertByCourseNameRow)));
                console.log("expertByCourseName:");
                console.log(expertByCourseNameArr);
                result(null, expertByCourseNameArr);
                return;
            }

            result({kind: "not_found"}, null);
        });
};
