import React from "react";
import { InputGroup, Button, FormControl, Form } from "react-bootstrap";

/* dynamic input form for expert companies */
export default function CompanyInput({
  idx,
  companyState,
  handleChange,
  handleDelete,
  addCompany,
}) {
  const nameId = `name-${idx}`;
  const descId = `description-${idx}`;
  const industryId = `industry-${idx}`;
  const currentId = `current-${idx}`;
  const positionId = `position-${idx}`;
  const yearsId = `years-${idx}`;

  return (
    <>
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
            value={companyState[idx].name}
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
            value={companyState[idx].description}
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
            value={companyState[idx].industry}
            onChange={handleChange}
          />

          <Form.Control
            as="select"
            name={currentId}
            data-idx={idx}
            id={currentId}
            className="current"
            value={companyState[idx].current}
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
            value={companyState[idx].position}
            onChange={handleChange}
          />
          <Form.Control
            placeholder="Years"
            name={yearsId}
            data-idx={idx}
            id={yearsId}
            className="years"
            value={companyState[idx].years}
            onChange={handleChange}
          ></Form.Control>
          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              onClick={() => handleDelete(idx)}
            >
              Remove
            </Button>
            <Button variant="outline-secondary" onClick={addCompany}>
              Add More
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    </>
  );
}
