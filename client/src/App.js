import React from "react";
import NavBar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import SearchPage from "./pages/SearchPage";
import ExpertResultsPage from "./pages/ExpertResultsPage";
import "./App.css";
import { Container, Button, Row } from "react-bootstrap";

function App() {
  return (
    <>
      <NavBar />
      <Container className="center" fluid="md" style={{ textAlign: "center", marginTop: "20%" }}>
          <h1>Expert Finderrr</h1>
      </Container>
    </>
  );
}

export default App;
