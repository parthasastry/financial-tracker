import React, { Component } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import Project from "./Project";
import axios from 'axios';
// import projectsData from "../projectsData";

export class Home extends Component {
    state = {
        loading: true,
        projectsData: []
      }

    componentDidMount() {
        const url = 'https://mrsh6w0v48.execute-api.us-east-1.amazonaws.com/dev/financials'
        axios.get(url)
          // .then(data => console.log(typeof(data.data.body)))
          .then(data => this.setState({
              projectsData: JSON.parse(data.data.body),
              loading: false
            }))
          .catch(err => console.log(err))
      }


  render() {
      const renderProjects = this.state.projectsData.map((d) => (
        <Col key={d.project_name} sm={12} md={6} lg={4} xl={3}>
          <Project project={d} />
        </Col>
      ))

      const spinner = <Spinner animation="border" variant="secondary" />

    return (
      <div>
        <h1>Projects</h1>
        <Row>
          {this.state.loading ? spinner : renderProjects}
        </Row>
      </div>
    );
  }
}

export default Home;
