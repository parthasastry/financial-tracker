import React from "react";
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';

const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

const Project = ({ project }) => {
  return (
    <Card className="my-3 p-3 rounded">

      <Card.Body>
        <Link to={`/project/${project.project_name}`}>
          <Card.Title as="h4">
            <strong>{project.project_name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="h5">{formatter.format(project.sow)}</Card.Text>

      </Card.Body>
    </Card>
  );
};

export default Project;
