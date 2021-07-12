import React, { Component } from 'react';
import Spinner from "react-bootstrap/esm/Spinner";

class Spin extends Component {
    render() {

        return (
            <div id="spinner">
                <Spinner animation="border" role="status" id ="spin" >
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    }
}

export default Spin;