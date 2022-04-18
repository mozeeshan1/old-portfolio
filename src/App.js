import "./App.css";
import * as Content from "./content";
import React from "react";
import { textBlack, textWhite } from "./content";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export class DesktopApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { preloader: false};
  }

  componentDidMount() {
    document.body.style.overflowY = "hidden";
    setTimeout(() => {
      document.body.style.overflowY = "visible";
      this.setState({ preloader: true });
    }, 5750);
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    } else {
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      };
    }
  }

  render() {
    return (
      <BrowserRouter>
        {!this.state.preloader && <Content.Preloader id="preloader"/>}
        <Content.DesktopNavBar />
        <Routes>
          <Route path="/" element={<Content.DesktopHomeBody />} />
          <Route path="/about" element={<Content.DesktopAboutBody />} />
        </Routes>
      </BrowserRouter>
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
    }, 5750);
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    } else {
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      };
    }

    if (this.state.dark === "true") {
      document.body.querySelector("#hamburger-button path").style.fill = textWhite;
    } else {
      document.body.querySelector("#hamburger-button path").style.fill = textBlack;
    }
  }
  render() {
    return (
      <BrowserRouter>
        {!this.state.preloader && <Content.Preloader id="preloader" />}
        <Content.MobileNavBar />
        <Routes>
          <Route path="/" element={<Content.MobileHomeBody />} />
          <Route path="/about" element={<Content.MobileAboutBody />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
