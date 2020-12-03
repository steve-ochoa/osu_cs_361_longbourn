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
    expertSkills: null,
    expertCourses: null,
    expertCompanies: null,
  });
  const [courseData, setCourseData] = useState(null);

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
          /* get skill info for all the results */
          if (Array.isArray(expertsData) && expertsData.length > 0) {
            for (const expert of expertsData) {
              let fetchResult = await customFetch(
                process.env.REACT_APP_BASE_URL +
                  "expertSkills/" +
                  expert.expertId
              );
              expert.expertSkills = fetchResult;
            }
          }
          break;
        case "courses":
          expertsData = await customFetch(
            process.env.REACT_APP_BASE_URL +
              "findExperts/courseNumber/" +
              searchInput.input
          );
          let courses = await customFetch(
            process.env.REACT_APP_BASE_URL + "courses"
          );
          setCourseData(courses);
          /* get course info for all the results */
          if (Array.isArray(expertsData) && expertsData.length > 0) {
            for (const expert of expertsData) {
              let fetchResult = await customFetch(
                process.env.REACT_APP_BASE_URL +
                  "expertCourses/" +
                  expert.expertId
              );
              expert.expertCourses = fetchResult;
            }
          }
          break;
        case "companies":
          expertsData = await customFetch(
            process.env.REACT_APP_BASE_URL +
              "findExperts/companyName/" +
              searchInput.input
          );
          /* get company info for all the results */
          if (Array.isArray(expertsData) && expertsData.length > 0) {
            for (const expert of expertsData) {
              let fetchResult = await customFetch(
                process.env.REACT_APP_BASE_URL +
                  "expertCompanies/" +
                  expert.expertId
              );
              expert.expertCompanies = fetchResult;
            }
          }
          break;
        default:
          alert("error searching!!!");
          break;
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
      <Col md="auto" style={{ display: "flex", flexWrap: "wrap", padding: "20px" }}>
        <Card
        style={{margin: "20px"}}
          key={expertsData[i].expertId}
          expertId={expertsData[i].expertId}
          firstName={expertsData[i].firstName}
          lastName={expertsData[i].lastName}
          description={expertsData[i].description}
          photoUrl={expertsData[i].photoUrl}
          expertise={
            searchInput.radio === "skills"
              ? expertsData[i].expertSkills
              : searchInput.radio === "courses"
              ? expertsData[i].expertCourses
              : expertsData[i].expertCompanies
          }
          courses={searchInput.radio === "courses" ? courseData : null}
          searchInput={searchInput}
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
      <Row
        className="justify-content-md-center"
      >
        {chunk}
      </Row>
    );
  });

  return (
    <Container
      className="center"
      fluid="md"
      style={{ textAlign: "center", marginTop: "20%" }}
    >
      <head>
        <title>Results</title>
      </head>
      {rows}
    </Container>
  );
}

export default ExpertResultsPage;
