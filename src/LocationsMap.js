import React, { Component } from "react";
import { mapStyle } from "./mapStyle.js"
import scriptLoader from 'react-async-script-loader'
import fetchJsonp from 'fetch-jsonp';

class LocationsMap extends Component {

  state = {
    markers : [],
    infoWindows : [],
    data :[],
    requestIsSuccessful : true,
    isMapLoaded : "pre",
    map:{},
    locations:[]
  }

  getData = (d) => {
    this.setState({data:d})
  }

//call Wikipedia API to be populate the infoWindows
  componentDidMount = () => {
    this.props.locations.map((location,index)=>{
      return fetchJsonp(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${location.title}&format=json&callback=wikiCallback`)
      .then(response => response.json()).then((responseJson) => {
        let newData = [...this.state.data,[responseJson,responseJson[2][0],responseJson[3][0]]]
        this.getData(newData)
      }).catch(error => //alert the user if the API call failed
        alert("Error: could not load info for "+location.title+" from wikipedia API \nDetails: " + error)
      )
    })
  }

//loading the map with the starting location
  componentWillReceiveProps ({ isScriptLoadSucceed  }) {
    if (this.state.isMapLoaded === "pre"){
      if (isScriptLoadSucceed ) {
        var map = new window.google.maps.Map(document.getElementById('map'), {
          zoom: 6,
          center: new window.google.maps.LatLng(23.885942,45.079162), //location: Saudi Arabia
          styles: mapStyle
        });
        this.setState({map:map , isMapLoaded:"yes"});
      }
      else {
        alert("Error: Google map could not be loaded. Please try again.");
        this.setState({isMapLoaded: "no"})
      }
    }
  }

//update markers and trigger the infoWindow for the selected markers
  componentDidUpdate = (prevProps, prevState) => {
    if(this.state.isMapLoaded !== "no"){
      let self = this;
      if (this.props.input == prevProps.input){
      this.updateMarkers(this.props.locations);
        if(this.props.selectedLocation !== ''){
          self.clickMarker(self.state.markers[self.props.selectedLocation.id-1]);
        }else {
          this.hideInfoWindows();
        }
      }
    }
  }

//update the markers on the map based on the locations
  updateMarkers = (locations) =>{
    if (this.state.isMapLoaded!== "no"){
      this.hideMarkers();
      let self = this;
      var marker;
      var pos;
      let bounds = new window.google.maps.LatLngBounds();
      locations.forEach((loc) => {
        pos = new window.google.maps.LatLng(loc.location.lat, loc.location.lng);
        marker = new window.google.maps.Marker({
          id:loc.id,
          title: loc.title,
          position: pos,
          animation: window.google.maps.Animation.DROP,
          map: this.state.map
        })
        bounds.extend(marker.position);
        marker.addListener('click', function(){
            self.clickMarker(this);
            self.updateInfoWindow(this);
          });
          this.state.markers.push(marker);
        });

        this.state.map.fitBounds(bounds);
      }
  }

//populating infowindows with the data retreived from Wikipedia
  updateInfoWindow = (marker) => {
    let infowindow = new window.google.maps.InfoWindow({ maxWidth: 200 });
    if(marker)
    if(infowindow.marker !== marker) {
      infowindow.marker = marker;
      let data = this.state.data.filter((element) =>
        marker.title === element[0][0]).map( i =>
        {
          if (i.length===0)
            return 'No content found'
          else if (i[1] !== '')
            return i[1]
          else
            return 'No content found'
        });
      let getLink = this.state.data.filter((element) =>
        marker.title === element[0][0]).map( i =>
        {
          if (i.length === 0)
            return 'https://www.wikipedia.org'
          else if (i[1] !== '')
            return i[2]
          else
            return 'https://www.wikipedia.org'
        });
        infowindow.setContent(
          `<div class="location-title"> ${marker.title} </div>
          <p>${data}</p>
          <a href=${getLink}>More Information</a>`);

        infowindow.addListener('closeclick',function() {
          infowindow.close();
        });
        infowindow.open(this.state.map, marker);
      }
      this.state.infoWindows.push(infowindow);
  }

//when a marker is clicked animate it and show its infowindow
  clickMarker = (clickedMarker) =>{
    this.hideInfoWindows();
    clickedMarker.setAnimation(window.google.maps.Animation.BOUNCE);
    setTimeout(function(){
      clickedMarker.setAnimation(null);
    }, 200);
    this.updateInfoWindow(clickedMarker);
    console.log(" in ");
  }

//hide all markers
  hideMarkers = () => {
    this.state.markers.forEach((marker) => {marker.setMap(null)});
  }

//hide all infowindows
  hideInfoWindows = () => {
    this.state.infoWindows.forEach((win) => {win.close()});
  }

  render(){

    return (
      this.state.isMapLoaded ? (
        <div id="map" role="application"> "loading the map ..."
        </div>
      ) : (
        <div id="map" role="application">
          <p> "Error: Map could not be loaded, please try again." </p>
        </div>
      )
    );
  }
}
export default scriptLoader(
["https://maps.googleapis.com/maps/api/js?key=AIzaSyCyzKioa2bTf49BFeAqbf9r0XWodZ6oUfE&libraries=places"])(LocationsMap);
