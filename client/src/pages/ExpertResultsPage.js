import React, { useState, useEffect } from "react";
import Card from "../components/ExpertCard";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { customFetch } from "../components/Helpers";

function ExpertResultsPage() {
  const history = useHistory();
  const searchInput = history.location.state;
  const [expertsData, setExpertsData] = useState({
    expertId: "",
    firstName: "",
    lastName: "",
    description: "",
    photoUrl: null,
  });

  useEffect(() => {
    async function fetchData() {
      let expertsData = [];
      switch (searchInput.radio) {
        case "skills":
          expertsData = await customFetch(
            process.env.REACT_APP_BASE_URL +
            "findExperts/skillName/" +
            searchInput.input
          );
          break;
        case "courses":
          expertsData = await customFetch(
            process.env.REACT_APP_BASE_URL +
            "findExperts/courseNumber/" +
            searchInput.input
          );
          break;
        case "companies":
          expertsData = await customFetch(
            process.env.REACT_APP_BASE_URL +
            "findExperts/companyName/" +
            searchInput.input
          );
          break;
        default:
          alert("error searching!!!");
          break;
      }
      /* temporary fix for returned photo_url field (should be photoUrl) */
      /* TODO: remove me after merge */
      if (Array.isArray(expertsData)) {
        expertsData.forEach((expert, index) => {
          if ("photo_url" in expert) {
            expert.photoUrl = expert.photo_url;
            delete expert.photo_url;
            expertsData[index] = expert;
          }
        });
      }
      setExpertsData(expertsData);
    }
    fetchData();
  }, []);

  /* split input array into chunks of specified size */
  function chunk(array, size) {
    const chunked_arr = [];
    for (let i = 0; i < array.length; i++) {
      const last = chunked_arr[chunked_arr.length - 1];
      if (!last || last.length === size) {
        chunked_arr.push([array[i]]);
      } else {
        last.push(array[i]);
      }
    }
    return chunked_arr;
  }

  /* create card for each expert in search results */
  let cards = [];
  for (let i = 0; i < expertsData.length; i++) {
    cards.push(
      <Col>
        <Card
          key={expertsData[i].expertId}
          expertId={expertsData[i].expertId}
          firstName={expertsData[i].firstName}
          lastName={expertsData[i].lastName}
          description={expertsData[i].description}
          photoUrl={expertsData[i].photoUrl}
        />
      </Col>
    );
  }
  /* split cards array into chunks of size 3 */
  const chunkedCards = chunk(cards, 3);

  /* build results rows from the chunked cards array */
  let rows = [];
  chunkedCards.forEach((chunk) => {
    rows.push(
      <Row style={{ marginTop: ".5em", marginBottom: ".5em" }}>{chunk}</Row>
    );
  });

  return (
    <Container
      className="center"
      fluid="md"
      style={{ textAlign: "center", marginTop: "20%" }}
    >
      {rows}
    </Container>
  );
}

export default ExpertResultsPage;
