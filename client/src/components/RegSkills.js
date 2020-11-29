import React, {useState, useEffect} from "react";
import {customFetch} from "./Helpers";
import Autosuggest from "react-autosuggest";
import {InputGroup, Form, Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {ExperienceYears} from "../data/Constants";

/* 2nd page of registration form, allows entry of expert skills */
export default function RegSkills(props) {
    let history = useHistory();
    const [skillsList, setSkillsList] = useState([]);
    const [nameSuggestions, setNameSuggestions] = useState([]);
    const [descSuggestions, setDescSuggestions] = useState([]);
    const [fields, setFields] = useState([
        {name: "", description: "", years: ""},
    ]);

    useEffect(() => {
        /* retrieves all skills tracked by db on page load */
        async function fetchData() {
            const skillsList = await customFetch(
                process.env.REACT_APP_BASE_URL + "skills"
            );
            setSkillsList(skillsList);
        }

        fetchData();
    }, []);

    /* creates new, empty skill object and adds to state */
    function addSkill() {
        setFields([...fields, {name: "", description: "", years: ""}]);
    }

    /* change handlers */
    function handleChange(idx, event, newValue, className) {
        const updatedFields = [...fields];
        updatedFields[idx][className] = newValue;
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
        /* step 1: skill verification / skill creation: */
        for (const element of updatedFields) {
            let result = skillsList.find((object) => object.name === element.name);
            if (result) {
                /* if found, append object to the payload */
                let payload_obj = {
                    expertId: props.history.location.state.expertId,
                    skillId: result.skillId,
                    experienceYears: element.years,
                };
                payload.push(payload_obj);
            } else {
                /* if not found, add the skill to the db with post */
                let req_body = {name: element.name, description: element.description};
                let response = await customFetch(
                    process.env.REACT_APP_BASE_URL + "skills",
                    "POST",
                    req_body
                );
                let payload_obj = {
                    expertId: props.history.location.state.expertId,
                    skillId: response.skillId,
                    experienceYears: element.years,
                };
                payload.push(payload_obj);
            }
        }
        /* step 2: create the expertSkills relationships */
        for (const element of payload) {
            await customFetch(
                process.env.REACT_APP_BASE_URL + "expertSkills",
                "POST",
                element
            );
        }
        history.push({
            pathname: "/register3",
            state: {expertId: props.history.location.state.expertId},
        });
    }

    /* autocomplete handlers */
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

    function onNameSuggestionsFetchRequested({value}) {
        setNameSuggestions(getSuggestions(value));
    }

    function onNameSuggestionsClearRequested() {
        setNameSuggestions([]);
    }

    function onNameSuggestionSelected(event, suggestion, idx) {
        const updatedFields = [...fields];
        updatedFields[idx]["description"] = suggestion.description;
        setFields(updatedFields);
    }

    function onDescSuggestionsFetchRequested({value}) {
        setDescSuggestions(getSuggestions(value));
    }

    function onDescSuggestionsClearRequested() {
        setDescSuggestions([]);
    }

    function onDescSuggestionSelected(event, suggestion, idx) {
        const updatedFields = [...fields];
        updatedFields[idx]["name"] = suggestion.name;
        setFields(updatedFields);
    }

    return (
        <>
            <head><title>Register Skills</title></head>
            <div className={'registerSkillsHeader'}>
                <h2>Add Skills</h2><br/>
                <p>Which tech skills do you have?<br/>
                    Add a tech skill by entering the technology name (e.g. "Python", or "Node.js") and selecting it from
                    the list. <br/>
                    Then select how many years of experience you have with this technology.<br/>
                    Click "Next" when you're done adding Skills.
                </p>
                <br/>
            </div>
            {fields.map((val, idx) => {
                const nameId = `name-${idx}`;
                const descId = `description-${idx}`;
                const yearsId = `years-${idx}`;
                const nameInputProps = {
                    placeholder: "Skill Name",
                    "aria-label": "Skill Name",
                    "aria-describedby": "basic-addon2",
                    name: nameId,
                    "data-idx": idx,
                    id: nameId,
                    className: "name",
                    value: fields[idx].name,
                    onChange: (e, {newValue}) => {
                        handleChange(idx, e, newValue, "name");
                    },
                };

                const descInputProps = {
                    placeholder: "Skill Description",
                    "aria-label": "Skill Description",
                    "aria-describedby": "basic-addon2",
                    name: descId,
                    "data-idx": idx,
                    id: descId,
                    className: "description",
                    value: fields[idx].description,
                    onChange: (e, {newValue}) => {
                        handleChange(idx, e, newValue, "description");
                    },
                };
                return (
                    <div key={`skill-${idx}`}>
                        <InputGroup>
                            <Autosuggest
                                suggestions={nameSuggestions}
                                onSuggestionsFetchRequested={onNameSuggestionsFetchRequested}
                                onSuggestionsClearRequested={onNameSuggestionsClearRequested}
                                onSuggestionSelected={(e, {suggestion}) => {
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
                                onSuggestionSelected={(e, {suggestion}) => {
                                    onDescSuggestionSelected(e, suggestion, idx);
                                }}
                                getSuggestionValue={getSuggestionDesc}
                                renderSuggestion={renderSuggestion}
                                inputProps={descInputProps}
                            />
                            <Form.Control
                                as="select"
                                name={yearsId}
                                data-idx={idx}
                                id={yearsId}
                                className="years"
                                value={fields[idx].years}
                                onChange={(e) => {
                                    handleChange(idx, e, e.target.value, "years");
                                }}
                            >
                                <option value="">Years of Experience</option>
                                {ExperienceYears.map((year) => {
                                    return (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    );
                                })}
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
