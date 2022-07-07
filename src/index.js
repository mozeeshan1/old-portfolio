import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { DesktopApp, MobileApp } from "./App";
import * as Segments from "./segments";
import * as Content from "./content";

export let fullProjectList = {};


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
        if (Segments.routeLocation.pathname === "/") {
          let blackholesBGD = document.body.querySelectorAll(".blackholes-dark");
          for (let i = 0; i < blackholesBGD.length; i++) {
            blackholesBGD[i].style.setProperty("display", "block");
          }
          let blackholesBGW = document.body.querySelectorAll(".blackholes-light");
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
        if (Segments.routeLocation.pathname === "/") {
          let blackholesBGD = document.body.querySelectorAll(".blackholes-dark");
          for (let i = 0; i < blackholesBGD.length; i++) {
            blackholesBGD[i].style.setProperty("display", "none");
          }
          let blackholesBGW = document.body.querySelectorAll(".blackholes-light");
          for (let i = 0; i < blackholesBGW.length; i++) {
            blackholesBGW[i].style.setProperty("display", "block");
          }
        }
        
      }, 100);      
    }


    let existProject = true;
    for (let i = 1; existProject === true && i <= 1000; i++) {
      let tempTitle = "p".concat(i, "Title");
      let tempSummary = "p".concat(i, "Summary");
      let tempImg = "p".concat(i, "ImgLoc");
      let tempImgAlt = "p".concat(i, "ImgAlt");
      let tempTags = "p".concat(i, "Tags");
      if (typeof Content[tempTitle] !== "undefined" && Content[tempTitle] !== null && typeof Content[tempSummary] !== "undefined" && Content[tempSummary] !== null && typeof Content[tempImg] !== "undefined" && Content[tempImg] !== null && typeof Content[tempImgAlt] !== "undefined" && Content[tempImgAlt] !== null && typeof Content[tempTags] !== "undefined" && Content[tempTags] !== null) {
        console.log(i, "completely exists");

        let projectURLName = Content[tempTitle]
          .toLowerCase()
          .replace(/[^A-Za-z 0-9]/g, "")
          .replace(/\s/g, "-")
          .replace(/--/g, "-")
          .replace(/--+/g, "");
        fullProjectList[i] = projectURLName;
      } else if ((typeof Content[tempTitle] !== "undefined" && Content[tempTitle] !== null) || (typeof Content[tempSummary] !== "undefined" && Content[tempSummary] !== null) || (typeof Content[tempImg] !== "undefined" && Content[tempImg] !== null) || (typeof Content[tempImgAlt] !== "undefined" && Content[tempImgAlt] !== null) || (typeof Content[tempTags] !== "undefined" && Content[tempTags] !== null)) {
      } else {
        existProject = false;
      }
    }


    // const PRESHARED_AUTH_HEADER_KEY = "X-Custom-PSK";
    // const PRESHARED_AUTH_HEADER_VALUE = "mypresharedkey";

    // async function handleRequest(request) {
    //   const psk = request.headers.get(PRESHARED_AUTH_HEADER_KEY);

    //   if (psk === PRESHARED_AUTH_HEADER_VALUE) {
    //     // Correct preshared header key supplied. Fetch request from origin.
    //     return fetch(request);
    //   }

    //   // Incorrect key supplied. Reject the request.
    //   return new Response("Sorry, you have supplied an invalid key.", {
    //     status: 403,
    //   });
    // }

    // window.addEventListener("fetch", (event) => {
    //   event.respondWith(handleRequest(event.request));
    // });
    
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
