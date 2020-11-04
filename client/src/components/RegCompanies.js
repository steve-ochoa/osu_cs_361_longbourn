import React, { useState, useEffect } from "react";
import { customFetch } from "./Helpers";
import { Urls } from "../data/Constants";
import Autosuggest from "react-autosuggest";
import { InputGroup, Form, FormControl, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function RegCompanies(props) {
  let history = useHistory();
  const expertId = props.history.location.state.expertId;
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

  console.log(`expert id is: ${expertId}`);
  useEffect(() => {
    async function fetchData() {
      const companiesList = await customFetch(Urls.Local + "companies");
      console.log(`companies data is: ${companiesList}`);
      setCompaniesList(companiesList);
    }
    fetchData();
  }, []);

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
    console.log("the list of fields is: ", JSON.stringify(updatedFields));
    let payload = [];
    /* payload format:  { expertId, companyId, current, employedYears, position } */

    updatedFields.forEach(async (element) => {
      let result = companiesList.find((object) => object.name === element.name);
      if (result) {
        /* if found, append object to the payload */
        let payload_obj = {
          expertId: expertId,
          companyId: result.companyId,
          current: element.current,
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
          Urls.Local + "companies",
          "POST",
          req_body
        );
        let payload_obj = {
          expertId: expertId,
          companyId: response.companyId,
          current: element.current,
          employedYears: element.years,
          position: element.position,
        };
        payload.push(payload_obj);
      }
    });
    console.log("step 1 complete, payload is: ", payload);

    /* step 2: create the expertCompanies relationships */
    payload.forEach(async (element) => {
      let response = await customFetch(
        Urls.Local + "expertCompanies",
        "POST",
        element
      );
      console.log(response);
    });
    history.push({
      pathname: `/profile/${expertId}`,
    });
  }

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
    // updatedFields[idx]["name"] = suggestion.name;
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
    // updatedFields[idx]["name"] = suggestion.name;
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
        );
      })}
      <Button variant="primary" onClick={handleSubmit}>
        Next
      </Button>
    </>
  );
}
