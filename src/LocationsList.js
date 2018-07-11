import React, { Component } from "react";
//import Place from "./Place";

class LocationsList extends Component {
  state = {

  }


  render(){

    return (
      <div className ="LocationsList">
        <ul
          label="List of historical locations"
          className="list container"
          tabIndex="1">
          {this.props.locations.map((location) =>
            <li 
              key={location.id}
              data-id={location.id}
              label="Historical locations"
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
