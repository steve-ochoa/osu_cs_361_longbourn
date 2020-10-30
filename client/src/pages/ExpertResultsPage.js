import React from "react";
import Card from "../components/ExpertCard";
import { Container, } from "react-bootstrap";


function ExpertResultsPage() {
    
    return (
        <Container className="center" fluid="md" style={{ textAlign: "center", marginTop: "20%" }}>
            <Card />
        </Container>
    );
}

export default ExpertResultsPage;