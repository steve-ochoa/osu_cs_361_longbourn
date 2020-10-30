import React from "react";
import { Container, Button } from "react-bootstrap";

function LandingPage() {
    return (
        <>
            <Container className="center" fluid="md" style={{ textAlign: "center", marginTop: "20%" }}>
                <h1>Expert Finderrr</h1>
                <p>Find contact information for experts in an area of knowledge or skill you specify. Share your areas of expertise with others.</p>
                <Button variant="primary" size="lg" href="/Search">Find Your Expert</Button>
            </Container>
        </>
    );
}

export default LandingPage;