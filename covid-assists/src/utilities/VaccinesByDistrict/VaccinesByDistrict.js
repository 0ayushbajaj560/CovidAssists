import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Pagination from 'react-bootstrap/Pagination'
import Table from 'react-bootstrap/Table'
import axios from 'axios';


class VaccinesByDistrict extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isValid: false,
            states: [],
            districts: [],
            vaccines: [],
            currentPage: 1,
            dataPerPage: 3,
            lastPage: 0,
            dataLoaded: false,

        };
        this.validateDistrictSelection = this.validateDistrictSelection.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.fetchVaccinesByDistrict = this.fetchVaccinesByDistrict.bind(this);
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

    validateDistrictSelection() {
        var district = document.getElementById("district-selector").value;
        var isValid = false;

        if (district > 0) {
            this.setState({ isValid: true })
            isValid = true;
            this.fetchVaccinesByDistrict();
        }
        if (!isValid) {
            this.setState({ isValid: false })
            document.getElementById("district-error").style.display = "block";
        }
    }

    componentDidMount() {
        axios
            .get("https://cdn-api.co-vin.in/api/v2/admin/location/states")
            .then((response) => {
                this.setState({ states: response.data.states })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    fetchVaccinesByDistrict() {
        var district = document.getElementById("district-selector").value;
        var date = (document.getElementById("input-date").value);
        date = date.toString();
        axios
            .get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" + district + "&date=" + date)
            .then((response) => {
                this.setState({ vaccines: response.data.sessions })
                if (response.data.sessions % 3 > 0) {
                    this.setState({ lastPage: response.data.sessions / 3 + 1 });
                } else {
                    this.setState({ lastPage: response.data.sessions / 3 });
                }
                if(response.data.sessions.length>0) {
                    this.setState({ dataLoaded: true })
                }
                else {
                    this.setState({ dataLoaded: false })
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const handleSelect = (e) => {
            e = document.getElementById("state-selector").value;

            axios
                .get("https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + e)
                .then((response) => {
                    this.setState({ districts: response.data.districts })
                    console.log(this.state.districts);
                    document.getElementById("district-selector").disabled = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        const { vaccines, states, districts, currentPage, dataPerPage } = this.state;
        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * dataPerPage;
        const indexOfFirstTodo = indexOfLastTodo - dataPerPage;
        const currentTodos = vaccines.slice(indexOfFirstTodo, indexOfLastTodo);
        return (
            <div id="district-selected">
                <Container id="district-selected-column">
                    <Row id="district-selected-column">
                        <Col sm>
                            <select id="state-selector" defaultValue="0" onChange={handleSelect}>
                                <option value="0" disabled >Select State</option>
                                {states.length
                                    ? states.map((state) => (
                                        <option value={state.state_id} id="vaccine-selector-items">{state.state_name}</option>
                                    ))
                                    : null}
                            </select>
                        </Col>
                        <Col sm>
                            <select id="district-selector" defaultValue="0" disabled>
                                <option value="0" disabled >Select District</option>
                                {districts.length
                                    ? districts.map((district) => (
                                        <option value={district.district_id} id="vaccine-selector-items">{district.district_name}</option>
                                    ))
                                    : null}
                            </select>
                        </Col>
                        <Col sm>
                            <input type="text" id="input-date" placeholder="DD-MM-YYYY"></input>
                        </Col>
                        <Col sm>
                            <input type="button" value="Search" id="search-vaccine-button" onClick={this.validateDistrictSelection}></input>
                        </Col>
                    </Row>
                </Container>
                <Alert variant="danger" id="district-error">
                    Invalid District or Date. Please provide date correctrly in DD-MM-YYYY format.
                </Alert>
                <hr className="solid"></hr>
                <div id="vaccine-table">
                    {
                        this.state.isValid && this.state.vaccines.length !== 0 &&
                        <div id="vaccines-table">
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
                                    {currentTodos.length
                                        ? currentTodos.map((rowData) => (
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

export default VaccinesByDistrict;