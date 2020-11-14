const sql = require('../daos/db');

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
			expertCourseRow.expert_id,
			expertCourseRow.course_id,
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




module.exports = {
	ExpertCourse, ExpertCourseDbDto
};

