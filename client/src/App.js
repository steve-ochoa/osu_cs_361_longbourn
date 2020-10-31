import React from "react";
import NavBar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import RegBasics from "./components/RegBasics";
import SearchPage from "./pages/SearchPage";
import Profile from "./pages/Profile";
import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ExpertResultsPage from "./pages/ExpertResultsPage";
import RegSkills from "./components/RegSkills";
import RegCourses from "./components/RegCourses";
import RegCompanies from "./components/RegCompanies";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Container
          className="center"
          fluid="md"
          style={{ textAlign: "center", marginTop: "20%" }}
        >
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/register1" component={RegBasics} />
            <Route exact path="/register2" component={RegSkills} />
            <Route exact path="/register3" component={RegCourses} />
            <Route exact path="/register4" component={RegCompanies} />
            <Route exact path="/results" component={ExpertResultsPage} />
            <Route exact path="/search" component={SearchPage} />
            <Route path="/profile/:expertId" component={Profile} />
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
