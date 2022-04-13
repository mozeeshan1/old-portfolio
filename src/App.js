import "./App.css";
import { DesktopNavBar, MobileNavBar } from "./content";
import React from "react";
import { textBlack, textWhite } from "./content";

export class DesktopApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { preloader: false, dark: localStorage.getItem("dark") };
  }

  componentDidMount() {
    document.body.style.overflowY = "hidden";
    setTimeout(() => {
      document.body.style.overflowY = "visible";
      this.setState({ preloader: true });
    }, 2500);
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    } else {
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      };
    }

    if (this.state.dark === "true") {
      document.querySelector("#preloader").style.backgroundColor = textBlack;
    } else {
      document.querySelector("#preloader").style.backgroundColor = textWhite;
    }
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.preloader && <div id="preloader">PRELOADER HERE</div>}
        <DesktopNavBar />
      </React.Fragment>
    );
  }
}

export class MobileApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { preloader: false, dark: localStorage.getItem("dark") };
  }

  componentDidMount() {
    document.body.style.overflowY = "hidden";
    setTimeout(() => {
      document.body.style.overflowY = "visible";
      this.setState({ preloader: true });
    }, 2500);
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    } else {
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      };
    }

    if (this.state.dark === "true") {
      document.querySelector("#preloader").style.backgroundColor = textBlack;
      document.body.querySelector("#hamburger-button path").style.fill = textWhite;
    } else {
      document.querySelector("#preloader").style.backgroundColor = textWhite;
      document.body.querySelector("#hamburger-button path").style.fill = textBlack;
    }
  }
  render() {
    return (
      <React.Fragment>
        {!this.state.preloader && <div id="preloader">PRELOADER HERE</div>}
        <MobileNavBar />
      </React.Fragment>
    );
  }
}
