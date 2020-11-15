import Axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";


export default function SearchForm() {
    const history = useHistory();
    const [input, setInput] = useState('');
    const [radio, setRadio] = useState('skills');

    function handleSubmit() {
        history.push({
            pathname: '/results',
            state: { input, radio }
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
                        value='skills'
                        onChange={e => setRadio(e.target.value)}
                        checked
                    />
                    <Form.Check
                        inline type="radio"
                        name="search"
                        label="Course"
                        value='courses'
                        onChange={e => setRadio(e.target.value)}
                    />
                    <Form.Check
                        inline type="radio"
                        name="search"
                        label="Company"
                        value='companies'
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