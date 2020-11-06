import { List } from "@material-ui/core";
import React from "react";
import { ListGroup } from "react-bootstrap";

// const sampleData = [
//   {
//     name: "project1",
//     description: "my first project",
//     html_url: "https://github.com/contip/",
//     languages: ["TypeScript", "HTML", "CSS"],
//   },
//   {
//     name: "project2",
//     description: "my second project",
//     html_url: "https://github.com/contip/",
//     languages: ["JavaScript", "C", "Python"],
//   },
//   {
//     name: "project3",
//     description: "my third project",
//     html_url: "https://github.com/contip/",
//     languages: ["C++", "Ruby", "Python"],
//   },
// ];

function HorizontalList(lang_array) {
  let langs = [];
  lang_array.forEach((language) =>
    langs.push(<ListGroup.Item>{language}</ListGroup.Item>)
  );
  return langs;
}

/* displays input array of github project objects as a react-bootstrap list */
/* (name, description, html_url, languages[]) */
export default function GitHubListDisplay({ projects }) {
  let listItems = [];
  console.log(projects);
  if (Array.isArray(projects)) {
    projects.forEach((project, index) => {
      listItems.push(
        <>
          <ListGroup.Item action href={project.html_url}>
            {project.name}
          </ListGroup.Item>
          <ListGroup.Item>{project.description}</ListGroup.Item>
          <ListGroup horizontal>{HorizontalList(project.languages)}</ListGroup>
        </>
      );
    });
  }
  return <ListGroup>{listItems}</ListGroup>;
}
