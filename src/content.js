import React, { useEffect, useState } from "react";
import { LightMode, DarkMode } from "@mui/icons-material";
import "./content.css";
import anime from "animejs/lib/anime.es.js";

export default function NavBar() {
  const [dark, setDark] = useStickyState(false, "dark");
  useEffect(() => {
    //if (dark === true) {
    //  darkModeAnimation.play();
    //} else {
    //  lightModeAnimation.play();
    //}
    console.log("in use effect");
    document
      .getElementById("dark-mode")
      .addEventListener("click", changeBackground);
  }, []);

  return (
    <div id="nav-bar">
      <a id="logo" href="/">
        <h1>Big Name Here</h1>
      </a>
      <div id="menu">
        <a href="#">
          <li>Home</li>
        </a>
        <a href="#">
          <li>About</li>
        </a>
        <a href="#">
          <li>Projects</li>
        </a>
      </div>
      <button id="dark-mode" onClick={() => setDark(!dark)}>
        {dark ? <DarkMode fontSize="large" /> : <LightMode fontSize="large" />}
      </button>
    </div>
  );
}

function useStickyState(defaultValue, key) {
  const [value, setValue] = React.useState(() => {
    const stickyValue = localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

function changeBackground(event) {
  const button = event.currentTarget;
  const circle = document.createElement("div");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${
    event.clientX - (document.body.offsetLeft + radius)
  }px`;
  circle.style.top = `${event.clientY - (document.body.offsetTop + radius)}px`;
  circle.classList.add("ripple");
  const ripple = document.body.getElementsByClassName("ripple")[0];

  if (ripple) {
    ripple.remove();
  }
  document.body.appendChild(circle);
}

var darkModeAnimation = anime.timeline({
  easing: "easeInOutSine",
  duration: 1000,
  autoplay: false,
});
darkModeAnimation
  .add(
    {
      targets: "#dark-mode",
      duration: 500,
      rotate: 360,
    },
    0
  )
  .add(
    {
      targets: "body",
      backgroundColor: ["#FFFFFF", "#000000"],
    },
    0
  );
var lightModeAnimation = anime.timeline({
  easing: "easeInOutSine",
  autoplay: false,
  duration: 1000,
});
lightModeAnimation
  .add(
    {
      targets: "#dark-mode",
      duration: 500,
      rotate: 360,
    },
    0
  )
  .add(
    {
      targets: "body",
      backgroundColor: ["#000000", "#FFFFFF"],
    },
    0
  );
