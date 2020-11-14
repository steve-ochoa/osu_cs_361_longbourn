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
