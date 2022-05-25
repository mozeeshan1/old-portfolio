import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { DesktopApp, MobileApp } from "./App";
import { routeLocation } from "./segments";
import * as Content from "./content";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dark: localStorage.getItem("dark"), desktop: window.matchMedia("(min-width: 768px)").matches };
  }
  componentDidMount() {
    window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => this.setState({ desktop: e.matches }));
    if (this.state.dark === "true") {
      document.querySelector("#preloader").style.backgroundColor = Content.textBlack;
      document.body.style.backgroundColor = Content.textBlack;
      document.body.style.color = Content.textWhite;
      let blackholes = document.body.querySelectorAll(".blackhole");
      for (let i = 0; i < blackholes.length; i++) {
        blackholes[i].style.setProperty("--blackhole-color", Content.textWhite);
        blackholes[i].style.setProperty("--blackhole-color-2", Content.textBlack);
      }
      setTimeout(() => {
        if (routeLocation.pathname === "/") {
          let blackholesBGD = document.body.querySelectorAll(".blackholes-dark");
          for (let i = 0; i < blackholesBGD.length; i++) {
            blackholesBGD[i].style.setProperty("display", "block");
          }
          let blackholesBGW = document.body.querySelectorAll(".blackholes-white");
          for (let i = 0; i < blackholesBGW.length; i++) {
            blackholesBGW[i].style.setProperty("display", "none");
          }
        }
      }, 100);
    } else {
      document.querySelector("#preloader").style.backgroundColor = Content.textWhite;
      document.body.style.backgroundColor = Content.textWhite;
      document.body.style.color = Content.textBlack;
      let blackholes = document.body.querySelectorAll(".blackhole");
      for (let i = 0; i < blackholes.length; i++) {
        blackholes[i].style.setProperty("--blackhole-color", Content.textBlack);
        blackholes[i].style.setProperty("--blackhole-color-2", Content.textWhite);
      }
      setTimeout(() => {
        if (routeLocation.pathname === "/") {
          let blackholesBGD = document.body.querySelectorAll(".blackholes-dark");
          for (let i = 0; i < blackholesBGD.length; i++) {
            blackholesBGD[i].style.setProperty("display", "none");
          }
          let blackholesBGW = document.body.querySelectorAll(".blackholes-white");
          for (let i = 0; i < blackholesBGW.length; i++) {
            blackholesBGW[i].style.setProperty("display", "block");
          }
        }
      }, 100);
    }
  }
  render() {
    return <React.Fragment>{this.state.desktop ? <DesktopApp /> : <MobileApp />}</React.Fragment>;
  }
}

const container = document.getElementById("root");

const root = ReactDOM.createRoot(container);

root.render(<Index />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
