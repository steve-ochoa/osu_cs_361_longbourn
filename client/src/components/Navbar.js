import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export default function NavBar() {
  return (
    <>
      <Navbar expand="lg">
        <Navbar.Brand style={{ color: "#f6f5f5" }} href="/">Expert Finder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav variant="pills" className="mr-auto">
            <Nav.Link eventKey="1" style={{ color: "#f6f5f5" }} href="/">Home</Nav.Link>
            <Nav.Link eventKey="2" style={{ color: "#f6f5f5" }} href="/Search">Search</Nav.Link>
          </Nav>
          <Nav variant="pills">
            <Nav.Link eventKey="3" style={{ color: "#f6f5f5" }} href="/register1">Register A Friend</Nav.Link>
            <Nav.Link eventKey="4" style={{ color: "#f6f5f5" }} href="/register1">Register As An Expert</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
