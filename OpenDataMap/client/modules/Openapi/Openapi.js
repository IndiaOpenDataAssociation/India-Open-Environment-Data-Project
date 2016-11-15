import React, {Component} from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

export default class Openapi extends Component{
  render(){
    return(
      <div className="about">
        <Navbar />
        <div  className="about-styles text-center ">
          <div className="overlay">
            <img src="../assets/images/api.jpg" className="img-header" />
          </div>
        </div>

        <div className="bg-white">
          <div className="container api-container margin-bottom-50">
            <h2 className="text-center">
              Use Public API
            </h2>
            <p className="primary-black">
              You can use our ‘Outgoing APIs’ to call in the data from our servers for any kind of use under the CC: BY-SA license. We are still developing the 'Incoming APIs' and will release it very soon.
            </p>

            <div className="text-center consume-api">
              <a href="https://www.mashape.com/sohil4932/open-environment-data-project?&amp;utm_campaign=mashape5-embed&amp;utm_medium=button&amp;utm_source=open-environment-data-project&amp;utm_content=anchorlink&amp;utm_term=icon-light" target="_blank">
                <img src="https://d1g84eaw0qjo7s.cloudfront.net/images/badges/badge-icon-light-9e8eba63.png" width="143" height="38" alt="Mashape" />
              </a>
            </div>

            <div className="text-center license-api">
              <br />
              This work is licensed under a &nbsp;
              <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/" target="_blank">
                Creative Commons Attribution-ShareAlike 4.0 International License
              </a>
              <br/>
              <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/" target="_blank">
                <img style={{paddingTop: '20px', borderWidth: 0}} alt="Creative Commons License" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" />
              </a>
            </div>

          </div>
        </div>

        <div className="bg-gray">
          <div className="container api-container">
            <h2 className="text-center">
              Contact Us
            </h2>
            <p className="primary-black">
              If you wish to share your air-quality monitoring data to our servers then kindly contact us on the below address:
            </p>

            <div className="col-sm-12 col-lg-10 col-lg-offset-1 text-center margin-bottom-default">
              <p className="primary-black">
                212 (2nd Floor), Qutab Plaza, DLF Phase 1,<br />
                Sector 26 Gurgaon, Haryana – 122002<br />
                (M) +91-97171-33445<br />
                (O) +91-124-4102642<br /><br />
                Mrutyunjay (m2@ioda.in)<br />
                Namit (namit@ioda.in)
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    )
  }
}
