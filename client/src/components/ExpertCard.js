import React from "react";
import { Card, Button, ListGroup } from "react-bootstrap";

// TODO: route go somewhere to user profile - need expertId

function ExpertCard(props) {
  console.log("search term:", props.searchInput);
  console.log(props.expertise);

  const searchTerm = props.searchInput.input;
  const searchType = props.searchInput.radio;

  let expertiseMsgs = [];
  switch (searchType) {
    case "skills":
      expertiseMsgs.push(
        `Expert in ${searchTerm[0].toUpperCase()}${searchTerm.slice(1)}`
      );
      /* iterate through props.expertise array, get the matching line */
      props.expertise.forEach((element) => {
        if (element.name.toLowerCase() === searchTerm.toLowerCase()) {
          expertiseMsgs.push(`${element.experienceYears} years experience!`);
          return;
        }
      });
      break;
    case "courses":
      let searchedCourseId;
      let searchedCourseName;
      for (let i = 0; i < props.courses.length; i++) {
        if (
          props.courses[i].courseNumber.toUpperCase() ===
          searchTerm.toUpperCase()
        ) {
          searchedCourseId = props.courses[i].courseId;
          searchedCourseName = props.courses[i].name;
          break;
        }
      }
      expertiseMsgs.push(`Completed ${searchTerm.toUpperCase()}!`);
      expertiseMsgs.push(`${searchedCourseName}`);
      props.expertise.forEach((element) => {
        if (element.courseId === searchedCourseId) {
          expertiseMsgs.push(`${element.term}, Grade: ${element.grade} `);
        }
      });
      break;
    default:
      // case: companies
      props.expertise.forEach((element) => {
        if (element.name.toLowerCase() === searchTerm.toLowerCase()) {
          expertiseMsgs.push(
            `${element.current === 1 ? "Current " : "Former "} Employee at ${
              element.name
            }!`
          );
          expertiseMsgs.push(`Position: ${element.position}`);
          expertiseMsgs.push(`Years Employed: ${element.employedYears}`);
          return;
        }
      });
      break;
  }

  let expertiseCardText = [];
  console.log(expertiseMsgs);
  if (expertiseMsgs.length > 0) {
    expertiseCardText.push(
      <ListGroup.Item key={0}>
        <strong>{expertiseMsgs[0]}</strong>
      </ListGroup.Item>
    );
    for (let i = 1; i < expertiseMsgs.length; i++) {
      expertiseCardText.push(
        <ListGroup.Item key={i}>{expertiseMsgs[i]}</ListGroup.Item>
      );
    }
  }

  return (
    <Card
      style={{ backgroundColor: "#f6f5f5", color: "#070d59", width: "18rem" }}
    >
      <Card.Img
        variant="top"
        src={props.photoUrl}
        style={{ height: "18rem" }}
      />
      <Card.Body style={{display:"flex", flexDirection: "column"}}>
        <Card.Title>{props.firstName + " " + props.lastName}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <ListGroup variant="flush">{expertiseCardText}</ListGroup>
        <Button
          className="align-self-end btn btn-lg btn-block btn-primary"
          style={{marginTop: "auto"}}
          variant="primary"
          size="sm"
          href={"/profile/" + props.expertId}
        >
          Profile
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ExpertCard;
