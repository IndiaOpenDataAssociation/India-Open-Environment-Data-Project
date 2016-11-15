import React, {Component} from 'react'
import mapStyle from '../Dashboard/Mapstyle.json'

export default class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {lat: 22.9734, lng: 78.6569, zoom: 5, cityChanged: this.props.cityChanged}
    this.renderMarkers = this.renderMarkers.bind(this)
    this.renderInfoWindow = this.renderInfoWindow.bind(this)
  }

  componentWillReceiveProps(nextProps) {

    //updating center of map on dropdown change
    if (this.props.cityValue != nextProps.cityValue) {
      this.setState({cityChanged: nextProps.cityChanged})
      if (nextProps.cities[nextProps.cityValue] != undefined) {

        let nextLatitude  =  nextProps.cities[nextProps.cityValue].latitude
        let nextLongitude =  nextProps.cities[nextProps.cityValue].longitude
        this.map.setCenter({lat: nextLatitude, lng: nextLongitude})
        this.map.setZoom(11)
      } else {
        this.map.setCenter({lat: 22.9734, lng: 78.6569})
        this.map.setZoom(5)
      }
    }
  }

  mapCenterLatLng() {
    return new google.maps.LatLng(22.9734, 78.6569);
  }

  renderMarkers(markers, map) {
    var infowindow = new google.maps.InfoWindow();
    let pins = markers.map((marker)=> {

      let loc = new google.maps.LatLng(marker.latitude, marker.longitude);
      let pin = new google.maps.Marker({
        position: loc,
        map: map,
        icon: this.getMarkerImage(marker.aqi)
      });

      pin.addListener('mouseover',function () {
        infowindow.setContent(this.renderInfoWindow(marker));
        infowindow.open(pin.get('map'), pin);
      }.bind(this))
      pin.addListener('click',function () {
          this.props.setDisable(false,  marker.label, marker.deviceType);
          this.props.callRealtime(marker.deviceId, marker.t);
          this.props.callAnalytics(marker.deviceId, marker.t)
      }.bind(this))
      return pin
    })

    //render cluster
    var markerCluster = new MarkerClusterer(this.map, pins);

  }

  renderInfoWindow(marker) {
   var html ='<div class="infowindow-content">'
            +'<div class="infowindow-head">'
            +'<strong>'+marker.loc+'</strong>'
            +'</div>'
            +'<div class="infowindow-body">'
            +'<div class="left-content">'
            +'<div><i class="fa fa-map-marker"></i>'+marker.deviceType+'</div>'
            +'<div><i class="fa fa-map-marker"></i>'+marker.state+'</div>'
            +'<div><i class="fa fa-home"></i>Indoor <span style="margin-left: 20px;"> <i class="fa fa-circle" aria-hidden="true" style="color: #73C076;"></i>Online</span></div>'
            +'<div class="aqi">'
            +'<div class="progress-pie-chart '+this.getClass250(marker.aqi)+ ' '+ this.renderClass(marker.aqi)+'" id="ppc" > <div class="ppc-progress"> <div class="ppc-progress-fill '+ this.renderClass(marker.aqi)+'" style="transform: rotate('+this.getDegree(marker.aqi).deg+'deg)"></div> </div> <div class="ppc-percents"> <div class="pcc-percents-wrapper"> <span>'+marker.aqi+'</span></div></div></div>'
            +'</div></div></div></div>'
            return html;
  }

  getClass250(aqi){
    if(aqi > 250){
      return 'gt-250'
    }
    else {
      return ''
    }

  }

  renderClass(aqi){
    if (aqi <= 50) {
      return 'good'
    }
    else if (aqi > 50 && aqi < 101) {
      return 'satisfactory'
    }
    else if (aqi > 100 && aqi < 201) {
      return 'moderate'
    }
    else if (aqi > 200 && aqi < 301) {
      return 'poor'
    }
    else if (aqi > 300 && aqi < 401) {
      return 'very-poor'
    }
    else {
      return 'severe'
    }
  }

  getMarkerImage(aqi) {
    //rendering images as per aqi's valye
    if (aqi <= 50) {
      return 'assets/images/pins/good.svg'
    }
    else if (aqi > 50 && aqi < 101) {
      return 'assets/images/pins/satisfactory.svg'
    }
    else if (aqi > 100 && aqi < 201) {
      return 'assets/images/pins/moderate.svg'
    }
    else if (aqi > 200 && aqi < 301) {
      return 'assets/images/pins/poor.svg'
    }
    else if (aqi > 300 && aqi < 401) {
      return 'assets/images/pins/very-poor.svg'
    }
    else {
      return 'assets/images/pins/severe.svg'
    }
  }

  getDegree(aqi){
      var percent = aqi,
      deg = 360*percent/500;


    return {percent: percent,deg: deg};
  }
  componentDidMount() {

    var mapOptions = {
      center: this.mapCenterLatLng(),
      zoom: this.state.zoom,
      styles: mapStyle
    }
    this.map = new google.maps.Map(this.refs.map, mapOptions);
    {
      this.renderMarkers(this.props.markers, this.map)
    }
    this.setState({map: this.map});
  }

  render() {
    return (
      <div ref="map" style={{height: '100vh',width: '100%'}}>
      </div>
    )
  }
}
