import React, {Component} from 'react'
import GoogleMapLoader from "react-google-maps/lib/GoogleMapLoader";
import GoogleMap from "react-google-maps/lib/GoogleMap";
import fancyMapStyles from "../Mapstyle.json"

export default class LoadingMap extends Component {
  constructor(props){
    super(props)
    this.state = this.getState()
  }

  getState(){
    return{
      lat: 22.9734,
      lng: 78.6569,
      zoom: 5
    }
  }
  // componentWillReceiveProps(nextProps){
  //   if(this.props.cityValue != nextProps.cityValue){
  //     if(cities[nextProps.cityValue] != undefined) {
  //       this.setState({lat: cities[nextProps.cityValue].latitude, lng: cities[nextProps.cityValue].longitude, zoom: 11})
  //     } else {
  //       this.setState(this.getState())
  //     }
  //   }
  //
  // }

  render() {
    return (
      <div style={{height: "100%", pointerEvents: 'none', opacity: '0.4'}}>
        <GoogleMapLoader
          containerElement={
            <div
              {...this.props.containerElementProps}
              style={{
                height: "92.5vh",
              }}
            />
          }
          googleMapElement={
            <GoogleMap

              defaultZoom={5}
              zoom = {this.state.zoom}
              defaultCenter={{ lat: 22.9734 , lng: 78.6569 }}
              center={{lat: this.state.lat , lng: this.state.lng}}
              onClick={this.props.onMapClick}
              defaultOptions={{ styles: fancyMapStyles }}

            >

            </GoogleMap>
          }
        />
      </div>
    )
  }
}
