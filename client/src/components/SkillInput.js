import React from "react";
import { InputGroup, Button, FormControl, Form } from "react-bootstrap";

/* dynamic input form for expert skills */
export default function SkillInput({
  idx,
  skillState,
  handleChange,
  handleDelete,
  addSkill,
}) {
  const nameId = `name-${idx}`;
  const descId = `description-${idx}`;
  const yearsId = `years-${idx}`;

  return (
    <>
      <div key={`skill-${idx}`}>
        <InputGroup>
          <FormControl
            placeholder="Skill Name"
            aria-label="Skill Name"
            aria-describedby="basic-addon2"
            name={nameId}
            data-idx={idx}
            id={nameId}
            className="name"
            value={skillState[idx].name}
            onChange={handleChange}
          />

          <FormControl
            placeholder="Skill Description"
            aria-label="Skill Description"
            aria-describedby="basic-addon2"
            name={descId}
            data-idx={idx}
            id={descId}
            className="description"
            value={skillState[idx].description}
            onChange={handleChange}
          />
          <Form.Control
            as="select"
            name={yearsId}
            data-idx={idx}
            id={yearsId}
            className="years"
            value={skillState[idx].years}
            onChange={handleChange}
          >
            <option>Years of Experience</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6+</option>
          </Form.Control>
          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              onClick={() => handleDelete(idx)}
            >
              Remove
            </Button>
            <Button variant="outline-secondary" onClick={addSkill}>
              Add More
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    </>
  );
}
