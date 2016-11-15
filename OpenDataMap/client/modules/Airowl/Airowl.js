import React, {Component} from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Helmet from 'react-helmet/lib/Helmet'
import Tab from 'react-tabs/lib/components/Tab'
import TabList from 'react-tabs/lib/components/TabList'
import Tabs from 'react-tabs/lib/components/Tabs'
import TabPanel from 'react-tabs/lib/components/TabPanel'

export default class Airowl extends Component{
  constructor(props){
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(index, last) {
  }

  render(){
    return(
      <div className="airowl">
        <Helmet script={[
            {"src": "https://d2xwmjc4uy2hr5.cloudfront.net/im-embed/im-embed.min.js", "type": "text/javascript"}
          ]}
        />
        <Navbar />

        <div  className="home-styles text-center">
          <div className="overlay">
            <div className="landing-content black-transparent">
              <div className=" padding-default ">
                <div className="row ">
                  <div className="col-sm-12 ">
                    <div className="col-sm-12 mobile-no-padding vertical-center-parent">
                      <div className="">

                        <div className="col-sm-12 text-left mobile-no-padding" style={{margin: "0 auto"}}>
                          <div className="text-left" style={{minHeight: '180px'}}>
                          </div>
                          <div className="text-left margin-bottom-50">
                            <h2 style={{marginBottom:'0px', textAlign: 'left'}}>When People Pollute,</h2>
                            <h2 className="no-top-margin" style={{textAlign: 'left'}}>The AirOwl Hoot.</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="below-home-section home-repeat-bg bg-white">
          <div className="container">

              <div className=" text-center">
                <div className="hr-orange">
                  <h1 className="primary-black">Airowl is here</h1>
                  <hr />
                </div>

                <div className="text-center airowl-intro margin-bottom-25">
                  <p>
                    Airowl is India's first reliable and most affordable Do-it-Yourself (DiY) personal air quality <a className="theme-link" href="https://en.wikipedia.org/wiki/Particulates" target="_blank">(Dust SPM 2.5 & 10 micron)</a> monitoring device.
                  </p>
                  <p>
                    This device generates real-time dust pollution data and shows it on this open data project <a className="theme-link" href="/#/dashboard/" >website</a> and a free mobile app (<a className="theme-link" href="https://play.google.com/store/apps/details?id=com.idn0phl3108ed43d22s30&hl=en" target="_blank">Android</a>, iOS) that anyone can download. It will not only constantly update you on the quality of air that you are currently breathing but also helps other citizens of the country know the air quality.

                  </p>
                  <p>
                    We sincerely believe, the starting point is 1000s of people like you can start a movement by affording an open source device and contribute the data to public domain for free access & sharing. This will automatically bring in a very large number of people, from all walks of life taking notice and using the free data in their own ways. Once we all start taking necessary action based on this data we will have far better air to breath.
                  </p>
                  <p>
                    Without common man taking action, nothing is going to change.
                  </p>
                  <p>
                    If you are an open data enthusiast, maker, you have an open-source monitoring device (accurate and reliable) or you have suggestions for us, then kindly <a className="theme-link" href="/#/openapi/" >contact us</a> and contribute in this open data project.

                  </p>
                  <img className="img-responsive airowl-gif" src="assets/img/airowl.gif" />
                </div>

                <div className="buy-airowl-section">
                  <h1>Buy your owl now</h1>

                  <div className="row margin-bottom-25">
                      <div className="col-sm-6">
                        <div className="text-center margin-bottom-10p">
                          <img className="img-responsive img-middle" src="assets/img/OWL_3g.jpg" />
                            <div className="text-center red margin-bottom-10p">
                              <i className="fa fa-inr" style={{marginRight:"5px"}}></i> 5,000/-
                            </div>
                            <a href="https://www.instamojo.com/AirOwl/airowl/" rel="im-checkout" data-behaviour="remote" data-style="flat" data-text="Buy AirOwl 3G" data-token="4aaf75271bbcbaa4e9d9bc35a38433d1">
                            </a>
                        </div>

                      </div>
                      <div className="col-sm-6">
                        <div className="text-center">
                          <img className="img-responsive img-middle" src="assets/img/OWL_wi.jpg" />
                            <div className="text-center red margin-bottom-10p">
                              <i className="fa fa-inr" style={{marginRight: "5px"}}></i> 5,000/-
                            </div>
                            <a href="https://www.instamojo.com/AirOwl/airowl-wi/" rel="im-checkout" data-behaviour="remote" data-style="flat" data-text="Buy AirOwl Wi" data-token="4aaf75271bbcbaa4e9d9bc35a38433d1">

                            </a>
                        </div>

                      </div>
                      <span className="red bold" >
                          Use Discount codes FIRST1000 (1001/- off).<br /> if purchasing more than 10 then PACKOF10. (1501/- off)
                      </span>
                  </div>
                </div>
              </div>
          </div>
        </div>

        <div className="real-data-home-bg real-data no-top-padding no-bottom-padding">
          <div itemScope itemType="http://schema.org/Property" className="black-transparent mobile-no-padding">
            <div className="container">
              <div className="row">
                <div className="col-sm-12 margin-v-50">
                  <div className="col-sm-6 white-card-bg">
                    <div className="">
                      <p className="title-card-bg">
                        Portable and easy assembling
                      </p>
                    </div>
                    <div className="">
                      <p className="desc-card-bg">
                        Designed for all age groups. Simple and easy assembly. No additional tools required.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 margin-bottom-50">
                  <div className="col-sm-6 col-md-offset-3 col-lg-offset-3 white-card-bg">
                    <div className="">
                      <p className="title-card-bg">
                        Consistent Performance and Low Maintenance
                      </p>
                    </div>
                    <div className="">
                      <p className="desc-card-bg">
                        The device runs consistently and only requires some dusting for maintenance (once every 3-5 months).
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 margin-bottom-50">
                  <div className="col-sm-6"></div>
                  <div className="col-sm-6 white-card-bg">
                    <div className="">
                      <p className="title-card-bg">
                        Advance Visualization
                      </p>
                    </div>
                    <div className="">
                      <p className="desc-card-bg">
                        Information is offered in the form of graphs and charts. You can easily understand, monitor and compare the data daily, weekly, monthly and yearly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="half-colored">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 text-center">
                <div className="margin-bottom-50">
                  <span className="h1 primary-black font-capital white title title-border">Know your AirOwl</span>
                  <hr id="white" />
                </div>
                <div className="row" style={{marginBottom: "40px"}}>
                  <div className="col-sm-12 col-md-8 col-lg-8 white-font col-md-offset-2 col-lg-offset-2" >
                    <p >
                      The AirOwl platform is designed for the people to be a part of this revolutionary change. People from different countries, cities and streets can contribute to the society by sharing their data and help in creating a hub for open indicators and distributed tools.
                    </p>
                  </div>
                </div>

                <Tabs selectedIndex={0}>
                  <TabList>
                    <Tab>ARDUINO NANO</Tab>
                    <Tab>DUST SENSOR</Tab>
                    <Tab>GSM BOARD</Tab>
                    <Tab>ADAPTER</Tab>
                    <Tab>CASING</Tab>
                  </TabList>

                  <TabPanel>
                    <div className="col-sm-12 bg-darker-gray tab-div xyz" >
                      <div className="col-sm-6">
                        <img className="img-middle img-tab img-responsive" src="assets/img/arduino_nano.png" />
                      </div>
                      <div className="col-sm-6 vertical-center-parent padding-25 tab-v-container text-left">
                        <div className="vertical-center">
                          <p className="primary-black">
                            A versatile, embedded micro-controller board based upon the popular Arduino format. It can be used on breadboards and can be powered via a Mini-B USB connection, a 6-20V unregulated external power supply, or 5V regulated external power supply. It has 16KB of programmable memory and 14 GPIO pins.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="col-sm-12 bg-darker-gray tab-div xyz">
                      <div className="col-sm-6">
                        <img className="img-middle img-tab img-responsive" src="assets/img/dust_sensor.jpg" />
                      </div>
                      <div className="col-sm-6 vertical-center-parent padding-25 tab-v-container text-left">
                        <div className="vertical-center">
                          <p className="primary-black">
                            The dust sensor provides a good indication of the air quality by measuring the dust concentration. This dust sensor is versatile, accurate and compact in size. Using laser scattering theory, the dust particles present in air are detected, with good selectivity and stability.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="col-sm-12 bg-darker-gray tab-div xyz">
                      <div className="col-sm-6">
                        <img className="img-middle img-tab img-responsive" src="assets/img/gsm.jpg" />
                      </div>
                      <div className="col-sm-6 vertical-center-parent padding-25 tab-v-container text-left">
                        <div className="vertical-center">
                          <p className="primary-black">
                            An ultra-compact and reliable wireless module, the SIM900A is a complete dual-band GSM/GPRS solution in a SMT module. It can be easily embedded in the customer applications. It accepts commands from Arduino Nano through UART. It has an external antenna as well.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="col-sm-12 bg-darker-gray tab-div xyz">
                      <div className="col-sm-6">
                        <img className="img-middle img-tab img-responsive" src="assets/img/adapter.jpg" />
                      </div>
                      <div className="col-sm-6 vertical-center-parent padding-25 tab-v-container text-left">
                        <div className="vertical-center">
                          <p className="primary-black">
                            The simple 5V adapter is the power source for this device. The design of the adapter is similar to that of your mobile adapters. It comes with a one meter length chord.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="col-sm-12 bg-darker-gray tab-div xyz">
                      <div className="col-sm-6">
                        <img className="img-middle img-tab img-responsive" src="assets/img/casing.jpg" />
                      </div>
                      <div className="col-sm-6 vertical-center-parent padding-25 tab-v-container text-left">
                        <div className="vertical-center">
                          <p className="primary-black">
                            The design of the casing is simple yet beautiful. AirOwl can become a part of your prized antiques or gadgets that you have in your house as it is very attractive.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabPanel>

                </Tabs>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white margin-bottom-25 resource" style={{marginTop: '50px'}}>
          <div className="container">
            <div className="row">
              <div className="col-sm-12 text-center">
                <div className="margin-bottom-default hr-orange">
                  <span className="h1 primary-black font-capital title ">Resources!</span>
                  <hr />
                </div>
                <div className="row margin-bottom-default">
                  <div className="col-sm-12 col-md-8 col-lg-8 col-md-offset-2 col-lg-offset-2">
                    <p>
                      It's never late, Good deeds often brings happiness to you and to the people around. Start caring through sharing!
                    </p>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-offset-3">
                  <a className="btn btn-default btn-red fa-btn-custom" href="https://github.com/IndiaOpenDataAssociation/India-Open-Environment-Data-Project/tree/master/Airowl" target="_blank"> <i className="fa fa-github"></i> Github <br /> <span className="small-desc">(Technical Details)</span> </a>
                  <a className="btn btn-default btn-red fa-btn-custom" href="
                            http://knowledge.indiaopendata.com/index.php/AirOwl" target="_blank"> <i className="fa fa-wikipedia-w"></i> Wiki <br /> <span className="small-desc">(Assembly Details)</span></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="know-everything-home-bg know-everything no-bottom-padding no-top-padding">
          <div itemScope itemType="http://schema.org/Property" className="black-transparent padding-50">
            <div className="container">
              <div className="row">
                <div className="col-sm-12 text-center">
                  <div className="margin-bottom-50">
                    <span className="h1 primary-black font-capital title white-border white">Buy owl now and contribute data</span>
                    <hr id="whitelong" />
                  </div>
                  <div className="row margin-bottom-50">
                    <div className="col-sm-12 col-md-8 col-lg-8 col-md-offset-2 col-lg-offset-2">
                      <p className="white">
                        Airowl is a simple and easy to assemble kit that can help you personally monitor the air-quality around you. It offers real-time data on air-quality and also the option of contributing it to an open-data platform for a wider community awareness and promote community action for better air-quality management.
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 margin-v-25">
                      <div className="col-sm-4 mobile-no-padding">
                        <div className="white-vertical-card">
                          <div>
                            <img className="img-responsive white-vertical-card-img" src="assets/img/community/city.png" />
                          </div>
                          <div>
                            <p className="white-vertical-card-title">city</p>
                          </div>
                          <div>
                            <p className="white-vertical-card-desc">
                              City life is infected by the epidemic of air pollution. With advancement in technology, our cities can improve. Through proper monitoring and community action, air pollution can be better addressed. We as responsible citizens have to act accordingly.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4 mobile-no-padding">
                        <div className="white-vertical-card">
                          <div>
                            <img className="img-responsive white-vertical-card-img" src="assets/img/community/research.png" />
                          </div>
                          <div>
                            <p className="white-vertical-card-title">RESEARCH</p>
                          </div>
                          <div>
                            <p className="white-vertical-card-desc">
                              Our tools are open-source. Utilize them in building new products and set an example to showcase how technology, environment and people, together can improve the life on earth and make it more worthy.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4 mobile-no-padding">
                        <div className="white-vertical-card">
                          <div>
                            <img className="img-responsive white-vertical-card-img" src="assets/img/community/persons.png" />
                          </div>
                          <div>
                            <p className="white-vertical-card-title">COMMUNITY</p>
                          </div>
                          <div>
                            <p className="white-vertical-card-desc">
                              We are a community driven by the common goal of achieving better air-quality management.  Help us by joining our group and creating a wider awareness about this global concern and help those in need.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12 ">
                      <div className="col-sm-4 mobile-no-padding">
                        <div className="white-vertical-card">
                          <div>
                            <img className="img-responsive white-vertical-card-img" src="assets/img/community/institution.png"/>
                          </div>
                          <div>
                            <p className="white-vertical-card-title">INSTITUTION</p>
                          </div>
                          <div>
                            <p className="white-vertical-card-desc">
                              Institutional learning can help young minds to actively participate in the global discussion on air pollution. Seminars and workshops can provide the students the knowledge to address this matter better.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4 mobile-no-padding">
                        <div className="white-vertical-card">
                          <div>
                            <img className="img-responsive white-vertical-card-img" src="assets/img/community/personal.png"/>
                          </div>
                          <div>
                            <p className="white-vertical-card-title">personal spaces</p>
                          </div>
                          <div>
                            <p className="white-vertical-card-desc">
                              Indoor air pollution is even more harmful than outdoor air pollution. We fail to understand it because we lack the knowledge about it. Now we can. Take part in addressing air pollution holistically.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4 mobile-no-padding">
                        <div className="white-vertical-card">
                          <div>
                            <img className="img-responsive white-vertical-card-img" src="assets/img/community/developers.png"/>
                          </div>
                          <div>
                            <p className="white-vertical-card-title">Developers</p>
                          </div>
                          <div>
                            <p className="white-vertical-card-desc">
                              Our initiative is an open-source project and we request you to feel free in using our designs and framework to develop something better. We would like you to contribute to this sincere initiative so that more and more people can benfit from it.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <a className="btn btn-yellow" href="http://knowledge.indiaopendata.com/index.php/Open_Environment_Data_Project" target="_blank"> Learn More</a>
                </div>
              </div>
            </div>
          </div>
        </div>


        <Footer />
      </div>
    )
  }
}
