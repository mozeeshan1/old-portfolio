import React, { useEffect, useRef, useState } from "react";
import * as icons from "./icons";
import "./content.css";
import anime from "animejs/lib/anime.es.js";




//CHANGING THE COLOR OF HAMBURGER ICON. I MADE IT INHERIT I THINK (CHECK ICONS.JS) but figure out how to undo it



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
  const [menu, setMenu] = useState(false);
  const [menuButton, setMenuButton] = useState(false);
  const testanim = useRef(null);

  const hamburgerClick = () => {
    // console.log("in ham click");
    // console.log(testanim.current.began);
    // console.log(testanim.current.completed);
    console.log(menu);
    if (!menu && !testanim.current.began && !testanim.current.completed) {
      testanim.current.play();
      console.log(" ham animation playing");
    } else {
      testanim.current.reverse();
      testanim.current.play();
      console.log("ham animation reversed");
    }
    console.log(menu);
    // console.log(testanim.current.began);
    // console.log(testanim.current.completed);
    console.log(" ");
  };
  useEffect(() => {
    testanim.current = anime({
      targets: "#hamburger-icon",
      easing: "easeOutSine",
      duration: 500,
      autoplay: false,
      d: {
        value: ["M3 0 30 0 30 4 0 4 0 0ZM12 12H30V16H0V12ZM1 24 30 24 30 28 0 28 0 24Z", "M3 0L28 25L25 28L0 3L3 0Z M12 12H16V16H12V12Z M0 25L25 0L28 3L3 28L0 25Z"],
      },
      loop: false,
      // complete: function (anim) {
      //   setMenuButton(false);
      //   setMenu(!menu);
      // },
    });
  }, []);

  return (
    <div id="nav-bar" className="test-anime">
      <a id="logo" href="/">
        <h1>Small name</h1>
      </a>
      <button
        id="hamburger-button"
        disabled={menuButton}
        onClick={() => {
          setMenuButton(true);
          hamburgerClick();
          testanim.current.complete = () => {
            setMenuButton(false);
            setMenu(!menu);
          };
        }}
      >
        <icons.HamburgerIcon />
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
    document.body.querySelector("#hamburger-button").style.fill="#FF0000";
  }, 500);
  setTimeout(() => {
    dark ? (document.body.style.backgroundColor = textWhite) : (document.body.style.backgroundColor = textBlack);
  }, 1900);
}
