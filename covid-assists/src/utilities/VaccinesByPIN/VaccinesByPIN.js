import React,{ Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import axios from 'axios';


class VaccinesByPIN extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          isValid: false,
          vaccines: [],
        };
        this.checkPINValidation = this.checkPINValidation.bind(this);
        this.fetchVaccinesByPIN = this.fetchVaccinesByPIN.bind(this);
      }
    
      checkPINValidation() {
        var isValid = false;
        var pin = parseInt(document.getElementById("input-pin").value);
    
        if (pin > 99999 && pin < 1000000) {
          this.setState({ isValid: true })
          isValid = true;
          this.fetchVaccinesByPIN();
        }
        if (!isValid) {
          this.setState({ isValid: false })
          document.getElementById("pin-error").style.display = "block";
        }
      }
    
      fetchVaccinesByPIN() {
        var pin = parseInt(document.getElementById("input-pin").value);
        var date = (document.getElementById("input-date").value);
        date = date.toString();
        console.log(typeof date);
        console.log("http://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" + pin + "&date=" + date);
        axios
          .get("http://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" + pin + "&date=" + date)
          .then((response) => {
            this.setState({ vaccines: response.data.sessions })
            document.getElementById("pin-error").style.display = "none";
          })
          .catch((error) => {
            console.log(error);
          });
      }

    render() {
        const { vaccines } = this.state;
        return (
            <div id="pin-selected">
            <Container id="pin-selected-column">
              <Row id="pin-selected-column">
                <Col sm>
                  <label >Enter PIN:</label>
                  <input type="number" placeholder="Enter the PIN code" id="input-pin"></input><br />
                </Col>
                <Col sm>
                  <label >Select Date:</label>
                  <input type="text" id="input-date" placeholder="DD-MM-YYYY"></input><br />
                </Col>
                <Col sm>
                  <input type="button" value="Search" id="search-vaccine-button" onClick={this.checkPINValidation}></input>
                </Col>
              </Row>
            </Container>
            {/* <h6 id="pin-error">Select PIN and date correctly</h6> */}
            <Alert variant="danger" id="pin-error">
              Invalid PIN or Date
            </Alert>
            <hr className="solid"></hr>
            <div id="vaccine-table">
            {
              this.state.isValid && this.state.vaccines.length !== 0 &&
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Center Name</th>
                      <th>VaccineName</th>
                      <th>Slot Time</th>
                      <th>Min Age</th>
                      <th>Fee Type</th>
                      <th>Total Capacity</th>
                      <th>Dose1 Capacity</th>
                      <th>Dose2 Capacity</th>
                      <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vaccines.length
                      ? vaccines.map((rowData) => (
                        <tr key={rowData.session_id}>
                          <td>{rowData.name}</td>
                          <td>{rowData.vaccine}</td>
                          <td>{rowData.slots[0]}</td>
                          <td>{rowData.min_age_limit}</td>
                          <td>{rowData.fee_type}</td>
                          <td>{rowData.available_capacity}</td>
                          <td>{rowData.available_capacity_dose1}</td>
                          <td>{rowData.available_capacity_dose2}</td>
                          <td>{rowData.address}</td>
                        </tr>
                      ))
                      : null}
                  </tbody>
                </Table>
            }
            </div>
            {
              this.state.isValid && this.state.vaccines.length === 0 &&
              <Alert variant="danger">
                No Vaccines Found
              </Alert>
            }
          </div>
        );
    }
}

export default VaccinesByPIN;