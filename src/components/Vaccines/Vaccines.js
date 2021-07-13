import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import VaccinesByPIN from '../../utilities/VaccinesByPIN/VaccinesByPIN';
import VaccinesByDistrict from '../../utilities/VaccinesByDistrict/VaccinesByDistrict';

class Vaccines extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchByPin: false,
      searchByDistrict: false,
    };
  }

  render() {
    const handleSelect = (e) => {
      document.getElementById("vaccine-selector").innerText = e;
      if (e === "PIN") {
        this.setState({ searchByPin: true })
        this.setState({ searchByDistrict: false })
      }
      else if (e === "District") {
        this.setState({ searchByPin: false })
        this.setState({ searchByDistrict: true })
      }
    }

    return (
      <div id="vaccines-page">
        <div id="vaccines-page-children">
          <h2>Vaccine Details</h2>
          <h6 id="vaccines-disclaimer">Disclaimer : This website is to help people connect with centres providing vaccines.We do not assure you about the authencity of these data as these are not validated from our end.</h6>
          <div id="search-options">
            <span>Search vaccines By : </span>
            <DropdownButton
              title="Select"
              id="vaccine-selector"
              onSelect={handleSelect}
            >
              <Dropdown.Item eventKey="PIN" >PIN</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="District">District</Dropdown.Item>
            </DropdownButton>
          </div>
          <hr className="solid"></hr>
          {
            this.state.searchByPin &&
            <VaccinesByPIN />
          }
          {
            this.state.searchByDistrict &&
            <VaccinesByDistrict />
          }
        </div>
      </div>

    );
  }
}

export default Vaccines;