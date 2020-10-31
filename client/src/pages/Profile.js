import React, { useState, useEffect } from "react";
import { customFetch } from "../components/Helpers";
import {
  Figure,
  Card,
  ListGroup,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Button,
  Popover,
  Tabs,
  Tab,
} from "react-bootstrap";
import Table from "../components/Table";
import { skillCols, courseCols, companyCols } from "../data/TableCols";
import {
  sampleSkillData,
  sampleCourseData,
  sampleCompanyData,
} from "../data/SampleTableData";

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

  useEffect(() => {
    async function fetchData() {
      const expertData = await customFetch(
        "http://localhost:6997/experts/" + expertId.toString()
      );
      console.log("expert data is: ", expertData);
      setExpertData(expertData);
      const contactDetails = await customFetch(
        "http://localhost:6997/contact_details/" + expertId.toString()
      );
      console.log("contact data is: ", contactDetails);
      setContactData(contactDetails);
    }
    fetchData();
  }, []);

  return (
    <>
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
        <Figure.Caption>
          <strong>{expertData.description}</strong>
          <br />
          {contactData.city + ", " + contactData.state + " "}
          <br />
          {contactData.country}
          <br />
          {contactData.phone}
        </Figure.Caption>
      </Figure>
      <Container>
        <Row>
          <Col>
            <Card style={{ width: "18rem" }}>
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
            <Card style={{ width: "18rem" }}>
              <Card.Header>Social Media</Card.Header>
              <ListGroup variant="flush">
                {contactData.gitHubUser !== "" && (
                  <ListGroup.Item
                    action
                    href={"https://github.com/" + contactData.gitHubUser}
                  >
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Popover>
                          <Popover.Title as="h3">{`GitHub Projects`}</Popover.Title>
                          <Popover.Content>
                            <strong>TODO:</strong> add github projects here
                          </Popover.Content>
                        </Popover>
                      }
                    >
                      <Button variant="link">{contactData.gitHubUser}</Button>
                    </OverlayTrigger>
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
      >
        <Tab eventKey="skills" title="Skills">
          <Table
            tableCols={skillCols}
            data={sampleSkillData}
            title={"Expert Skills"}
            options={{
              paging: false,
              showSelectAllCheckbox: false,
              search: false,
              sorting: true,
            }}
          />
          <Button variant="outline-primary">Add New Skill</Button>
          <br />
        </Tab>
        <Tab eventKey="courses" title="Coursework">
          <Table
            tableCols={courseCols}
            data={sampleCourseData}
            title={"Expert Courses"}
            options={{
              paging: false,
              showSelectAllCheckbox: false,
              search: false,
              sorting: true,
            }}
          />
          <Button variant="outline-primary">Add New Course</Button>
          <br />
        </Tab>
        <Tab eventKey="companies" title="Industry Experience">
          <Table
            tableCols={companyCols}
            data={sampleCompanyData}
            title={"Expert Courses"}
            options={{
              paging: false,
              showSelectAllCheckbox: false,
              search: false,
              sorting: true,
            }}
          />
          <Button variant="outline-primary">Add New Company</Button>
          <br />
        </Tab>
      </Tabs>
    </>
  );
}
