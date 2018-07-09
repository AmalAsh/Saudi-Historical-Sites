import React, { Component } from "react";
//import Place from "./Place";

class LocationsList extends Component {
  state = {

  }


  render(){

    return (
      <div className ="LocationsList">
        <ul
          role="List of historical locations"
          className="list container"
          aria-labelledby="Locations list"
          tabIndex="1">
          {this.props.locations.map((location) =>
            <li
              key={location.id}
              data-id={location.id}
              role="place"
              className="location"
              tabIndex={location.id+2}
              area-labelledby={`View ${location.title} details`}
              onClick={(event)=> this.props.selectLocation(event.currentTarget.dataset.id)}>
                <div className="location-outercontainer">
                  <div className="location-innercontainer">
                    {location.title}
                  </div>
                </div>
              </li>
          )}
        </ul>
      </div>
    );
  }
}
export default LocationsList;
