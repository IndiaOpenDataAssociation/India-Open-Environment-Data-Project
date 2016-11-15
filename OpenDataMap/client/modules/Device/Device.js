import React, {Component} from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

export default class Device extends Component{
  render(){
    return(
      <div className="about">
        <Navbar />
        <div  className="about-styles text-center ">
          <div className="overlay">
            <img src="../assets/images/devices.jpg" className="img-header" />
            <div className="middle-title">
              <div className="title-container">
                <h1 className="white bold ">
                  “If you cannot measure it, You cannot improve it.”
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="container airowl-container">
            <h2 className="text-center bold ">
              AirOwl
            </h2>
            <div className="row">
                <div className="col-md-6">
                  <img className="devices-img img-responsive" src="assets/images/devices-airowl.png" />
                </div>
                <div className="col-md-6 text-center">
                  <div className="vertical-center">
                    <p>
                      Airowl is a D-i-Y (Do-it-Yourself) kit which helps you to build your own personal Air Quality Monitoring device. The device would give you real-time air quality data on the app and update you of the air that you are breathing.
                    </p>
                  </div>
                </div>
            </div>
          </div>
        </div>

        <div className="bg-gray">
          <div className="container emk-container">
            <h2 className="text-center bold ">
              Environment Monitoring Kit (EMK)
            </h2>
            <div className="row">
              <div className="col-md-6 text-center">
                <div className="vertical-center">
                  <p>
                    The Environment Monitoring Kit (EMK) is a device which assesses different parameters of air-quality. The device has been assembled with an aim of being cost-effective and easily scalable. The design of the device is such that it requires to be mounted onto a wall in a semi-open space to assess the air-quality of the region. The device is equipped with a solar panel and has a battery backup upto 3 hours. The shape of the box is designed to make it water resistant (incase of rainfall). The device is also equipped with GPS, GPRS and WIFI capabilities to transmit the data and location to the servers. The device, however requires a power source of 5 VA power through any USB compatible device or charger, making it less power hungry during its functioning.
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <img className="devices-img img-responsive" src="assets/images/devices-ioda.png" />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    )
  }
}
