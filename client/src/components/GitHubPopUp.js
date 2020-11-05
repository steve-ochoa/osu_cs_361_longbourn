import React from "react";
import { Urls } from "../data/Constants";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";

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
  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={
        <Popover>
          <Popover.Title as="h3">{`GitHub Projects`}</Popover.Title>
          <Popover.Content>
            <strong>{userName}'s GitHub Projects:</strong>

          </Popover.Content>
        </Popover>
      }
    >
      <Button variant="link">{userName}</Button>
    </OverlayTrigger>
  );
}
