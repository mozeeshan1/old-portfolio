import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { textBlack, textWhite } from "./content";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { preloader: false, dark: localStorage.getItem("dark") };
    //HERE FOR PRELOADER. PRELOADER WORKS ONLY NEED TO MAKE DARK/LIGHT MODE BEFORE PRELOADER GOES AWAY
  }
  componentDidMount() {
    console.log(this.state.dark);
    if (this.state.dark === "true") {
      document.body.style.backgroundColor = textBlack;
      document.body.style.color = textWhite;
    } else {
      document.body.style.backgroundColor = textWhite;
      document.body.style.color = textBlack;
    }
    setTimeout(() => {
      this.setState({ preloader: true });
    }, 2500);
  }
  render() {
    return <React.Fragment>{this.state.preloader ? <App /> : <div id="preloader">PRELOADER HERE</div>}</React.Fragment>;
  }
}

const container = document.getElementById("root");

// Create a root.
const root = ReactDOM.createRoot(container);

// Initial render
root.render(<Index />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
