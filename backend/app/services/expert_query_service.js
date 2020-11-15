const ExpertQueryDao = require('../daos/expert_query_dao');

/*
Experts By Course
 */
exports.findExpertsByCourseId = (courseId, res) => {
    ExpertQueryDao.fetchExpertsByCourseId(courseId, res);
};

exports.findExpertsByCourseNumber = (courseNumber, res) => {
    ExpertQueryDao.fetchExpertsByCourseNumber(courseNumber, res);
};

exports.findExpertsByCourseName = (courseName, res) => {
    ExpertQueryDao.fetchExpertsByCourseName(courseName, res);
};

/*
Experts By Company
 */
exports.findExpertsByCompanyId = (companyId, res) => {
    ExpertQueryDao.fetchExpertsByCompanyId(companyId, res);
};

exports.findExpertsByCompanyName = (companyName, res) => {
    ExpertQueryDao.fetchExpertsByCompanyName(companyName, res);
};

exports.findExpertsByCompanyIndustry = (companyIndustry, res) => {
    ExpertQueryDao.fetchExpertsByCompanyIndustry(companyIndustry, res);
};


/*
Experts By Skill
 */
exports.findExpertsBySkillId = (skillId, res) => {
    ExpertQueryDao.fetchExpertsBySkillId(skillId, res);
};

exports.findExpertsBySkillName = (skillName, res) => {
    ExpertQueryDao.fetchExpertsBySkillName(skillName, res);
};
