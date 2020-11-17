import React from "react";
import { Card, Button } from "react-bootstrap";

// TODO: route go somewhere to user profile - need expertId


function ExpertCard(props) {

  return (
    <Card style={{ backgroundColor: "#f6f5f5", color: "#070d59", width: '18rem' }}>
      <Card.Img variant="top" src={props.photoUrl} />
      <Card.Body>
        <Card.Title>{props.firstName + " " + props.lastName}</Card.Title>
        <Card.Text>
          {props.description}
        </Card.Text>
        <Button variant="primary" size="sm" href={"/profile/" + props.expertId}>Profile</Button>
      </Card.Body>
    </Card>
  )

}

export default ExpertCard;