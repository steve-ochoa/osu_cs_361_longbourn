import React, { useState, useEffect, useRef } from "react";
import { Overlay, Popover, Button } from "react-bootstrap";
import GitHubFetch from "./GitHubFetch";
import GitHubListDisplay from "./GitHubListDisplay";

/* TODO: make popup scrollable by targeting popover-body with css and adding a
 * height and "overflow-y: auto" */
export default function GitHubPopUp({ userName }) {
  const [projectData, setProjectData] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const target = useRef(null);

  useEffect(() => {
    async function fetchData() {
      setProjectData(await GitHubFetch({ userName }));
    }
    fetchData();
  }, []);

  return (
    <>
      <Button
        ref={target}
        onMouseOver={() => {
          setShowOverlay(!showOverlay);
        }}
        variant="link"
      >{`Github: ${userName}`}</Button>
      <Overlay
        show={showOverlay}
        rootClose={true}
        target={target.current}
        onHide={() => {
          setShowOverlay(false);
        }}
        placement="right"
      >{
        <Popover
          style={{ maxHeight: "500px", overflowY: "scroll" }}
        >
          <Popover.Title as="h3">{`GitHub Projects`}</Popover.Title>
          <Popover.Content>
            {projectData.length > 0 && (
              <GitHubListDisplay projects={projectData} />
            )}
          </Popover.Content>
        </Popover>}
      </Overlay>
    </>
  );
}
