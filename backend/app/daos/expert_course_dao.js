const sql = require('./db');


const expertCourseModels = require('../models/expert_course.model');
const ExpertCourse = expertCourseModels.ExpertCourse;
const ExpertCourseDb = expertCourseModels.ExpertCourseDbDto;


exports.create = (newExpertCourse, result) => {
    // using req.body rececived, create new ExpertCourseDb
    let expertCourseDB = new ExpertCourseDb(newExpertCourse);
    console.log("Inserting new expert_courses:");
    console.log(expertCourseDB);

    // connect to sql and crate new entry in database
    sql.getConnection(function (err, connection) {
        connection.beginTransaction(function (err) {

            connection.query('INSERT INTO expert_courses (expert_course_id, expert_id, course_id, term, grade) VALUES (?,?,?,?,?)',
            [0, expertCourseDB.expert_id, expertCourseDB.course_id, expertCourseDB.term, expertCourseDB.grade],
            (err, res) => {        
                    if (err) {
                        connection.rollback();
                        connection.release();
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }

                connection.commit();
                connection.release();
                console.log("New expert_courses inserted in DB: ", newExpertCourse);
                result(null, newExpertCourse);
            });
        })
    });


}


exports.fetchByExpertId = (expertId, result) => {
	sql.query("SELECT ec.expert_id, ec.course_id, c.name, c.description, ec.term, ec.grade FROM expert_courses ec " + 
		"JOIN courses c ON ec.course_id = c.course_id WHERE ec.expert_id = ?",
		[expertId],
		(err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

			if (res.length){
				var expertCoursesArr = [];
				res.forEach(expertCourseRow => expertCoursesArr.push(ExpertCourse.fromExpertCourseRow(expertCourseRow)));
				console.log("expertCourses:");
				console.log(expertCoursesArr);
				result(null, expertCoursesArr);
				return;
			}
            else
    			result({kind: "not_found"}, null)

    });
};


