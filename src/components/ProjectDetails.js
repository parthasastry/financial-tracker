import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import projectsData from "../projectsData";
import Burndown from './Burndown';

const getLastFriday = () => {
  var today = new Date();
  var lastFriday = new Date();
  let today_day = new Date().getDay();

  switch (today_day) {
    case 0:
      lastFriday = lastFriday.setDate(today.getDate() - 1);
      break;
    case 1:
      lastFriday = lastFriday.setDate(today.getDate() - 2);
      break;
    case 2:
      lastFriday = lastFriday.setDate(today.getDate() - 3);
      break;
    case 3:
      lastFriday = lastFriday.setDate(today.getDate() - 4);
      break;
    case 4:
      lastFriday = lastFriday.setDate(today.getDate() - 5);
      break;
    case 5:
      lastFriday = lastFriday.setDate(today.getDate() - 6);
      break;
    case 6:
      lastFriday = lastFriday.setDate(today.getDate() - 0);
  }
  return new Date(lastFriday);
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const ProjectDetails = ({ match }) => {
  console.log(match)
  const project = projectsData.find((p) => p.project_name == match.params.id);
  const billable_actuals = Math.max(...project.billable_actual);
  const billable_percentage_spent = (( billable_actuals/ project.sow) * 100).toFixed(2);

  const ai_actuals = Math.max(...project.ai_actual);
  const ai_percentage_spent = ((ai_actuals / project.ai ) * 100).toFixed(2);

  const lastFriday = getLastFriday();
  var lastFridayFormat = new Date(lastFriday).toISOString().slice(0, 10);
  var index = project.end_date.indexOf(lastFridayFormat);
  var b_actuals_truncated = project.billable_actual.slice(0, index + 1)
  var ai_actuals_truncated = project.ai_actual.slice(0, index + 1)

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go back
      </Link>
      <Row>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <p>Contract</p>
              <h3>{formatter.format(project.sow)}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>Spent</p>
              <h3>{formatter.format(billable_actuals)}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>Percentage Spent</p>
              <h3>{billable_percentage_spent}</h3>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={9}>
        <Burndown
                  end_date={project.end_date}
                  // actual_amount={project.billable_actual}
                  actual_amount={b_actuals_truncated}
                  plan_amount={project.billable_plan}
                />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <p>Adoption Incentive (AI)</p>
              <h3>{formatter.format(project.ai)}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>AI Spent</p>
              <h3>{formatter.format(ai_actuals)}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>Percentage AI Spent</p>
              <h3>{ai_percentage_spent}</h3>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={9}>
        <Burndown
                  end_date={project.end_date}
                  // actual_amount={project.ai_actual}
                  actual_amount={ai_actuals_truncated}
                  plan_amount={project.ai_plan}
                />
        </Col>
      </Row>
    </div>
  );
};

export default ProjectDetails;
