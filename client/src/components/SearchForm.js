import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";


export default function SearchForm() {
    const [input, setInput] = useState('');
    const [radio, setRadio] = useState('skill');

    const handleSubmit = (event) => {

        if (radio === 'skill') {
            // skill route
            console.log("go to skills/" + input);
        }
        else if (radio === 'course') {
            // course route
            console.log("go to courses/" + input);
        }
        else {
            // company route
            console.log("go to company" + input);
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Control size="lg" type="text" placeholder="E.g., Python, Object-oriented programming, etc."
                    style={{ marginBottom: "1em" }} value={input} onChange={e => setInput(e.target.value)} />
                <div key="inline" className="mb-3">
                    <Form.Check inline type="radio" name="search" label="Skill" value='skill'
                        onChange={e => setRadio(e.target.value)} checked />
                    <Form.Check inline type="radio" name="search" label="Course" value='course'
                        onChange={e => setRadio(e.target.value)} />
                    <Form.Check inline type="radio" name="search" label="Company" value='company'
                        onChange={e => setRadio(e.target.value)} />
                </div>
                <Button variant="primary" size="lg" type="submit" style={{ marginTop: "1em" }}>Find Your Expert</Button>
            </Form>
        </>
    )

}