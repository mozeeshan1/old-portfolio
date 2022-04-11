import "./App.css";
import {DesktopNavBar,MobileNavBar} from "./content";
import React from "react";

export class DesktopApp extends React.Component {
  componentDidMount(){

  }
  render() {
    return (
      <React.Fragment>
        <DesktopNavBar/>
      </React.Fragment>
    );
  }
}


export class MobileApp extends React.Component {
  
  render() {
    return (
      <React.Fragment>
        <MobileNavBar/>
      </React.Fragment>
    )
  }
}
