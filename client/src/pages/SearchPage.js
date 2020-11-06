import React from "react";
import { Container } from "react-bootstrap";
import SearchForm from "../components/SearchForm";


function SearchPage() {

    return (
        <Container className="center" fluid="md" style={{ textAlign: "center", marginTop: "20%" }}>
            <h3 style={{ marginBottom: "1em" }}>What skill or area of knowledge do you need help with?</h3>
            <SearchForm />
        </Container>
    );
}

export default SearchPage