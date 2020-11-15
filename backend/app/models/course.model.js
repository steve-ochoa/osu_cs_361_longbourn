class Course {
    constructor(courseId, courseNumber, name, description) {
        this.courseId = courseId;
        this.courseNumber = courseNumber;
        this.name = name;
        this.description = description;
    }

    static fromReqBody(reqBody) {
        return new Course(
            reqBody.courseId,
            reqBody.courseNumber,
            reqBody.name,
            reqBody.description,
        )
    }

    static fromCourseDbDto(courseDbDto) {
        return new Course(
            courseDbDto.course_id,
            courseDbDto.course_number,
            courseDbDto.name,
            courseDbDto.description)
    }

    static fromNewCourseDbDto(courseId, newCourseDbDto) {
        return new Course(
            courseId,
            newCourseDbDto.course_number,
            newCourseDbDto.name,
            newCourseDbDto.description
        )
    }
}

class CourseDbDto {
    constructor(course) {
        this.course_id = course.courseId;
        this.course_number = course.courseNumber;
        this.name = course.name;
        this.description = course.description;
    }
}


module.exports = {
    Course, CourseDbDto
};