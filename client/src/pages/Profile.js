import React, { useState, useEffect } from "react";
import { customFetch } from "../components/Helpers";
import {
  Figure,
  Card,
  ListGroup,
  Container,
  Row,
  Col,
  Button,
  Tabs,
  Tab,
} from "react-bootstrap";
import Table from "../components/Table";
import { skillCols, courseCols, companyCols } from "../data/TableCols";
import AddSkill from "../components/AddSkill";
import AddCourse from "../components/AddCourse";
import RegCompanies from "../components/RegCompanies";
import GitHubPopUp from "../components/GitHubPopUp";

export default function Profile(props) {
  const { expertId } = props.match.params;
  const [expertData, setExpertData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    description: "",
    photoUrl: null,
  });
  const [contactData, setContactData] = useState({
    phone: "",
    workEmail: "",
    schoolEmail: "",
    gitHubUser: "",
    linkedInUrl: "",
    city: "",
    state: "",
    country: "",
  });
  const [skillsData, setSkillsData] = useState([]);
  const [skillTableData, setSkillTableData] = useState([]);
  const [newSkill, setNewSkill] = useState(0);
  const [courseList, setCourseList] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [newCourse, setNewCourse] = useState(0);
  const [companyData, setCompanyData] = useState([]);
  const [newCompany, setNewCompany] = useState([]);

  useEffect(() => {
    /* gets all data associated with given expert on profile page load */
    async function fetchData() {
      /* get expert and contact data */
      const expertData = await customFetch(
        process.env.REACT_APP_BASE_URL + "experts/" + expertId.toString()
      );
      setExpertData(expertData);
      setContactData(expertData.contactDetails);
      /* get expert skills data */
      const expertSkills = await customFetch(
        process.env.REACT_APP_BASE_URL + "expertSkills/" + expertId.toString()
      );
      let skillTableData = [];
      if (Array.isArray(expertSkills)) {
        setSkillsData(expertSkills);
        expertSkills.forEach((element) => {
          delete element.expertId;
          delete element.skillId;
          skillTableData.push(element);
        });
      }
      setSkillTableData(skillTableData);
      setNewSkill(0);
      /* get all the course data */
      const courses = await customFetch(
        process.env.REACT_APP_BASE_URL + "courses"
      );
      setCourseList(courses);
      /* get expert course data */
      const expertCourses = await customFetch(
        process.env.REACT_APP_BASE_URL + "expertCourses/" + expertId.toString()
      );
      if (Array.isArray(expertCourses)) {
        expertCourses.forEach((element, index) => {
          let courseLookup = courses.find(
            (obj) => obj.courseId === element.courseId
          );
          element.description = element.name;
          element.name = courseLookup.courseNumber;
          delete element.courseId;
          delete element.expertId;
          expertCourses[index] = element;
        });
        setCourseData(expertCourses);
      }
      setNewCourse(0);
      /* get expert company data */
      const expertCompanies = await customFetch(
        process.env.REACT_APP_BASE_URL +
          "expertCompanies/" +
          expertId.toString()
      );
      if (Array.isArray(expertCompanies)) {
        expertCompanies.forEach((element, index) => {
          delete element.companyId;
          delete element.expertId;
          expertCompanies[index] = element;
        });
      }
      setCompanyData(expertCompanies);
      setNewCompany(0);
    }
    fetchData();
  }, []);

  function handleTabChange() {
    setNewSkill(0);
    setNewCourse(0);
    setNewCompany(0);
  }

  return (
    <>
      <head><title>Expert Profile</title></head>
      <h1>{expertData.firstName + " " + expertData.lastName}</h1>
      <Figure>
        <Figure.Image
          width={171}
          height={180}
          alt="171x180"
          src={
            expertData.photoUrl
              ? expertData.photoUrl
              : process.env.PUBLIC_URL + "/placeholder.png"
          }
          roundedCircle
        />
        <Figure.Caption style={{ color: "#f6f5f5" }}>
          <strong>{expertData.description}</strong>
          <br />
          {contactData.city + ", " + contactData.state + " "}
          <br />
          {contactData.country}
          <br />
          {contactData.phone}
        </Figure.Caption>
      </Figure>
      <Container style={{ color: "#070d59" }}>
        <Row>
          <Col>
            <Card
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: "18rem",
              }}
            >
              <Card.Header>Contact Details</Card.Header>
              <ListGroup variant="flush">
                {contactData.workEmail !== "" && (
                  <ListGroup.Item
                    action
                    href={"mailto:" + contactData.workEmail}
                  >
                    <Button variant="link">{contactData.workEmail}</Button>
                  </ListGroup.Item>
                )}
                {contactData.schoolEmail !== "" && (
                  <ListGroup.Item
                    action
                    href={"mailto:" + contactData.schoolEmail}
                  >
                    <Button variant="link">{contactData.schoolEmail}</Button>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
          <Col>
            <Card
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: "18rem",
              }}
            >
              <Card.Header>Social Media</Card.Header>
              <ListGroup variant="flush">
                {contactData.gitHubUser !== "" && (
                  <ListGroup.Item
                    action
                    href={"https://github.com/" + contactData.gitHubUser}
                  >
                    <GitHubPopUp userName={contactData.gitHubUser} />
                  </ListGroup.Item>
                )}
                {contactData.linkedInUrl !== "" && (
                  <ListGroup.Item action href={contactData.linkedInUrl}>
                    <Button variant="link">LinkedIn</Button>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
      <br />
      <br />
      <Tabs
        defaultActiveKey="skills"
        id="uncontrolled-tab-example"
        fill
        onSelect={handleTabChange}
      >
        <Tab eventKey="skills" title="Skills">
          <Table
            tableCols={skillCols}
            data={skillTableData}
            title={"Expert Skills"}
            options={{
              paging: false,
              showSelectAllCheckbox: false,
              search: false,
              sorting: true,
            }}
          />
          <Button variant="outline-primary" onClick={setNewSkill}>
            Add New Skill
          </Button>
          <br />
        </Tab>
        <Tab eventKey="courses" title="Coursework">
          <Table
            tableCols={courseCols}
            data={courseData}
            title={"Expert Courses"}
            options={{
              paging: false,
              showSelectAllCheckbox: false,
              search: false,
              sorting: true,
            }}
          />
          <Button variant="outline-primary" onClick={setNewCourse}>
            Add New Course
          </Button>
          <br />
        </Tab>
        <Tab eventKey="companies" title="Industry Experience">
          <Table
            tableCols={companyCols}
            data={companyData}
            title={"Expert Courses"}
            options={{
              paging: false,
              showSelectAllCheckbox: false,
              search: false,
              sorting: true,
            }}
          />
          <Button variant="outline-primary" onClick={setNewCompany}>
            Add New Company
          </Button>
          <br />
        </Tab>
      </Tabs>
      {!!newSkill && <AddSkill expertId={expertId} expertSkills={skillsData} />}
      {!!newCourse && <AddCourse courseList={courseList} expertId={expertId} />}
      {!!newCompany && <RegCompanies {...{ expertId: expertId }} />}
    </>
  );
}
