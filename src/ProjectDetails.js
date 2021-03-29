import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import ProjectSummary from "./ProjectSummary";
import Burndown from "./Burndown";

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

const ProjectDetails = ({ details }) => {
  const billable_actuals = Math.max(...details.billable_actual);
  const ai_actuals = Math.max(...details.ai_actual);

  const lastFriday = getLastFriday();
  var lastFridayFormat = new Date(lastFriday).toISOString().slice(0, 10);
  var index = details.end_date.indexOf(lastFridayFormat);
  var b_actuals_truncated = details.billable_actual.slice(0, index + 1);
  var ai_actuals_truncated = details.ai_actual.slice(0, index + 1);

  return (
    <div>
      <h2 className="text-center text-warning">{details.project_name}</h2>
      <h3 className="text-center text-info">Billable</h3>
      <Container>
        <Row>
          <Col md={3}>
            <Card>
              <ProjectSummary
                contract={details.sow}
                actuals={billable_actuals}
              />
            </Card>
          </Col>
          <Col>
            <Card>
              <Burndown
                end_date={details.end_date}
                actual_amount={b_actuals_truncated}
                plan_amount={details.billable_plan}
              />
            </Card>
          </Col>
        </Row>
      </Container>
      <hr />
      <h3 className="text-center text-success">Adoption Incentive</h3>
      <Container>
        <Row>
          <Col md={3}>
            <Card>
              <ProjectSummary
                contract={details.ai}
                actuals={ai_actuals}
              />
            </Card>
          </Col>
          <Col>
            <Card>
              <Burndown
                end_date={details.end_date}
                actual_amount={ai_actuals_truncated}
                plan_amount={details.ai_plan}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProjectDetails;
