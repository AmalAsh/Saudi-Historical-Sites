import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import scriptLoader from 'react-async-script-loader';
import escapeRegExp from 'escape-string-regexp';
import LocationsList from './LocationsList';
import LocationsMap from './LocationsMap';
import fetchJsonp from 'fetch-jsonp';


class App extends Component {
  state ={
    locations :[
      {id:"1", location:{ lat:21.4228714,lng:39.8257347 }, title:'Great Mosque of Mecca'},
      {id:"2", location:{ lat:24.4672105,lng:39.611131 }, title:'Al-Masjid an-Nabawi'},
      {id:"3", location:{ lat:26.8040118,lng:37.9572703 }, title:'Mada\'in Saleh'},
      {id:"4", location:{ lat:29.8107894,lng:39.8887661 }, title:'Dumat al-Jandal' },
      {id:"5", location:{ lat:21.4841237,lng:39.1875951 }, title:'Nasseef House'}
    ],
    selectedLocation: '',
    query: '',
    requestIsSuccessful: true
  }

  updateQuery = (q) => {
    this.setState({ query: q, selectLocation: ''})
  }

  selectLocation = (loc) => {
    this.setState({selectedLocation : this.state.locations[loc-1], query:''})
  }

  render() {
    let showingLocations
    if(this.state.query){
      const match = new RegExp(escapeRegExp(this.state.query),'i')
      showingLocations = this.state.locations.filter((loc)=> match.test(loc.title))
    } else {
      showingLocations = this.state.locations
    }
    return (
      <div className="App">
        <div className="content container">
          <header className="App-header container">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">SAUDI ARABIA HISTORICAL SITES</h1>
            </header>
            <div className = "list-container container">
            <input
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
              role="search"
              aria-labelledby="Search locations"
              tabIndex="1"
              type="text"
              placeholder="Filter locations"
              />
              <LocationsList
              className = "locations-list"
              locations = {showingLocations}
              selectLocation = {this.selectLocation}/>
              </div>
          </div>
        <div className="map-container container">
          <LocationsMap
            locations = {showingLocations}
            filteredLocations = {this.state.showingLocations}
            selectedLocation = {this.state.selectedLocation}
            requestIsSuccessful = {this.state.requestIsSuccessful}/>
        </div>
      </div>
    );
  }
}

export default App;
