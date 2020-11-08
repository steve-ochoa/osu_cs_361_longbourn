import React, { useState, useEffect } from "react";
import { Urls } from "../data/Constants";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import GitHubFetch from "./GitHubFetch";
import GitHubListDisplay from "./GitHubListDisplay";

/* requests needed:
 * get all user repos with: GET Urls.GitHub + "users/" + userName + "/repos"
 *  for each element in response array, save:
 *  - response.name (the project's name)
 *  - response.description (project's description)
 *  - response.html_url  (link to the repository)
 *  - response.languages_url (url for the second api call to retrieve langs)
 *      - execute second api call with languages_url
 *      - save keys of this response object to an array
 */

/* make popup scrollable by targeting popover-body with css and adding a height
 * and "overflow-y: auto" */
export default function GitHubPopUp({ userName }) {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setProjectData(await GitHubFetch({ userName }));
    }
    fetchData();
  }, []);

  return (
    <>
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 5000 }}
        overlay={
          <Popover>
            <Popover.Title as="h3">{`GitHub Projects`}</Popover.Title>
            <Popover.Content>
              <strong>{userName}'s GitHub Projects:</strong>
              {projectData.length > 0 && (
                <GitHubListDisplay {...projectData} />
              )}
            </Popover.Content>
          </Popover>
        }
      >
        <Button variant="link">{userName}</Button>
      </OverlayTrigger>
    </>
  );
}
