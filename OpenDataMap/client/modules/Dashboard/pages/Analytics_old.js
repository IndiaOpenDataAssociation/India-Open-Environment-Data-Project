import React, {Component} from 'react'
import {Line} from 'react-chartjs-2';

const data = {
  labels: ['January','','February', '','March'],
  datasets: [
    {
      label: 'Last 24 hours data',
      fill: true,
      backgroundColor: 'rgba(88,96,103,0.6)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};
const options = {
  scales: {
    xAxes: [{
      display: true,
      gridLines : {
        color: "#464f56",
        lineWidth: 0,
        showTickMarks: false
      },
      ticks: {
        beginAtZero:true,
      },

    }],
    yAxes:[{
      gridLines: {
        lineWidth: 1,
        color: "#fff",
      },
      ticks: {
        stepSize:40,
        beginAtZero:true,
        showLabelBackdrop: true
      },

    }]
  },
  scaleStartValue: 0,
  maintainAspectRatio: true
}



export default class Analytics extends Component{

  componentDidMount(){
      Chart.defaults.global.defaultFontColor = '#FFF';
  }

  render(){

    return(
      <div className="dashboard-home">
        <div className="home-top-content row">
          <span className="col-sm-6">Outdoor</span>
          <span className="col-sm-6">Please select one</span>
        </div>
        <div className="home-bottom-content">
          <div className="analytics-chart">
            <span>Last 24 hours data</span>
            <p>Max AQI : 67</p>

            <Line data={data} options={options} />
            {Chart.defaults.global.legend.display = false}
          </div>

          <div className="average-cal">
            <div className="row">
              <div className="col-sm-3">
                <div className="avg-container">hi</div>
              </div>
            </div>
          </div>
          <div style={{padding: '35px'}}></div>

        </div>
      </div>
    )
  }
}
