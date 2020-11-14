import React from "react";
import { Urls } from "../data/Constants";
import { customFetch } from "./Helpers";

/* from input gitHub userName, executes necessary requests to return array of
 * objects representing user's github projects, including fields (name,
 *  description, html_url, languages[] ) */
export default async function GitHubFetch({ userName }) {
  let returnArray = [];
  let response = await customFetch(
    Urls.GitHub + "users/" + userName + "/repos"
  );
  if (Array.isArray(response)) {
    response.forEach(async (element) => {
      let project = {};
      project.name = element.name;
      project.description = element.description;
      project.html_url = element.html_url;

      let langResponse = await customFetch(element.languages_url);
      project.languages = Object.keys(langResponse);
      returnArray.push(project);
    });
  }
  return returnArray;
}
