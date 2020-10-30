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
      <ExpertResultsPage />
    </>
  );
}

export default App;
