import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class DashBoard extends Component {
  render() {
    return (
      <div id="dashBoard">
        <div>
          <Container>
            <Row>
              <Col sm={8}>sm=8</Col>
              <Col sm={4}>sm=4</Col>
            </Row>
            <Row>
              <Col sm>sm=true</Col>
              <Col sm>sm=true</Col>
              <Col sm>sm=true</Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default DashBoard;