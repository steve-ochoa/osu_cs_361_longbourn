import React from "react";
import NavBar from "./components/Navbar";
import "./App.css";
import { Container } from "react-bootstrap";
import RegForm from "./components/RegForm";

function App() {
  return (
    <>
      <NavBar />
      <Container
        className="center"
        fluid="md"
        style={{ textAlign: "center", marginTop: "20%" }}
      >
        <h1>Expert Finderrr</h1>
      </Container>
    </>
  );
}

export default App;
