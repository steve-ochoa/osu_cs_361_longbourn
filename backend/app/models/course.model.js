const sql = require('./db.js');

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

Course.create = (newCourse, result) => {
    let courseDbDto = new CourseDbDto(newCourse);
    console.log("Creating course:");
    console.log(courseDbDto);

    sql.query("INSERT INTO courses SET ?", courseDbDto, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        var newCourseResult = Course.fromNewCourseDbDto(res.insertId, courseDbDto);

        console.log("Created course: ", newCourseResult);
        result(null, newCourseResult);
    });
};

Course.fetchAll = result => {
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

module.exports = {
    Course, CourseDbDto
};