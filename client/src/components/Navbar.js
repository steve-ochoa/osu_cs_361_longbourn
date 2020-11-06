import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export default function NavBar() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Expert Finder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link href="/">Home</Nav.Link> */}
            <Nav.Link href="/Profile">Profile</Nav.Link>
            <Nav.Link href="/Search">Search</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/register1">Register A Friend</Nav.Link>
            <Nav.Link href="/register1">Register As An Expert</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
