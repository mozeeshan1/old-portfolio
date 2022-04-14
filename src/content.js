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
    <div id="desktop-nav-bar">
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
          changeBackground(e, dark, true);
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

export function DesktopHomeBody() {
  return (
    <div id="desktop-home-body">
      <h1>text here</h1>
    </div>
  );
}

export function MobileNavBar() {
  const [menu, setMenu] = useState(false);
  const [menuButton, setMenuButton] = useState(false);
  const hamburgerAnimation = useRef(null);

  const hamburgerClick = () => {
    setMenu(!menu);
    if (!menu && !hamburgerAnimation.current.began && !hamburgerAnimation.current.completed) {
      hamburgerAnimation.current.play();
    } else {
      hamburgerAnimation.current.reverse();
      hamburgerAnimation.current.play();
    }
    if (!menu) {
      document.querySelector("#root").style.setProperty("--root-height", `${window.innerHeight}px`);
      document.querySelector("#mobile-menu").style.display = "grid";
    } else {
      document.querySelector("#root").style.setProperty("--root-height", "auto");
      setTimeout(()=>{document.querySelector("#mobile-menu").style.display = "none";},600);
    }
  };
  useEffect(() => {
    hamburgerAnimation.current = anime
      .timeline({
        easing: "easeOutSine",
        duration: 600,
        autoplay: false,
        loop: false,
      })
      .add(
        {
          targets: "#hamburger-icon",
          d: {
            value: ["M3 0 30 0 30 4 0 4 0 0ZM12 12H30V16H0V12ZM1 24 30 24 30 28 0 28 0 24Z", "M3 0L28 25L25 28L0 3L3 0Z M12 12H16V16H12V12Z M0 25L25 0L28 3L3 28L0 25Z"],
          },
          duration: 500,
        },
        0
      )
      .add(
        {
          targets: "#mobile-menu",
          background: ["#FF0000", "00FF00"],
          opacity: [0, 1],
          translateX: [50, 0],
          duration: 350,
        },
        0
      )
      .add({
        targets: "#mobile-menu-list,#mobile-menu #mobile-dark-mode",
        opacity: [0, 1],
        easing: "easeInOutSine",
        duration: 250,
      });
  }, []);

  return (
    <div id="mobile-nav-bar">
      <a id="logo" href="/">
        <h1>Small name</h1>
      </a>
      <button
        id="hamburger-button"
        disabled={menuButton}
        onClick={() => {
          setMenuButton(true);
          hamburgerClick();
          hamburgerAnimation.current.complete = () => {
            setMenuButton(false);
          };
        }}
      >
        <icons.HamburgerIcon />
      </button>
      <MobileMenu setMenuBut={setMenuButton} />
    </div>
  );
}
function MobileMenu({ setMenuBut }) {
  const [dark, setDark] = useStickyState(false, "dark");
  const [darkButton, setDarkButton] = useState(false);

  useEffect(() => {
    dark ? (document.querySelector("#mobile-menu").style.backgroundColor = textBlack) : (document.querySelector("#mobile-menu").style.backgroundColor = textWhite);
  }, []);
  useEffect(() => {
    if (document.querySelector("#mobile-menu") != null) {
      setMenuBut(true);
      let timer = setTimeout(() => {
        if (document.querySelector("#mobile-menu") != null) {
          dark ? (document.querySelector("#mobile-menu").style.backgroundColor = textBlack) : (document.querySelector("#mobile-menu").style.backgroundColor = textWhite);
          setMenuBut(false);
        }
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [dark]);
  return (
    <div id="mobile-menu">
      <div id="mobile-menu-list">
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
      <div id="mobile-dark-div">
        <button
          id="mobile-dark-mode"
          disabled={darkButton}
          onClick={(e) => {
            setDark(!dark);
            changeBackground(e, dark, false);
            setDarkButton(true);
            setTimeout(() => {
              setDarkButton(false);
            }, 1000);
          }}
        >
          <div id="mode-contents">{dark ? <icons.DarkIcon id="dark-icon" /> : <icons.LightIcon id="light-icon" />}</div>
        </button>
      </div>
    </div>
  );
}

export function MobileHomeBody() {
  return (
    <div id="mobile-home-body">
      <h1>mobile text here</h1>
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

function changeBackground(event, dark, desktop) {
  const button = event.currentTarget;
  const circle = document.createElement("div");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
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
  if (desktop) {
    var clone = circle.cloneNode(true);
    document.body.appendChild(circle);
    document.querySelector("#desktop-nav-bar").appendChild(clone);
  } else {
    document.querySelector("#mobile-menu").appendChild(circle);
  }
  let bodyColor;
  let svgColor;
  setTimeout(() => {
    if (dark) {
      bodyColor = [{ color: textBlack }];
      svgColor = [{ fill: textBlack }];
    } else {
      bodyColor = [{ color: textWhite }];
      svgColor = [{ fill: textWhite }];
    }
    document.body.animate(bodyColor, { duration: 500, fill: "forwards", easing: "ease-in-out" });
    if (!desktop) {
      document.body.querySelector("#hamburger-button path").animate(svgColor, { duration: 500, fill: "forwards", easing: "ease-in-out" });
    }
  }, 500);
  let bgTimer;
  if (desktop) {
    bgTimer = 1900;
  } else {
    bgTimer = 700;
  }
  setTimeout(() => {
    dark ? (document.body.style.backgroundColor = textWhite) : (document.body.style.backgroundColor = textBlack);
    dark ? (document.querySelector("#desktop-nav-bar, #mobile-nav-bar").style.backgroundColor = textWhite) : (document.querySelector("#desktop-nav-bar,#mobile-nav-bar").style.backgroundColor = textBlack);
  }, bgTimer);
}
