import React, { useState, useEffect } from "react";
import { customFetch } from "./Helpers";
import Autosuggest from "react-autosuggest";
import { InputGroup, Form, FormControl, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";

/* page 4 of registration form, allows input of expert company information */
export default function RegCompanies(props) {
  const history = useHistory();
  const location = useLocation();
  let expertId;
  if (location.pathname.split("/")[1] === "profile") {
    expertId = props.expertId;
  } else {
    expertId = props.history.location.state.expertId;
  }
  const [companiesList, setCompaniesList] = useState([]);
  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [descSuggestions, setDescSuggestions] = useState([]);
  const [industrySuggestions, setIndustrySuggestions] = useState([]);
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

  useEffect(() => {
    /* gets list of all companies tracked by the db on page load */
    async function fetchData() {
      const companiesList = await customFetch(
        process.env.REACT_APP_BASE_URL + "companies"
      );
      console.log(`companies data is: ${companiesList}`);
      setCompaniesList(companiesList);
    }
    fetchData();
  }, []);

  /* adds a new empty company to the fields state */
  function addCompany() {
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

  /* handler functions */
  function handleChange(idx, event, newValue, className) {
    const updatedFields = [...fields];
    updatedFields[idx][className] = newValue;
    setFields(updatedFields);
  }

  function handleChangeRegInputs(event) {
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
    let updatedFields = fields;
    updatedFields.forEach((element, index) => {
      if (element.name === "") {
        updatedFields.splice(index, 1);
      }
    });
    let payload = [];
    let processed_items = 0;
    for (const element of updatedFields) {
      let result = await companiesList.find(
        (object) => object.name === element.name
      );
      if (result) {
        /* if found, append object to the payload */
        let payload_obj = {
          expertId: expertId,
          companyId: result.companyId,
          current: element.current === "Yes" ? true : false,
          employedYears: element.years,
          position: element.position,
        };
        payload.push(payload_obj);
      } else {
        /* if not found, add the company to the db with post */
        let req_body = {
          companyId: "0",
          name: element.name,
          description: element.description,
          industry: element.industry,
        };
        let response = await customFetch(
          process.env.REACT_APP_BASE_URL + "companies",
          "POST",
          req_body
        );
        let payload_obj = {
          expertId: expertId,
          companyId: await response.companyId,
          current: element.current === "Yes" ? true : false,
          employedYears: element.years,
          position: element.position,
        };
        payload.push(payload_obj);
      }
    }
    /* create relationships */
    for (const element of payload) {
      let response = await customFetch(
        process.env.REACT_APP_BASE_URL + "expertCompanies",
        "POST",
        element
      );
    }
    /* redirect */
    if (location.pathname.split("/")[1] === "profile") {
      history.go(0);
    } else {
      history.push({
        pathname: `/profile/${expertId}`,
      });
    }
  }

  /* autocomplete handlers */
  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    const regex = new RegExp("^" + escapedValue, "i");
    return companiesList.filter(
      (skill) => regex.test(skill.name) || regex.test(skill.description)
    );
  }

  function getSuggestionName(suggestion) {
    return suggestion.name;
  }

  function getSuggestionDesc(suggestion) {
    return suggestion.description;
  }

  function getSuggestionIndustry(suggestion) {
    return suggestion.industry;
  }

  function renderSuggestion(suggestion) {
    return (
      <span>
        {suggestion.name} - {suggestion.description} ({suggestion.industry})
      </span>
    );
  }

  function onNameSuggestionsFetchRequested({ value }) {
    setNameSuggestions(getSuggestions(value));
  }

  function onNameSuggestionsClearRequested() {
    setNameSuggestions([]);
  }

  function onNameSuggestionSelected(event, suggestion, idx) {
    const updatedFields = [...fields];
    updatedFields[idx]["description"] = suggestion.description;
    updatedFields[idx]["industry"] = suggestion.industry;
    setFields(updatedFields);
  }

  function onDescSuggestionsFetchRequested({ value }) {
    setDescSuggestions(getSuggestions(value));
  }

  function onDescSuggestionsClearRequested() {
    setDescSuggestions([]);
  }

  function onDescSuggestionSelected(event, suggestion, idx) {
    const updatedFields = [...fields];
    setFields(updatedFields);
  }

  function onIndustrySuggestionsFetchRequested({ value }) {
    setIndustrySuggestions(getSuggestions(value));
  }

  function onIndustrySuggestionsClearRequested() {
    setIndustrySuggestions([]);
  }

  function onIndustrySuggestionSelected(event, suggestion, idx) {
    const updatedFields = [...fields];
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
        const nameInputProps = {
          placeholder: "Company Name",
          "aria-label": "Company Name",
          name: nameId,
          "data-idx": idx,
          id: nameId,
          className: "name",
          value: fields[idx].name,
          onChange: (e, { newValue }) => {
            handleChange(idx, e, newValue, "name");
          },
        };

        const descInputProps = {
          placeholder: "Company Description",
          "aria-label": "Company Description",
          name: descId,
          "data-idx": idx,
          id: descId,
          className: "description",
          value: fields[idx].description,
          onChange: (e, { newValue }) => {
            handleChange(idx, e, newValue, "description");
          },
        };

        const industryInputProps = {
          placeholder: "Industry",
          "aria-label": "Industry",
          name: industryId,
          "data-idx": idx,
          id: industryId,
          className: "industry",
          value: fields[idx].industry,
          onChange: (e, { newValue }) => {
            handleChange(idx, e, newValue, "industry");
          },
        };
        return (
          <div key={`skill-${idx}`}>
            <InputGroup>
              <Autosuggest
                suggestions={nameSuggestions}
                onSuggestionsFetchRequested={onNameSuggestionsFetchRequested}
                onSuggestionsClearRequested={onNameSuggestionsClearRequested}
                onSuggestionSelected={(e, { suggestion }) => {
                  onNameSuggestionSelected(e, suggestion, idx);
                }}
                getSuggestionValue={getSuggestionName}
                renderSuggestion={renderSuggestion}
                inputProps={nameInputProps}
              />
              <Autosuggest
                suggestions={descSuggestions}
                onSuggestionsFetchRequested={onDescSuggestionsFetchRequested}
                onSuggestionsClearRequested={onDescSuggestionsClearRequested}
                onSuggestionSelected={(e, { suggestion }) => {
                  onDescSuggestionSelected(e, suggestion, idx);
                }}
                getSuggestionValue={getSuggestionDesc}
                renderSuggestion={renderSuggestion}
                inputProps={descInputProps}
              />
              <Autosuggest
                suggestions={industrySuggestions}
                onSuggestionsFetchRequested={
                  onIndustrySuggestionsFetchRequested
                }
                onSuggestionsClearRequested={
                  onIndustrySuggestionsClearRequested
                }
                onSuggestionSelected={(e, { suggestion }) => {
                  onIndustrySuggestionSelected(e, suggestion, idx);
                }}
                getSuggestionValue={getSuggestionIndustry}
                renderSuggestion={renderSuggestion}
                inputProps={industryInputProps}
              />
            </InputGroup>
            <InputGroup>
              <Form.Control
                as="select"
                name={currentId}
                data-idx={idx}
                id={currentId}
                className="current"
                value={fields[idx].current}
                onChange={handleChangeRegInputs}
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
                onChange={handleChangeRegInputs}
              />
              <Form.Control
                placeholder="Years employed"
                type="number"
                name={yearsId}
                data-idx={idx}
                id={yearsId}
                className="years"
                value={fields[idx].years}
                onChange={handleChangeRegInputs}
              ></Form.Control>
              {location.pathname.split("/")[1] !== "profile" && (
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
              )}
            </InputGroup>
          </div>
        );
      })}
      <Button variant="primary" onClick={handleSubmit}>
        {location.pathname.split("/")[1] !== "profile"
          ? "Submit!"
          : "Add Company!"}
      </Button>
    </>
  );
}
