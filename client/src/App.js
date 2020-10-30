import React from "react";
import NavBar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import SearchPage from "./pages/SearchPage";
import ExpertResultsPage from "./pages/ExpertResultsPage";
import "./App.css";
<<<<<<< HEAD
import { Container } from "react-bootstrap";
import RegForm from "./components/RegForm";
=======
import { Container, Button, Row } from "react-bootstrap";
>>>>>>> master

function App() {
  return (
    <>
      <NavBar />
<<<<<<< HEAD
      <Container
        className="center"
        fluid="md"
        style={{ textAlign: "center", marginTop: "20%" }}
      >
        <h1>Expert Finderrr</h1>
=======
      <Container className="center" fluid="md" style={{ textAlign: "center", marginTop: "20%" }}>
          <h1>Expert Finderrr</h1>
>>>>>>> master
      </Container>
    </>
  );
}

export default App;
