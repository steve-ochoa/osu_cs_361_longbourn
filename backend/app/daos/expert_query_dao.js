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


/*
Experts By Company
 */

exports.fetchExpertsByCompanyId = (companyId, result) => {
    let q = "SELECT e.expert_id, e.first_name, e.last_name, e.email, e.description, e.photo_url FROM experts e JOIN companies c JOIN expert_companies ec ON e.expert_id = ec.expert_id AND c.company_id = ec.company_id WHERE e.active=true AND c.company_id = ?";
    sql.query(q,
        [companyId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                var expertsByCompanyIdArr = [];
                res.forEach(expertsByCompanyIdRow => expertsByCompanyIdArr.push(Expert.fromExpertDb(expertsByCompanyIdRow)));
                console.log("expertsByCompanyId:");
                console.log(expertsByCompanyIdArr);
                result(null, expertsByCompanyIdArr);
                return;
            }

            result({kind: "not_found"}, null);
        });
};

 exports.fetchExpertsByCompanyName = (companyName, result) => {
        let q = "SELECT e.expert_id, e.first_name, e.last_name, e.email, e.description, e.photo_url FROM experts e JOIN companies c JOIN expert_companies ec ON e.expert_id = ec.expert_id AND c.company_id = ec.company_id WHERE e.active=true AND c.name = ?";
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
                res.forEach(expertByCompanyNameRow => expertByCompanyNameArr.push(Expert.fromExpertDb(expertByCompanyNameRow)));
                console.log("expertByCompanyName:");
                console.log(expertByCompanyNameArr);
                result(null, expertByCompanyNameArr);
                return;
            }

            result({kind: "not_found"}, null);
        });
};

exports.fetchExpertsByCompanyIndustry = (companyIndustry, result) => {
    let q = "SELECT e.expert_id, e.first_name, e.last_name, e.email, e.description, e.photo_url FROM experts e JOIN companies c JOIN expert_companies ec ON e.expert_id = ec.expert_id AND c.company_id = ec.company_id WHERE e.active=true AND c.industry = ?";
    sql.query(q,
    [companyIndustry],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log(res);
                var expertByCompanyIndustryArr = [];
                res.forEach(expertByCompanyIndustryRow => expertByCompanyIndustryArr.push(Expert.fromExpertDb(expertByCompanyIndustryRow)));
                console.log("expertByCompanyIndustry:");
                console.log(expertByCompanyIndustryArr);
                result(null, expertByCompanyIndustryArr);
                return;
            }

            result({kind: "not_found"}, null);
        });
};

/*
Experts By Skill
*/

exports.fetchExpertsBySkillId = (skillId, result) => {
    sql.query("SELECT e.expert_id, e.first_name, e.last_name, e.email, e.description, e.photo_url FROM experts e JOIN expert_skills es JOIN skills s  ON e.expert_id = es.expert_id AND s.skill_id = es.skill_id WHERE e.active=true AND s.skill_id = ?",
    [skillId],

        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                var expertsBySkillIdArr = [];
                res.forEach(expertsBySkillIdRow => expertsBySkillIdArr.push(Expert.fromExpertDb(expertsBySkillIdRow)));
                console.log("expertsBySkillId:");
                console.log(expertsBySkillIdArr);
                result(null, expertsBySkillIdArr);
                return;
            }
            result({kind: "not_found"}, null);
        });
};

exports.fetchExpertsBySkillName = (skillName, result) => {
    sql.query("SELECT e.expert_id, e.first_name, e.last_name, e.email, e.description, e.photo_url FROM experts e JOIN expert_skills es JOIN skills s  ON e.expert_id = es.expert_id AND s.skill_id = es.skill_id WHERE e.active=true AND s.name = ?",
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
                res.forEach(expertBySkillNameRow => expertBySkillNameArr.push(Expert.fromExpertDb(expertBySkillNameRow)));
                console.log("expertBySkillName:");
                console.log(expertBySkillNameArr);
                result(null, expertBySkillNameArr);
                return;
            }

            result({kind: "not_found"}, null);
        });
};

/*
Experts By Name
*/

exports.fetchExpertsByFirstName = (firstName, result) => {
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
                res.forEach(expertByFirstNameRow => expertByFirstNameArr.push(Expert.fromExpertDb(expertByFirstNameRow)));
                console.log("expertByFirstName:");
                console.log(expertByFirstNameArr);
                result(null, expertByFirstNameArr);
                return;
            }


            result({kind: "not_found"}, null);
        });
};

exports.fetchExpertsByLastName = (lastName, result) => {
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
                res.forEach(expertByLastNameRow => expertByLastNameArr.push(Expert.fromExpertDb(expertByLastNameRow)));
                console.log("expertByLastName:");
                console.log(expertByLastNameArr);
                result(null, expertByLastNameArr);
                return;
            }


            result({kind: "not_found"}, null);
        });
};

