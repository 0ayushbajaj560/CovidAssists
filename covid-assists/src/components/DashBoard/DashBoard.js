import React, { Component } from "react";
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import axios from "axios";

class DashBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      covidData: [],
      totalCasesByDate: [],
      isLoaded: false,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://api.covid19api.com/total/country/India")
      .then((response) => {
        response = response.data.slice(response.data.length - 200, response.data.length);
        this.setState({ covidData: response })
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://api.covid19api.com/total/country/India/status/confirmed")
      .then((response) => {
        response = response.data.slice(response.data.length - 14, response.data.length);
        this.setState({ totalCasesByDate: response })
        this.setState({ isLoaded: true })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { covidData, totalCasesByDate } = this.state;
    return (
      <div id="dashBoard">
        <div>
          {
            this.state.isLoaded &&
            <div>
              <div className="wrapper">
                <div id="one">
                  <Bar
                    data={{
                      labels: ['Recovered', 'Active', 'Deceased'],
                      datasets: [
                        {
                          label: 'Total Cases : ' + (covidData[covidData.length - 1].Confirmed + covidData[covidData.length - 1].Active + covidData[covidData.length - 1].Deaths),
                          data: [covidData[covidData.length - 1].Confirmed, covidData[covidData.length - 1].Active, covidData[covidData.length - 1].Deaths],
                          backgroundColor: [
                            'green',
                            'yellow',
                            'red'
                          ],
                          borderColor: [
                            'green',
                            'yellow',
                            'red'
                          ],
                          borderWidth: 0
                        }
                      ]
                    }}
                    height={50}
                    width={100}
                    options={{
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
                <div id="two">
                  <Doughnut
                    data={{
                      labels: [
                        totalCasesByDate[0].Date,
                        totalCasesByDate[1].Date,
                        totalCasesByDate[2].Date,
                        totalCasesByDate[3].Date,
                        totalCasesByDate[4].Date,
                        totalCasesByDate[5].Date,
                        totalCasesByDate[6].Date,
                      ],
                      datasets: [
                        {
                          label: 'Total Cases : ' + (covidData[covidData.length - 1].Confirmed + covidData[covidData.length - 1].Active + covidData[covidData.length - 1].Deaths),
                          data: [
                            totalCasesByDate[0].Cases,
                            totalCasesByDate[1].Cases,
                            totalCasesByDate[2].Cases,
                            totalCasesByDate[3].Cases,
                            totalCasesByDate[4].Cases,
                            totalCasesByDate[5].Cases,
                            totalCasesByDate[6].Cases,
                          ],
                          backgroundColor: [
                            'violet',
                            'indigo',
                            'blue',
                            'green',
                            'yellow',
                            'orange',
                            'red'
                          ],
                          borderColor: [
                            'violet',
                            'indigo',
                            'blue',
                            'green',
                            'yellow',
                            'orange',
                            'red'
                          ],
                          borderWidth: 0,
                          hoverOffset: 4
                        }
                      ]
                    }}
                    height={50}
                    width={100}
                    options={{
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false
                        }
                      }
                    }}
                  />
                </div>
              </div>
              <div className="wrapper">
                <div id="three">
                  <Line
                    data={{
                      labels: [
                        totalCasesByDate[0].Date,
                        totalCasesByDate[1].Date,
                        totalCasesByDate[2].Date,
                        totalCasesByDate[3].Date,
                        totalCasesByDate[4].Date,
                        totalCasesByDate[5].Date,
                        totalCasesByDate[6].Date,
                        totalCasesByDate[7].Date,
                        totalCasesByDate[8].Date,
                        totalCasesByDate[9].Date,
                        totalCasesByDate[10].Date,
                        totalCasesByDate[11].Date,
                        totalCasesByDate[12].Date,
                        totalCasesByDate[13].Date,
                      ],
                      datasets: [
                        {
                          label: 'Total Confirmed Cases By Date: ',
                          data: [
                            totalCasesByDate[0].Cases,
                            totalCasesByDate[1].Cases,
                            totalCasesByDate[2].Cases,
                            totalCasesByDate[3].Cases,
                            totalCasesByDate[4].Cases,
                            totalCasesByDate[5].Cases,
                            totalCasesByDate[6].Cases,
                            totalCasesByDate[7].Cases,
                            totalCasesByDate[8].Cases,
                            totalCasesByDate[9].Cases,
                            totalCasesByDate[10].Cases,
                            totalCasesByDate[11].Cases,
                            totalCasesByDate[12].Cases,
                            totalCasesByDate[13].Cases,
                          ],
                          fill: false,
                          borderColor: 'red',
                          tension: 0.1
                        }
                      ]
                    }}
                    height={50}
                    width={100}
                    options={{
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default DashBoard;