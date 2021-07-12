import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import Spin from "../../utilities/Spin";

class CovidHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [],
      currentPage: 1,
      dataPerPage: 10,
      lastPage: 0,
      totalDeaths: 0,
      totalRecovered: 0,
      totalHospitalized: 0,
      dataLoaded: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  showAlert() {
    alert("hi");
  }

  showFirstPage() {
    this.setState({
      currentPage: 1,
    });
  }

  showNextPage() {
    this.setState({
      currentPage: this.state.currentPage + 1,
    });
  }

  showPrevPage() {
    this.setState({
      currentPage: this.state.currentPage - 1,
    });
  }

  showLastPage() {
    this.setState({
      currentPage: this.state.lastPage,
    });
  }

  componentDidMount() {
    axios
      .get("https://api.covid19india.org/raw_data.json")
      .then((response) => {
        this.setState({ history: response.data.raw_data });
        if (response.data.raw_data % 10 > 0) {
          this.setState({ lastPage: response.data.raw_data / 10 + 1 });
        } else {
          this.setState({ lastPage: response.data.raw_data / 10 });
        }

        var totalDeathsCount = 0;
        var totalRecoveredCount = 0;
        var totalHospitalizedCount = 0;
        for (var i = 0; i < response.data.raw_data.length; i++) {
          if (response.data.raw_data[i].currentstatus === 'Hospitalized') {
            totalHospitalizedCount++;
          }
          else if (response.data.raw_data[i].currentstatus === 'Recovered') {
            totalRecoveredCount++;
          }
          else {
            totalDeathsCount++;
          }
        }
        this.setState({ totalDeaths: totalDeathsCount })
        this.setState({ totalRecovered: totalRecoveredCount })
        this.setState({ totalHospitalized: totalHospitalizedCount })
        this.setState({ dataLoaded: true })
      })
      .catch((error) => {
        console.log(error);
      });
  }


  render() {
    const { history, currentPage, dataPerPage } = this.state;

    // Logic for displaying current todos
    const indexOfLastTodo = currentPage * dataPerPage;
    const indexOfFirstTodo = indexOfLastTodo - dataPerPage;
    const currentTodos = history.slice(indexOfFirstTodo, indexOfLastTodo);
    return (
      <div id="table-container">
        {
          !this.state.dataLoaded &&
          <Spin />
        }
        {
          this.state.dataLoaded &&
          <Container>
            <Row>
              <Col>
                <Card style={{ width: "18rem" }} id="totalRecovered">
                  <Card.Body>
                    <Card.Title>Total Recovered : {this.state.totalRecovered} </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={{ width: "18rem" }} id="totalHospitalized">
                  <Card.Body>
                    <Card.Title>Total Hospitalized : {this.state.totalHospitalized}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={{ width: "18rem" }} id="totalDeaths">
                  <Card.Body>
                    <Card.Title>Total Deaths : {this.state.totalDeaths}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        }
        {
          this.state.dataLoaded &&
          <div id="covid-table">
            <Table responsive>
              <thead>
                <tr>
                  <th>PatinetNumber</th>
                  <th>Date</th>
                  <th>BackUp Notes</th>
                  <th>Current Status</th>
                  <th>Detected State</th>
                </tr>
              </thead>
              <tbody>
                {currentTodos.length
                  ? currentTodos.map((rowData) => (
                    <tr key={rowData.patientnumber}>
                      <td>{rowData.patientnumber}</td>
                      <td>{rowData.dateannounced}</td>
                      <td>{rowData.backupnotes}</td>
                      <td id={rowData.currentstatus}>
                        {rowData.currentstatus}
                      </td>
                      <td>{rowData.detectedstate}</td>
                    </tr>
                  ))
                  : null}
              </tbody>
            </Table>
          </div>
        }
        {
          this.state.dataLoaded &&
          <div id="covid-history-pagination">
            <Pagination>
              <Pagination.First onClick={() => this.showFirstPage()} />
              <Pagination.Prev onClick={() => this.showPrevPage()} />
              <Pagination.Ellipsis />
              <Pagination.Next onClick={() => this.showNextPage()} />
              <Pagination.Last disabled onClick={() => this.showLastPage()} />
            </Pagination>
          </div>
        }
      </div>
    );
  }
}

export default CovidHistory;