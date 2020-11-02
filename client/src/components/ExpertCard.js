import React, { useState, useEffect } from "react";
import { customFetch } from "../components/Helpers";
import { Card, Button } from "react-bootstrap";

// TODO: route go somewhere to user profile - need expertId


function ExpertCard(props) {

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.photoUrl} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          {props.description}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  )

}

export default ExpertCard;