import "./App.css";
import * as Segments from "./segments";
import React from "react";
import * as Content from "./content";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export class DesktopApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { preloader: false };
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
        {!this.state.preloader && <Segments.Preloader id="preloader" />}
        <Segments.DesktopNavBar />
        <Routes>
          <Route path="/" element={<Segments.DesktopHomeBody />} />
          <Route path="/about" element={<Segments.DesktopAboutBody />} />
          <Route path="/projects" element={<Segments.DesktopProjectsBody />} />
          <Route path="/projects/:projectURLName" element={<Segments.DynamicProject />} />
          <Route path="/error" element={<Segments.ErrorPage/>}/>
          <Route path="/:random" element={<Segments.ErrorPage/>}/>
        </Routes>
        <Segments.Footer />
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
      document.body.querySelector("#hamburger-button path").style.fill = Content.textWhite;
    } else {
      document.body.querySelector("#hamburger-button path").style.fill = Content.textBlack;
    }
  }
  render() {
    return (
      <BrowserRouter>
        {!this.state.preloader && <Segments.Preloader id="preloader" />}
        <Segments.MobileNavBar />
        <Routes>
          <Route path="/" element={<Segments.MobileHomeBody />} />
          <Route path="/about" element={<Segments.MobileAboutBody />} />
          <Route path="/projects" element={<Segments.MobileProjectsBody />} />
          <Route path="/projects/:projectURLName" element={<Segments.DynamicProject />} />
          <Route path="/error" element={<Segments.ErrorPage />} />
        </Routes>
        <Segments.Footer />
      </BrowserRouter>
    );
  }
}
