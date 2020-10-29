import React from "react";
import NavBar from "./components/Navbar";
import "./App.css";
import { Container } from "react-bootstrap";
import RegForm from "./components/RegForm";

function App() {
  return (
    <>
      <NavBar />
      <Container fluid="lg" style={{ textAlign: "center" }}>
        {/* <h1>Expert Finderrr</h1> */}
        <RegForm />
      </Container>
    </>
  );
}

export default App;
