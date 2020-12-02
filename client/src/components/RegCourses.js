import React, { useState, useEffect } from "react";
import { InputGroup, Button, Form } from "react-bootstrap";
import { customFetch } from "./Helpers";
import { useHistory, useLocation } from "react-router-dom";
import Select from "react-select";
import { Semesters, Grades, Years } from "../data/Constants";

/* 3rd page of registration form, allows entry of expert OSU coursework */
export default function RegCourses(props) {
  const history = useHistory();
  const location = useLocation();
  const [courseList, setCourseList] = useState([]);
  const [fields, setFields] = useState([
    { name: "", description: "", semester: "", year: "", grade: "" },
  ]);

  useEffect(() => {
    /* retrieves all courses tracked by the db on page load */
    async function fetchData() {
      const courses = await customFetch(
        process.env.REACT_APP_BASE_URL + "courses"
      );
      setCourseList(courses);
    }

    fetchData();
  }, []);

  /* black styles for react-select dropdowns */
  const customStyles = {
    option: (provided) => ({
      ...provided,
      color: "black",
    }),
    control: (provided) => ({
      ...provided,
      color: "black",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black",
    }),
  };

  const options = [];
  courseList.forEach((element) => {
    let to_add = {};
    let element_label = element.courseNumber;
    element_label += ` - ${element.name}`;
    to_add.label = element_label;
    to_add.value = element.courseId;
    options.push(to_add);
  });

  /* creates new empty course object and adds it to state */
  function addCourse() {
    setFields([
      ...fields,
      { id: "", name: "", description: "", semester: "", year: "", grade: "" },
    ]);
  }

  /* change handlers */
  function handleChange(event) {
    const updatedFields = [...fields];
    updatedFields[event.target.dataset.idx][
      event.target.className.split(" ")[0]
    ] = event.target.value;
    setFields(updatedFields);
  }

  function handleSelectChange(event, idx) {
    console.log(event);
    const updatedFields = [...fields];
    updatedFields[idx]["name"] = event.label;
    updatedFields[idx]["id"] = event.value;
    let element = courseList.find((obj) => obj.courseId === event.value);
    updatedFields[idx]["description"] = element.description;
    setFields(updatedFields);
  }

  function handleDelete(idx) {
    const updatedFields = [...fields];
    updatedFields.splice(idx, 1);
    setFields(updatedFields);
  }

  async function handleSubmit() {
    let payload_builder = fields;
    if (payload_builder.length === 1 && location.pathname === "/register3") {
      if (
        payload_builder[0].name === "" &&
        payload_builder[0].description === "" &&
        payload_builder[0].semester === "" &&
        payload_builder[0].year === "" &&
        payload_builder[0].grade === ""
      ) {
        history.push({
          pathname: "/register4",
          state: { expertId: props.history.location.state.expertId },
        });
        return;
      }
    }
    for (const element of payload_builder) {
      if (
        element.name === "" ||
        element.description === "" ||
        element.semester === "" ||
        element.year === "" ||
        element.grade === ""
      ) {
        alert("All fields are required!");
        return;
      }
    }
    let payload = [];
    payload_builder.forEach((element) => {
      let to_add = {};
      to_add.expertId = props.history.location.state.expertId;
      to_add.courseId = element.id;
      to_add.name = element.name.split(" - ")[1];
      to_add.description = element.description;
      /* combine semester and year into term */
      to_add.term = `${element.semester} ${element.year}`;
      to_add.grade = element.grade;
      payload.push(to_add);
    });
    payload.forEach(async (element) => {
      let response = await customFetch(
        process.env.REACT_APP_BASE_URL + "expertCourses",
        "POST",
        element
      );
    });
    history.push({
      pathname: "/register4",
      state: { expertId: props.history.location.state.expertId },
    });
  }

  return (
    <>
      <head>
        <title>Register Course</title>
      </head>
      <div className={"registerCoursesHeader"}>
        <h2>Add Courses</h2>
        <br />
        <p>
          Which university courses have you passed?
          <br />
          Add a course by entering the course number (e.g. "CS361", or "CS372")
          and selecting it from the list. <br />
          You can also add a course by selecting it from the dropdown list.{" "}
          <br />
          <br />
          Then select the semester, year, and grade from the lists.
          <br />
          Click "Next" when you're done adding Courses.
        </p>
        <br />
      </div>
      {fields.map((val, idx) => {
        const nameId = `name-${idx}`;
        const semesterId = `term-${idx}`;
        const yearId = `term-${idx}`;
        const gradeId = `grade-${idx}`;
        return (
          <div key={`course-${idx}`}>
            <br />
            <Select
              styles={customStyles}
              aria-label="Course Name"
              name={nameId}
              data-idx={idx}
              id={nameId}
              className="name"
              onChange={(event) => handleSelectChange(event, idx)}
              options={options}
            />
            <Form.Text className="text-muted">
              {fields[idx].description}
            </Form.Text>
            <InputGroup>
              <Form.Control
                as="select"
                name={semesterId}
                data-idx={idx}
                id={semesterId}
                className="semester"
                value={fields[idx].semester}
                onChange={handleChange}
              >
                <option value="">Semester</option>
                {Semesters.map((semester) => {
                  return (
                    <option key={semester} value={semester}>
                      {semester}
                    </option>
                  );
                })}
              </Form.Control>
              <Form.Control
                as="select"
                name={yearId}
                data-idx={idx}
                id={yearId}
                className="year"
                value={fields[idx].year}
                onChange={handleChange}
              >
                <option value="">Years</option>
                {Years.map((year) => {
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </Form.Control>
              <Form.Control
                as="select"
                name={gradeId}
                data-idx={idx}
                id={gradeId}
                className="grade"
                value={fields[idx].grade}
                onChange={handleChange}
              >
                <option value="">Grade</option>
                {Grades.map((grade) => {
                  return (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  );
                })}
              </Form.Control>
              <InputGroup.Append>
                <Button
                  variant="outline-secondary"
                  onClick={() => handleDelete(idx)}
                >
                  Remove
                </Button>
                <Button variant="outline-secondary" onClick={addCourse}>
                  Add More
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        );
      })}
      <Button variant="primary" onClick={handleSubmit}>
        Next
      </Button>
    </>
  );
}
