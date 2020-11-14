import React from "react";
import { Card, Button } from "react-bootstrap";

// TODO: route go somewhere to user profile - need expertId


function ExpertCard(props) {

  console.log("props i was passed is:", props);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.photoUrl} />
      <Card.Body>
        <Card.Title>{props.firstName + " " + props.lastName}</Card.Title>
        <Card.Text>
          {props.description}
        </Card.Text>
        <Button variant="primary" size="sm" href={"/profile/" + props.expertId}>Profile</Button>
      </Card.Body>
    </Card >
  )

}

export default ExpertCard;