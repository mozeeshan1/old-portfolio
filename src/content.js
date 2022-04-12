import React, { useEffect, useRef, useState } from "react";
import * as icons from "./icons";
import "./content.css";
import anime from "animejs/lib/anime.es.js";

export const textBlack = "#121212";
export const textWhite = "#FFFFFF";

export function DesktopNavBar() {
  const [dark, setDark] = useStickyState(false, "dark");
  const [darkButton, setDarkButton] = useState(false);

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
      <button
        id="dark-mode"
        disabled={darkButton}
        onClick={(e) => {
          setDark(!dark);
          changeBackground(e, dark);
          setDarkButton(true);
          setTimeout(() => {
            setDarkButton(false);
          }, 1000);
        }}
      >
        <div id="mode-contents">{dark ? <icons.DarkIcon id="dark-icon" /> : <icons.LightIcon id="light-icon" />}</div>
      </button>
    </div>
  );
}

export function MobileNavBar() {
  const [dark, setDark] = useStickyState(false, "dark");
  const [darkButton, setDarkButton] = useState(false);
  const [menuButton, setMenuButton] = useState(false);
  const testanim = useRef(null);

  const hamburgerClick = () => {
    console.log("in ham click");
    if (!menuButton) {
      testanim.current.play();
      console.log(" ham animation playing");
    } else {
      testanim.current.pause();
      console.log("ham animation paused");
    }
    setMenuButton(!menuButton);
  };
  useEffect(() => {
    testanim.current = anime({
      targets: "#dark-mode",
      easing: "easeInOutSine",
      duration: 1000,
      autoplay: false,
      background:  "#FF00FF",
      translateY: 500,
      direction:"alternate",
      loop: true,
      begin: function (anim) {
        console.log("test anim started " + testanim.began);
        console.log("targets " + testanim.targets);
      },
      complete: function (anim) {
        console.log("test anim completed " + testanim.completed);
      },
    });
  }, []);

  return (
    <div id="nav-bar" className="test-anime">
      <a id="logo" href="/">
        <h1>Small name</h1>
      </a>
      <button id="hamburger-button" onClick={hamburgerClick}>
        <icons.HamburgerIcon id="hamburger-icon" />
      </button>
      <button
        id="dark-mode"
        disabled={darkButton}
        onClick={(e) => {
          setDark(!dark);
          changeBackground(e, dark);
          setDarkButton(true);
          setTimeout(() => {
            setDarkButton(false);
          }, 1000);
        }}
      >
        <div id="mode-contents">{dark ? <icons.DarkIcon id="dark-icon" /> : <icons.LightIcon id="light-icon" />}</div>
      </button>
    </div>
  );
}

var hamburgerAnimation = anime.timeline({
  easing: "easeOutExpo",
  duration: 750,
  autoplay: false,
});

hamburgerAnimation.add({
  targets: "#logo",
  rotate: "1turn",
  autoplay: false,
  loop: true,
  color: "#000000",
  duration: 750,
});

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

function changeBackground(event, dark) {
  const button = event.currentTarget;
  const circle = document.createElement("div");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  const scale = Math.max(Math.max(document.body.clientHeight, document.body.clientWidth) / diameter, 175);
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${button.offsetLeft - document.body.offsetLeft}px`;
  //event.clientY
  circle.style.top = `${button.offsetTop - document.body.offsetTop}px`;
  circle.classList.add("ripple");
  circle.style.setProperty("--mode-scale", scale);
  const ripples = document.body.getElementsByClassName("ripple");
  if (dark) {
    circle.style.backgroundColor = textWhite;
  } else {
    circle.style.backgroundColor = textBlack;
  }
  if (ripples.length > 2) {
    ripples[0].remove();
  }
  document.body.appendChild(circle);
  let bodyColor;
  setTimeout(() => {
    if (dark) {
      bodyColor = [{ color: textBlack }];
    } else {
      bodyColor = [{ color: textWhite }];
    }
    document.body.animate(bodyColor, { duration: 500, fill: "forwards", easing: "ease-in-out" });
  }, 500);
  setTimeout(() => {
    dark ? (document.body.style.backgroundColor = textWhite) : (document.body.style.backgroundColor = textBlack);
  }, 1900);
}
