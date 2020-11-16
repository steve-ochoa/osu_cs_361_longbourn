const ExpertCourseDao = require('../daos/expert_course_dao');

/*
Create Course
*/
exports.create = (expertCourse, res) => {
    ExpertCourseDao.create(expertCourse, res);
};

/*
Find Courses(s) by ExpertId
*/
exports.fetchByExpertId = (expertId, res) => {
    ExpertCourseDao.fetchByExpertId(expertId, res);
};