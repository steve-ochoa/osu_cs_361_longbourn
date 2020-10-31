import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { customFetch } from "./Helpers";
import { useHistory } from "react-router-dom";

/* TODO: input field validations, pagify registration form */
/* form allowing for the registration of new experts */
export default function RegBasics() {
  let history = useHistory();
  const [staticState, setStaticState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    description: "",
    photoUrl: "",
    city: "",
    phone: "",
    workEmail: "",
    schoolEmail: "",
    gitHubUser: "",
    linkedInUrl: "",
  });
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  async function handleSubmit() {
    if (
      staticState.firstName === "" ||
      staticState.lastName === "" ||
      staticState.email === "" ||
      staticState.city === "" ||
      staticState.phone === "" ||
      country === "" ||
      state === ""
    ) {
      alert("required fields missing!");
      return;
    }
    let contactDetails = {
      phone: staticState.phone,
      workEmail: staticState.workEmail,
      schoolEmail: staticState.schoolEmail,
      gitHubUser: staticState.gitHubUser,
      linkedInUrl: staticState.linkedInUrl,
      city: staticState.city,
      state: state,
      country: country,
    };
    let payload = {
      firstName: staticState.firstName,
      lastName: staticState.lastName,
      email: staticState.email,
      description: staticState.description,
      photoUrl: staticState.photoUrl,
      contactDetails: contactDetails,
      expertId: 0,
      active: true,
    };
    console.log("the payload is: ", JSON.stringify(payload));
    let response = await customFetch(
      "http://localhost:6997/experts",
      "POST",
      payload
    );
    /* TODO: redirect to skills entry page */
    history.push({
      pathname: "/register2",
      state: { expertId: response.expertId },
    });
  }

  /* general change handler for all of the non-dynamic form fields */
  function handleChangeStatic(event) {
    const value = event.target.value;
    setStaticState({
      ...staticState,
      [event.target.name]: value,
    });
  }

  return (
    <div style={{ textAlign: "left" }}>
      <Form>
        <h3>The Basics</h3>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              placeholder="Charlotte"
              name="firstName"
              value={staticState.firstName}
              onChange={handleChangeStatic}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              placeholder="Russo"
              name="lastName"
              value={staticState.lastName}
              onChange={handleChangeStatic}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={staticState.email}
              onChange={handleChangeStatic}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridDescription">
            <Form.Label>Tagline - Optional</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="FPGA Tour Winner"
              name="description"
              value={staticState.description}
              onChange={handleChangeStatic}
            />
            <Form.Text className="text-muted">
              Give our users something to remember you by! Max: 500 characters
            </Form.Text>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPhotoURL">
            <Form.Label>Photo - Optional</Form.Label>
            <Form.Control
              placeholder="https://imgur.com/myphoto.jpg"
              name="photoUrl"
              value={staticState.photoUrl}
              onChange={handleChangeStatic}
            />
            <Form.Text className="text-muted">
              Did you know that experts with a photo get contacted by 75% more
              needy undergraduates with questions?! <br />
              Image must be hosted, give us a link.
            </Form.Text>
          </Form.Group>
        </Form.Row>
        <h3>Public Contact Info</h3>
        <Form.Row>
          <CountryDropdown value={country} onChange={setCountry} />
          <RegionDropdown
            disableWhenEmpty={true}
            country={country}
            value={state}
            onChange={setState}
          />
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Closest Major City</Form.Label>
            <Form.Control
              placeholder="Philadelphia"
              name="city"
              value={staticState.city}
              onChange={handleChangeStatic}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              placeholder="215-123-4567"
              name="phone"
              value={staticState.phone}
              onChange={handleChangeStatic}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridWorkEmail">
            <Form.Label>Work Email - Optional</Form.Label>
            <Form.Control
              type="email"
              placeholder="ayyy@microsoft.com"
              name="workEmail"
              value={staticState.workEmail}
              onChange={handleChangeStatic}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridSchoolEmail">
            <Form.Label>School Email - Optional</Form.Label>
            <Form.Control
              type="email"
              placeholder="charlotte@upenn.edu"
              name="schoolEmail"
              value={staticState.schoolEmail}
              onChange={handleChangeStatic}
            />
          </Form.Group>
        </Form.Row>
        <h3>Social Media</h3>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridGitHub">
            <Form.Label>GitHub Username</Form.Label>
            <Form.Control
              placeholder="audiophile"
              name="gitHubUser"
              value={staticState.gitHubUser}
              onChange={handleChangeStatic}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridGitHub">
            <Form.Label>LinkedIn Profile</Form.Label>
            <Form.Control
              placeholder="https://www.linkedin.com/in/charlotte_russo"
              name="linkedInUrl"
              value={staticState.linkedInUrl}
              onChange={handleChangeStatic}
            />
          </Form.Group>
        </Form.Row>
        <Button variant="primary" onClick={handleSubmit}>
          Next
        </Button>
      </Form>
    </div>
  );
}
