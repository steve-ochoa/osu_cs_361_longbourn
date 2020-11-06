import React, { useState, useEffect } from "react";
import Card from "../components/ExpertCard";
import { Container, Row, Col } from "react-bootstrap";
import { customFetch } from "../components/Helpers";
import { useHistory } from "react-router-dom";


function ExpertResultsPage() {
  const history = useHistory();
  const [expertsData, setExpertData] = useState({
    expertId: "",
    firstName: "",
    description: "",
    photoUrl: null,
  });

  console.log(history);

  // async function getCategoryData(route) {
  //     return (
  //         await axios.get(route).then(
  //             response => {
  //                 findCategoryId(response);
  //             }).catch(function (error) {
  //                 console.log(error);
  //             }));
  // }

  // function findCategoryId(category) {
  //     category.forEach(obj => {
  //         if (obj.name === input.toLowerCase()) {
  //             return obj.skillId;
  //         }
  //     });
  // }

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
            expertId={expertsData[i].expertId}
            firstName={expertsData[i].firstName}
            description={expertsData[i].description}
            photoUrl={expertsData[i].photoUrl}
          />
        </Col>
        <Col>
          <Card
            key={expertsData[i + 1].expertId}
            expertId={expertsData[i + 1].expertId}
            firstName={expertsData[i + 1].firstName}
            description={expertsData[i + 1].description}
            photoUrl={expertsData[i + 1].photoUrl}
          />
        </Col>
        <Col>
          <Card
            key={expertsData[i + 2].expertId}
            expertId={expertsData[i + 2].expertId}
            firstName={expertsData[i + 2].firstName}
            description={expertsData[i + 2].description}
            photoUrl={expertsData[i + 2].photoUrl}
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