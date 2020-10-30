import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import CompanyInput from "./CompanyInput";
import CourseInput from "./CourseInput";
import { customFetch } from "./Helpers";
import SkillInput from "./SkillInput";

/* TODO: input field validations, pagify registration form */
/* form allowing for the registration of new experts */
export default function RegForm() {
  const [staticState, setStaticState] = useState({
    firstName: "",
    lastName: "",
    mainEmail: "",
    tagLine: "",
    photoUrl: "",
    city: "",
    phone: "",
    workEmail: "",
    schoolEmail: "",
    gitHub: "",
    linkedIn: "",
  });
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [skills, setSkills] = useState([
    { name: "", description: "", years: "" },
  ]);
  const [courses, setCourses] = useState([
    { name: "", description: "", semester: "", year: "", grade: "" },
  ]);
  const [companies, setCompanies] = useState([
    {
      name: "",
      description: "",
      industry: "",
      current: "",
      position: "",
      years: "",
    },
  ]);

  function handleSubmit() {
    if (
      staticState.firstName === "" ||
      staticState.lastName === "" ||
      staticState.mainEmail === "" ||
      staticState.city === "" ||
      staticState.phone === "" ||
      country === "" ||
      region === ""
    ) {
      alert("required fields missing!");
      return;
    }
    let contactDetails = {
      phone: staticState.phone,
      workEmail: staticState.workEmail,
      schoolEmail: staticState.schoolEmail,
      gitHubUser: staticState.gitHub,
      linkedInUrl: staticState.linkedIn,
      city: staticState.city,
      state: region,
      country: country,
    };
    let payload = {
      firstName: staticState.firstName,
      lastName: staticState.lastName,
      email: staticState.mainEmail,
      description: staticState.tagLine,
      photoUrl: staticState.photoUrl,
      expertId: 0,
      active: true,
    };
    payload = { ...payload, contactDetails, skills, courses, companies };
    payload.skills.forEach((element, index) => {
      if (element.name === "") {
        payload.skills.splice(index, 1);
      }
    });
    payload.courses.forEach((element, index) => {
      if (element.name === "") {
        payload.courses.splice(index, 1);
      }
      let term = element.semester + " " + element.year;
      delete element.semester;
      delete element.year;
      element.term = term;
    });
    payload.companies.forEach((element, index) => {
      if (element.name === "") {
        payload.companies.splice(index, 1);
      }
    });
    console.log("the payload is: ", JSON.stringify(payload));
    // customFetch("localhost:6997", "POST", payload);
    /* TODO: redirect to profile page */
  }

  /* general change handler for all of the non-dynamic form fields */
  function handleChangeStatic(event) {
    const value = event.target.value;
    setStaticState({
      ...staticState,
      [event.target.name]: value,
    });
  }

  /* TODO: combine all of the dynamic handleChange and handleDelete functions */

  /* change handler for dynamic skill inputs */
  function handleSkillChange(event) {
    const updatedSkills = [...skills];
    updatedSkills[event.target.dataset.idx][
      event.target.className.split(" ")[0]
    ] = event.target.value;
    setSkills(updatedSkills);
  }

  /* handler enabling the deletion of skill lines */
  function handleSkillDelete(idx) {
    const updatedSkills = [...skills];
    updatedSkills.splice(idx, 1);
    setSkills(updatedSkills);
  }

  /* creates a new empty skill array in the skills state */
  function addSkill() {
    setSkills([...skills, { name: "", description: "", years: "" }]);
  }

  /* change handler for dynamic course inputs */
  function handleCourseChange(event) {
    const updatedCourses = [...courses];
    updatedCourses[event.target.dataset.idx][
      event.target.className.split(" ")[0]
    ] = event.target.value;
    setCourses(updatedCourses);
  }

  /* handler enabling the deletion of course lines */
  function handleCourseDelete(idx) {
    const updatedCourses = [...courses];
    updatedCourses.splice(idx, 1);
    setCourses(updatedCourses);
  }

  /* creates a new empty course array in the courses state */
  function addCourse() {
    setCourses([
      ...courses,
      { name: "", description: "", semester: "", year: "", grade: "" },
    ]);
  }

  /* change handler for dynamic company inputs */
  function handleCompanyChange(event) {
    const updatedCompanies = [...companies];
    updatedCompanies[event.target.dataset.idx][
      event.target.className.split(" ")[0]
    ] = event.target.value;
    setCompanies(updatedCompanies);
  }

  /* handler enabling the deletion of company lines */
  function handleCompanyDelete(idx) {
    const updatedCompanies = [...companies];
    updatedCompanies.splice(idx, 1);
    setCompanies(updatedCompanies);
  }

  /* creates a new empty company array in the courses state */
  function addCompany() {
    setCompanies([
      ...companies,
      {
        name: "",
        description: "",
        industry: "",
        current: "",
        position: "",
        years: "",
      },
    ]);
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
              name="mainEmail"
              value={staticState.mainEmail}
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
              name="tagLine"
              value={staticState.tagLine}
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
            value={region}
            onChange={setRegion}
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
              name="gitHub"
              value={staticState.gitHub}
              onChange={handleChangeStatic}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridGitHub">
            <Form.Label>LinkedIn Profile</Form.Label>
            <Form.Control
              placeholder="https://www.linkedin.com/in/charlotte_russo"
              name="linkedIn"
              value={staticState.linkedIn}
              onChange={handleChangeStatic}
            />
          </Form.Group>
        </Form.Row>
        <h3>Skills</h3>
        {skills.map((val, idx) => (
          <SkillInput
            key={`skill-${idx}`}
            idx={idx}
            skillState={skills}
            handleChange={handleSkillChange}
            handleDelete={handleSkillDelete}
            addSkill={addSkill}
          />
        ))}

        <h3>Courses</h3>
        {courses.map((val, idx) => (
          <CourseInput
            key={`skill-${idx}`}
            idx={idx}
            courseState={courses}
            handleChange={handleCourseChange}
            handleDelete={handleCourseDelete}
            addCourse={addCourse}
          />
        ))}
        <h3>Companies</h3>
        {companies.map((val, idx) => (
          <CompanyInput
            key={`skill-${idx}`}
            idx={idx}
            companyState={companies}
            handleChange={handleCompanyChange}
            handleDelete={handleCompanyDelete}
            addCompany={addCompany}
          />
        ))}
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
