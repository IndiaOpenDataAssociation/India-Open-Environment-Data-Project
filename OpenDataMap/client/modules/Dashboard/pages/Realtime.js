import React, {Component} from 'react'

export default class Realtime extends Component{
  constructor(props){
    super(props)
    this.displayTime = this.displayTime.bind(this)
  }

  displayTime(){
    let a = new Date(this.props.timeStamp * 1000)

    var year = a.getFullYear().toString().substr(2,2);
    var month = a.getMonth() + 1;
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var ampm = hour >= 12 ? 'pm' : 'am'
    let displayTime = date + '-' + month + "-" + year + ' ' + hour + ':' + min + ampm;
     return displayTime
  }

  render(){
    return(
          this.props.loadingState == true
          ?
            <div className="dashboard-home">
              <div className="home-top-content row">
                <span className="col-sm-6 col-xs-6">Outdoor</span>
                <span className="col-sm-6 col-xs-6"></span>
              </div>
              <div className="home-bottom-content">
                <div className="aqiinfo">
                  <svg version="1.1" id="Default" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  width="272px" height="228px" viewBox="0 0 272 228" className="svg-center aqiinfo-svgimg" enableBackground="new 0 0 272 228" xmlSpace="preserve">
                  <g id="ARC_1_">
                  <path fill="transparent" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M191.404,187.424l8.573,11.171c20.739-15.914,34.309-39.416,37.721-65.335l-13.961-1.838
                  C220.813,153.638,209.183,173.782,191.404,187.424z"/>
                  </g>
                  <g id="ARC_2_">
                  <path fill="transparent" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M88.799,187.424l-8.573,11.171c-20.739-15.914-34.309-39.416-37.721-65.335l13.961-1.838
                  C59.391,153.638,71.021,173.782,88.799,187.424z"/>
                  </g>
                  <g id="ARC_3_">
                  <path fill="transparent" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M224.2,127.022l14.038,1.104c2.051-26.061-6.335-51.871-23.313-71.75l-10.708,9.145
                  C218.77,82.562,225.958,104.684,224.2,127.022z"/>
                  </g>
                  <g id="ARC_5_">
                  <path fill="transparent" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M211.472,52.542l-10.214,9.693c-15.425-16.254-36.675-25.715-59.075-26.302l0.369-14.077
                  C168.686,22.542,193.477,33.579,211.472,52.542z"/>
                  </g>
                  <g id="ARC_7_">
                  <path fill="transparent" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M78.686,62.235l-10.215-9.693c17.995-18.963,42.787-30.001,68.92-30.686l0.369,14.077
                  C115.359,36.521,94.109,45.981,78.686,62.235z"/>
                  </g>

                  <path fill="transparent" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M41.703,128.129c-2.027-25.758,6.14-51.643,23.315-71.751l10.708,9.145
                  c-14.553,17.039-21.741,39.162-19.983,61.5l-14.038,1.104"></path>
                  </svg>
                </div>
              </div>
            </div>
          :

          <div className="dashboard-home">
            <div className="home-top-content row">
              <span className="col-sm-6 col-xs-6">Outdoor</span>
              <span className="col-sm-6 col-xs-6">as of: {this.displayTime()}</span>
            </div>
            <div className="home-bottom-content">
                <div className="aqiinfo">
                  {
                    this.props.realtimeData[0].aqi <= 50
                      ?
                      <svg version="1.1" id="Default" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  width="272px" height="228px" viewBox="0 0 272 228" className="svg-center aqiinfo-svgimg" enableBackground="new 0 0 272 228" xmlSpace="preserve">
                        <g id="ARC_1_">
                          <path fill="transparent" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M191.404,187.424l8.573,11.171c20.739-15.914,34.309-39.416,37.721-65.335l-13.961-1.838
                        C220.813,153.638,209.183,173.782,191.404,187.424z"/>
                        </g>
                        <g id="ARC_2_">
                          <path fill="#6ecc58" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M88.799,187.424l-8.573,11.171c-20.739-15.914-34.309-39.416-37.721-65.335l13.961-1.838
                        C59.391,153.638,71.021,173.782,88.799,187.424z"/>
                        </g>
                        <g id="ARC_3_">
                          <path fill="transparent" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M224.2,127.022l14.038,1.104c2.051-26.061-6.335-51.871-23.313-71.75l-10.708,9.145
                        C218.77,82.562,225.958,104.684,224.2,127.022z"/>
                        </g>
                        <g id="ARC_5_">
                          <path fill="transparent" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M211.472,52.542l-10.214,9.693c-15.425-16.254-36.675-25.715-59.075-26.302l0.369-14.077
                        C168.686,22.542,193.477,33.579,211.472,52.542z"/>
                        </g>
                        <g id="ARC_7_">
                          <path fill="transparent" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M78.686,62.235l-10.215-9.693c17.995-18.963,42.787-30.001,68.92-30.686l0.369,14.077
                        C115.359,36.521,94.109,45.981,78.686,62.235z"/>
                        </g>

                        <path fill="transparent" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M41.703,128.129c-2.027-25.758,6.14-51.643,23.315-71.751l10.708,9.145
                          c-14.553,17.039-21.741,39.162-19.983,61.5l-14.038,1.104"></path>
                      </svg>
                      :
                      (
                        this.props.realtimeData[0].aqi > 50 && this.props.realtimeData[0].aqi < 101
                          ?
                          <svg version="1.1" id="Default" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  width="272px" height="228px" viewBox="0 0 272 228" className="svg-center aqiinfo-svgimg" enableBackground="new 0 0 272 228" xmlSpace="preserve">
                            <g id="ARC_1_">
                              <path fill="transparent" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M191.404,187.424l8.573,11.171c20.739-15.914,34.309-39.416,37.721-65.335l-13.961-1.838
                        C220.813,153.638,209.183,173.782,191.404,187.424z"/>
                            </g>
                            <g id="ARC_2_">
                              <path fill="#bbcf4c" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M88.799,187.424l-8.573,11.171c-20.739-15.914-34.309-39.416-37.721-65.335l13.961-1.838
                        C59.391,153.638,71.021,173.782,88.799,187.424z"/>
                            </g>
                            <g id="ARC_3_">
                              <path fill="transparent" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M224.2,127.022l14.038,1.104c2.051-26.061-6.335-51.871-23.313-71.75l-10.708,9.145
                        C218.77,82.562,225.958,104.684,224.2,127.022z"/>
                            </g>
                            <g id="ARC_5_">
                              <path fill="transparent" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M211.472,52.542l-10.214,9.693c-15.425-16.254-36.675-25.715-59.075-26.302l0.369-14.077
                        C168.686,22.542,193.477,33.579,211.472,52.542z"/>
                            </g>
                            <g id="ARC_7_">
                              <path fill="transparent" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M78.686,62.235l-10.215-9.693c17.995-18.963,42.787-30.001,68.92-30.686l0.369,14.077
                        C115.359,36.521,94.109,45.981,78.686,62.235z"/>
                            </g>

                            <path fill="#bbcf4c" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M41.703,128.129c-2.027-25.758,6.14-51.643,23.315-71.751l10.708,9.145
                          c-14.553,17.039-21.741,39.162-19.983,61.5l-14.038,1.104"></path>
                          </svg>
                          :
                          (
                            this.props.realtimeData[0].aqi > 100 && this.props.realtimeData[0].aqi < 201
                              ?
                              <svg version="1.1" id="Default" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  width="272px" height="228px" viewBox="0 0 272 228" className="svg-center aqiinfo-svgimg" enableBackground="new 0 0 272 228" xmlSpace="preserve">
                                <g id="ARC_1_">
                                  <path fill="transparent" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M191.404,187.424l8.573,11.171c20.739-15.914,34.309-39.416,37.721-65.335l-13.961-1.838
                        C220.813,153.638,209.183,173.782,191.404,187.424z"/>
                                </g>
                                <g id="ARC_2_">
                                  <path fill="#eac736" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M88.799,187.424l-8.573,11.171c-20.739-15.914-34.309-39.416-37.721-65.335l13.961-1.838
                        C59.391,153.638,71.021,173.782,88.799,187.424z"/>
                                </g>
                                <g id="ARC_3_">
                                  <path fill="transparent" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M224.2,127.022l14.038,1.104c2.051-26.061-6.335-51.871-23.313-71.75l-10.708,9.145
                        C218.77,82.562,225.958,104.684,224.2,127.022z"/>
                                </g>
                                <g id="ARC_5_">
                                  <path fill="transparent" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M211.472,52.542l-10.214,9.693c-15.425-16.254-36.675-25.715-59.075-26.302l0.369-14.077
                        C168.686,22.542,193.477,33.579,211.472,52.542z"/>
                                </g>
                                <g id="ARC_7_">
                                  <path fill="#eac736" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M78.686,62.235l-10.215-9.693c17.995-18.963,42.787-30.001,68.92-30.686l0.369,14.077
                        C115.359,36.521,94.109,45.981,78.686,62.235z"/>
                                </g>

                                <path fill="#eac736" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M41.703,128.129c-2.027-25.758,6.14-51.643,23.315-71.751l10.708,9.145
                          c-14.553,17.039-21.741,39.162-19.983,61.5l-14.038,1.104"></path>
                              </svg>
                              :
                              (
                                this.props.realtimeData[0].aqi > 200 && this.props.realtimeData[0].aqi < 301
                                  ?
                                  <svg version="1.1" id="Default" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  width="272px" height="228px" viewBox="0 0 272 228" className="svg-center aqiinfo-svgimg" enableBackground="new 0 0 272 228" xmlSpace="preserve">
                                    <g id="ARC_1_">
                                      <path fill="transparent" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M191.404,187.424l8.573,11.171c20.739-15.914,34.309-39.416,37.721-65.335l-13.961-1.838
                        C220.813,153.638,209.183,173.782,191.404,187.424z"/>
                                    </g>
                                    <g id="ARC_2_">
                                      <path fill="#ed9a2e" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M88.799,187.424l-8.573,11.171c-20.739-15.914-34.309-39.416-37.721-65.335l13.961-1.838
                        C59.391,153.638,71.021,173.782,88.799,187.424z"/>
                                    </g>
                                    <g id="ARC_3_">
                                      <path fill="transparent" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M224.2,127.022l14.038,1.104c2.051-26.061-6.335-51.871-23.313-71.75l-10.708,9.145
                        C218.77,82.562,225.958,104.684,224.2,127.022z"/>
                                    </g>
                                    <g id="ARC_5_">
                                      <path fill="#ed9a2e" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M211.472,52.542l-10.214,9.693c-15.425-16.254-36.675-25.715-59.075-26.302l0.369-14.077
                        C168.686,22.542,193.477,33.579,211.472,52.542z"/>
                                    </g>
                                    <g id="ARC_7_">
                                      <path fill="#ed9a2e" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M78.686,62.235l-10.215-9.693c17.995-18.963,42.787-30.001,68.92-30.686l0.369,14.077
                        C115.359,36.521,94.109,45.981,78.686,62.235z"/>
                                    </g>

                                    <path fill="#ed9a2e" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M41.703,128.129c-2.027-25.758,6.14-51.643,23.315-71.751l10.708,9.145
                          c-14.553,17.039-21.741,39.162-19.983,61.5l-14.038,1.104"></path>
                                  </svg>
                                  :
                                  (
                                    this.props.realtimeData[0].aqi > 300 && this.props.realtimeData[0].aqi < 401
                                      ?
                                      <svg version="1.1" id="Default" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  width="272px" height="228px" viewBox="0 0 272 228" className="svg-center aqiinfo-svgimg" enableBackground="new 0 0 272 228" xmlSpace="preserve">
                                        <g id="ARC_1_">
                                          <path fill="transparent" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M191.404,187.424l8.573,11.171c20.739-15.914,34.309-39.416,37.721-65.335l-13.961-1.838
                        C220.813,153.638,209.183,173.782,191.404,187.424z"/>
                                        </g>
                                        <g id="ARC_2_">
                                          <path fill="#e8633a" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M88.799,187.424l-8.573,11.171c-20.739-15.914-34.309-39.416-37.721-65.335l13.961-1.838
                        C59.391,153.638,71.021,173.782,88.799,187.424z"/>
                                        </g>
                                        <g id="ARC_3_">
                                          <path fill="#e8633a" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M224.2,127.022l14.038,1.104c2.051-26.061-6.335-51.871-23.313-71.75l-10.708,9.145
                        C218.77,82.562,225.958,104.684,224.2,127.022z"/>
                                        </g>
                                        <g id="ARC_5_">
                                          <path fill="#e8633a" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M211.472,52.542l-10.214,9.693c-15.425-16.254-36.675-25.715-59.075-26.302l0.369-14.077
                        C168.686,22.542,193.477,33.579,211.472,52.542z"/>
                                        </g>
                                        <g id="ARC_7_">
                                          <path fill="#e8633a" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M78.686,62.235l-10.215-9.693c17.995-18.963,42.787-30.001,68.92-30.686l0.369,14.077
                        C115.359,36.521,94.109,45.981,78.686,62.235z"/>
                                        </g>

                                        <path fill="#e8633a" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M41.703,128.129c-2.027-25.758,6.14-51.643,23.315-71.751l10.708,9.145
                          c-14.553,17.039-21.741,39.162-19.983,61.5l-14.038,1.104"></path>
                                      </svg>
                                      :
                                      <svg version="1.1" id="Default" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  width="272px" height="228px" viewBox="0 0 272 228" className="svg-center aqiinfo-svgimg" enableBackground="new 0 0 272 228" xmlSpace="preserve">
                                        <g id="ARC_1_">
                                          <path fill="#d63636" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M191.404,187.424l8.573,11.171c20.739-15.914,34.309-39.416,37.721-65.335l-13.961-1.838
                        C220.813,153.638,209.183,173.782,191.404,187.424z"/>
                                        </g>
                                        <g id="ARC_2_">
                                          <path fill="#d63636" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M88.799,187.424l-8.573,11.171c-20.739-15.914-34.309-39.416-37.721-65.335l13.961-1.838
                        C59.391,153.638,71.021,173.782,88.799,187.424z"/>
                                        </g>
                                        <g id="ARC_3_">
                                          <path fill="#d63636" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M224.2,127.022l14.038,1.104c2.051-26.061-6.335-51.871-23.313-71.75l-10.708,9.145
                        C218.77,82.562,225.958,104.684,224.2,127.022z"/>
                                        </g>
                                        <g id="ARC_5_">
                                          <path fill="#d63636" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M211.472,52.542l-10.214,9.693c-15.425-16.254-36.675-25.715-59.075-26.302l0.369-14.077
                        C168.686,22.542,193.477,33.579,211.472,52.542z"/>
                                        </g>
                                        <g id="ARC_7_">
                                          <path fill="#d63636" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M78.686,62.235l-10.215-9.693c17.995-18.963,42.787-30.001,68.92-30.686l0.369,14.077
                        C115.359,36.521,94.109,45.981,78.686,62.235z"/>
                                        </g>

                                        <path fill="#d63636" stroke="#ffffff" strokeWidth="0.7087" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M41.703,128.129c-2.027-25.758,6.14-51.643,23.315-71.751l10.708,9.145
                          c-14.553,17.039-21.741,39.162-19.983,61.5l-14.038,1.104"></path>
                                      </svg>
                                  )
                              )
                          )
                      )
                  }


                  <div className="realtime-label">
                    <span style={{color: 'white', fontSize: '56px', fontFamily: 'Bebasneues'}}>{this.props.realtimeData[0].aqi}</span>
                    <br />
                    <span style={{color: 'white', fontSize: '20px'}}>
                      {
                        this.props.realtimeData[0].aqi <= 50
                          ?
                          'Good'
                          :
                          (
                            this.props.realtimeData[0].aqi > 50 && this.props.realtimeData[0].aqi < 101
                              ?
                              'Satisfactory'
                              :
                              (
                                this.props.realtimeData[0].aqi > 100 && this.props.realtimeData[0].aqi < 201
                                  ?
                                  'Moderate'
                                  :
                                  (
                                    this.props.realtimeData[0].aqi > 200 && this.props.realtimeData[0].aqi < 301
                                      ?
                                      'Poor'
                                      :
                                      (
                                        this.props.realtimeData[0].aqi > 300 && this.props.realtimeData[0].aqi < 401
                                          ?
                                          'Very Poor'
                                          :
                                          'Severe'
                                      )
                                  )
                              )
                          )
                      }
                    </span>
                  </div>
                </div>

              {
                this.props.realtimeData[0].aqi <= 50
                ?
                  <div className="realtime-data">

                    <ul className="realtime-data-list">
                      <li className="sign"><img src="assets/images/icons/do.png" /></li>
                      <li className="activity-icon"><img src="assets/images/icons/n_baby_out.png" /></li>
                      <li className="activity-title"><span>Take baby out</span></li>
                    </ul>

                    <ul className="realtime-data-list">
                      <li className="sign"><img src="assets/images/icons/prefferd.png" /></li>
                      <li className="activity-icon"><img src="assets/images/icons/p_dinner_out.png" /></li>
                      <li className="activity-title"><span>Take dinner out</span></li>
                    </ul>

                    <ul className="realtime-data-list">
                      <li className="sign"><img src="assets/images/icons/do.png" /></li>
                      <li className="activity-icon"><img src="assets/images/icons/p_pet_walk.png" /></li>
                      <li className="activity-title"><span>Take pet for walk</span></li>
                    </ul>

                    <ul className="realtime-data-list">
                      <li className="sign"><img src="assets/images/icons/prefferd.png" /></li>
                      <li className="activity-icon"><img src="assets/images/icons/p_photography.png" /></li>
                      <li className="activity-title" style={{padding: '12px 5px 15px'}}><span>Explore nature by photography</span></li>
                    </ul>

                  </div>
                :
                  (
                    this.props.realtimeData[0].aqi > 50 && this.props.realtimeData[0].aqi < 101
                    ?
                      <div className="realtime-data">

                        <ul className="realtime-data-list">
                          <li className="sign"><img src="assets/images/icons/do.png" /></li>
                          <li className="activity-icon"><img src="assets/images/icons/p_cycling.png" /></li>
                          <li className="activity-title"><span>Cycling</span></li>
                        </ul>

                        <ul className="realtime-data-list">
                          <li className="sign"><img src="assets/images/icons/do.png" /></li>
                          <li className="activity-icon"><img src="assets/images/icons/p_jogging.png" /></li>
                          <li className="activity-title"><span>Jogging</span></li>
                        </ul>

                        <ul className="realtime-data-list">
                          <li className="sign"><img src="assets/images/icons/prefferd.png" /></li>
                          <li className="activity-icon"><img src="assets/images/icons/p_plantation.png" /></li>
                          <li className="activity-title"><span>Take pet for walk</span></li>
                        </ul>

                        <ul className="realtime-data-list">
                          <li className="sign"><img src="assets/images/icons/do.png" /></li>
                          <li className="activity-icon"><img src="assets/images/icons/n_use_two_wheeler.png" /></li>
                          <li className="activity-title"><span>Use two wheeler</span></li>
                        </ul>

                      </div>
                    :
                      (
                        this.props.realtimeData[0].aqi > 100 && this.props.realtimeData[0].aqi < 201
                        ?
                          <div className="realtime-data">

                            <ul className="realtime-data-list">
                              <li className="sign"><img src="assets/images/icons/dont.png" /></li>
                              <li className="activity-icon"><img src="assets/images/icons/n_baby_out.png" /></li>
                              <li className="activity-title"><span>Take baby out</span></li>
                            </ul>

                            <ul className="realtime-data-list">
                              <li className="sign"><img src="assets/images/icons/do.png" /></li>
                              <li className="activity-icon"><img src="assets/images/icons/y_use_public_transport.png" /></li>
                              <li className="activity-title"><span>Use public transport</span></li>
                            </ul>

                            <ul className="realtime-data-list">
                              <li className="sign"><img src="assets/images/icons/dont.png" /></li>
                              <li className="activity-icon"><img src="assets/images/icons/n_smoking.png" /></li>
                              <li className="activity-title"><span>Smoking</span></li>
                            </ul>

                            <ul className="realtime-data-list">
                              <li className="sign"><img src="assets/images/icons/dont.png" /></li>
                              <li className="activity-icon"><img src="assets/images/icons/n_fire.png" /></li>
                              <li className="activity-title" ><span>Fire light</span></li>
                            </ul>

                          </div>
                        :
                          (
                            this.props.realtimeData[0].aqi > 200 && this.props.realtimeData[0].aqi < 301
                            ?
                              <div className="realtime-data">

                                <ul className="realtime-data-list">
                                  <li className="sign"><img src="assets/images/icons/do.png" /></li>
                                  <li className="activity-icon"><img src="assets/images/icons/y_use_mask.png" /></li>
                                  <li className="activity-title" ><span>Use mask</span></li>
                                </ul>

                                <ul className="realtime-data-list">
                                  <li className="sign"><img src="assets/images/icons/do.png" /></li>
                                  <li className="activity-icon"><img src="assets/images/icons/y_use_public_transport.png" /></li>
                                  <li className="activity-title"><span>Use public transport</span></li>
                                </ul>

                                <ul className="realtime-data-list">
                                  <li className="sign"><img src="assets/images/icons/dont.png" /></li>
                                  <li className="activity-icon"><img src="assets/images/icons/n_use_two_wheeler.png" /></li>
                                  <li className="activity-title"><span>Use two wheeler</span></li>
                                </ul>

                                <ul className="realtime-data-list">
                                  <li className="sign"><img src="assets/images/icons/dont.png" /></li>
                                  <li className="activity-icon"><img src="assets/images/icons/n_baby_out.png" /></li>
                                  <li className="activity-title"><span>Take baby out</span></li>
                                </ul>

                              </div>
                            :
                              (
                                this.props.realtimeData[0].aqi > 300 && this.props.realtimeData[0].aqi < 401
                                ?
                                  <div className="realtime-data">

                                    <ul className="realtime-data-list">
                                      <li className="sign"><img src="assets/images/icons/do.png" /></li>
                                      <li className="activity-icon"><img src="assets/images/icons/y_use_mask.png" /></li>
                                      <li className="activity-title" ><span>Use mask</span></li>
                                    </ul>

                                    <ul className="realtime-data-list">
                                      <li className="sign"><img src="assets/images/icons/do.png" /></li>
                                      <li className="activity-icon"><img src="assets/images/icons/y_wear_protective_eye_glasses.png" /></li>
                                      <li className="activity-title"><span>Wear protective eye glasses</span></li>
                                    </ul>

                                    <ul className="realtime-data-list">
                                      <li className="sign"><img src="assets/images/icons/dont.png" /></li>
                                      <li className="activity-icon"><img src="assets/images/icons/n_use_two_wheeler.png" /></li>
                                      <li className="activity-title"><span>Use two wheeler</span></li>
                                    </ul>

                                    <ul className="realtime-data-list">
                                      <li className="sign"><img src="assets/images/icons/do.png" /></li>
                                      <li className="activity-icon"><img src="assets/images/icons/y_use_public_transport.png" /></li>
                                      <li className="activity-title"><span>Use public transport</span></li>
                                    </ul>

                                  </div>
                                :
                                  <div className="realtime-data">

                                    <ul className="realtime-data-list">
                                      <li className="sign"><img src="assets/images/icons/do.png" /></li>
                                      <li className="activity-icon"><img src="assets/images/icons/y_use_mask.png" /></li>
                                      <li className="activity-title" ><span>Use mask</span></li>
                                    </ul>

                                    <ul className="realtime-data-list">
                                      <li className="sign"><img src="assets/images/icons/dont.png" /></li>
                                      <li className="activity-icon"><img src="assets/images/icons/n_use_two_wheeler.png" /></li>
                                      <li className="activity-title"><span>Use two wheeler</span></li>
                                    </ul>

                                    <ul className="realtime-data-list">
                                      <li className="sign"><img src="assets/images/icons/dont.png" /></li>
                                      <li className="activity-icon"><img src="assets/images/icons/n_smoking.png" /></li>
                                      <li className="activity-title"><span>Smoking</span></li>
                                    </ul>

                                    <ul className="realtime-data-list">
                                      <li className="sign"><img src="assets/images/icons/do.png" /></li>
                                      <li className="activity-icon"><img src="assets/images/icons/y_use_public_transport.png" /></li>
                                      <li className="activity-title"><span>Use public transport</span></li>
                                    </ul>

                                  </div>
                              )
                          )
                      )
                  )
              }



              {/*<div style={{padding: '9px'}}></div>*/}

              </div>
          </div>
    )
  }
}
