import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { YearOptions, GradeOptions, SemesterOptions } from "../data/Constants";
import Select from "react-select";
import { customFetch } from "./Helpers";
import { useHistory } from "react-router-dom";

export default function AddCourse({ courseList, expertId }) {
  const history = useHistory();
  const [courseState, setCourseState] = useState({
    courseId: "",
    name: "",
    description: "",
    semester: "",
    year: "",
    grade: "",
  });

  const styles = {
    container: (base) => ({
      ...base,
      flex: 1,
    }),
  };

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

  function handleChange(event, className) {
    console.log(event);
    console.log(className);
    let updatedCourseState = { ...courseState };
    if (className.name === "name") {
      updatedCourseState["courseId"] = event.value;
      updatedCourseState["name"] = event.label;
      let element = courseList.find((obj) => obj.courseId === event.value);
      updatedCourseState["description"] = element.description;
    } else {
      updatedCourseState[className.name] = event.value;
    }
    setCourseState(updatedCourseState);
  }

  async function handleSubmit() {
    let payload = {};
    payload.expertId = expertId;
    payload.courseId = courseState.courseId;
    payload.name = courseState.name.split(" - ")[1];
    payload.description = courseState.description;
    payload.term = `${courseState.semester} ${courseState.year}`;
    payload.grade = courseState.grade;

    let response = await customFetch(
      process.env.REACT_APP_BASE_URL + "expertCourses",
      "POST",
      payload
    );
    console.log(response);
    history.go(0);
  }

  return (
    <>
      <Select
        options={options}
        className="name"
        name="name"
        onChange={handleChange}
        styles={customStyles}
      />
      <Container style={{ width: "100%", display: "flex", flexFlow: "row" }}>
        <Select
          options={SemesterOptions}
          name="semester"
          className="semester"
          onChange={handleChange}
          styles={styles}
        />
        <Select
          options={YearOptions}
          name="year"
          className="year"
          onChange={handleChange}
          styles={styles}
        />
        <Select
          options={GradeOptions}
          name="grade"
          className="grade"
          onChange={handleChange}
          styles={styles}
        />
      </Container>
      <Button variant="primary" onClick={handleSubmit}>
        Add Course!
      </Button>
    </>
  );
}
