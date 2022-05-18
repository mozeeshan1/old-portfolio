import React, { useEffect, useRef, useState } from "react";
import * as VectorGraphics from "./svgs";
import "./content.css";
import anime from "animejs/lib/anime.es.js";
import { Link, useLocation } from "react-router-dom";

export const textBlack = "#121212";
export const textWhite = "#FFFFFF";
export let darkMode = false;
export let routeLocation = {};
export let playedBBG = false;
export let removeBBG = false;
export let lastScroll = 0;

export function UpdateRoute(dark) {
  let location = useLocation();
  React.useEffect(() => {
    routeLocation = location;
    darkMode = dark;
  }, [location]);
}
export function getScrollPercent(section, topOffset = 0, bottomOffset = 0) {
  if ((topOffset > 0 && topOffset <= 1) || (topOffset >= -1 && topOffset < 0)) {
    topOffset = parseFloat((section.clientHeight * topOffset).toFixed(2));
  }
  if ((bottomOffset > 0 && bottomOffset <= 1) || (bottomOffset >= -1 && bottomOffset < 0)) {
    bottomOffset = parseFloat((section.clientHeight * bottomOffset).toFixed(2));
  }
  var elementTop = section.offsetTop + topOffset;
  var elementBottom = elementTop + section.clientHeight + bottomOffset;
  var verticalScroll = window.pageYOffset;
  var elementDifference = elementBottom - elementTop;
  if (verticalScroll >= elementTop && verticalScroll <= elementBottom) {
    return ((verticalScroll - elementTop) / elementDifference) * 100;
  }
}

export function getScrollDirecion(offset = 0, anim) {
  var downPlayed = false;
  var topPlayed = true;
  var lastScroll = window.pageYOffset;
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      lastScroll = currentScroll;
      return;
    }
    if (currentScroll > lastScroll + Math.abs(offset) && !downPlayed) {
      downPlayed = true;
      anim.reverse();
      anim.play();
      setTimeout(() => {
        topPlayed = false;
      }, 10);
      lastScroll = currentScroll;
    } else if (currentScroll < lastScroll - Math.abs(offset) && !topPlayed) {
      topPlayed = true;
      anim.reverse();
      anim.play();
      setTimeout(() => {
        downPlayed = false;
      }, 10);
      lastScroll = currentScroll;
    } else if (currentScroll > lastScroll + Math.abs(offset) || currentScroll < lastScroll - Math.abs(offset)) {
      lastScroll = currentScroll;
    }
  });
}

export function BlackholeWhiteUpdate(time1 = 0, time2 = 0) {
  if (routeLocation.pathname === "/") {
    if (time1 > 0) {
      setTimeout(() => {
        let blackholesBGD = document.body.querySelectorAll(".blackholes-dark");
        for (let i = 0; i < blackholesBGD.length; i++) {
          blackholesBGD[i].style.setProperty("display", "none");
        }
        let blackholesBGW = document.body.querySelectorAll(".blackholes-white");
        for (let i = 0; i < blackholesBGW.length; i++) {
          blackholesBGW[i].style.setProperty("display", "block");
        }
      }, time1);
    } else {
      let blackholesBGD = document.body.querySelectorAll(".blackholes-dark");
      for (let i = 0; i < blackholesBGD.length; i++) {
        blackholesBGD[i].style.setProperty("display", "none");
      }
      let blackholesBGW = document.body.querySelectorAll(".blackholes-white");
      for (let i = 0; i < blackholesBGW.length; i++) {
        blackholesBGW[i].style.setProperty("display", "block");
      }
    }
    if (time2 > 0) {
      document.body.querySelector("#blackhole-home").animate([{ filter: "drop-shadow(0px 0px 10px black)" }], { duration: time2, fill: "forwards", easing: "ease-in-out" });
      document.body.querySelector("#blackhole-home path").animate([{ fill: "black", stroke: "black" }], { duration: time2, fill: "forwards", easing: "ease-in-out" });
    } else {
      document.body.querySelector("#blackhole-home").style.cssText = "filter: drop-shadow(0px 0px 10px black)";
      document.body.querySelector("#blackhole-home path").style.cssText = "fill: white;stroke: white;";
    }
  }
}
export function BlackholeDarkUpdate(time1 = 0, time2 = 0) {
  if (routeLocation.pathname === "/") {
    if (time1 > 0) {
      setTimeout(() => {
        let blackholesBGD = document.body.querySelectorAll(".blackholes-dark");
        for (let i = 0; i < blackholesBGD.length; i++) {
          blackholesBGD[i].style.setProperty("display", "block");
        }
        let blackholesBGW = document.body.querySelectorAll(".blackholes-white");
        for (let i = 0; i < blackholesBGW.length; i++) {
          blackholesBGW[i].style.setProperty("display", "none");
        }
      }, time1);
    } else {
      let blackholesBGD = document.body.querySelectorAll(".blackholes-dark");
      for (let i = 0; i < blackholesBGD.length; i++) {
        blackholesBGD[i].style.setProperty("display", "block");
      }
      let blackholesBGW = document.body.querySelectorAll(".blackholes-white");
      for (let i = 0; i < blackholesBGW.length; i++) {
        blackholesBGW[i].style.setProperty("display", "none");
      }
    }
    if (time2 > 0) {
      document.body.querySelector("#blackhole-home").animate([{ filter: "drop-shadow(0px 0px 10px white)" }], { duration: time2, fill: "forwards", easing: "ease-in-out" });
      document.body.querySelector("#blackhole-home path").animate([{ fill: "black", stroke: "black" }], { duration: time2, fill: "forwards", easing: "ease-in-out" });
    } else {
      document.body.querySelector("#blackhole-home").style.cssText = "filter: drop-shadow(0px 0px 10px white);";
      document.body.querySelector("#blackhole-home path").style.cssText = "fill: black;stroke: black;";
    }
  }
}

export function Preloader(props) {
  const blackholeStartAnimation = useRef(null);

  useEffect(() => {
    blackholeStartAnimation.current = anime
      .timeline({
        easing: "easeInOutQuad",
        loop: false,
        autoplay: true,
      })
      .add(
        {
          targets: "#blackhole-outline path",
          strokeDashoffset: [anime.setDashoffset, 0],
          duration: 1000,
        },
        1000
      )
      .add({
        targets: "#blackhole-fill",
        scale: [0, Math.random()],
        // d: [{ value: ["M30 30A1 1 0 0030 30 1 1 0 0030 30Z", "M0 30A1 1 0 0060 30 1 1 0 000 30Z"] }],
        duration: 1000,
      })
      .add({
        targets: "#blackhole-fill",
        scale: 1,
        duration: 750,
      })
      .add(
        {
          targets: "#blackhole-fill-2",
          scale: [0, 1],
          duration: 750,
        },
        "-=50"
      )
      .add(
        {
          targets: "#preloader",
          opacity: 0,
        },
        "-=250"
      );
  }, []);
  return (
    <div id={props.id}>
      <VectorGraphics.Circle id="blackhole-outline" />
      <VectorGraphics.Circle id="blackhole-fill" />
      <VectorGraphics.Circle id="blackhole-fill-2" />
    </div>
  );
}

export function DesktopNavBar() {
  const [dark, setDark] = useStickyState(false, "dark");
  const [darkButton, setDarkButton] = useState(false);
  const navAnimation = useRef(null);

  useEffect(() => {
    var textWrapper = document.querySelector("#desktop-nav-bar h1");
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    navAnimation.current = anime
      .timeline({
        easing: "easeOutCirc",
        autoplay: false,
        loop: false,
        direction: "normal",
      })
      .add(
        {
          targets: "#desktop-menu a,#desktop-dark-mode",
          translateY: [-100, 0],
          delay: (el, i) => 500 * (i + 1),
        },
        0
      );
    setTimeout(() => {
      navAnimation.current.play();
      anime({
        easing: "easeInOutQuad",
        autoplay: true,
        loop: false,
        direction: "normal",
        targets: "#desktop-logo .letter",
        opacity: [0, 1],
        delay: (el, i) => 15 * (i + 1),
        duration: 2500,
      });
      setTimeout(() => {
        getScrollDirecion(100, navAnimation.current);
      }, 4000);
    }, 7000);
  }, []);

  UpdateRoute(dark);
  return (
    <div id="desktop-nav-bar">
      <Link
        id="desktop-logo"
        to="/"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <h1>Big Name Here</h1>
      </Link>
      <div id="desktop-menu">
        <Link
          to="/"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          Home
        </Link>
        <Link
          to="/about"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          About
        </Link>
        <Link
          to="/projects"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          Projects
        </Link>
      </div>
      <button
        id="desktop-dark-mode"
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
        <div id="mode-contents">{dark ? <VectorGraphics.DarkIcon id="dark-icon" /> : <VectorGraphics.LightIcon id="light-icon" />}</div>
      </button>
    </div>
  );
}
export function DesktopHomeBodyIntro() {
  const blackholeBGAnimation = useRef(null);
  const loopCompleted = useRef(0);
  const animationValues = useRef({});
  const [spanText1, setSpanText1] = useState({ current: ["This is a long line of text to test the limits of this animation.", "two", "3", "4.5", "true"], i: 1 });
  const homeArrowAnimation = useRef(null);

  const updateAnimationValues = () => {
    animationValues.current.R1 = anime.random(-360, 360);
    animationValues.current.R2 = anime.random(-360, 360);
    animationValues.current.R3 = anime.random(-360, 360);
    animationValues.current.R4 = anime.random(-360, 360);
    animationValues.current.R5 = anime.random(-360, 360);
    animationValues.current.R6 = anime.random(-360, 360);
    animationValues.current.Sc1 = anime.random(2, 10);
    animationValues.current.Sc2 = Math.random() * 1.2;
    animationValues.current.Sk1 = anime.random(0, 36);
    animationValues.current.Sk2 = anime.random(0, 36);
    animationValues.current.Sk3 = anime.random(0, 7);
    animationValues.current.Sk4 = anime.random(0, 5);
    animationValues.current.Sk5 = anime.random(0, 36);
    animationValues.current.Sk6 = anime.random(0, 36);
  };

  useEffect(() => {
    updateAnimationValues();
    function BBGA() {
      blackholeBGAnimation.current = anime
        .timeline({
          easing: "easeInOutQuad",
          loop: false,
          autoplay: true,
          duration: 5000,
          direction: "normal",
          update: (anim) => {
            if (removeBBG) {
              anim.pause();
              removeBBG = false;
            }
          },
        })
        .add(
          {
            targets: "#blackhole-bg-1-dark,#blackhole-bg-1-white",
            scale: [0, animationValues.current.Sc1],
            rotate: [animationValues.current.R1, animationValues.current.R2],
            opacity: [0, 0.2],
            skewX: animationValues.current.Sk1,
            skewY: animationValues.current.Sk2,
          },
          0
        )
        .add(
          {
            targets: "#blackhole-bg-2-dark,#blackhole-bg-2-white",
            rotate: [animationValues.current.R3, animationValues.current.R4],
            opacity: [[0.2, 0.4], 0.6],
            skewX: animationValues.current.Sk3,
            skewY: animationValues.current.Sk4,
          },
          0
        )
        .add(
          {
            targets: "#blackhole-bg-3-dark,#blackhole-bg-3-white",
            scale: [[1, animationValues.current.Sc2], 0.9],
            rotate: [animationValues.current.R5, animationValues.current.R6],
            opacity: [[1, 0.5], 1],
            skewX: animationValues.current.Sk5,
            skewY: animationValues.current.Sk6,
          },
          0
        ).complete = (anim) => {
        loopCompleted.current++;

        if (loopCompleted.current === 2) {
          updateAnimationValues();
          BBGA();
          loopCompleted.current = 0;
        } else if (loopCompleted.current === 1) {
          anim.reverse();
          anim.play();
        }
      };
    }
    if (!playedBBG) {
      BBGA();
      playedBBG = true;
    } else {
      removeBBG = true;
      loopCompleted.current = 0;
      BBGA();
    }
    if (darkMode) {
      BlackholeDarkUpdate();
    } else {
      BlackholeWhiteUpdate();
    }
    setSpanText1((spanText1.i = anime.random(0, spanText1.current.length - 1)));
    document.querySelector("#desktop-home-title-1").innerHTML = spanText1.current[spanText1.i];
    var textWrapper = document.querySelector("#desktop-home-title-1");
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    const spanAnimation1 = () => {
      anime
        .timeline({
          autoplay: true,
          loop: false,
          easing: "easeInOutQuad",
        })
        .add(
          {
            targets: "#desktop-home-title-1 .letter",
            opacity: [0, 1],
            duration: 2500,
            delay: (el, i) => 150 * (i + 1),
          },
          0
        )
        .add(
          {
            targets: "#desktop-home-title-1 .letter",
            opacity: 0,
            duration: 2500,
            delay: (el, i) => 150 * (i + 1),
          },
          "+=5000"
        ).complete = (anim) => {
        anim.pause();
        setSpanText1((spanText1.i = anime.random(0, spanText1.current.length - 1)));
        var textWrapper = document.querySelector("#desktop-home-title-1");

        textWrapper.textContent = spanText1.current[spanText1.i];
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        textWrapper.style.opacity = 1;
        spanAnimation1();
      };
    };
    setTimeout(() => {
      spanAnimation1();
    }, 5000);
    homeArrowAnimation.current = anime({
      targets: "#desktop-home-arrow path",
      d: ["M30 0V45L25 45 30 50 35 45 30 45V0Z", "M30 45V45L25 45 30 50 35 45 30 45V45Z"],
      autoplay: false,
      easing: "easeInOutSine",
    });
    homeArrowAnimation.current = anime({
      targets: "#desktop-home-arrow path",
      d: ["M30 0V45L25 45 30 50 35 45 30 45V0Z", "M30 45V45L25 45 30 50 35 45 30 45V45Z"],
      autoplay: false,
      easing: "easeInOutSine",
    });
    window.addEventListener("scroll", () => {
      const percentage = getScrollPercent(document.querySelector("#blackhole-div"), 0, -0.3);
      homeArrowAnimation.current.seek(homeArrowAnimation.current.duration * (percentage * 0.01));
    });
  }, []);

  return (
    <div id="desktop-home-body">
      <h1 id="desktop-home-title-1">
        Desktop text here<span id="desktop-home-title-1-span"></span>
      </h1>
      <div id="blackhole-div">
        <div id="blackhole-bg-1-dark" className="blackholes-dark" />
        <div id="blackhole-bg-1-white" className="blackholes-white" />
        <div id="blackhole-bg-2-dark" className="blackholes-dark" />
        <div id="blackhole-bg-2-white" className="blackholes-white" />
        <div id="blackhole-bg-3-dark" className="blackholes-dark" />
        <div id="blackhole-bg-3-white" className="blackholes-white" />
        <div id="blackhole-bg-blur" />
        <VectorGraphics.Circle id="blackhole-home" />
      </div>
      <VectorGraphics.Arrow id="desktop-home-arrow" />
    </div>
  );
}
export function DesktopHomeBody() {
  return <DesktopHomeBodyIntro />;
}

export function DesktopAboutBody() {
  return (
    <div id="desktop-about-body">
      <h1>About Desktop text here</h1>
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
      document.body.style.setProperty("--body-height", `${window.innerHeight}px`);
      document.body.style.overflowY = "hidden";
      document.querySelector("#mobile-menu").style.display = "grid";
    } else {
      document.body.style.setProperty("--body-height", "auto");
      document.body.style.overflowY = "visible";
      setTimeout(() => {
        document.querySelector("#mobile-menu").style.display = "none";
      }, 600);
    }
  };
  useEffect(() => {
    hamburgerAnimation.current = anime
      .timeline({
        easing: "easeOutSine",
        autoplay: false,
        loop: false,
      })
      .add(
        {
          targets: "#hamburger-icon",
          d: [
            {
              value: "M2 5 12 5 12 11 2 11Q-2 8 2 5M12 5 24 5 24 11 12 11M24 5 36 5 36 11 24 11M36 5 46 5Q50 8 46 11L36 11M2 21 12 21 12 27 2 27Q-2 24 2 21M12 21 24 21 24 27 12 27M24 21 36 21 36 27 24 27M36 21 46 21Q50 24 46 27L36 27M2 37 12 37 12 43 2 43Q-2 40 2 37M12 37 24 37 24 43 12 43M24 37 36 37 36 43 24 43M36 37 46 37Q50 40 46 43L36 43",
              //value: ["M3 0 30 0 30 4 0 4 0 0ZM12 12H30V16H0V12ZM1 24 30 24 30 28 0 28 0 24Z", "M3 0L28 25L25 28L0 3L3 0Z M12 12H16V16H12V12Z M0 25L25 0L28 3L3 28L0 25Z"],
            },
            { value: "M2 5 12 5 12 11 2 11Q-2 8 2 5M12 5 12 5 12 11 12 11M36 5 36 5 36 11 36 11M36 5 46 5Q50 8 46 11L36 11M12 21 12 21 12 27 12 27Q12 24 12 21M12 21 24 21 24 27 12 27M24 21 36 21 36 27 24 27M36 21 36 21Q36 24 36 27L36 27M2 37 12 37 12 43 2 43Q-2 40 2 37M12 37 12 37 12 43 12 43M36 37 36 37 36 43 36 43M36 37 46 37Q50 40 46 43L36 43" },
            { value: "M6 8 26 23 22 27 2 12Q2 8 6 8M12 5 12 5 12 11 12 11M36 5 36 5 36 11 36 11M33 15 43 8Q47 8 47 12L37 19M12 21 12 21 12 27 12 27Q12 24 12 21M12 31 24 22 28 26 16 35M24 22 33 15 37 19 28 26M36 21 36 21Q36 24 36 27L36 27M1 39 12 31 16 35 5 43Q1 44 1 39M12 37 12 37 12 43 12 43M36 37 36 37 36 43 36 43M26 23 46 38Q47 42 43 43L22 27" },
          ],
          duration: 600,
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
      <Link
        id="mobile-logo"
        to="/"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <h1>Small Name</h1>
      </Link>
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
        <VectorGraphics.HamburgerIcon />
      </button>
      <MobileMenu setMenuBut={setMenuButton} linkClick={hamburgerClick} />
    </div>
  );
}
function MobileMenu({ setMenuBut, linkClick }) {
  const [dark, setDark] = useStickyState(false, "dark");
  const [darkButton, setDarkButton] = useState(false);

  UpdateRoute(dark);

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
        <Link
          to="/"
          onClick={() => {
            linkClick();
            window.scrollTo(0, 0);
          }}
        >
          Home
        </Link>
        <Link
          to="/about"
          onClick={() => {
            linkClick();
            window.scrollTo(0, 0);
          }}
        >
          About
        </Link>
        <Link
          to="/projects"
          onClick={() => {
            linkClick();
            window.scrollTo(0, 0);
          }}
        >
          Projects
        </Link>
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
          <div id="mode-contents">{dark ? <VectorGraphics.DarkIcon id="dark-icon" /> : <VectorGraphics.LightIcon id="light-icon" />}</div>
        </button>
      </div>
    </div>
  );
}

export function MobileHomeBodyIntro() {
  const blackholeBGAnimation = useRef(null);
  const loopCompleted = useRef(0);
  const animationValues = useRef({});
  const [spanText1, setSpanText1] = useState({ current: ["This is a long line of text to test the limits of this animation.", "two", "3", "4.5", "true"], i: 1 });
  const homeArrowAnimation = useRef(null);

  const updateAnimationValues = () => {
    animationValues.current.R1 = anime.random(-360, 360);
    animationValues.current.R2 = anime.random(-360, 360);
    animationValues.current.R3 = anime.random(-360, 360);
    animationValues.current.R4 = anime.random(-360, 360);
    animationValues.current.R5 = anime.random(-360, 360);
    animationValues.current.R6 = anime.random(-360, 360);
    animationValues.current.Sc1 = anime.random(2, 10);
    animationValues.current.Sc2 = anime.random(1, 2);
    animationValues.current.Sk1 = anime.random(0, 36);
    animationValues.current.Sk2 = anime.random(0, 36);
    animationValues.current.Sk3 = anime.random(0, 7);
    animationValues.current.Sk4 = anime.random(0, 5);
    animationValues.current.Sk5 = anime.random(0, 36);
    animationValues.current.Sk6 = anime.random(0, 36);
  };

  useEffect(() => {
    updateAnimationValues();
    function BBGA() {
      blackholeBGAnimation.current = anime
        .timeline({
          easing: "easeInOutQuad",
          loop: false,
          autoplay: true,
          duration: 5000,
          direction: "normal",
          update: (anim) => {
            if (removeBBG) {
              anim.pause();
              removeBBG = false;
            }
          },
        })
        .add(
          {
            targets: "#blackhole-bg-1-dark,#blackhole-bg-1-white",
            scale: [0, animationValues.current.Sc1],
            rotate: [animationValues.current.R1, animationValues.current.R2],
            opacity: [0, 0.2],
            skewX: animationValues.current.Sk1,
            skewY: animationValues.current.Sk2,
          },
          0
        )
        .add(
          {
            targets: "#blackhole-bg-2-dark,#blackhole-bg-2-white",
            rotate: [animationValues.current.R3, animationValues.current.R4],
            scale: 0.6,
            opacity: [[0.2, 0.4], 0.6],
            skewX: animationValues.current.Sk3,
            skewY: animationValues.current.Sk4,
          },
          0
        )
        .add(
          {
            targets: "#blackhole-bg-3-dark,#blackhole-bg-3-white",
            scale: [[1, animationValues.current.Sc2], 0.9],
            rotate: [animationValues.current.R5, animationValues.current.R6],
            opacity: [[1, 0.5], 1],
            skewX: animationValues.current.Sk5,
            skewY: animationValues.current.Sk6,
          },
          0
        ).complete = (anim) => {
        loopCompleted.current++;

        if (loopCompleted.current === 2) {
          updateAnimationValues();
          BBGA();
          loopCompleted.current = 0;
        } else if (loopCompleted.current === 1) {
          anim.reverse();
          anim.play();
        }
      };
    }
    if (!playedBBG) {
      BBGA();
      playedBBG = true;
    } else {
      removeBBG = true;
      loopCompleted.current = 0;
      BBGA();
    }
    if (darkMode) {
      BlackholeDarkUpdate();
    } else {
      BlackholeWhiteUpdate();
    }
    setSpanText1((spanText1.i = anime.random(0, spanText1.current.length - 1)));
    document.querySelector("#mobile-home-title-1").innerHTML = spanText1.current[spanText1.i];
    var textWrapper = document.querySelector("#mobile-home-title-1");
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    const spanAnimation1 = () => {
      anime
        .timeline({
          autoplay: true,
          loop: false,
          easing: "easeInOutQuad",
        })
        .add(
          {
            targets: "#mobile-home-title-1 .letter",
            opacity: [0, 1],
            duration: 2500,
            delay: (el, i) => 150 * (i + 1),
          },
          0
        )
        .add(
          {
            targets: "#mobile-home-title-1 .letter",
            opacity: 0,
            duration: 2500,
            delay: (el, i) => 150 * (i + 1),
          },
          "+=5000"
        ).complete = (anim) => {
        anim.pause();
        setSpanText1((spanText1.i = anime.random(0, spanText1.current.length - 1)));
        var textWrapper = document.querySelector("#mobile-home-title-1");

        textWrapper.textContent = spanText1.current[spanText1.i];
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        textWrapper.style.opacity = 1;
        spanAnimation1();
      };
    };
    setTimeout(() => {
      spanAnimation1();
    }, 5000);
    homeArrowAnimation.current = anime({
      targets: "#mobile-home-arrow path",
      d: ["M30 0V45L25 45 30 50 35 45 30 45V0Z", "M30 45V45L25 45 30 50 35 45 30 45V45Z"],
      autoplay: false,
      easing: "easeInOutSine",
    });
    window.addEventListener("scroll", () => {
      const percentage = getScrollPercent(document.querySelector("#blackhole-div"), 0, -0.3);
      homeArrowAnimation.current.seek(homeArrowAnimation.current.duration * (percentage * 0.01));
    });
  }, []);

  return (
    <div id="mobile-home-body">
      <h1 id="mobile-home-title-1">mobile text here</h1>
      <div id="blackhole-div">
        <div id="blackhole-bg-1-dark" className="blackholes-dark" />
        <div id="blackhole-bg-1-white" className="blackholes-white" />
        <div id="blackhole-bg-2-dark" className="blackholes-dark" />
        <div id="blackhole-bg-2-white" className="blackholes-white" />
        <div id="blackhole-bg-3-dark" className="blackholes-dark" />
        <div id="blackhole-bg-3-white" className="blackholes-white" />
        <div id="blackhole-bg-blur" />
        <VectorGraphics.Circle id="blackhole-home" />
      </div>
      <VectorGraphics.Arrow id="mobile-home-arrow" />
    </div>
  );
}

export function MobileHomeBody() {
  return <MobileHomeBodyIntro />;
}

export function MobileAboutBody() {
  return (
    <div id="mobile-about-body">
      <h1>About Mobile text here</h1>
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
    // var clone = circle.cloneNode(true);
    document.body.appendChild(circle);
    // document.querySelector("#desktop-nav-bar").appendChild(clone);
  } else {
    document.querySelector("#mobile-menu").appendChild(circle);
  }
  let bodyColor;
  let svgColor;
  setTimeout(() => {
    if (dark) {
      bodyColor = [{ color: textBlack }];
      svgColor = [{ fill: textBlack }];
      BlackholeWhiteUpdate(250, 500);
    } else {
      bodyColor = [{ color: textWhite }];
      svgColor = [{ fill: textWhite }];
      BlackholeDarkUpdate(250, 500);
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
    // dark ? (document.querySelector("#desktop-nav-bar, #mobile-nav-bar").style.backgroundColor = textWhite) : (document.querySelector("#desktop-nav-bar,#mobile-nav-bar").style.backgroundColor = textBlack);
  }, bgTimer);
}
