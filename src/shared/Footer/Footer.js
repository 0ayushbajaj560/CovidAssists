import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap.min.css";

class Footer extends Component {
  render() {
    return (
      <div id="footer" className="footer">
        <Container>
          <Row>
            <Col id="footer-text">
              <span>CovidAssist 2021 | All Rights Reserved</span>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Footer;