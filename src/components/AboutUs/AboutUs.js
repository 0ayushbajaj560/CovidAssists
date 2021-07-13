import React, { Component } from 'react';
import logo from './../../images/ayush2.jpg';

class AboutUs extends Component {
  render() {
    return (
      <div id="aboutUs-page">
        <div className="wrapper">
          <div id="four">
            <img src={logo} className="App-logo" alt="UserPic" />
          </div>
          <div id="five">
            <h2> Ayush Bajaj</h2>
            <h4>Email : ayushbajaj56@outlook.com</h4>
            <h4 id="website"><a id="website" href="https://0ayushbajaj560.github.io/">Website : 0ayushbajaj560.github.io</a></h4>
            <h6><strong>Disclaimer</strong> : This website is created for development tutorial and we do not guarantee anbout the authenticity of authenticity
              data shown in this website as they are not validated from our end. We have tried Our best to collect data from legit websites and we hope it helps you find the vaccine nearby.
            </h6>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUs;