const sql = require('./db');

class ExpertCourse {
	constructor(expertId, courseId, name, description, term, grade){
		this.expertId = expertId;
		this.courseId = courseId;
		this.name = name;
		this.description = description;
		this.term = term;
		this.grade = grade;
	}

	static fromReqBody(reqBody){
		return new ExpertCourse(
			reqBody.expertId,
			reqBody.courseId,
			reqBody.name,
			reqBody.description,
			reqBody.term,
			reqBody.grade
			)
	}

	static fromExpertCourseRow(expertCourseRow){
		return new ExpertCourse(
			expertCourseRow.expertId,
			expertCourseRow.courseId,
			expertCourseRow.name,
			expertCourseRow.description,
			expertCourseRow.term,
			expertCourseRow.grade
			)
	}
}

class ExpertCourseDbDto {
	constructor (expertCourse) {
		this.expert_id = expertCourse.expertId;
		this.course_id = expertCourse.courseId;
		this.term = expertCourse.term;
		this.grade = expertCourse.grade;
	}
}
/*
ManyToMany Experts<->Courses relationship table INSERT.

We should never overwrite an Expert's fields nor a Courses's fields from this query.

Instead only INSERT records into the relationship table to assign
Courses<->Experts.
 */

ExpertCourse.create = (newExpertCourse, result) => {
	let expertCourseDbDto = new ExpertCourseDbDto(newExpertCourse);
	console.log('Creating new ExpertCourse:');
	console.log(expertCourseDbDto);

	sql.query('INSERT INTO expert_courses (expert_course_id, expert_id, course_id, term, grade) VALUES (?,?,?,?,?)',
		[0, expertCourseDbDto.expert_id, expertCourseDbDto.course_id, expertCourseDbDto.term, expertCourseDbDto.grade],
		(err, res) => {
			if (err){
				console.log("error: ", err);
				result(err, null);
				return;
			}

			console.log("Created ExpertCourse: ", newExpertCourse);
			result(null, newExpertCourse)
		});

};

ExpertCourse.fetchByExpertId = (expertId, result) => {
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

			result({kind: "not_found"}, null)
		});
		
};

module.exports = ExpertCourse;


