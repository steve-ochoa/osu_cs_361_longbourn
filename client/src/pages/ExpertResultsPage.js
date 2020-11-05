import React, { useState, useEffect } from "react";
import Card from "../components/ExpertCard";
import { Container, Row, Col } from "react-bootstrap";
import { customFetch } from "../components/Helpers";


function ExpertResultsPage() {
  const [expertsData, setExpertData] = useState({
    firstName: "",
    description: "",
    photoUrl: null,
  });
  const [contactData, setContactData] = useState({ linkedInUrl: "" });

  useEffect(() => {
    async function fetchData() {
      const expertsData = await customFetch(
        "http://flip3.engr.oregonstate.edu:6997/experts/"
      );
      console.log("Your experts are are: ", expertsData);
      setExpertData(expertsData);
    }
    fetchData();
  }, []);

  let rows = [];
  for (let i = 0; i < (expertsData.length - 2); i += 3) {
    rows.push(
      <Row style={{ marginTop: ".5em", marginBottom: ".5em" }}>
        <Col>
          <Card
            key={expertsData[i].expertId}
            name={expertsData[i].firstName}
            description={expertsData[i].description}
            photoUrl={expertsData[i].photoUrl}
            email={expertsData[i].email}
          />
        </Col>
        <Col>
          <Card
            key={expertsData[i + 1].expertId}
            name={expertsData[i + 1].firstName}
            description={expertsData[i + 1].description}
            photoUrl={expertsData[i + 1].photoUrl}
            email={expertsData[i + 1].email}
          />
        </Col>
        <Col>
          <Card
            key={expertsData[i + 2].expertId}
            name={expertsData[i + 2].firstName}
            description={expertsData[i + 2].description}
            photoUrl={expertsData[i + 2].photoUrl}
            email={expertsData[i + 2].email}
          />
        </Col>
      </Row>
    );
  }

  return (
    <Container className="center" fluid="md" style={{ textAlign: "center", marginTop: "20%" }}>
      {rows}
    </Container>
  );
}

export default ExpertResultsPage;