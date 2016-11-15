import React, {Component} from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import {Link} from 'react-router'

export default class Community extends Component{
  render(){
    return(
      <div className="about">
        <Navbar />
        <div  className="about-styles text-center ">
          <div className="overlay">
            <img src="../assets/images/community.jpg" className="img-header" />
            <div className="middle-title">
              <div className="title-container container">
                <h1 className="white bold ">
                  Join hands to become the agents of change. Be at the forefront of solution makers not pollution makers.
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="container community-container">
            <div className="margin-bottom-50">
              <p className="primary-black">
                If you share the same vision, interest, desire and the capability to achieve the common goals of solving the air-quality problem in your habitat — city, town, village, or any other part of the world, then please join our initiative.
              </p>

              <p className="primary-black ">
                We don’t aim to offer the final solution, but we aim to bring your ideas, opinions, capabilities and strength to a wider public for active community participation. We do not aim for any specific target group's engagement. We welcome anyone from any walk of life to join us. We believe you can contribute to address this issue in your own unique way.
              </p>
            </div>

            <div className="row">
              <div className="col-md-6 community-info">
                <div className="text-center margin-bottom-small">
                  <span>
                    <i className="fa fa-2x fa-wikipedia-w theme-color"></i>
                  </span>
                </div>
                <p className="bold">Enhance ours as well as your knowledge base. Access our wiki to know more and add your feedback, knowledge to widen the boundaries of wisdom.</p>
              </div>
              <div className="col-md-6 community-info">
                <div className="text-center margin-bottom-small">
                  <span>
                    <i className="fa fa-2x fa-creative-commons theme-color"></i>
                  </span>
                </div>
                <p className="bold">Be the agents of change. Help in the redesign of the open source solutions (hardware, software, server, visualisation) we have as of now with us.</p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 community-info">
                <div className="text-center margin-bottom-small">
                  <span>
                    <i className="fa fa-2x fa-database theme-color"></i>
                  </span>
                </div>
                <p className="bold">More data means more knowledge. Kindly donate your air-quality data to the platform.</p>
              </div>
              <div className="col-md-6 community-info">
                <div className="text-center margin-bottom-small">
                  <span>
                    <i className="fa fa-2x fa-share-alt theme-color"></i>
                  </span>
                </div>
                <p className="bold">Actions are multi-dimensional. Kindly share the knowledge of your recommended actions.</p>
              </div>
            </div>

          </div>
        </div>

        <div className="bg-gray">
          <div className="container community-info">
            <h2 className="text-center margin-bottom-25">
              Resources
            </h2>

            <div className="row resources-content margin-bottom-50">
              <div className="col-md-3 text-center">
                <a href="http://knowledge.indiaopendata.com/index.php/People" target="_blank">
                  <span><i className="fa fa-users primary-black"></i></span>
                </a>
                <p className="h4 primary-black"> People </p>
              </div>

              <div className="col-md-3 text-center">
                <Link to="/devices">
                  <span><i className="fa fa-cog primary-black"></i></span>
                </Link>
                <p className="h4 primary-black"> Devices </p>
              </div>

              <div className="col-md-3 text-center">
                <a href="https://github.com/IndiaOpenDataAssociation/India-Open-Environment-Data-Project" target="_blank">
                  <span><i className="fa fa-github primary-black"></i></span>
                </a>
                <p className="h4 primary-black"> Github </p>
              </div>

              <div className="col-md-3 text-center">
                <Link to="/openapi">
                  <span><i className="fa fa-server primary-black"></i></span>
                </Link>
                <p className="h4 primary-black"> API </p>
              </div>
            </div>

          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
