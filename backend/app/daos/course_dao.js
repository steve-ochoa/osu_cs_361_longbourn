const sql = require('./db');

const courseModels = require('../models/course.model');

const Course = courseModels.Course;
const CourseDbDto = courseModels.CourseDbDto;

exports.create = (newCourse, result) => {
    let courseDbDto = new CourseDbDto(newCourse);
    console.log("Creating course:");
    console.log(courseDbDto);

    sql.getConnection(function(err, connection) {

        connection.beginTransaction(function (err){

            connection.query("INSERT INTO courses SET ?", courseDbDto, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }

                connection.commit();
                connection.release();

                var newCourseResult = Course.fromNewCourseDbDto(res.insertId, courseDbDto);

                console.log("Created course: ", newCourseResult);
                result(null, newCourseResult);
            });
        });
    });
};

exports.fetchAll = result => {
    sql.query("SELECT * FROM courses", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        var coursesArray = [];
        res.forEach(courseDbDto => coursesArray.push(Course.fromCourseDbDto(courseDbDto)));
        console.log("courses: ", coursesArray);
        result(null, coursesArray);
    });
};

exports.updateById = (id, course, result) => {
    console.log(course.course_number);
    
    sql.getConnection(function(err, connection){

        connection.beginTransaction(function (err) {

            sql.query("UPDATE courses SET course_number=?,name=?,description=? WHERE course_id=?",
                [course.courseNumber, course.name, course.description, id],
                (err, res) => {
                    if(err){
                        console.log("error: ", err);
                        result(null, err);
                        return
                    }

                    if (res.affectedRows == 0){
                        result({kind : "not_found"}, null);
                        return;
                    }

                    console.log("updated course: ", {id: id, ...course});
                    result(null, {id: id, ...course});
                });
        });
    });
};
