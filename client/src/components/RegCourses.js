import React, { useState, useEffect } from "react";
import { InputGroup, Button, FormControl, Form } from "react-bootstrap";
import { customFetch } from "./Helpers";
import { useHistory } from "react-router-dom";
import Select from "react-select";

export default function RegCourses(props) {
  const history = useHistory();
  const [courseList, setCourseList] = useState([]);
  const [fields, setFields] = useState([
    { name: "", description: "", semester: "", year: "", grade: "" },
  ]);

  /* first, retrieve a list of all the available courses */
  useEffect(() => {
    async function fetchData() {
      const courses = await customFetch(
        process.env.REACT_APP_BASE_URL + "courses"
      );
      // console.log(`course data is: ${courses}`);
      setCourseList(courses);
    }
    fetchData();
  }, []);

  const options = [];
  courseList.forEach((element) => {
    let to_add = {};
    let element_label = element.courseNumber;
    element_label += ` - ${element.name}`;
    to_add.label = element_label;
    to_add.value = element.courseId;
    options.push(to_add);
  });

  function addCourse() {
    setFields([
      ...fields,
      { id: "", name: "", description: "", semester: "", year: "", grade: "" },
    ]);
  }

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

  /* payload requires: expertId, courseId, name, desc, term, grade */
  async function handleSubmit() {
    let payload_builder = fields;
    payload_builder.forEach((element, index) => {
      if (element.name === "") {
        payload_builder.splice(index, 1);
      }
    });
    // console.log("the payload so far is: ", JSON.stringify(payload_builder));

    /* combine semester and year into term */
    let payload = [];
    payload_builder.forEach((element) => {
      let to_add = {};
      to_add.expertId = props.history.location.state.expertId;
      to_add.courseId = element.id;
      to_add.name = element.name.split(" - ")[1];
      to_add.description = element.description;
      to_add.term = `${element.semester} ${element.year}`;
      to_add.grade = element.grade;
      payload.push(to_add);
    });
    console.log(`the real payload is ${JSON.stringify(payload)}`);

    payload.forEach(async (element) => {
      let response = await customFetch(
        process.env.REACT_APP_BASE_URL + "expertCourses",
        "POST",
        element
      );
      console.log(response);
    });

    history.push({
      pathname: "/register4",
      state: { expertId: props.history.location.state.expertId },
    });
  }

  // function descFromId(id) {
  //   const element = courseList.find((obj) => {obj.courseId === id})
  //   return element.description
  // }

  return (
    <>
      {fields.map((val, idx) => {
        const nameId = `name-${idx}`;
        const semesterId = `term-${idx}`;
        const yearId = `term-${idx}`;
        const gradeId = `grade-${idx}`;
        return (
          <div key={`course-${idx}`}>
            <br />
            <Select
              aria-label="Course Name"
              name={nameId}
              data-idx={idx}
              id={nameId}
              className="name"
              // value={fields[idx].name}
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
                <option>Fall</option>
                <option>Winter</option>
                <option>Spring</option>
                <option>Summer</option>
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
                <option>2000</option>
                <option>2001</option>
                <option>2002</option>
                <option>2003</option>
                <option>2004</option>
                <option>2005</option>
                <option>2006</option>
                <option>2007</option>
                <option>2008</option>
                <option>2009</option>
                <option>2011</option>
                <option>2012</option>
                <option>2013</option>
                <option>2014</option>
                <option>2015</option>
                <option>2016</option>
                <option>2017</option>
                <option>2018</option>
                <option>2019</option>
                <option>2020</option>
                <option>2021</option>
                <option>2022</option>
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
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
                <option>F</option>
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
