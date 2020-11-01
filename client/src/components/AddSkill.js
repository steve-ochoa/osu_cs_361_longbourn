import React, { useState, useEffect } from "react";
import { customFetch } from "./Helpers";
import { Urls } from "../data/Constants";
import Autosuggest from "react-autosuggest";
import { InputGroup, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

/* TODO: input validation to prevent adding duplicate skills */
export default function AddSkill(props) {
  let history = useHistory();
  const [skillsList, setSkillsList] = useState([]);
  const [inputState, setInputState] = useState({
    name: "",
    description: "",
    experienceYears: "",
  });
  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [descSuggestions, setDescSuggestions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const skillsList = await customFetch(Urls.Local + "skills");
      console.log(`skills data is: ${skillsList}`);
      setSkillsList(skillsList);
    }
    fetchData();
  }, []);

  function handleChange(event, newValue, targetName) {
    const updatedInputState = [...inputState];
    updatedInputState[targetName] = newValue;
    setInputState(updatedInputState);
  }

  async function handleSubmit() {
    return;
  }

  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    const regex = new RegExp("^" + escapedValue, "i");
    return skillsList.filter(
      (skill) => regex.test(skill.name) || regex.test(skill.description)
    );
  }

  function getSuggestionName(suggestion) {
    return suggestion.name;
  }

  function getSuggestionDesc(suggestion) {
    return suggestion.description;
  }

  function renderSuggestion(suggestion) {
    return (
      <span>
        {suggestion.name} - {suggestion.description}
      </span>
    );
  }

  function onNameSuggestionsFetchRequested({ value }) {
    setNameSuggestions(getSuggestions(value));
  }

  function onNameSuggestionsClearRequested() {
    setNameSuggestions([]);
  }

  function onNameSuggestionSelected(event, suggestion) {
    const updatedInputState = [...inputState];
    updatedInputState["description"] = suggestion.description;
    setInputState(updatedInputState);
  }

  function onDescSuggestionsFetchRequested({ value }) {
    setDescSuggestions(getSuggestions(value));
  }

  function onDescSuggestionsClearRequested() {
    setDescSuggestions([]);
  }

  function onDescSuggestionSelected(event, suggestion, idx) {
    const updatedInputState = [...inputState];
    updatedInputState["name"] = suggestion.name;
    setInputState(updatedInputState);
  }

  const nameInputProps = {
    placeholder: "Skill Name",
    "aria-label": "Skill Name",
    "aria-describedby": "basic-addon2",
    name: "name",
    className: "name",
    value: inputState.name,
    onChange: (e, { newValue }) => {
      handleChange(e, newValue, "name");
    },
  };

  const descInputProps = {
    placeholder: "Skill Description",
    "aria-label": "Skill Description",
    "aria-describedby": "basic-addon2",
    name: "description",
    className: "description",
    value: inputState.description,
    onChange: (e, { newValue }) => {
      handleChange(e, newValue, "description");
    },
  };

  return (
    <>
      <InputGroup>
        <Autosuggest
          suggestions={nameSuggestions}
          onSuggestionsFetchRequested={onNameSuggestionsFetchRequested}
          onSuggestionsClearRequested={onNameSuggestionsClearRequested}
          onSuggestionSelected={(e, { suggestion }) => {
            onNameSuggestionSelected(e, suggestion);
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
            onDescSuggestionSelected(e, suggestion);
          }}
          getSuggestionValue={getSuggestionDesc}
          renderSuggestion={renderSuggestion}
          inputProps={descInputProps}
        />
        <Form.Control
          as="select"
          name="years"
          className="years"
          value={inputState.years}
          onChange={(e) => {
            handleChange(e, e.target.value, "years");
          }}
        >
          <option>Years of Experience</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6+</option>
        </Form.Control>
      </InputGroup>
      <Button variant="primary" onClick={handleSubmit}>
        Add Skill!
      </Button>
    </>
  );
}
