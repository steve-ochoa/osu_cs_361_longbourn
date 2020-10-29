import React, { useState } from "react";
import { InputGroup, Button, FormControl, Form } from "react-bootstrap";

export default function CompanyInput() {
  const [fields, setFields] = useState([
    {
      name: "",
      description: "",
      industry: "",
      current: false,
      position: "",
      years: "",
    },
  ]);

  function addCourse() {
    setFields([
      ...fields,
      {
        name: "",
        description: "",
        industry: "",
        current: false,
        position: "",
        years: "",
      },
    ]);
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
        const industryId = `industry-${idx}`;
        const currentId = `current-${idx}`;
        const positionId = `position-${idx}`;
        const yearsId = `years-${idx}`;
        return (
          <div key={`course-${idx}`}>
            <InputGroup>
              <FormControl
                placeholder="Company Name"
                aria-label="Company Name"
                aria-describedby="basic-addon2"
                name={nameId}
                data-idx={idx}
                id={nameId}
                className="name"
                value={fields[idx].name}
                onChange={handleChange}
              />

              <FormControl
                placeholder="Company Description"
                aria-label="Company Description"
                aria-describedby="basic-addon2"
                name={descId}
                data-idx={idx}
                id={descId}
                className="description"
                value={fields[idx].description}
                onChange={handleChange}
              />
              <FormControl
                placeholder="Industry"
                aria-label="Industry"
                aria-describedby="basic-addon2"
                name={industryId}
                data-idx={idx}
                id={industryId}
                className="industry"
                value={fields[idx].description}
                onChange={handleChange}
              />

              <Form.Control
                as="select"
                name={currentId}
                data-idx={idx}
                id={currentId}
                className="current"
                value={fields[idx].current}
                onChange={handleChange}
              >
                <option>Current?</option>
                <option>Yes</option>
                <option>No</option>
              </Form.Control>
              <FormControl
                placeholder="Position"
                aria-label="Position"
                aria-describedby="basic-addon2"
                name={positionId}
                data-idx={idx}
                id={positionId}
                className="position"
                value={fields[idx].position}
                onChange={handleChange}
              />
              <Form.Control
                name={yearsId}
                value="number"
                data-idx={idx}
                id={yearsId}
                className="years"
                value={fields[idx].years}
                onChange={handleChange}
              >
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
    </>
  );
}
