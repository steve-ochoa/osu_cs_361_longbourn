import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import CompanyInput from "./CompanyInput";
import CourseInput from "./CourseInput";
import SkillInput from "./SkillInput";

export default function RegForm(props) {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  return (
    <div style={{ textAlign: "left" }}>
      <Form>
        <h3>The Basics</h3>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control placeholder="Charlotte" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control placeholder="Russo" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridDescription">
            <Form.Label>Tagline - Optional</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="FPGA Tour Winner"
            />
            <Form.Text className="text-muted">
              Give our users something to remember you by! Max: 500 characters
            </Form.Text>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPhotoURL">
            <Form.Label>Photo - Optional</Form.Label>
            <Form.Control placeholder="https://imgur.com/myphoto.jpg" />
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
            value={region}
            onChange={setRegion}
          />
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Closest Major City</Form.Label>
            <Form.Control placeholder="Philadelphia" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control placeholder="215-123-4567" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridWorkEmail">
            <Form.Label>Work Email - Optional</Form.Label>
            <Form.Control type="email" placeholder="ayyy@microsoft.com" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridSchoolEmail">
            <Form.Label>School Email - Optional</Form.Label>
            <Form.Control type="email" placeholder="charlotte@upenn.edu" />
          </Form.Group>
        </Form.Row>
        <h3>Social Media</h3>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridGitHub">
            <Form.Label>GitHub Username</Form.Label>
            <Form.Control placeholder="audiophile" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridGitHub">
            <Form.Label>LinkedIn Profile</Form.Label>
            <Form.Control placeholder="https://www.linkedin.com/in/charlotte_russo" />
          </Form.Group>
        </Form.Row>
        <h3>Skills</h3>
        <SkillInput />

        <h3>Courses</h3>
        <CourseInput />
        <h3>Companies</h3>
        <CompanyInput />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
