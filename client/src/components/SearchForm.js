import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";


export default function SearchForm() {
    const history = useHistory();
    const [input, setInput] = useState('');
    const [radio, setRadio] = useState('skill');

    async function getCategoryData(route) {
        return (
            await axios.get(route).then(
                response => {
                    findCategoryId(response);
                }).catch(function (error) {
                    console.log(error);
                }));
    }

    function findCategoryId(category) {
        category.forEach(obj => {
            if (obj.name === input.toLowerCase()) {
                return obj.skillId;
            }
        });
    }

    const handleSubmit = () => {
        let id, category;

        if (radio === 'skill') {
            let skills = getCategoryData("http://flip3.engr.oregonstate.edu:6997/skills/");
            id = findCategoryId(skills);
            category = 'skill'
        }
        else if (radio === 'course') {
            let courses = getCategoryData("http://flip3.engr.oregonstate.edu:6997/courses/");
            id = findCategoryId(courses);
            category = 'course'
        }
        else {
            let companies = getCategoryData("http://flip3.engr.oregonstate.edu:6997/companies/");
            id = findCategoryId(companies);
            category = 'company'
        }

        history.push({
            pathname: '/results',
            state: { id, category }
        });
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Control
                    size="lg"
                    type="text"
                    placeholder="E.g., Python, Object-oriented programming, etc."
                    style={{ marginBottom: "1em" }}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <div key="inline" className="mb-3">
                    <Form.Check
                        inline type="radio"
                        name="search"
                        label="Skill"
                        value='skill'
                        onChange={e => setRadio(e.target.value)}
                        checked
                    />
                    <Form.Check
                        inline type="radio"
                        name="search"
                        label="Course"
                        value='course'
                        onChange={e => setRadio(e.target.value)}
                    />
                    <Form.Check
                        inline type="radio"
                        name="search"
                        label="Company"
                        value='company'
                        onChange={e => setRadio(e.target.value)}
                    />
                </div>
                <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    style={{ marginTop: "1em" }}>
                    Find Your Expert
                </Button>
            </Form>
        </>
    )

}