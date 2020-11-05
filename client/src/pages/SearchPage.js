import React from "react";
import { Container, Form, Button } from "react-bootstrap";

function SearchPage() {
    return (
        <Container className="center" fluid="md" style={{ textAlign: "center", marginTop: "20%" }}>
            <h3>What skill or area of knowledge do you need help with?</h3>
            <Form action="flip3.engr.oregonstate.edu/experts" method="POST">
                <Form.Control size="lg" type="text" placeholder="E.g., Python, Object-oriented programming, etc." />
                <div key="inline" className="mb-3">
                    <Form.Check inline type="radio" name="search" label="Skill" value="Skill" checked />
                    <Form.Check inline type="radio" name="search" label="Course" value="Course" />
                    <Form.Check inline type="radio" name="search" label="Companies" value="Company" /> 
                    add later if we have time*/}
                </div>
            </Form>
            <Button variant="primary" size="lg" type="submit">Find Your Expert</Button>
        </Container>
    );
}

export default SearchPage;