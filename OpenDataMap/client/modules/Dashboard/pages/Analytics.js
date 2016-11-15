import React, {Component} from 'react'
import ReactHighcharts from 'react-highcharts/dist/ReactHighcharts.js'
let arr = [], timeArr =[], newTime;

export default class Analytics extends Component{

  constructor(props){
    super(props)
    this.displayTime = this.displayTime.bind(this)
    this.maxAqi = this.maxAqi.bind(this)
    this.state = {aqiArray : []}
  }

  componentDidMount(){
    if(this.props.analysisData.length > 0) {
      if(arr.length > 0){
        arr = [];
        this.props.analysisData.map((e) => {
          arr.unshift(e.aqi)
        })

      }
      else {
        this.props.analysisData.map((e) => {
          arr.unshift(e.aqi)
        })
      }
      this.setState({aqiArray:arr})


      this.props.analysisData.map((e) => {
        newTime = new Date(e.payload.d.t * 1000)
        var hour = newTime.getHours();
        var hourVal = hour + ':00';
        timeArr.unshift(hourVal)
      })
    }
    // if(arr.length>0){
    //   arr = [];
    //   this.props.analysisData.map((e) => {
    //     arr.unshift(e.aqi)
    //   })
    //   this.setState({aqiArray:arr})
    // }
    // else
    // {
    //   if(this.props.analysisData.length > 0) {
    //
    //     this.props.analysisData.map((e) => {
    //       arr.unshift(e.aqi)
    //     })
    //     this.setState({aqiArray: arr})
    //   }
    // }

    // if(timeArr.length > 0){
    //   timeArr = []
    //
    //   this.props.analysisData.map((e) => {
    //     newTime = new Date(e.payload.d.t * 1000)
    //     var hour = newTime.getHours();
    //     var hourVal = hour + ':00';
    //     timeArr.unshift(hourVal)
    //   })
    // }
    // else {
    //
    //   if(this.props.analysisData.length > 0){
    //     this.props.analysisData.map((e) => {
    //       newTime = new Date(e.payload.d.t * 1000)
    //       var hour = newTime.getHours();
    //       var hourVal = hour + ':00';
    //       timeArr.unshift(hourVal)
    //     })
    //   }
    // }
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

  maxAqi() {
    return Math.max(...arr)
  }





  render(){
    var config = {
      chart: {
        backgroundColor: 'transparent',
        width: 350,
        height: 170,
        type: 'areaspline'
      },
      colors: ['#00b3bf'],

      title: {
        text: 'Max AQI: '+this.maxAqi(),
        style: {
          color: 'white',
          fontSize: '14px'
        }
      },

      legend:{
        enabled:false
      },

      credits: {
        enabled: false
      },

      xAxis: {
        categories : timeArr,
        labels: {
          style: {
            color: '#FFF'
          }
        }
      },

      yAxis: {
        labels: {
          style: {
            color: '#FFF'
          }
        },
        title: {
          text: null
        }
      },

      series: [{
        name: 'Data',
        data: this.state.aqiArray,
        fillColor: 'rgba(255,255,255, 0.1)',
        marker: {
          enabled: false
        },

      }]
    };
    return(
      <div className="dashboard-home">
        <div className="home-top-content row">
          <span className="col-sm-6 col-xs-6">Outdoor</span>
          <span className="col-sm-6 col-xs-6">as of: {this.displayTime()}</span>
        </div>
        <div className="home-bottom-content">
          {
            this.props.analysisData == true
            ?
              <div className="analytics-chart">

              </div>
              :
              <div className="analytics-chart">
                <span>Last 24 hours data</span>
                {
                  this.state.aqiArray.length > 0
                  ?
                    <ReactHighcharts config = {config}></ReactHighcharts>
                  :
                    null
                }
              </div>
          }


          <div className="average-cal">
            <p style={{textAlign: 'center', color: 'white', fontSize: '13px'}}>Last hour Average</p>
            <div className="row">

                {
                  this.props.realtimeData.map((gases) => {
                    return Object.keys(gases.payload.d).map((key, index) => {
                      return(

                        key!='t' && gases.payload.d[key] > 1
                        ?
                        (
                          <div className="col-sm-3 col-xs-3">
                            <div className="avg-container">
                              <p className="readings">{Math.trunc(gases.payload.d[key])}</p>
                              <p className="units">
                                {
                                  key == 'temp'
                                  ?
                                    'C'
                                  :
                                    'u3/mg'
                                }
                              </p>
                            </div>
                            <p style={{textAlign: 'center', fontFamily: 'Bebasneues', color: 'white', marginTop: '10px'}}>
                              {
                                key == 'pm10'
                                ?
                                  'PM 10'
                                :
                                  (
                                    key == 'pm25'
                                    ?
                                      'PM 2.5'
                                    :
                                      (
                                        key == 'hum'
                                        ?
                                          'Humidity'
                                        :
                                          (
                                            key == 'so2'
                                            ?
                                              'SO 2'
                                            :
                                              (
                                                key == 'no2'
                                                ?
                                                  'NO 2'
                                                :
                                                  (
                                                    key == 'o3'
                                                    ?
                                                      'O 3'
                                                    :
                                                      key
                                                  )
                                              )

                                          )
                                      )
                                  )
                              }
                            </p>
                          </div>
                        )
                        :
                        null


                      )
                    })
                  })
                }




            </div>
          </div>
          {/*<div style={{padding: '9px'}}></div>*/}

        </div>
      </div>
    )
  }
}

