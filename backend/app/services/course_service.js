const CourseModel = require('../models/course.model.js');
const Course = CourseModel.Course;
const CourseDao = require('../daos/course_dao');


exports.create = (course, res) => {
    CourseDao.create(course, res);
};

exports.findAll = (res) => {
    CourseDao.fetchAll(res);
};

exports.update = (courseId, courseToUpdate, res) => {
    CourseDao.updateById(courseId, courseToUpdate, res);
};
