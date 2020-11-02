import React, { useState, useEffect } from "react";
import Card from "../components/ExpertCard";
import { Container, } from "react-bootstrap";
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

  // TODO: create key for each card
  //       align cards 3/4 to a row

  return (
    Array.from(expertsData).map(expert => {
      return (
        <Container className="center" fluid="md" style={{ textAlign: "center", marginTop: "20%" }}>
          <Card
            name={expert.firstName}
            description={expert.description}
            photoUrl={expert.photoUrl}
          />
        </Container>
      )
    }));

}

export default ExpertResultsPage;