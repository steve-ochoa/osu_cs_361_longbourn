import React from "react";
import { InputGroup, Button, FormControl, Form } from "react-bootstrap";

/* dynamic input form for expert courses */
export default function CourseInput({
  idx,
  courseState,
  handleChange,
  handleDelete,
  addCourse,
}) {
  const nameId = `name-${idx}`;
  const descId = `description-${idx}`;
  const semesterId = `term-${idx}`;
  const yearId = `term-${idx}`;
  const gradeId = `grade-${idx}`;
  return (
    <>
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
            value={courseState[idx].name}
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
            value={courseState[idx].description}
            onChange={handleChange}
          />
          <Form.Control
            as="select"
            name={semesterId}
            data-idx={idx}
            id={semesterId}
            className="semester"
            value={courseState[idx].semester}
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
            value={courseState[idx].year}
            onChange={handleChange}
          >
            <option>Year</option>
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
            value={courseState[idx].grade}
            onChange={handleChange}
          >
            <option>Grade</option>
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
    </>
  );
}
