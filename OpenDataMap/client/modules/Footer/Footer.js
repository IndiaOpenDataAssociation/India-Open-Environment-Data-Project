import React, {Component} from 'react'

export default class Footer extends Component{
  render(){
    return(
      <div className="black-bg footer-container">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="text-center white col-sm-10 col-sm-offset-1 col-md-offset-1 col-lg-offset-1">
                <div className="margin-bottom-50">
                  <h2 className="white-font bold">
                    IT'S TIME TO GIVE THE ENVIRONMENT A CLOSER LOOK.<br />
                    LET'S JOIN HANDS FOR HEALTHIER TOMORROW!
                  </h2>
                </div>
                <div className="text-center margin-bottom-50">
                  <a className="btn btn-transparent join-btn" href="https://docs.google.com/forms/d/1G1SyMFx8aZJWFlY1_DqArcs6G7F9Lk8RLz5_SJREQuE/viewform?c=0&w=1" target="_blank">Join Us!</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
