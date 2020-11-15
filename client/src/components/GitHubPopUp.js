import React, { useState, useEffect } from "react";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import GitHubFetch from "./GitHubFetch";
import GitHubListDisplay from "./GitHubListDisplay";

/* TODO: make popup scrollable by targeting popover-body with css and adding a 
 * height and "overflow-y: auto" */
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
        delay={{ show: 250, hide: 2500 }}
        overlay={
          <Popover>
            <Popover.Title as="h3">{`GitHub Projects`}</Popover.Title>
            <Popover.Content>
              <strong>{userName}'s GitHub Projects:</strong>
              {projectData.length > 0 && (
                <GitHubListDisplay projects={projectData}/>
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
