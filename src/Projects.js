import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, CardGroup, Button, Col } from "react-bootstrap";
import ProjectDetails from './ProjectDetails';

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const Projects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [selectProjectDetails, setSelectProjectDetails] = useState({});

  const url =
    "https://mrsh6w0v48.execute-api.us-east-1.amazonaws.com/dev/financials";

  useEffect(() => {
    axios
      .get(url)
      .then((data) => setProjectsData(JSON.parse(data.data.body)))
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (project) => {
      
      const projectDetails = projectsData.find(d => {
          return (
            d.project_name === project
          )
      })
      console.log(projectDetails)
      setSelectProjectDetails(projectDetails)
  }

  const projects = projectsData.map((project) => {
    return (
      <div key={project.project_name}>
        <Col>
          <Card className="my-3 p-3 rounded">
            <Card.Body>
              <Card.Title as="h4">
                <strong>{project.project_name}</strong>
              </Card.Title>

              <Card.Text as="h5">{formatter.format(project.sow)}</Card.Text>

              <Button variant="warning" onClick={() => handleClick(project.project_name)}>Details</Button>
            </Card.Body>
          </Card>
        </Col>
      </div>
    );
  });


  return (
    <div>
      <h1 className="text-center">Projects</h1>
      <Container fluid>
        <CardGroup>{projects}</CardGroup>
        <hr />
        {selectProjectDetails.project_name ? <ProjectDetails details={selectProjectDetails} /> : ''}
      </Container>
    </div>
  );
};

export default Projects;
