import React, { useState } from "react";
import { InputGroup, Button, FormControl, Form } from "react-bootstrap";
import { customFetch } from "./Helpers";
import { useHistory } from "react-router-dom";

/* TODO: retrieve all skills (and skill ids) from db, provide dropdown or
 * autocomplete for skill name entry, change handleSubmit to submit expertId
 * and skillIds to /expertSkills endpoint */
export default function RegSkills(props) {
  let history = useHistory();
  const [fields, setFields] = useState([
    { name: "", description: "", years: "" },
  ]);

  function addSkill() {
    setFields([...fields, { name: "", description: "", years: "" }]);
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

  async function handleSubmit() {
    let payload = fields;
    payload.forEach((element, index) => {
      if (element.name === "") {
        payload.splice(index, 1);
      }
    });
    console.log("the payload is: ", JSON.stringify(payload));
    // let response = await customFetch(
    //   "http://localhost:6997/expertSkills",
    //   "POST",
    //   payload
    // );
    history.push({
      pathname: "/register3",
      state: { expertId: props.history.location.state.expertId },
    });
  }

  return (
    <>
      {fields.map((val, idx) => {
        const nameId = `name-${idx}`;
        const descId = `description-${idx}`;
        const yearsId = `years-${idx}`;
        return (
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
                value={fields[idx].name}
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
                value={fields[idx].description}
                onChange={handleChange}
              />
              <Form.Control
                as="select"
                name={yearsId}
                data-idx={idx}
                id={yearsId}
                className="years"
                value={fields[idx].years}
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
        );
      })}
            <Button variant="primary" onClick={handleSubmit}>
              Next
            </Button>
    </>
  );
}
