import React from "react";
import NavBar from "./components/Navbar";
import "./App.css";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <NavBar />
      <Container fluid="lg" style={{textAlign: "center"}}>
        <h1>Expert Finderrr</h1>
      </Container>
    </>
  );
}

export default App;
