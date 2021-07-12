import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";

import "bootstrap/dist/css/bootstrap.min.css";

class Header extends Component {
  render() {
    return (
      <div id="navBar" className="navBar">
        <Navbar bg="primary" expand="lg">
          <Navbar.Brand href="#home">Covid Assists</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Form inline>
              <Nav.Link href="/" id="nav-item">
                DashBoard
              </Nav.Link>
              <Nav.Link href="/history" id="nav-item">
                Covid History
              </Nav.Link>
              <Nav.Link href="/vaccines" id="nav-item">
              Vaccines
              </Nav.Link>
              <Nav.Link href="/aboutUs" id="nav-item">
                About Us
              </Nav.Link>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;