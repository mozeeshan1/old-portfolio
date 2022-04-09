import React, { useEffect, useState } from "react";
import { LightMode, DarkMode } from "@mui/icons-material";
import "./content.css";
import anime from "animejs/lib/anime.es.js";

export default function NavBar() {
  const [dark, setDark] = useStickyState(false, "dark");
  useEffect(() => {
    if (dark === true) {
      darkModeAnimation.play();
    } else {
      lightModeAnimation.play();
    }
  }, [dark]);

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
        <div id="background"></div>
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
