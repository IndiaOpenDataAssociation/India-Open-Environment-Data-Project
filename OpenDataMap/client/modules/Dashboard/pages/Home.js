import React, {Component} from 'react'

export default class Dashboardhome extends Component{
  render(){
    return(
      <div className="dashboard-home">
        <div className="home-top-content row">
          <span className="col-sm-6 col-xs-6">95 data sources</span>
          <span className="col-sm-6 col-xs-6">Please select one</span>
        </div>
        <div className="home-bottom-content">
          <div className="aqiinfo">
            <img src="assets/img/aqiinfo.png" className="aqiinfo-img"/>
            <div className="home-label">
              <span>Air <br /> Quality <br /> Index</span>
            </div>
            <p className="imp-of-aqi">Significance of AQI</p>
          </div>
          <div className="aqirange">
            <img src="assets/images/aqi-range.png" className="aqirange-img" />
          </div>
          <div style={{padding: '9px'}}></div>
        </div>
      </div>
    )
  }
}
