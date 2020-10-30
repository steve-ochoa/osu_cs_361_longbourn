import React, { useState } from "react";
import { customFetch } from "../components/Helpers";

export default function Profile(props) {
  const { expertId } = props.match.params;

  let url = "localhost:6997/experts/" + expertId.toString();
  console.log(url);
  const expData = fetch(url, {crossDomain: true, method: 'GET', mode: 'cors'})
//   const expertData = customFetch("localhost:6997/experts/" + expertId.toString());
//   const contactDetails = customFetch("localhost:6997/contact_details/" + expertId.toString());
  let skills;
  let courses;
  let companies;

  return(
       <>
       {expertId}

       </>
  )}
