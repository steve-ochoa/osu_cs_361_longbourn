import React, { useState } from "react";
import { InputGroup, Button, FormControl, Form } from "react-bootstrap";

export default function CourseInput() {
  const [fields, setFields] = useState([
    { name: "", description: "", semester: "", year: "", grade: "" },
  ]);

  function addCourse() {
    setFields([...fields, { name: "", description: "", semester: "", year: "", grade: "" }]);
  }

  function handleChange(event) {
    const updatedFields = [...fields];
    updatedFields[event.target.dataset.idx][
      event.target.className.split(" ")[0]
    ] = event.target.value;
    setFields(updatedFields);
  }

  function handleDelete(idx) {
      const updatedFields = [...fields];
      updatedFields.splice(idx, 1);
      setFields(updatedFields);
  }

  return (
    <>
      {fields.map((val, idx) => {
        const nameId = `name-${idx}`;
        const descId = `description-${idx}`;
        const semesterId = `term-${idx}`;
        const yearId = `term-${idx}`;
        const gradeId = `grade-${idx}`;
        return (
          <div key={`course-${idx}`}>
            <InputGroup>
              <FormControl
                placeholder="Course Name"
                aria-label="Course Name"
                aria-describedby="basic-addon2"
                name={nameId}
                data-idx={idx}
                id={nameId}
                className="name"
                value={fields[idx].name}
                onChange={handleChange}
              />

              <FormControl
                placeholder="Course Description"
                aria-label="Course Description"
                aria-describedby="basic-addon2"
                name={descId}
                data-idx={idx}
                id={descId}
                className="description"
                value={fields[idx].description}
                onChange={handleChange}
              />
              <Form.Control
                as="select"
                name={semesterId}
                data-idx={idx}
                id={semesterId}
                className="semester"
                value={fields[idx].semester}
                onChange={handleChange}
              >
                <option>Semester</option>
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
                <option>Years</option>
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
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={() => handleDelete(idx)}>Remove</Button>
                <Button variant="outline-secondary" onClick={addCourse}>
                  Add More
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        );
      })}
    </>
  );
}
