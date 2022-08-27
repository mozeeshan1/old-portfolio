import React, { useEffect, useRef, useState } from "react";
import * as VectorGraphics from "./svgs";
import "./segments.css";
import anime from "animejs/lib/anime.es.js";
import { Link, useLocation, useParams, Navigate, useNavigate } from "react-router-dom";
import * as Content from "./content";
import Multiselect from "multiselect-react-dropdown";
import * as Index from "./index.js";
import DOMPurify from "dompurify";


export let darkMode = false;
export let routeLocation = {};
export let playedBBG = false;
export let removeBBG = false;
export let lastScroll = 0;
export let selectedTags = [];
export let changeHome = false;
export let HBIntroH = 0;
export let HBProjectsH = 0;
export let PBBarH = 0;
export let PBProjectsH = 0;
export let tagBgL = "#3B28CC";
export let tagBgD = "#CAC6FF";
export let tagColorL = "#FFFFFF";
export let tagColorD = "#121212";
export let inputBgD = "#3d3d3d";
export let inputBgL = "#F7F7F7";
export let optionHighlightBgL = "#3B28CC";
export let optionHighlightBgD = "#CAC6FF";
export let optionHighlightColorL="#FFFFFF"
export let optionHighlightColorD="#121212";
export let optionBgL = "#F7F7F7";
export let optionBgD = "#282828";
export let chipTextL = "#FFFFFF";
export let chipTextD = "#121212";
export let fullTagsList = {};
export let textColor = "";
export let bgColor = "";
export let viewAnimProgress = 0;
export let homeProjectCount = 3;
export let projectListCount = 10;
export let singlePTH = 0;

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
  lastScroll = window.pageYOffset;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    var h = document.documentElement;
    var b = document.body;
    var pageHeight = Math.max(h.clientHeight, h.scrollHeight, h.offsetHeight, b.scrollHeight, b.offsetHeight);
    if (currentScroll <= 0 || currentScroll === pageHeight - window.innerHeight) {
      lastScroll = currentScroll;
      if (downPlayed) {
        topPlayed = true;
        anim.reverse();
        anim.play();
        setTimeout(() => {
          downPlayed = false;
        }, 10);
      }
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
        let blackholesBGW = document.body.querySelectorAll(".blackholes-light");
        for (let i = 0; i < blackholesBGW.length; i++) {
          blackholesBGW[i].style.setProperty("display", "block");
        }
      }, time1);
    } else {
      let blackholesBGD = document.body.querySelectorAll(".blackholes-dark");
      for (let i = 0; i < blackholesBGD.length; i++) {
        blackholesBGD[i].style.setProperty("display", "none");
      }
      let blackholesBGW = document.body.querySelectorAll(".blackholes-light");
      for (let i = 0; i < blackholesBGW.length; i++) {
        blackholesBGW[i].style.setProperty("display", "block");
      }
    }
    if (time2 > 0) {
      document.body.querySelector("#blackhole-home").animate([{ filter: "drop-shadow(0px 0px 10px black)" }], { duration: time2, fill: "forwards", easing: "ease-in-out" });
      document.body.querySelector("#blackhole-home path").animate([{ fill: "white", stroke: "white" }], { duration: time2, fill: "forwards", easing: "ease-in-out" });
    } else {
      document.body.querySelector("#blackhole-home").style.cssText = "filter: drop-shadow(0px 0px 10px black)";
      document.body.querySelector("#blackhole-home path").style.cssText = "fill: white; stroke: white;";
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
        let blackholesBGW = document.body.querySelectorAll(".blackholes-light");
        for (let i = 0; i < blackholesBGW.length; i++) {
          blackholesBGW[i].style.setProperty("display", "none");
        }
      }, time1);
    } else {
      let blackholesBGD = document.body.querySelectorAll(".blackholes-dark");
      for (let i = 0; i < blackholesBGD.length; i++) {
        blackholesBGD[i].style.setProperty("display", "block");
      }
      let blackholesBGW = document.body.querySelectorAll(".blackholes-light");
      for (let i = 0; i < blackholesBGW.length; i++) {
        blackholesBGW[i].style.setProperty("display", "none");
      }
    }
    if (time2 > 0) {
      document.body.querySelector("#blackhole-home").animate([{ filter: "drop-shadow(0px 0px 10px white)" }], { duration: time2, fill: "forwards", easing: "ease-in-out" });
      document.body.querySelector("#blackhole-home path").animate([{ fill: "black", stroke: "black" }], { duration: time2, fill: "forwards", easing: "ease-in-out" });
    } else {
      document.body.querySelector("#blackhole-home").style.cssText = "filter: drop-shadow(0px 0px 10px white);";
      document.body.querySelector("#blackhole-home path").style.cssText = "fill: black; stroke: black;";
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
    var originalSetItem = localStorage.setItem;
    localStorage.setItem = function () {
      const event = new CustomEvent("storageupdated", { detail: arguments, bubbles: true, cancelable: true });
      originalSetItem.apply(this, arguments);
      document.dispatchEvent(event);
    };
    window.addEventListener(
      "storageupdated",
      (e) => {
        console.log("ITEM INSERTED IN STORAGE", e.detail);
      },
      false
    );

    if (dark) {
      textColor = Content.textWhite;
      bgColor = Content.textBlack;
    } else {
      textColor = Content.textBlack;
      bgColor = Content.textWhite;
    }
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
      <Link id="desktop-logo" to="/">
        <h1>Mohammed Zeeshan</h1>
      </Link>
      <div id="desktop-menu">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/projects">Projects</Link>
        <Link to="https://www.linkedin.com/in/mozeeshan/">Linkedin &#8599;</Link>
        <Link to="https://github.com/rikoudou">Linkedin &#8599;</Link>
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

function DesktopHomeBodyIntro() {
  const blackholeBGAnimation = useRef(null);
  const loopCompleted = useRef(0);
  const animationValues = useRef({});
  const [spanText1, setSpanText1] = useState({ current: Content.homeIntroText, i: 1 });
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
              removeBBG = false;
              playedBBG = false;
              anim.pause();
            }
          },
        })
        .add(
          {
            targets: "#blackhole-bg-1-dark,#blackhole-bg-1-light",
            scale: [0, animationValues.current.Sc1],
            rotate: [animationValues.current.R1, animationValues.current.R2],
            opacity: [0.2, 0],
            skewX: animationValues.current.Sk1,
            skewY: animationValues.current.Sk2,
          },
          0
        )
        .add(
          {
            targets: "#blackhole-bg-2-dark,#blackhole-bg-2-light",
            rotate: [animationValues.current.R3, animationValues.current.R4],
            opacity: [[0.2, 0.4], 0.6],
            skewX: animationValues.current.Sk3,
            skewY: animationValues.current.Sk4,
          },
          0
        )
        .add(
          {
            targets: "#blackhole-bg-3-dark,#blackhole-bg-3-light",
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
    document.querySelector("#home-title-1").innerHTML = spanText1.current[spanText1.i];
    var textWrapper = document.querySelector("#home-title-1");
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    const spanAnimation1 = () => {
      anime
        .timeline({
          autoplay: true,
          loop: false,
          easing: "easeInOutQuad",
          update: (anim) => {
            if (changeHome) {
              anim.pause();
              changeHome = false;
            }
          },
        })
        .add(
          {
            targets: "#home-title-1 .letter",
            opacity: [0, 1],
            duration: 2500,
            delay: (el, i) => 150 * (i + 1),
          },
          0
        )
        .add(
          {
            targets: "#home-title-1 .letter",
            opacity: 0,
            duration: 2500,
            delay: (el, i) => 150 * (i + 1),
          },
          "+=5000"
        ).complete = (anim) => {
        anim.pause();
        setSpanText1((spanText1.i = anime.random(0, spanText1.current.length - 1)));
        var textWrapper = document.querySelector("#home-title-1");

        if (typeof textWrapper != "undefined" && textWrapper != null) {
          textWrapper.textContent = spanText1.current[spanText1.i];
          textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
          textWrapper.style.opacity = 1;
          spanAnimation1();
        }
      };
    };
    setTimeout(() => {
      spanAnimation1();
    }, 5000);
    homeArrowAnimation.current = anime({
      targets: "#home-arrow path",
      d: ["M30 0V45L25 45 30 50 35 45 30 45V0Z", "M30 45V45L25 45 30 50 35 45 30 45V45Z"],
      autoplay: false,
      easing: "easeInOutSine",
    });
    homeArrowAnimation.current = anime({
      targets: "#home-arrow path",
      d: ["M30 0V45L25 45 30 50 35 45 30 45V0Z", "M30 45V45L25 45 30 50 35 45 30 45V45Z"],
      autoplay: false,
      easing: "easeInOutSine",
    });
    const blackholeLine = () => {
      const percentage = getScrollPercent(document.querySelector("#blackhole-div"), 0, -0.3);
      homeArrowAnimation.current.seek(homeArrowAnimation.current.duration * (percentage * 0.01));
    };
    window.addEventListener("scroll", blackholeLine);
    return () => {
      window.removeEventListener("scroll", blackholeLine);
    };
  }, []);

  return (
    <div id="home-body-intro">
      <h1 id="home-title-1">Desktop text here</h1>
      <div id="blackhole-div">
        <div id="blackhole-bg-1-dark" className="blackholes-dark" />
        <div id="blackhole-bg-1-light" className="blackholes-light" />
        <div id="blackhole-bg-2-dark" className="blackholes-dark" />
        <div id="blackhole-bg-2-light" className="blackholes-light" />
        <div id="blackhole-bg-3-dark" className="blackholes-dark" />
        <div id="blackhole-bg-3-light" className="blackholes-light" />
        <div id="blackhole-bg-blur" />
        <VectorGraphics.Circle id="blackhole-home" />
      </div>
      <VectorGraphics.Arrow id="home-arrow" />
    </div>
  );
}

export function GridProject(props) {
  const handelBtn = (e) => {
    e.stopPropagation();
    // OR
    e.preventDefault();
  };
  const pTags = props.tags.map((elem, ind) => {
    if (props.tagToProject === true) {
      return (
        <Link
          to="/projects"
          onClick={() => {
            selectedTags.push(elem.name);
            console.log("Selected tags", selectedTags);
          }}
          className={"tag ".concat(elem.name.toLowerCase().replace(/\s|\W/g, ""))}
          key={ind}
        >
          {elem.name}
        </Link>
      );
    } else {
      return (
        <button onClick={handelBtn} className={"tag ".concat(elem.name.toLowerCase().replace(/\s|\W/g, ""))} key={ind}>
          {elem.name}
        </button>
      );
    }
  });

  let projectURLName = props.title
    .toLowerCase()
    .replace(/[^A-Za-z 0-9]/g, "")
    .replace(/\s/g, "-")
    .replace(/--/g, "-")
    .replace(/--+/g, "");
    projectURLName = "/projects/".concat(projectURLName);


  return (
    <div className={"grid-project-".concat(props.pClass)} data-key={props.pNumber}>
      <div className="grid-project-img">
        <Link className="project-link" to={projectURLName}>
          <img src={props.imageLocation} alt={props.imageAlt} />
        </Link>
        <div className="grid-project-text">
          <Link className="project-link" to={projectURLName}>
            <h2>{props.title}</h2>
            <p>{props.summary}</p>
            <div className="grid-project-tags">{pTags}</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ListProject(props) {
  const handelBtn = (e) => {
    e.stopPropagation();
    // OR
    e.preventDefault();
  };
  const pTags = props.tags.map((elem, ind) => {
    if (props.tagToProject === true) {
      return (
        <Link
          to="/projects"
          onClick={() => {
            selectedTags.push(elem.name);
            console.log("Selected tags", selectedTags);
          }}
          className={"tag ".concat(elem.name.toLowerCase().replace(/\s|\W/g, ""))}
          key={ind}
        >
          {elem.name}
        </Link>
      );
    } else {
      return (
        <button onClick={handelBtn} className={"tag ".concat(elem.name.toLowerCase().replace(/\s|\W/g, ""))} key={ind}>
          {elem.name}
        </button>
      );
    }
  });

  let projectURLName = props.title
    .toLowerCase()
    .replace(/[^A-Za-z 0-9]/g, "")
    .replace(/\s/g, "-")
    .replace(/--/g, "-")
    .replace(/--+/g, "");
    projectURLName="/projects/".concat(projectURLName)

  return (
    <div className={"list-project-".concat(props.pClass)} data-key={props.pNumber}>
      <div className="list-project-img">
        <Link className="project-link" to={projectURLName}>
          <img src={props.imageLocation} alt={props.imageAlt} />
        </Link>
      </div>
      <div className="list-project-text">
        <Link className="project-link" to={projectURLName}>
          <h2>{props.title}</h2>
          <p>{props.summary}</p>
          <div className="list-project-tags">{pTags}</div>
        </Link>
      </div>
    </div>
  );
}

function DesktopProjects(props) {
  const [projectList, setProjectList] = useState({});
  const [changedProjectList, setChangedProjectList] = useState(0);
  const tempVariables = useRef({});

  useEffect(() => {
    tempVariables.current.startedOnce = true;
    let existProject = true;
    for (let i = 1; existProject === true && i <= props.projectCount; i++) {
      let tempTitle = "p".concat(i, "Title");
      let tempSummary = "p".concat(i, "Summary");
      let tempImg = "p".concat(i, "ImgLoc");
      let tempImgAlt = "p".concat(i, "ImgAlt");
      let tempTags = "p".concat(i, "Tags");
      if (typeof Content[tempTitle] !== "undefined" && Content[tempTitle] !== null && typeof Content[tempSummary] !== "undefined" && Content[tempSummary] !== null && typeof Content[tempImg] !== "undefined" && Content[tempImg] !== null && typeof Content[tempImgAlt] !== "undefined" && Content[tempImgAlt] !== null && typeof Content[tempTags] !== "undefined" && Content[tempTags] !== null) {
        let tempId = "l";
        if (document.querySelector(`#${props.divId}`).childNodes.length === 0 && i % 2 === 0) {
          tempId = "r";
        } else if (document.querySelector(`#${props.divId}`).childNodes.length > 0 && i % 2 === 0) {
          tempId = "r";
        }
        if (props.filterProjects === 0) {
          if (routeLocation.pathname === "/projects" && localStorage.getItem("viewType") === '"grid"') {
            setProjectList((current) => {
              return { ...current, [i]: <GridProject tagToProject={false} key={i} pNumber={i} pClass={tempId} imageLocation={Content[tempImg]} imageAlt={Content[tempImgAlt]} title={Content[tempTitle]} summary={Content[tempSummary]} tags={Content[tempTags]} /> };
            });
          } else if (routeLocation.pathname === "/projects" && localStorage.getItem("viewType") === '"list"') {
            setProjectList((current) => {
              return { ...current, [i]: <ListProject tagToProject={false} key={i} pNumber={i} pClass={tempId} imageLocation={Content[tempImg]} imageAlt={Content[tempImgAlt]} title={Content[tempTitle]} summary={Content[tempSummary]} tags={Content[tempTags]} /> };
            });
          }
        } else if (props.filterProjects > 0) {
          let filterPTags = Content[tempTags].map((elem) => {
            return elem.name;
          });
          let fTagsPresent = selectedTags.every((v) => filterPTags.includes(v));
          if (!fTagsPresent && Object.keys(projectList).includes(i.toString())) {
            const newPList = { ...projectList };
            delete newPList[i];
            setProjectList(newPList);
          } else if (fTagsPresent && !Object.keys(projectList).includes(i.toString())) {
            if (routeLocation.pathname === "/projects" && localStorage.getItem("viewType") === '"grid"') {
              setProjectList((current) => {
                return { ...current, [i]: <GridProject tagToProject={false} key={i} pNumber={i} pClass={tempId} imageLocation={Content[tempImg]} imageAlt={Content[tempImgAlt]} title={Content[tempTitle]} summary={Content[tempSummary]} tags={Content[tempTags]} /> };
              });
            } else if (routeLocation.pathname === "/projects" && localStorage.getItem("viewType") === '"list"') {
              setProjectList((current) => {
                return { ...current, [i]: <ListProject tagToProject={false} key={i} pNumber={i} pClass={tempId} imageLocation={Content[tempImg]} imageAlt={Content[tempImgAlt]} title={Content[tempTitle]} summary={Content[tempSummary]} tags={Content[tempTags]} /> };
              });
            }
          }
        } else {
          setProjectList((current) => {
            return { ...current, [i]: <ListProject tagToProject={true} key={i} pNumber={i} pClass={tempId} imageLocation={Content[tempImg]} imageAlt={Content[tempImgAlt]} title={Content[tempTitle]} summary={Content[tempSummary]} tags={Content[tempTags]} /> };
          });
        }
      } else if ((typeof Content[tempTitle] !== "undefined" && Content[tempTitle] !== null) || (typeof Content[tempSummary] !== "undefined" && Content[tempSummary] !== null) || (typeof Content[tempImg] !== "undefined" && Content[tempImg] !== null) || (typeof Content[tempImgAlt] !== "undefined" && Content[tempImgAlt] !== null) || (typeof Content[tempTags] !== "undefined" && Content[tempTags] !== null)) {
      } else {
        existProject = false;
      }
    }
  }, [props.filterProjects, changedProjectList]);

  useEffect(() => {
    if (Object.keys(projectList).length !== changedProjectList) {
      setChangedProjectList(Object.keys(projectList).length);
    }
    setTimeout(() => {
      if (localStorage.getItem("dark") === "false") {
        let tags = document.body.querySelectorAll(".tag");
        for (let i = 0; i < tags.length; i++) {
          tags[i].style.setProperty("--tag-bg", tagBgL);
          tags[i].style.setProperty("--tag-color", tagColorL);
        }
      } else {
        let tags = document.body.querySelectorAll(".tag");
        for (let i = 0; i < tags.length; i++) {
          tags[i].style.setProperty("--tag-bg", tagBgD);
          tags[i].style.setProperty("--tag-color", tagColorD);
        }
      }
    }, 10);
  }, [projectList]);
  return (
    <div id={props.divId}>
      {props.headingPresent && <h1 id={props.headingId}>Projects</h1>}
      {Object.keys(projectList).map((key, ind) => {
        return projectList[key];
      })}
    </div>
  );
}

export function DesktopHomeBody() {
  useEffect(() => {
    lastScroll = 0;
    window.scrollTo(0, 0);
    setTimeout(() => {
      const homeBodyResize = new ResizeObserver((entries) => {
        for (let i of entries) {
          switch (i.target.id) {
            case "home-body-intro":
              HBIntroH = i.target.clientHeight;
              break;
            case "home-body-projects":
              HBProjectsH = i.target.clientHeight;
              break;
            default:
              break;
          }
        }
        document.querySelector("#home-body").style.setProperty("--body-height", (HBIntroH + HBProjectsH + 100).toString().concat("px"));
        document.querySelector("#bg-blur").style.setProperty("--body-height", (HBIntroH + HBProjectsH + 100 + document.querySelector("#footer").clientHeight).toString().concat("px"));
      });
      document.querySelectorAll("#home-body>*").forEach((elem) => {
        homeBodyResize.observe(elem);
      });
    }, 200);

    return () => {
      removeBBG = true;
      changeHome = true;
    };
  }, []);

  return (
    <div id="home-body">
      <DesktopHomeBodyIntro />
      <DesktopProjects headingPresent={true} divId="home-body-projects" projectCount={homeProjectCount} />
    </div>
  );
}

export function DesktopAboutBody() {
  useEffect(() => {
    lastScroll = 0;
    window.scrollTo(0, 0);
    // setTimeout(()=>{
    //   console.log(DOMPurify.removed);
    // },3000)
  }, []);

  return (
    <div id="about-body">
      <p id="about-body-para" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(Content.aboutPara, { ADD_ATTR:["target"] }) }}></p>
      <img src={Content.aboutImg} alt={Content.aboutImgAlt}/>
    </div>
  );
}

function DesktopProjectsList() {
  const [filterButton, setFilterButton] = useState(false);
  const filterAnimation = useRef(null);
  const filterAnimationVariables = useRef({});
  const [viewButton, setViewButton] = useStickyState("list", "viewType");
  const viewAnimation = useRef({});
  const viewAnimationVariables = useRef({});
  const [viewButtonDisabled, setViewButtonDisabled] = useState(false);
  const [filterSelectedTags, setFilterSelectedTags] = useState([]);
  const filterSelectRef = useRef();
  const tagClickFunc = useRef((e) => {
    filterSelect([], e.currentTarget.innerText, true);
  });
  const tagButtonVariables = useRef({});
  const [filterList, setFilterList] = useState(0);

  function filterSelect(array, item, tagClick = false) {
    if (!selectedTags.includes(item)) {
      selectedTags.push(item);
      if ((selectedTags.length === 1 || (selectedTags.length === 2 && tagButtonVariables.current.PreExistSelectedTags)) && tagClick) {
        setFilterSelectedTags([...selectedTags, null]);
        setFilterButton(!filterButton);
        if (tagButtonVariables.current.PreExistSelectedTags) {
          tagButtonVariables.current.PreExistSelectedTags = false;
        }
      }
    }

    setTimeout(() => {
      setFilterSelectedTags([...selectedTags]);
    }, 1);
  }
  function filterRemove(array, item) {
    if (typeof item !== "number") {
      var index = selectedTags.indexOf(item);
      if (index !== -1) {
        selectedTags.splice(index, 1);
      }
    } else {
      selectedTags.pop();
    }
    setFilterSelectedTags([...selectedTags]);
  }
  useEffect(() => {
    // setTimeout(() => {
    //   document.querySelectorAll(".project-link").forEach((elem) => {
    //     if (localStorage.getItem("viewType") === '"list"') {
    //       elem.style.width = "100%";
    //     } else if (localStorage.getItem("viewType") === '"grid"') {
    //       elem.style.width = "50%";
    //     }
    //   });
    // }, 200);
    if (selectedTags.length > 0) {
      setFilterList((numb) => numb + 1);
    } else {
      setFilterList(0);
    }
    setTimeout(() => {
      document.querySelectorAll(".tag").forEach((elem) => {
        elem.addEventListener("click", tagClickFunc.current, false);
      });
    }, 10);
  }, [filterSelectedTags]);

  useEffect(() => {
    viewAnimationVariables.current.viewButton = viewButton;
    if (viewAnimationVariables.current.mounted) {
      if (localStorage.getItem("viewType") === `"grid"`) {
        viewAnimation.current.gridAnimation = anime
          .timeline({
            easing: "easeInOutQuad",
            loop: false,
            autoplay: false,
            direction: "normal",
            duration: 500,
            begin: (anim) => {
              document.querySelectorAll(".list-project-l .list-project-text,.list-project-r .list-project-text").forEach((elem) => {
                elem.style.flexShrink = "1000";
                if (localStorage.getItem("viewType") === '"grid"') {
                  elem.style.overflow = "hidden";
                  elem.style.whiteSpace = "nowrap";
                  elem.querySelector(".list-project-tags").style.flexWrap = "nowrap";
                } else {
                  elem.style.overflow = "visible";
                  elem.style.whiteSpace = "normal";
                  elem.querySelector(".list-project-tags").style.flexWrap = "wrap";
                }
              });
              viewAnimationVariables.current.progressFull = false;
            },
            update: (anim) => {
              viewAnimProgress = Math.round(anim.progress);
              if (viewAnimProgress > 0 && viewAnimProgress < 100) {
                document.querySelectorAll("#projects-body-bar-view-icon #bottom-1,#projects-body-bar-view-icon #bottom-2").forEach((elem) => {
                  elem.style.fill = null;
                  elem.style.stroke = null;
                });
                document.querySelectorAll(".list-project-l .list-project-img").forEach((elem) => {
                  elem.style.marginLeft = "5vw";
                });
                document.querySelectorAll(".list-project-r .list-project-img").forEach((elem) => {
                  //change all the code to make grid class change to list class and vice versa
                  elem.style.marginRight = "5vw";
                });
              }
              if (viewAnimProgress === 100 && !viewAnimationVariables.current.progressFull) {
                setTimeout(() => {
                  document.querySelectorAll(".list-project-l,.list-project-r").forEach((elem) => {
                    elem.removeAttribute("style");
                    elem.querySelectorAll(".list-project-img,.list-project-text,.list-project-tags").forEach((child) => {
                      child.removeAttribute("style");
                    });
                    if (elem.classList.contains("list-project-l")) {
                      elem.classList.add("grid-project-l");
                      elem.querySelector(".list-project-img").classList.add("grid-project-img");
                      elem.querySelector(".list-project-text").classList.add("grid-project-text");
                      elem.querySelector(".list-project-tags").classList.add("grid-project-tags");
                      elem.classList.remove("list-project-l");
                      elem.querySelector(".list-project-img").classList.remove("list-project-img");
                      elem.querySelector(".list-project-text").classList.remove("list-project-text");
                      elem.querySelector(".list-project-tags").classList.remove("list-project-tags");
                      let gText = elem.querySelector(".grid-project-text");
                      elem.querySelector(".grid-project-img").appendChild(gText);
                    } else if (elem.classList.contains("list-project-r")) {
                      elem.classList.add("grid-project-r");
                      elem.querySelector(".list-project-img").classList.add("grid-project-img");
                      elem.querySelector(".list-project-text").classList.add("grid-project-text");
                      elem.querySelector(".list-project-tags").classList.add("grid-project-tags");
                      elem.classList.remove("list-project-r");
                      elem.querySelector(".list-project-img").classList.remove("list-project-img");
                      elem.querySelector(".list-project-text").classList.remove("list-project-text");
                      elem.querySelector(".list-project-tags").classList.remove("list-project-tags");
                      let gText = elem.querySelector(".grid-project-text");
                      elem.querySelector(".grid-project-img").appendChild(gText);
                    }
                  });
                }, 100);
                viewAnimationVariables.current.progressFull = true;
              }
            },
            complete: (anim) => {
              document.querySelectorAll("#projects-body-bar-view-icon #bottom-1,#projects-body-bar-view-icon #bottom-2").forEach((elem) => {
                elem.style.setProperty("fill", "inherit");
                elem.style.setProperty("stroke", "none");
              });
              document.querySelectorAll(".list-project-l .list-project-text,.list-project-r .list-project-text").forEach((elem) => {
                elem.style.overflow = "hidden";
                elem.style.whiteSpace = "nowrap";
                elem.querySelector(".list-project-tags").style.flexWrap = "nowrap";
              });
            },
          })
          .add(
            {
              targets: "#projects-body-bar-view-icon #top-1, #projects-body-bar-view-icon #top-2, #projects-body-bar-view-icon #middle-1, #projects-body-bar-view-icon #middle-2",
              translateY: ["-20px", 0],
              opacity: [0, 1],
            },
            0
          )
          .add(
            {
              targets: "#projects-body-bar-view-icon #bottom-1",
              d: [`M25 12C25 9 27 7 30 7H34C37 7 39 9 39 12 39 12 39 16 39 16 39 19 37 21 34 21H30C27 21 25 19 25 16Z`, `M25 19C25 18.448 25.448 18 26 18H40.998C41.552 18 42 18.448 42 19 42 19 42 19 42 19 42 19.552 41.552 20 41 20H26C25.448 20.001 25.001 19.554 25 19Z`],
              fill: ["rgba(0,0,0,0)", textColor],
              stroke: [textColor, "rgba(0,0,0,0)"],
              strokeWidth: [2, 0.5],
            },
            0
          )
          .add(
            {
              targets: "#projects-body-bar-view-icon #bottom-2",
              d: [`M39 32C39 29 37 27 34 27H30C27 27 25 29 25 32V36C25 39 27 41 30 41H34c3 0 5-2 5-5Z`, `M42 39C42 38.448 41.552 38 41 38H26C25.448 38 25 38.448 25 39V39C25 39.552 25.448 40 26 40H41c.552 0 1-.448 1-1Z`],
              fill: ["rgba(0,0,0,0)", textColor],
              stroke: [textColor, "rgba(0,0,0,0)"],
              strokeWidth: [2, 0.5],
            },
            0
          )
          .add(
            {
              targets: ".list-project-l .list-project-text",
              opacity: [1, 0],
              delay: anime.stagger(300),
            },
            0
          )
          .add(
            {
              targets: ".list-project-r .list-project-text",
              opacity: [1, 0],
              delay: anime.stagger(300),
            },
            150
          )
          // .add(
          //   {
          //     targets: ".project-link",
          //     width: ["100%", "50%"],
          //     delay: anime.stagger(300),
          //   },
          //   0
          // )
          .add(
            {
              targets: ".list-project-l",
              width: ["100%", "50%"],
              delay: anime.stagger(300),
            },
            0
          )
          .add(
            {
              targets: ".list-project-r",
              width: ["100%", "50%"],
              delay: anime.stagger(300),
            },
            150
          )
          .add(
            {
              targets: ".list-project-img",
              width: ["30vw", "40vw"],
              height: ["30vh", "35vh"],
            },
            0
          );

        viewAnimation.current.gridAnimation.play();
      } else if (localStorage.getItem("viewType") === `"list"`) {
        viewAnimation.current.listAnimation = anime
          .timeline({
            easing: "easeInOutQuad",
            loop: false,
            autoplay: false,
            direction: "normal",
            duration: 500,
            begin: (anim) => {
              document.querySelectorAll(".grid-project-l,.grid-project-r").forEach((elem) => {
                if (elem.classList.contains("grid-project-l")) {
                  elem.querySelector(".grid-project-img").classList.add("list-project-img");
                  elem.querySelector(".grid-project-text").classList.add("list-project-text");
                  elem.querySelector(".grid-project-tags").classList.add("list-project-tags");
                  elem.querySelector(".grid-project-img").classList.remove("grid-project-img");
                  elem.querySelector(".grid-project-text").classList.remove("grid-project-text");
                  elem.querySelector(".grid-project-tags").classList.remove("grid-project-tags");
                  let lText = elem.querySelector(".list-project-text");
                  elem.appendChild(lText);
                } else if (elem.classList.contains("grid-project-r")) {
                  elem.querySelector(".grid-project-img").classList.add("list-project-img");
                  elem.querySelector(".grid-project-text").classList.add("list-project-text");
                  elem.querySelector(".grid-project-tags").classList.add("list-project-tags");
                  elem.querySelector(".grid-project-img").classList.remove("grid-project-img");
                  elem.querySelector(".grid-project-text").classList.remove("grid-project-text");
                  elem.querySelector(".grid-project-tags").classList.remove("grid-project-tags");
                  let lText = elem.querySelector(".list-project-text");
                  elem.appendChild(lText);
                }
              });
              document.querySelectorAll(".grid-project-l .list-project-text,.grid-project-r .list-project-text").forEach((elem) => {
                elem.style.flexShrink = "0";
                setTimeout(() => {
                  elem.style.whiteSpace = "normal";
                }, 300);
              });
              viewAnimationVariables.current.progressFull = false;
            },
            update: (anim) => {
              viewAnimProgress = Math.round(anim.progress);
              if (viewAnimProgress > 0 && viewAnimProgress < 100) {
                document.querySelectorAll("#projects-body-bar-view-icon #bottom-1,#projects-body-bar-view-icon #bottom-2").forEach((elem) => {
                  elem.style.fill = null;
                  elem.style.stroke = null;
                });
                document.querySelectorAll(".grid-project-l .list-project-img").forEach((elem) => {
                  elem.style.marginLeft = "10vw";
                });
                document.querySelectorAll(".grid-project-r .list-project-img").forEach((elem) => {
                  elem.style.marginRight = "10vw";
                });
              }
              if (viewAnimProgress === 100 && !viewAnimationVariables.current.progressFull) {
                setTimeout(() => {
                  document.querySelectorAll(".grid-project-l,.grid-project-r").forEach((elem) => {
                    elem.removeAttribute("style");
                    elem.querySelectorAll(".list-project-img,.list-project-text,.list-project-tags").forEach((child) => {
                      child.removeAttribute("style");
                    });
                    if (elem.classList.contains("grid-project-l")) {
                      elem.classList.add("list-project-l");
                      elem.classList.remove("grid-project-l");
                    } else if (elem.classList.contains("grid-project-r")) {
                      elem.classList.add("list-project-r");
                      elem.classList.remove("grid-project-r");
                    }
                  });
                }, 100);
                viewAnimationVariables.current.progressFull = true;
              }
            },
            complete: (anim) => {
              document.querySelectorAll("#projects-body-bar-view-icon #bottom-1,#projects-body-bar-view-icon #bottom-2").forEach((elem) => {
                elem.style.setProperty("fill", "none");
                elem.style.setProperty("stroke", "inherit");
              });
              document.querySelectorAll(".list-project-l .list-project-text,.list-project-r .list-project-text").forEach((elem) => {
                elem.style.overflow = "visible";
                elem.style.whiteSpace = "normal";
                elem.querySelector(".list-project-tags").style.flexWrap = "wrap";
              });
              //ADD NEW CLASSES TO THE THING HERE AND SEE IF U HAVE TO REMOVE OLD ONES OR NOT. IF U HAVE TO REMOVE OLD ONES THEN IDK MAKE IT WORK 25/06/2022
            },
          })
          .add(
            {
              targets: "#projects-body-bar-view-icon #top-1, #projects-body-bar-view-icon #top-2, #projects-body-bar-view-icon #middle-1, #projects-body-bar-view-icon #middle-2",
              translateY: [0, "-20px"],
              opacity: [1, 0],
            },
            0
          )
          .add(
            {
              targets: "#projects-body-bar-view-icon #bottom-1",
              d: [`M25 19C25 18.448 25.448 18 26 18H40.998C41.552 18 42 18.448 42 19 42 19 42 19 42 19 42 19.552 41.552 20 41 20H26C25.448 20.001 25.001 19.554 25 19Z`, `M25 12C25 9 27 7 30 7H34C37 7 39 9 39 12 39 12 39 16 39 16 39 19 37 21 34 21H30C27 21 25 19 25 16Z`],
              fill: [textColor, "rgba(0,0,0,0)"],
              stroke: ["rgba(0,0,0,0)", textColor],
              strokeWidth: [0.5, 2],
            },
            0
          )
          .add(
            {
              targets: "#projects-body-bar-view-icon #bottom-2",
              d: [`M42 39C42 38.448 41.552 38 41 38H26C25.448 38 25 38.448 25 39V39C25 39.552 25.448 40 26 40H41c.552 0 1-.448 1-1Z`, `M39 32C39 29 37 27 34 27H30C27 27 25 29 25 32V36C25 39 27 41 30 41H34c3 0 5-2 5-5Z`],
              fill: [textColor, "rgba(0,0,0,0)"],
              stroke: ["rgba(0,0,0,0)", textColor],
              strokeWidth: [0.5, 2],
            },
            0
          )

          .add(
            {
              targets: ".grid-project-l .grid-project-text", // COMPETE THE ANIMATION 22/06/2022
              opacity: [0, 1],
              delay: anime.stagger(300),
            },
            0
          )
          .add(
            {
              targets: ".grid-project-r .grid-project-text",
              opacity: [0, 1],
              delay: anime.stagger(300),
            },
            150
          )
          // .add(
          //   {
          //     targets: ".project-link",
          //     width: ["50%", "100%"],
          //     delay: anime.stagger(300),
          //   },
          //   0
          // )
          .add(
            {
              targets: ".grid-project-l",
              width: ["50%", "100%"],
              delay: anime.stagger(300),
            },
            0
          )
          .add(
            {
              targets: ".grid-project-r",
              width: ["50%", "100%"],
              delay: anime.stagger(300),
            },
            150
          )
          .add(
            {
              targets: ".grid-project-img",
              width: ["40vw", "30vw"],
              height: ["35vh", "30vh"],
            },
            0
          );
        viewAnimation.current.listAnimation.play();
      }
    } else {
      viewAnimationVariables.current.mounted = true;
      setTimeout(() => {
        if (localStorage.getItem("viewType") === `"grid"`) {
          viewAnimation.current.gridAnimation = anime
            .timeline({
              easing: "easeInOutQuad",
              loop: false,
              autoplay: false,
              direction: "normal",
              duration: 500,
              begin: (anim) => {
                document.querySelectorAll(".list-project-l .list-project-text,.list-project-r .list-project-text").forEach((elem) => {
                  elem.style.flexShrink = "1000";
                  if (localStorage.getItem("viewType") === '"grid"') {
                    elem.style.overflow = "hidden";
                    elem.style.whiteSpace = "nowrap";
                    elem.querySelector(".list-project-tags").style.flexWrap = "nowrap";
                  } else {
                    elem.style.overflow = "visible";
                    elem.style.whiteSpace = "normal";
                    elem.querySelector(".list-project-tags").style.flexWrap = "wrap";
                  }
                });
                viewAnimationVariables.current.progressFull = false;
              },
              update: (anim) => {
                viewAnimProgress = Math.round(anim.progress);
                if (viewAnimProgress > 0 && viewAnimProgress < 100) {
                  document.querySelectorAll("#projects-body-bar-view-icon #bottom-1,#projects-body-bar-view-icon #bottom-2").forEach((elem) => {
                    elem.style.fill = null;
                    elem.style.stroke = null;
                  });
                  document.querySelectorAll(".list-project-l .list-project-img").forEach((elem) => {
                    elem.style.marginLeft = "5vw";
                  });
                  document.querySelectorAll(".list-project-r .list-project-img").forEach((elem) => {
                    elem.style.marginRight = "5vw";
                  });
                }
                if (viewAnimProgress === 100 && !viewAnimationVariables.current.progressFull) {
                  setTimeout(() => {
                    document.querySelectorAll(".list-project-l,.list-project-r").forEach((elem) => {
                      elem.removeAttribute("style");
                      elem.querySelectorAll(".list-project-img,.list-project-text,.list-project-tags").forEach((child) => {
                        child.removeAttribute("style");
                      });
                      if (elem.classList.contains("list-project-l")) {
                        elem.classList.add("grid-project-l");
                        elem.querySelector(".list-project-img").classList.add("grid-project-img");
                        elem.querySelector(".list-project-text").classList.add("grid-project-text");
                        elem.querySelector(".list-project-tags").classList.add("grid-project-tags");
                        elem.classList.remove("list-project-l");
                        elem.querySelector(".list-project-img").classList.remove("list-project-img");
                        elem.querySelector(".list-project-text").classList.remove("list-project-text");
                        elem.querySelector(".list-project-tags").classList.remove("list-project-tags");
                        let gText = elem.querySelector(".grid-project-text");
                        elem.querySelector(".grid-project-img").appendChild(gText);
                      } else if (elem.classList.contains("list-project-r")) {
                        elem.classList.add("grid-project-r");
                        elem.querySelector(".list-project-img").classList.add("grid-project-img");
                        elem.querySelector(".list-project-text").classList.add("grid-project-text");
                        elem.querySelector(".list-project-tags").classList.add("grid-project-tags");
                        elem.classList.remove("list-project-r");
                        elem.querySelector(".list-project-img").classList.remove("list-project-img");
                        elem.querySelector(".list-project-text").classList.remove("list-project-text");
                        elem.querySelector(".list-project-tags").classList.remove("list-project-tags");
                        let gText = elem.querySelector(".grid-project-text");
                        elem.querySelector(".grid-project-img").appendChild(gText);
                      }
                    });
                  }, 100);
                  viewAnimationVariables.current.progressFull = true;
                }
              },
              complete: (anim) => {
                document.querySelectorAll("#projects-body-bar-view-icon #bottom-1,#projects-body-bar-view-icon #bottom-2").forEach((elem) => {
                  elem.style.setProperty("fill", "inherit");
                  elem.style.setProperty("stroke", "none");
                });
                document.querySelectorAll(".list-project-l .list-project-text,.list-project-r .list-project-text").forEach((elem) => {
                  elem.style.overflow = "hidden";
                  elem.style.whiteSpace = "nowrap";
                  elem.querySelector(".list-project-tags").style.flexWrap = "nowrap";
                });
              },
            })
            .add(
              {
                targets: "#projects-body-bar-view-icon #top-1, #projects-body-bar-view-icon #top-2, #projects-body-bar-view-icon #middle-1, #projects-body-bar-view-icon #middle-2",
                translateY: [0, "-20px"],
                opacity: [1, 0],
              },
              0
            )
            .add(
              {
                targets: "#projects-body-bar-view-icon #bottom-1",
                d: [`M25 19C25 18.448 25.448 18 26 18H40.998C41.552 18 42 18.448 42 19 42 19 42 19 42 19 42 19.552 41.552 20 41 20H26C25.448 20.001 25.001 19.554 25 19Z`, `M25 12C25 9 27 7 30 7H34C37 7 39 9 39 12 39 12 39 16 39 16 39 19 37 21 34 21H30C27 21 25 19 25 16Z`],
                fill: [textColor, "rgba(0,0,0,0)"],
                stroke: ["rgba(0,0,0,0)", textColor],
                strokeWidth: [0.5, 2],
              },
              0
            )
            .add(
              {
                targets: "#projects-body-bar-view-icon #bottom-2",
                d: [`M42 39C42 38.448 41.552 38 41 38H26C25.448 38 25 38.448 25 39V39C25 39.552 25.448 40 26 40H41c.552 0 1-.448 1-1Z`, `M39 32C39 29 37 27 34 27H30C27 27 25 29 25 32V36C25 39 27 41 30 41H34c3 0 5-2 5-5Z`],
                fill: [textColor, "rgba(0,0,0,0)"],
                stroke: ["rgba(0,0,0,0)", textColor],
                strokeWidth: [0.5, 2],
              },
              0
            )

            .add(
              {
                targets: ".list-project-l .list-project-text",
                opacity: [1, 0],
                delay: anime.stagger(300),
              },
              0
            )
            .add(
              {
                targets: ".list-project-r .list-project-text",
                opacity: [1, 0],
                delay: anime.stagger(300),
              },
              150
            )
            // .add(
            //   {
            //     targets: ".project-link",
            //     width: ["100%", "50%"],
            //     delay: anime.stagger(300),
            //   },
            //   0
            // )
            .add(
              {
                targets: ".list-project-l",
                width: ["100%", "50%"],
                delay: anime.stagger(300),
              },
              0
            )
            .add(
              {
                targets: ".list-project-r",
                width: ["100%", "50%"],
                delay: anime.stagger(300),
              },
              150
            )
            .add(
              {
                targets: ".list-project-img",
                width: ["30vw", "40vw"],
                height: ["30vh", "35vh"],
              },
              0
            );
        } else if (localStorage.getItem("viewType") === `"list"`) {
          viewAnimation.current.listAnimation = anime
            .timeline({
              easing: "easeInOutQuad",
              loop: false,
              autoplay: false,
              direction: "normal",
              duration: 500,
              begin: (anim) => {
                document.querySelectorAll(".grid-project-l,.grid-project-r").forEach((elem) => {
                  if (elem.classList.contains("grid-project-l")) {
                    elem.querySelector(".grid-project-img").classList.add("list-project-img");
                    elem.querySelector(".grid-project-text").classList.add("list-project-text");
                    elem.querySelector(".grid-project-tags").classList.add("list-project-tags");
                    elem.querySelector(".grid-project-img").classList.remove("grid-project-img");
                    elem.querySelector(".grid-project-text").classList.remove("grid-project-text");
                    elem.querySelector(".grid-project-tags").classList.remove("grid-project-tags");
                    let lText = elem.querySelector(".list-project-text");
                    elem.appendChild(lText);
                  } else if (elem.classList.contains("grid-project-r")) {
                    elem.querySelector(".grid-project-img").classList.add("list-project-img");
                    elem.querySelector(".grid-project-text").classList.add("list-project-text");
                    elem.querySelector(".grid-project-tags").classList.add("list-project-tags");
                    elem.querySelector(".grid-project-img").classList.remove("grid-project-img");
                    elem.querySelector(".grid-project-text").classList.remove("grid-project-text");
                    elem.querySelector(".grid-project-tags").classList.remove("grid-project-tags");
                    let lText = elem.querySelector(".list-project-text");
                    elem.appendChild(lText);
                  }
                });
                document.querySelectorAll(".grid-project-l .list-project-text,.grid-project-r .list-project-text").forEach((elem) => {
                  elem.style.flexShrink = "0";
                  setTimeout(() => {
                    elem.style.whiteSpace = "normal";
                  }, 300);
                });
                viewAnimationVariables.current.progressFull = false;
              },
              update: (anim) => {
                viewAnimProgress = Math.round(anim.progress);
                if (viewAnimProgress > 0 && viewAnimProgress < 100) {
                  document.querySelectorAll("#projects-body-bar-view-icon #bottom-1,#projects-body-bar-view-icon #bottom-2").forEach((elem) => {
                    elem.style.fill = null;
                    elem.style.stroke = null;
                  });
                  document.querySelectorAll(".grid-project-l .list-project-img").forEach((elem) => {
                    elem.style.marginLeft = "10vw";
                  });
                  document.querySelectorAll(".grid-project-r .list-project-img").forEach((elem) => {
                    elem.style.marginRight = "10vw";
                  });
                }
                if (viewAnimProgress === 100 && !viewAnimationVariables.current.progressFull) {
                  setTimeout(() => {
                    document.querySelectorAll(".grid-project-l,.grid-project-r").forEach((elem) => {
                      elem.removeAttribute("style");
                      elem.querySelectorAll(".list-project-img,.list-project-text,.list-project-tags").forEach((child) => {
                        child.removeAttribute("style");
                      });
                      if (elem.classList.contains("grid-project-l")) {
                        elem.classList.add("list-project-l");
                        elem.classList.remove("grid-project-l");
                      } else if (elem.classList.contains("grid-project-r")) {
                        elem.classList.add("list-project-r");
                        elem.classList.remove("grid-project-r");
                      }
                    });
                  }, 100);
                  viewAnimationVariables.current.progressFull = true;
                }
              },
              complete: (anim) => {
                document.querySelectorAll("#projects-body-bar-view-icon #bottom-1,#projects-body-bar-view-icon #bottom-2").forEach((elem) => {
                  elem.style.setProperty("fill", "none");
                  elem.style.setProperty("stroke", "inherit");
                });
                document.querySelectorAll(".list-project-l .list-project-text,.list-project-r .list-project-text").forEach((elem) => {
                  elem.style.overflow = "visible";
                  elem.style.whiteSpace = "normal";
                  elem.querySelector(".list-project-tags").style.flexWrap = "wrap";
                });
                //ADD NEW CLASSES TO THE THING HERE AND SEE IF U HAVE TO REMOVE OLD ONES OR NOT. IF U HAVE TO REMOVE OLD ONES THEN IDK MAKE IT WORK 25/06/2022
              },
            })
            .add(
              {
                targets: "#projects-body-bar-view-icon #top-1, #projects-body-bar-view-icon #top-2, #projects-body-bar-view-icon #middle-1, #projects-body-bar-view-icon #middle-2",
                translateY: ["-20px", 0],
                opacity: [0, 1],
              },
              0
            )
            .add(
              {
                targets: "#projects-body-bar-view-icon #bottom-1",
                d: [`M25 12C25 9 27 7 30 7H34C37 7 39 9 39 12 39 12 39 16 39 16 39 19 37 21 34 21H30C27 21 25 19 25 16Z`, `M25 19C25 18.448 25.448 18 26 18H40.998C41.552 18 42 18.448 42 19 42 19 42 19 42 19 42 19.552 41.552 20 41 20H26C25.448 20.001 25.001 19.554 25 19Z`],
                fill: ["rgba(0,0,0,0)", textColor],
                stroke: [textColor, "rgba(0,0,0,0)"],
                strokeWidth: [2, 0.5],
              },
              0
            )
            .add(
              {
                targets: "#projects-body-bar-view-icon #bottom-2",
                d: [`M39 32C39 29 37 27 34 27H30C27 27 25 29 25 32V36C25 39 27 41 30 41H34c3 0 5-2 5-5Z`, `M42 39C42 38.448 41.552 38 41 38H26C25.448 38 25 38.448 25 39V39C25 39.552 25.448 40 26 40H41c.552 0 1-.448 1-1Z`],
                fill: ["rgba(0,0,0,0)", textColor],
                stroke: [textColor, "rgba(0,0,0,0)"],
                strokeWidth: [2, 0.5],
              },
              0
            )

            .add(
              {
                targets: ".grid-project-l .grid-project-text", // COMPETE THE ANIMATION 22/06/2022
                opacity: [0, 1],
                delay: anime.stagger(300),
              },
              0
            )
            .add(
              {
                targets: ".grid-project-r .grid-project-text",
                opacity: [0, 1],
                delay: anime.stagger(300),
              },
              150
            )
            // .add(
            //   {
            //     targets: ".project-link",
            //     width: ["50%", "100%"],
            //     delay: anime.stagger(300),
            //   },
            //   0
            // )
            .add(
              {
                targets: ".grid-project-l",
                width: ["50%", "100%"],
                delay: anime.stagger(300),
              },
              0
            )
            .add(
              {
                targets: ".grid-project-r",
                width: ["50%", "100%"],
                delay: anime.stagger(300),
              },
              150
            )
            .add(
              {
                targets: ".grid-project-img",
                width: ["40vw", "30vw"],
                height: ["35vh", "30vh"],
              },
              0
            );
        }
      }, 200);
    }
  }, [viewButton]);

  useEffect(() => {
    if (filterButton && filterAnimationVariables.current.filterPlayedOnce) {
      filterAnimation.current.reverse();
      filterAnimation.current.play();
      document.querySelector("#projects-body-filter-search-bar").style.display = "block";
    } else if (!filterButton && filterAnimationVariables.current.filterPlayedOnce) {
      filterAnimation.current.reverse();
      filterAnimation.current.play();
    } else if (filterButton && !filterAnimationVariables.current.filterPlayedOnce && filterAnimationVariables.current.mounted) {
      // filterAnimation.current.play();
      filterAnimationVariables.current.filterPlayedOnce = true;
      filterAnimation.current = anime
        .timeline({
          easing: "easeInOutQuad",
          autoplay: true,
          direction: "reverse",
          complete: (anim) => {
            if (document.querySelector("#projects-body-filter-search-bar").style.clipPath === "inset(0px)") {
              document.querySelector("#projects-body-filter-search-bar").style.clipPath = null;
            }
          },
        })
        // .add(
        //   {
        //     targets: "#projects-body-bar-filter-icon path",
        //     duration: 1500,
        //     rotate: [0, -36, 0],
        //     autoplay: true,
        //   },
        //   0
        // )
        .add(
          {
            targets: "#projects-body-filter-search-bar",
            keyframes: [
              { clipPath: "inset(0)" }, // start frame
              { clipPath: "inset(0 0 0 100%)" }, // end frame
            ],
            opacity: [1, 0],
            duration: 1500,
            autoplay: true,
          },
          0
        );
      // setTimeout(() => {
      //   document.querySelector("#projects-body-filter-search-bar").style.display = "none";
      // }, 2000);
    } else {
      filterAnimationVariables.current.mounted = true;
      filterAnimationVariables.current.filterPlayedOnce = false;
    }
  }, [filterButton]);

  useEffect(() => {
    setFilterSelectedTags(selectedTags);
    if (selectedTags.length > 0) {
      setFilterButton(!filterButton);
      tagButtonVariables.current.PreExistSelectedTags = true;
    } else {
      tagButtonVariables.current.PreExistSelectedTags = false;
    }
    let existProject = false;
    let allTags = {};

    for (let i = 1; existProject === false; i++) {
      let tempTag = "p".concat(i, "Tags");
      if (typeof Content[tempTag] === "undefined" || Content[tempTag] === null) {
        for (const [key, value] of Object.entries(allTags)) {
          if (!Object.keys(fullTagsList).find((key) => fullTagsList[key] === value)) {
            fullTagsList[key] = value;
          }
        }
        existProject = true;
      } else {
        Content[tempTag].forEach((elem, ind) => {
          allTags[elem.name] = elem.name.toLowerCase().replace(/\s|\W/g, "");
        });
      }
    }

    if (localStorage.getItem("viewType") === '"list"') {
      document.querySelectorAll("#projects-body-bar-view-icon #bottom-1,#projects-body-bar-view-icon #bottom-2").forEach((elem) => {
        elem.style.setProperty("fill", "none");
        elem.style.setProperty("stroke", "inherit");
      });
    } else if (localStorage.getItem("viewType") === '"grid"') {
      document.querySelectorAll("#projects-body-bar-view-icon #bottom-1,#projects-body-bar-view-icon #bottom-2").forEach((elem) => {
        elem.style.setProperty("fill", "inherit");
        elem.style.setProperty("stroke", "none");
      });
    }
    // window.addEventListener(
    //   "storageupdated",
    //   (e) => {
    //     if (e.detail[0] === "dark") {
    //       // viewAnimation.current.listAnimation = ChangeViewAnimation(e.detail, "list");
    //       // viewAnimation.current.gridAnimation = ChangeViewAnimation(e.detial, "grid");
    //     }
    //   },
    //   false
    // );

    document.querySelector("#projects-body-filter-search-bar").style.clipPath = "inset(0 0 0 100%)";

    document.body.querySelector(".search-wrapper").addEventListener("click", updateMultiselectUI);
    document.body.querySelector(".search-wrapper").addEventListener("keydown", updateMultiselectUI);

    // return()=>{
    //   setFilterButton(false);
    // }
    return () => {
      selectedTags = [];
    };
  }, []);

  useEffect(() => {}, [filterSelectedTags]);

  return (
    // more or less done, just add the animations and view changing shit PLEASE
    // ADD PROJECTS AND FINISH VIEW CHANGING
    <React.Fragment>
      <div id="projects-body-bar">
        <div id="projects-body-bar-options">
          <Multiselect avoidHighlightFirstOption id="projects-body-filter-search-bar" ref={filterSelectRef} isObject={false} options={Object.keys(fullTagsList)} customCloseIcon={<VectorGraphics.ChipClose id="chip-close-icon" />} placeholder="Search" hidePlaceholder={true} selectedValues={filterSelectedTags} onSelect={filterSelect} onRemove={filterRemove} />
          <button
            id="projects-body-bar-filter-button"
            onClick={() => {
              setFilterButton(!filterButton);
            }}
          >
            <VectorGraphics.Filter id="projects-body-bar-filter-icon" />
          </button>
          <button
            id="projects-body-bar-view-button"
            disabled={viewButtonDisabled}
            onClick={() => {
              setViewButtonDisabled(true);
              setTimeout(() => {
                setViewButtonDisabled(false);
              }, 1000);
              viewButton === "list" ? setViewButton("grid") : setViewButton("list");
            }}
          >
            <VectorGraphics.ViewIcon id="projects-body-bar-view-icon" />
          </button>
        </div>
      </div>
      <div id="projects-body-projects">
        <h1 id="projects-body-projects-title">Projects</h1>
        <DesktopProjects filterProjects={filterList} headingPresent={false} divId="projects-body-projects-list" projectCount={projectListCount} />
      </div>
    </React.Fragment>
  );
}

export function DesktopProjectsBody() {
  useEffect(() => {
    lastScroll = 0;
    window.scrollTo(0, 0);
    setTimeout(() => {
      const projectsBodyResize = new ResizeObserver((entries) => {
        for (let i of entries) {
          switch (i.target.id) {
            case "projects-body-bar":
              PBBarH = i.target.clientHeight;
              break;
            case "projects-body-projects":
              PBProjectsH = i.target.clientHeight;
              break;
            default:
              break;
          }
        }
        document.querySelector("#projects-body").style.setProperty("--body-height", (PBBarH + PBProjectsH + 100).toString().concat("px"));
        document.querySelector("#bg-blur").style.setProperty("--body-height", (PBBarH + PBProjectsH + 100 + document.querySelector("#footer").clientHeight).toString().concat("px"));
      });
      document.querySelectorAll("#projects-body>*").forEach((elem) => {
        projectsBodyResize.observe(elem);
      });
      if (!darkMode) {
        let searchElements = document.body.querySelectorAll("#projects-body-bar,.search-wrapper,.option,.optionListContainer li, .highlightOption, .search-wrapper .chip");
        for (let i = 0; i < searchElements.length; i++) {
          searchElements[i].style.setProperty("--input-bg", inputBgL);
          searchElements[i].style.setProperty("--option-bg", optionBgL);
          searchElements[i].style.setProperty("--option-highlight-bg", optionHighlightBgL);
          searchElements[i].style.setProperty("--option-highlight-color", optionHighlightColorL);
          searchElements[i].style.setProperty("--chip-text-color", chipTextL);
          searchElements[i].style.setProperty("--text-color", Content.textBlack);
        }
      } else {
        let searchElements = document.body.querySelectorAll("#projects-body-bar,.search-wrapper,.option,.optionListContainer li, .highlightOption, .search-wrapper .chip");
        for (let i = 0; i < searchElements.length; i++) {
          searchElements[i].style.setProperty("--input-bg", inputBgD);
          searchElements[i].style.setProperty("--option-bg", optionBgD);
          searchElements[i].style.setProperty("--option-highlight-bg", optionHighlightBgD);
          searchElements[i].style.setProperty("--option-highlight-color", optionHighlightColorD);
          searchElements[i].style.setProperty("--chip-text-color", chipTextD);
          searchElements[i].style.setProperty("--text-color", Content.textWhite);
        }
      }
    }, 200);
  }, []);

  return (
    <div id="projects-body">
      <DesktopProjectsList />
    </div>
  );
}

export function DynamicProject({ match, location }) {
  const { projectURLName } = useParams();
  let navigate = useNavigate();
  const [pNumb, setPNumb] = useState(null);
  const [pIntro, setPIntro] = useState({});
  const [pBody, setPBody] = useState({});

  useEffect(() => {
    lastScroll = 0;
    window.scrollTo(0, 0);
    setTimeout(() => {
      const projectBodyResize = new ResizeObserver((entries) => {
        for (let i of entries) {
          switch (i.target.id) {
            case "project-body":
              singlePTH = i.target.clientHeight;
              break;
            // case "projects-body-projects":
            //   PBProjectsH = i.target.clientHeight;
            //   break;
            default:
              break;
          }
        }
        // document.querySelector("#project-body").style.setProperty("--body-height", (singlePTH + 100).toString().concat("px"));
        document.querySelector("#bg-blur").style.setProperty("--body-height", (singlePTH + 100 + document.querySelector("#footer").clientHeight).toString().concat("px"));
      });
      document.querySelectorAll("#project-body").forEach((elem) => {
        projectBodyResize.observe(elem);
      });
    }, 200);

    console.log(Index.fullProjectList);
    let pPresent = Object.values(Index.fullProjectList).includes(projectURLName);
    console.log("project present or not", pPresent);
    if (!pPresent) {
      navigate("/error");
    } else {
      setPNumb(() => {
        return Number(Object.keys(Index.fullProjectList).find((key) => Index.fullProjectList[key] === projectURLName));
      });
    }
  }, []);

  useEffect(() => {
    console.log(pNumb);
    let tempTitle = "p".concat(pNumb, "Title");
    let tempSummary = "p".concat(pNumb, "Summary");
    let tempImg = "p".concat(pNumb, "ImgLoc");
    let tempImgAlt = "p".concat(pNumb, "ImgAlt");
    let tempTags = "p".concat(pNumb, "Tags");
    let tempTagList = Content[tempTags];
    if (tempTagList !== null && typeof tempTagList !== "undefined") {
      let pTags = tempTagList.map((elem, ind) => {
        return (
          <Link
            to="/projects"
            onClick={() => {
              selectedTags.push(elem.name);
              console.log("Selected tags", selectedTags);
            }}
            className={"tag ".concat(elem.name.toLowerCase().replace(/\s|\W/g, ""))}
            key={ind}
          >
            {elem.name}
          </Link>
        );
      });
      console.log(tempTitle, Content[tempTitle]);
      setPIntro((current) => {
        return { ...current, title: Content[tempTitle], summary: Content[tempSummary], img: Content[tempImg], imgAlt: Content[tempImgAlt], tags: pTags };
      });
      let existContent = true;
      for (let i = 1; existContent === true && i <= 1000; i++) {
        let tempParaTitle="p".concat(pNumb,"ParaTitle",i);
        let tempPara = "p".concat(pNumb, "Para", i);
        let tempMedia = "p".concat(pNumb, "Media", i);
        if (typeof Content[tempParaTitle] !== "undefined" && Content[tempParaTitle] !== null && typeof Content[tempPara] !== "undefined" && Content[tempPara] !== null && typeof Content[tempMedia] !== "undefined" && Content[tempMedia] !== null) {
          let paraTitleName="pTitle".concat(i);
          let paraName = "para".concat(i);
          let mediaName = "media".concat(i);
          setPBody((current) => {
            return { ...current, [paraTitleName]:Content[tempParaTitle], [paraName]: Content[tempPara], [mediaName]: Content[tempMedia] };
          });
        } else if ((typeof Content[tempParaTitle] !== "undefined" && Content[tempParaTitle] !== null)||(typeof Content[tempPara] !== "undefined" && Content[tempPara] !== null) || (typeof Content[tempMedia] !== "undefined" && Content[tempMedia] !== null)) {
          if (typeof Content[tempParaTitle] !== "undefined" && Content[tempParaTitle] !== null){
          let paraTitleName = "pTitle".concat(i);
          setPBody((current) => {
            return { ...current, [paraTitleName]: Content[tempParaTitle] };
          });
          }
          if (typeof Content[tempPara] !== "undefined" && Content[tempPara] !== null) {
            let paraName = "para".concat(i);
            setPBody((current) => {
              return { ...current, [paraName]: Content[tempPara] };
            });
          } if (typeof Content[tempMedia] !== "undefined" && Content[tempMedia] !== null) {
            let mediaName = "media".concat(i);
            setPBody((current) => {
              return { ...current, [mediaName]: Content[tempMedia] };
            });
          }
        } else {
          existContent = false;
        }
      }
    }
  }, [pNumb]);

  useEffect(() => {
    if (localStorage.getItem("dark") === "false") {
      let tags = document.body.querySelectorAll(".tag");
      for (let i = 0; i < tags.length; i++) {
        tags[i].style.setProperty("--tag-bg", tagBgL);
        tags[i].style.setProperty("--tag-color", tagColorL);
      }
    } else {
      let tags = document.body.querySelectorAll(".tag");
      for (let i = 0; i < tags.length; i++) {
        tags[i].style.setProperty("--tag-bg", tagBgD);
        tags[i].style.setProperty("--tag-color", tagColorD);
      }
    }
  }, [pIntro]);

  useEffect(() => {
  }, [pBody]);
  return (
    <React.Fragment>
      <div id="project-body">
        <div id="project-body-intro">
          <img id="project-main-img" src={pIntro.img} alt={pIntro.imgAlt} />
          <h1 id="project-title">{pIntro.title}</h1>
          <div id="project-summary">
            <p>{pIntro.summary}</p>
            <div id="project-tags">{pIntro.tags}</div>
          </div>
        </div>
        <div id="project-body-content">
        {Object.keys(pBody).map((elem,ind) => {
          if(/^pTitle/.test(elem)){
            return <h3 key={ind}>{pBody[elem]}</h3>
          }
          else if(/^para/.test(elem)){
            return <p key={ind}>{pBody[elem]}</p>;
          }
          else if(/^media/.test(elem)){
            console.log("IN MEDIA IMAGES",pBody[elem])
            return (<div key={ind} className="project-content-media">
              <div className="project-content-images"> 
            {
              pBody[elem].map((mElem,ind)=>{
              if (/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(mElem.src)){
                console.log("IN SINGLE MEDIA", mElem.src);
                return <img key={ind} src={mElem.src.toString()} alt={mElem.alt.toString()} />
              }
              })
            }
              </div>
              <div className="project-content-videos"> 
            {
              pBody[elem].map((mElem,ind)=>{
              if (/\.mp4$/.test(mElem.src)){
                console.log("IN SINGLE MEDIA", mElem.src);
                return (
                  <video key={ind} controls>
                    <source src={mElem.src.toString()} type="video/mp4" />
                    Sorry, your browser doesn't support embedded videos.
                  </video>
                );
              }
              })
            }
              </div></div>)
        }
          })
        }
        </div>
      </div>
    </React.Fragment>
  );// MAKE IT SO THAT POTRAIT IMAGES SHOW UP AS 2 AND LANDSCAPE AS 1. IDK WORK ON THE VISUAL ASPECT OF IT. IT MIGHT LOOK BAD WITH MULTIPLE IMAGES TOGETHER THO
}

export function ErrorPage(props) {
  return (
    <React.Fragment>
      <div>
        <h1> this is error code page</h1>
      </div>
    </React.Fragment>
  );
}

export function Footer() {
  return (
    <div id="footer">
      <p>© 2022 Mohammed Zeeshan's Portfolio — Published with Cloudflare Pages</p>
    </div>
  );
}
















export function MobileNavBar() {
  const [menu, setMenu] = useState(false);
  const [menuButton, setMenuButton] = useState(false);
  const hamburgerAnimation = useRef(null);
  const navAnimation = useRef(null);


  const hamburgerClick = () => {
    if (darkMode) {
      textColor = Content.textWhite;
      bgColor = Content.textBlack;
    } else {
      textColor = Content.textBlack;
      bgColor = Content.textWhite;
    }
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
    if (darkMode) {
      textColor = Content.textWhite;
      bgColor = Content.textBlack;
    } else {
      textColor = Content.textBlack;
      bgColor = Content.textWhite;
    }
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


      navAnimation.current = anime
        .timeline({
          easing: "easeOutCirc",
          autoplay: false,
          loop: false,
          direction: "normal",
          update:(anim)=>{
             viewAnimProgress = Math.round(anim.progress);
             if (viewAnimProgress > 0 && viewAnimProgress < 100) {
               document.querySelector("#hamburger-button").style.pointerEvents = "none";
             }
             else{
               document.querySelector("#hamburger-button").style.pointerEvents="auto";

             }
          },
        })
        .add(
          {
            targets: "#mobile-nav-bar>*",
            translateY: [-100, 0],
            opacity:[0,1],
            delay: (el, i) => 500 * (i + 1),
            duration:1000,
          },
          0
        );
      setTimeout(() => {
        navAnimation.current.play();
        setTimeout(() => {
          getScrollDirecion(100, navAnimation.current);
        }, 4000);
      }, 4000);
  }, []);

  return (
    <div id="mobile-nav-bar">
      <Link id="mobile-logo" to="/">
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
    dark ? (document.querySelector("#mobile-menu").style.backgroundColor = Content.textBlack) : (document.querySelector("#mobile-menu").style.backgroundColor = Content.textWhite);
  }, []);
  useEffect(() => {
    if (document.querySelector("#mobile-menu") != null) {
      setMenuBut(true);
      let timer = setTimeout(() => {
        if (document.querySelector("#mobile-menu") != null) {
          dark ? (document.querySelector("#mobile-menu").style.backgroundColor = Content.textBlack) : (document.querySelector("#mobile-menu").style.backgroundColor = Content.textWhite);
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
          }}
        >
          Home
        </Link>
        <Link
          to="/about"
          onClick={() => {
            linkClick();
          }}
        >
          About
        </Link>
        <Link
          to="/projects"
          onClick={() => {
            linkClick();
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

function MobileHomeBodyIntro() {
  const blackholeBGAnimation = useRef(null);
  const loopCompleted = useRef(0);
  const animationValues = useRef({});
  const [spanText1, setSpanText1] = useState({ current: Content.homeIntroText, i: 1 });
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
              removeBBG = false;
              playedBBG = false;
              anim.pause();
            }
          },
        })
        .add(
          {
            targets: "#blackhole-bg-1-dark,#blackhole-bg-1-light",
            scale: [0, animationValues.current.Sc1],
            rotate: [animationValues.current.R1, animationValues.current.R2],
            opacity: [0.2, 0],
            skewX: animationValues.current.Sk1,
            skewY: animationValues.current.Sk2,
          },
          0
        )
        .add(
          {
            targets: "#blackhole-bg-2-dark,#blackhole-bg-2-light",
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
            targets: "#blackhole-bg-3-dark,#blackhole-bg-3-light",
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
    document.querySelector("#home-title-1").innerHTML = spanText1.current[spanText1.i];
    var textWrapper = document.querySelector("#home-title-1");
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    const spanAnimation1 = () => {
      anime
        .timeline({
          autoplay: true,
          loop: false,
          easing: "easeInOutQuad",
          update: (anim) => {
            if (changeHome) {
              anim.pause();
              changeHome = false;
            }
          },
        })
        .add(
          {
            targets: "#home-title-1 .letter",
            opacity: [0, 1],
            duration: 2500,
            delay: (el, i) => 150 * (i + 1),
          },
          0
        )
        .add(
          {
            targets: "#home-title-1 .letter",
            opacity: 0,
            duration: 2500,
            delay: (el, i) => 150 * (i + 1),
          },
          "+=5000"
        ).complete = (anim) => {
        anim.pause();
        setSpanText1((spanText1.i = anime.random(0, spanText1.current.length - 1)));
        var textWrapper = document.querySelector("#home-title-1");

        if (typeof textWrapper != "undefined" && textWrapper != null) {
          textWrapper.textContent = spanText1.current[spanText1.i];
          textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
          textWrapper.style.opacity = 1;
          spanAnimation1();
        }
      };
    };
    setTimeout(() => {
      spanAnimation1();
    }, 5000);
    homeArrowAnimation.current = anime({
      targets: "#home-arrow path",
      d: ["M30 0V45L25 45 30 50 35 45 30 45V0Z", "M30 45V45L25 45 30 50 35 45 30 45V45Z"],
      autoplay: false,
      easing: "easeInOutSine",
    });
    const blackholeLine = () => {
      const percentage = getScrollPercent(document.querySelector("#blackhole-div"), 0, -0.3);
      homeArrowAnimation.current.seek(homeArrowAnimation.current.duration * (percentage * 0.01));
    };
    window.addEventListener("scroll", blackholeLine);
    return () => {
      window.removeEventListener("scroll", blackholeLine);
      removeBBG = true;
      changeHome = true;
    };
  }, []);

  return (
    <div id="home-body-intro">
      <h1 id="home-title-1">mobile text here</h1>
      <div id="blackhole-div">
        <div id="blackhole-bg-1-dark" className="blackholes-dark" />
        <div id="blackhole-bg-1-light" className="blackholes-light" />
        <div id="blackhole-bg-2-dark" className="blackholes-dark" />
        <div id="blackhole-bg-2-light" className="blackholes-light" />
        <div id="blackhole-bg-3-dark" className="blackholes-dark" />
        <div id="blackhole-bg-3-light" className="blackholes-light" />
        <div id="blackhole-bg-blur" />
        <VectorGraphics.Circle id="blackhole-home" />
      </div>
      <VectorGraphics.Arrow id="home-arrow" />
    </div>
  );
}

function MobileProjects(props) {
  const [projectList, setProjectList] = useState({});
  const [changedProjectList, setChangedProjectList] = useState(0);
  const tempVariables = useRef({});

  useEffect(() => {
    tempVariables.current.startedOnce = true;
    let existProject = true;
    for (let i = 1; existProject === true && i <= props.projectCount; i++) {
      let tempTitle = "p".concat(i, "Title");
      let tempSummary = "p".concat(i, "Summary");
      let tempImg = "p".concat(i, "ImgLoc");
      let tempImgAlt = "p".concat(i, "ImgAlt");
      let tempTags = "p".concat(i, "Tags");
      if (typeof Content[tempTitle] !== "undefined" && Content[tempTitle] !== null && typeof Content[tempSummary] !== "undefined" && Content[tempSummary] !== null && typeof Content[tempImg] !== "undefined" && Content[tempImg] !== null && typeof Content[tempImgAlt] !== "undefined" && Content[tempImgAlt] !== null && typeof Content[tempTags] !== "undefined" && Content[tempTags] !== null) {
        let tempId = "m";
        if (props.filterProjects === 0) {
          if (routeLocation.pathname === "/projects" && localStorage.getItem("viewType") === '"grid"') {
            setProjectList((current) => {
              return { ...current, [i]: <GridProject tagToProject={false} key={i} pNumber={i} pClass={tempId} imageLocation={Content[tempImg]} imageAlt={Content[tempImgAlt]} title={Content[tempTitle]} summary={Content[tempSummary]} tags={Content[tempTags]} /> };
            });
          } else if (routeLocation.pathname === "/projects" && localStorage.getItem("viewType") === '"list"') {
            setProjectList((current) => {
              return { ...current, [i]: <ListProject tagToProject={false} key={i} pNumber={i} pClass={tempId} imageLocation={Content[tempImg]} imageAlt={Content[tempImgAlt]} title={Content[tempTitle]} summary={Content[tempSummary]} tags={Content[tempTags]} /> };
            });
          }
        } else if (props.filterProjects > 0) {
          let filterPTags = Content[tempTags].map((elem) => {
            return elem.name;
          });
          let fTagsPresent = selectedTags.every((v) => filterPTags.includes(v));
          if (!fTagsPresent && Object.keys(projectList).includes(i.toString())) {
            const newPList = { ...projectList };
            delete newPList[i];
            setProjectList(newPList);
          } else if (fTagsPresent && !Object.keys(projectList).includes(i.toString())) {
            if (routeLocation.pathname === "/projects" && localStorage.getItem("viewType") === '"grid"') {
              setProjectList((current) => {
                return { ...current, [i]: <GridProject tagToProject={false} key={i} pNumber={i} pClass={tempId} imageLocation={Content[tempImg]} imageAlt={Content[tempImgAlt]} title={Content[tempTitle]} summary={Content[tempSummary]} tags={Content[tempTags]} /> };
              });
            } else if (routeLocation.pathname === "/projects" && localStorage.getItem("viewType") === '"list"') {
              setProjectList((current) => {
                return { ...current, [i]: <ListProject tagToProject={false} key={i} pNumber={i} pClass={tempId} imageLocation={Content[tempImg]} imageAlt={Content[tempImgAlt]} title={Content[tempTitle]} summary={Content[tempSummary]} tags={Content[tempTags]} /> };
              });
            }
          }
        } else {
          setProjectList((current) => {
            return { ...current, [i]: <ListProject tagToProject={true} key={i} pNumber={i} pClass={tempId} imageLocation={Content[tempImg]} imageAlt={Content[tempImgAlt]} title={Content[tempTitle]} summary={Content[tempSummary]} tags={Content[tempTags]} /> };
          });
        }
      } else if ((typeof Content[tempTitle] !== "undefined" && Content[tempTitle] !== null) || (typeof Content[tempSummary] !== "undefined" && Content[tempSummary] !== null) || (typeof Content[tempImg] !== "undefined" && Content[tempImg] !== null) || (typeof Content[tempImgAlt] !== "undefined" && Content[tempImgAlt] !== null) || (typeof Content[tempTags] !== "undefined" && Content[tempTags] !== null)) {
      } else {
        existProject = false;
      }
    }
  }, [props.filterProjects, changedProjectList]);

  useEffect(() => {
    if (Object.keys(projectList).length !== changedProjectList) {
      setChangedProjectList(Object.keys(projectList).length);
    }
    setTimeout(() => {
      if (localStorage.getItem("dark") === "false") {
        let tags = document.body.querySelectorAll(".tag");
        for (let i = 0; i < tags.length; i++) {
          tags[i].style.setProperty("--tag-bg", tagBgL);
          tags[i].style.setProperty("--tag-color", tagColorL);
        }
      } else {
        let tags = document.body.querySelectorAll(".tag");
        for (let i = 0; i < tags.length; i++) {
          tags[i].style.setProperty("--tag-bg", tagBgD);
          tags[i].style.setProperty("--tag-color", tagColorD);
        }
      }
    }, 10);
  }, [projectList]);
  return (
    <div id={props.divId}>
      {props.headingPresent && <h1 id={props.headingId}>Projects</h1>}
      {Object.keys(projectList).map((key, ind) => {
        return projectList[key];
      })}
    </div>
  );
}
export function MobileHomeBody() {
  useEffect(() => {
    lastScroll = 0;
    window.scrollTo(0, 0);
    setTimeout(() => {
      const homeBodyResize = new ResizeObserver((entries) => {
        for (let i of entries) {
          switch (i.target.id) {
            case "home-body-intro":
              HBIntroH = i.target.clientHeight;
              break;
            case "home-body-projects":
              HBProjectsH = i.target.clientHeight;
              break;
            default:
              break;
          }
        }
        document.querySelector("#home-body").style.setProperty("--body-height", (HBIntroH + HBProjectsH + 100).toString().concat("px"));
        document.querySelector("#bg-blur").style.setProperty("--body-height", (HBIntroH + HBProjectsH + 100 + document.querySelector("#footer").clientHeight).toString().concat("px"));
      });
      document.querySelectorAll("#home-body-intro,#home-body-projects").forEach((elem) => {
        homeBodyResize.observe(elem);
      });
      if (!darkMode) {
      let tags = document.body.querySelectorAll(".tag");
      for (let i = 0; i < tags.length; i++) {
        tags[i].style.setProperty("--tag-bg", tagBgL);
        tags[i].style.setProperty("--tag-color", tagColorL);
      }
    } else {
      let tags = document.body.querySelectorAll(".tag");
      for (let i = 0; i < tags.length; i++) {
        tags[i].style.setProperty("--tag-bg", tagBgD);
        tags[i].style.setProperty("--tag-color", tagColorD);
      }
    }
    }, 200);
    
    return () => {
      removeBBG = true;
      changeHome = true;
    };
  }, []);

  return (
    <div id="home-body">
      <MobileHomeBodyIntro />
      <MobileProjects headingPresent={true} divId="home-body-projects" projectCount={homeProjectCount} />
    </div>
  );
}

export function MobileAboutBody() {
  useEffect(() => {
    lastScroll = 0;
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="about-body">
      <p id="about-body-para" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(Content.aboutPara, { ADD_ATTR: ["target"] }) }}></p>
      <img src={Content.aboutImg} alt={Content.aboutImgAlt} />
    </div>
  );
}

function MobileProjectsList() {
  const [filterButton, setFilterButton] = useState(false);
  const filterAnimation = useRef(null);
  const filterAnimationVariables = useRef({});
  const [viewButton, setViewButton] = useStickyState("list", "viewType");
  const viewAnimation = useRef({});
  const viewAnimationVariables = useRef({});
  const [viewButtonDisabled, setViewButtonDisabled] = useState(false);
  const [filterSelectedTags, setFilterSelectedTags] = useState([]);
  const filterSelectRef = useRef();
  const tagClickFunc = useRef((e) => {
    filterSelect([], e.currentTarget.innerText, true);
  });
  const tagButtonVariables = useRef({});
  const [filterList, setFilterList] = useState(0);

  function filterSelect(array, item, tagClick = false) {
    if (!selectedTags.includes(item)) {
      selectedTags.push(item);
      if ((selectedTags.length === 1 || (selectedTags.length === 2 && tagButtonVariables.current.PreExistSelectedTags)) && tagClick) {
        setFilterSelectedTags([...selectedTags, null]);
        setFilterButton(!filterButton);
        if (tagButtonVariables.current.PreExistSelectedTags) {
          tagButtonVariables.current.PreExistSelectedTags = false;
        }
      }
    }

    setTimeout(() => {
      setFilterSelectedTags([...selectedTags]);
    }, 1);
  }
  function filterRemove(array, item) {
    if (typeof item !== "number") {
      var index = selectedTags.indexOf(item);
      if (index !== -1) {
        selectedTags.splice(index, 1);
      }
    } else {
      selectedTags.pop();
    }
    setFilterSelectedTags([...selectedTags]);
  }
  useEffect(() => {
    if (selectedTags.length > 0) {
      setFilterList((numb) => numb + 1);
    } else {
      setFilterList(0);
    }
    setTimeout(() => {
      document.querySelectorAll(".tag").forEach((elem) => {
        elem.addEventListener("click", tagClickFunc.current, false);
      });
    }, 10);
  }, [filterSelectedTags]);

  useEffect(() => {
    if (localStorage.getItem("dark") === "true") {
      textColor = Content.textWhite;
    } else {
      textColor = Content.textBlack;
    }
    viewAnimationVariables.current.viewButton = viewButton;
    if (viewAnimationVariables.current.mounted) {
      if (localStorage.getItem("viewType") === `"grid"`) {
        viewAnimation.current.gridAnimation = anime
          .timeline({
            easing: "easeInOutQuad",
            loop: false,
            autoplay: false,
            direction: "normal",
            duration: 500,
            begin: (anim) => {
              document.querySelectorAll(".list-project-m .list-project-text").forEach((elem) => {
                // elem.style.flexShrink = "1000";
                elem.style.marginTop = "-15rem"; // HERE MAKE THE TRANSITION TO GRID AND LIST TEXT PERFECT 02/07/2022
                // if (localStorage.getItem("viewType") === '"grid"') {
                //   elem.style.overflow = "hidden";
                //   elem.style.whiteSpace = "nowrap";
                //   elem.querySelector(".list-project-tags").style.flexWrap = "nowrap";
                // } else {
                //   elem.style.overflow = "visible";
                //   elem.style.whiteSpace = "normal";
                //   elem.querySelector(".list-project-tags").style.flexWrap = "wrap";
                // }
              });
              viewAnimationVariables.current.progressFull = false;
            },
            update: (anim) => {
              viewAnimProgress = Math.round(anim.progress);
              if (viewAnimProgress > 0 && viewAnimProgress < 100) {
                document.querySelectorAll("#projects-body-bar-view-icon #bottom-1,#projects-body-bar-view-icon #bottom-2").forEach((elem) => {
                  elem.style.fill = null;
                  elem.style.stroke = null;
                });
              }
              if (viewAnimProgress === 100 && !viewAnimationVariables.current.progressFull) {
                setTimeout(() => {
                  document.querySelectorAll(".list-project-m").forEach((elem) => {
                    elem.removeAttribute("style");
                    elem.querySelectorAll(".list-project-img,.list-project-text,.list-project-tags").forEach((child) => {
                      child.removeAttribute("style");
                    });
                    elem.classList.add("grid-project-m");
                    elem.querySelector(".list-project-img").classList.add("grid-project-img");
                    elem.querySelector(".list-project-text").classList.add("grid-project-text");
                    elem.querySelector(".list-project-tags").classList.add("grid-project-tags");
                    elem.classList.remove("list-project-m");
                    elem.querySelector(".list-project-img").classList.remove("list-project-img");
                    elem.querySelector(".list-project-text").classList.remove("list-project-text");
                    elem.querySelector(".list-project-tags").classList.remove("list-project-tags");
                    let gText = elem.querySelector(".grid-project-text");
                    elem.querySelector(".grid-project-img").appendChild(gText);
                  });
                }, 100);
                viewAnimationVariables.current.progressFull = true;
              }
            },
            complete: (anim) => {
              document.querySelectorAll("#projects-body-bar-view-icon #bottom-1,#projects-body-bar-view-icon #bottom-2").forEach((elem) => {
                elem.style.setProperty("fill", "inherit");
                elem.style.setProperty("stroke", "none");
              });
              document.querySelectorAll(".list-project-m .list-project-text").forEach((elem) => {
                elem.style.marginTop = "-15rem";
                // elem.style.overflow = "hidden";
                // elem.style.whiteSpace = "nowrap";
                // elem.querySelector(".list-project-tags").style.flexWrap = "nowrap";
                // elem.style.maxHeight = "0";
              });
            },
          })
          .add(
            {
              targets: "#projects-body-bar-view-icon #top-1, #projects-body-bar-view-icon #top-2, #projects-body-bar-view-icon #middle-1, #projects-body-bar-view-icon #middle-2",
              translateY: ["-20px", 0],
              opacity: [0, 1],
            },
            0
          )
          .add(
            {
              targets: "#projects-body-bar-view-icon #bottom-1",
              d: [`M25 12C25 9 27 7 30 7H34C37 7 39 9 39 12 39 12 39 16 39 16 39 19 37 21 34 21H30C27 21 25 19 25 16Z`, `M25 19C25 18.448 25.448 18 26 18H40.998C41.552 18 42 18.448 42 19 42 19 42 19 42 19 42 19.552 41.552 20 41 20H26C25.448 20.001 25.001 19.554 25 19Z`],
              fill: ["rgba(0,0,0,0)", textColor],
              stroke: [textColor, "rgba(0,0,0,0)"],
              strokeWidth: [2, 0.5],
            },
            0
          )
          .add(
            {
              targets: "#projects-body-bar-view-icon #bottom-2",
              d: [`M39 32C39 29 37 27 34 27H30C27 27 25 29 25 32V36C25 39 27 41 30 41H34c3 0 5-2 5-5Z`, `M42 39C42 38.448 41.552 38 41 38H26C25.448 38 25 38.448 25 39V39C25 39.552 25.448 40 26 40H41c.552 0 1-.448 1-1Z`],
              fill: ["rgba(0,0,0,0)", textColor],
              stroke: [textColor, "rgba(0,0,0,0)"],
              strokeWidth: [2, 0.5],
            },
            0
          )
          .add(
            {
              targets: ".list-project-m .list-project-text",
              height: ["100%", "0%"],
              opacity: [1, 0],
              delay: anime.stagger(300),
            },
            0
          )
          .add(
            {
              targets: ".list-project-img",
              width: ["80vw", "90vw"],
              height: ["30vh", "35vh"],
            },
            0
          );

        viewAnimation.current.gridAnimation.play();
      } else if (localStorage.getItem("viewType") === `"list"`) {
        viewAnimation.current.listAnimation = anime
          .timeline({
            easing: "easeInOutQuad",
            loop: false,
            autoplay: false,
            direction: "normal",
            duration: 500,
            begin: (anim) => {
              document.querySelectorAll(".grid-project-m").forEach((elem) => {
                elem.querySelector(".grid-project-img").classList.add("list-project-img");
                elem.querySelector(".grid-project-text").classList.add("list-project-text");
                elem.querySelector(".grid-project-tags").classList.add("list-project-tags");
                elem.querySelector(".grid-project-img").classList.remove("grid-project-img");
                elem.querySelector(".grid-project-text").classList.remove("grid-project-text");
                elem.querySelector(".grid-project-tags").classList.remove("grid-project-tags");
                let lText = elem.querySelector(".list-project-text");
                elem.appendChild(lText);
              });
              document.querySelectorAll(".grid-project-m .list-project-text").forEach((elem) => {
                elem.style.marginTop = "0";
                // elem.style.maxHeight = "50vh";
                // elem.style.flexShrink = "0";
                // setTimeout(() => {
                //   elem.style.whiteSpace = "normal";
                // }, 300);
              });
              viewAnimationVariables.current.progressFull = false;
            },
            update: (anim) => {
              viewAnimProgress = Math.round(anim.progress);
              if (viewAnimProgress > 0 && viewAnimProgress < 100) {
                document.querySelectorAll("#projects-body-bar-view-icon #bottom-1,#projects-body-bar-view-icon #bottom-2").forEach((elem) => {
                  elem.style.fill = null;
                  elem.style.stroke = null;
                });
              }
              if (viewAnimProgress === 100 && !viewAnimationVariables.current.progressFull) {
                setTimeout(() => {
                  document.querySelectorAll(".grid-project-m").forEach((elem) => {
                    elem.removeAttribute("style");
                    elem.querySelectorAll(".list-project-img,.list-project-text,.list-project-tags").forEach((child) => {
                      child.removeAttribute("style");
                    });
                    elem.classList.add("list-project-m");
                    elem.classList.remove("grid-project-m");
                  });
                }, 100);
                viewAnimationVariables.current.progressFull = true;
              }
            },
            complete: (anim) => {
              document.querySelectorAll("#projects-body-bar-view-icon #bottom-1,#projects-body-bar-view-icon #bottom-2").forEach((elem) => {
                elem.style.setProperty("fill", "none");
                elem.style.setProperty("stroke", "inherit");
              });
              document.querySelectorAll(".list-project-m .list-project-text").forEach((elem) => {
                elem.style.marginTop = "0";
                // elem.style.maxHeight = "50vh";
                // elem.style.overflow = "visible";
                // elem.style.whiteSpace = "normal";
                // elem.querySelector(".list-project-tags").style.flexWrap = "wrap";
              });
              //ADD NEW CLASSES TO THE THING HERE AND SEE IF U HAVE TO REMOVE OLD ONES OR NOT. IF U HAVE TO REMOVE OLD ONES THEN IDK MAKE IT WORK 25/06/2022
            },
          })
          .add(
            {
              targets: "#projects-body-bar-view-icon #top-1, #projects-body-bar-view-icon #top-2, #projects-body-bar-view-icon #middle-1, #projects-body-bar-view-icon #middle-2",
              translateY: [0, "-20px"],
              opacity: [1, 0],
            },
            0
          )
          .add(
            {
              targets: "#projects-body-bar-view-icon #bottom-1",
              d: [`M25 19C25 18.448 25.448 18 26 18H40.998C41.552 18 42 18.448 42 19 42 19 42 19 42 19 42 19.552 41.552 20 41 20H26C25.448 20.001 25.001 19.554 25 19Z`, `M25 12C25 9 27 7 30 7H34C37 7 39 9 39 12 39 12 39 16 39 16 39 19 37 21 34 21H30C27 21 25 19 25 16Z`],
              fill: [textColor, "rgba(0,0,0,0)"],
              stroke: ["rgba(0,0,0,0)", textColor],
              strokeWidth: [0.5, 2],
            },
            0
          )
          .add(
            {
              targets: "#projects-body-bar-view-icon #bottom-2",
              d: [`M42 39C42 38.448 41.552 38 41 38H26C25.448 38 25 38.448 25 39V39C25 39.552 25.448 40 26 40H41c.552 0 1-.448 1-1Z`, `M39 32C39 29 37 27 34 27H30C27 27 25 29 25 32V36C25 39 27 41 30 41H34c3 0 5-2 5-5Z`],
              fill: [textColor, "rgba(0,0,0,0)"],
              stroke: ["rgba(0,0,0,0)", textColor],
              strokeWidth: [0.5, 2],
            },
            0
          )

          .add(
            {
              targets: ".grid-project-m .grid-project-text",
              height: ["0%", "100%"],
              opacity: [0, 1],
              delay: anime.stagger(300),
            },
            0
          )
          .add(
            {
              targets: ".grid-project-img",
              width: ["90vw", "80vw"],
              height: ["35vh", "30vh"],
            },
            0
          );
        viewAnimation.current.listAnimation.play();
      }
    } else {
      viewAnimationVariables.current.mounted = true;
      setTimeout(() => {
        if (localStorage.getItem("viewType") === `"grid"`) {
          viewAnimation.current.gridAnimation = anime
            .timeline({
              easing: "easeInOutQuad",
              loop: false,
              autoplay: false,
              direction: "normal",
              duration: 500,
              begin: (anim) => {
                document.querySelectorAll(".list-project-m .list-project-text").forEach((elem) => {
                  elem.style.marginTop = "-15rem";
                  // elem.style.maxHeight = "0";
                  // elem.style.flexShrink = "1000";
                  // if (localStorage.getItem("viewType") === '"grid"') {
                  //   elem.style.overflow = "hidden";
                  //   elem.style.whiteSpace = "nowrap";
                  //   elem.querySelector(".list-project-tags").style.flexWrap = "nowrap";
                  // } else {
                  //   elem.style.overflow = "visible";
                  //   elem.style.whiteSpace = "normal";
                  //   elem.querySelector(".list-project-tags").style.flexWrap = "wrap";
                  // }
                });
                viewAnimationVariables.current.progressFull = false;
              },
              update: (anim) => {
                viewAnimProgress = Math.round(anim.progress);
                if (viewAnimProgress > 0 && viewAnimProgress < 100) {
                  document.querySelectorAll("#projects-body-bar-view-icon #bottom-1,#projects-body-bar-view-icon #bottom-2").forEach((elem) => {
                    elem.style.fill = null;
                    elem.style.stroke = null;
                  });
                }
                if (viewAnimProgress === 100 && !viewAnimationVariables.current.progressFull) {
                  setTimeout(() => {
                    document.querySelectorAll(".list-project-m").forEach((elem) => {
                      elem.removeAttribute("style");
                      elem.querySelectorAll(".list-project-img,.list-project-text,.list-project-tags").forEach((child) => {
                        child.removeAttribute("style");
                      });
                      elem.classList.add("grid-project-m");
                      elem.querySelector(".list-project-img").classList.add("grid-project-img");
                      elem.querySelector(".list-project-text").classList.add("grid-project-text");
                      elem.querySelector(".list-project-tags").classList.add("grid-project-tags");
                      elem.classList.remove("list-project-m");
                      elem.querySelector(".list-project-img").classList.remove("list-project-img");
                      elem.querySelector(".list-project-text").classList.remove("list-project-text");
                      elem.querySelector(".list-project-tags").classList.remove("list-project-tags");
                      let gText = elem.querySelector(".grid-project-text");
                      elem.querySelector(".grid-project-img").appendChild(gText);
                    });
                  }, 100);
                  viewAnimationVariables.current.progressFull = true;
                }
              },
              complete: (anim) => {
                document.querySelectorAll("#projects-body-bar-view-icon #bottom-1,#projects-body-bar-view-icon #bottom-2").forEach((elem) => {
                  elem.style.setProperty("fill", "inherit");
                  elem.style.setProperty("stroke", "none");
                });
                document.querySelectorAll(".list-project-m .list-project-text").forEach((elem) => {
                  elem.style.marginTop = "-15rem";
                  // elem.style.maxHeight = "0";
                  // elem.style.overflow = "hidden";
                  // elem.style.whiteSpace = "nowrap";
                  // elem.querySelector(".list-project-tags").style.flexWrap = "nowrap";
                });
              },
            })
            .add(
              {
                targets: "#projects-body-bar-view-icon #top-1, #projects-body-bar-view-icon #top-2, #projects-body-bar-view-icon #middle-1, #projects-body-bar-view-icon #middle-2",
                translateY: [0, "-20px"],
                opacity: [1, 0],
              },
              0
            )
            .add(
              {
                targets: "#projects-body-bar-view-icon #bottom-1",
                d: [`M25 19C25 18.448 25.448 18 26 18H40.998C41.552 18 42 18.448 42 19 42 19 42 19 42 19 42 19.552 41.552 20 41 20H26C25.448 20.001 25.001 19.554 25 19Z`, `M25 12C25 9 27 7 30 7H34C37 7 39 9 39 12 39 12 39 16 39 16 39 19 37 21 34 21H30C27 21 25 19 25 16Z`],
                fill: [textColor, "rgba(0,0,0,0)"],
                stroke: ["rgba(0,0,0,0)", textColor],
                strokeWidth: [0.5, 2],
              },
              0
            )
            .add(
              {
                targets: "#projects-body-bar-view-icon #bottom-2",
                d: [`M42 39C42 38.448 41.552 38 41 38H26C25.448 38 25 38.448 25 39V39C25 39.552 25.448 40 26 40H41c.552 0 1-.448 1-1Z`, `M39 32C39 29 37 27 34 27H30C27 27 25 29 25 32V36C25 39 27 41 30 41H34c3 0 5-2 5-5Z`],
                fill: [textColor, "rgba(0,0,0,0)"],
                stroke: ["rgba(0,0,0,0)", textColor],
                strokeWidth: [0.5, 2],
              },
              0
            )

            .add(
              {
                targets: ".list-project-, .list-project-text",
                height: ["100%", "0%"],
                opacity: [1, 0],
                delay: anime.stagger(300),
              },
              0
            )
            .add(
              {
                targets: ".list-project-img",
                width: ["80vw", "90vw"],
                height: ["30vh", "35vh"],
              },
              0
            );
        } else if (localStorage.getItem("viewType") === `"list"`) {
          viewAnimation.current.listAnimation = anime
            .timeline({
              easing: "easeInOutQuad",
              loop: false,
              autoplay: false,
              direction: "normal",
              duration: 500,
              begin: (anim) => {
                document.querySelectorAll(".grid-project-m").forEach((elem) => {
                  elem.querySelector(".grid-project-img").classList.add("list-project-img");
                  elem.querySelector(".grid-project-text").classList.add("list-project-text");
                  elem.querySelector(".grid-project-tags").classList.add("list-project-tags");
                  elem.querySelector(".grid-project-img").classList.remove("grid-project-img");
                  elem.querySelector(".grid-project-text").classList.remove("grid-project-text");
                  elem.querySelector(".grid-project-tags").classList.remove("grid-project-tags");
                  let lText = elem.querySelector(".list-project-text");
                  elem.appendChild(lText);
                });
                document.querySelectorAll(".grid-project-m .list-project-text").forEach((elem) => {
                  elem.style.marginTop = "0";
                  // elem.style.maxHeight = "50vh";
                  // elem.style.flexShrink = "0";
                  // setTimeout(() => {
                  //   elem.style.whiteSpace = "normal";
                  // }, 300);
                });
                viewAnimationVariables.current.progressFull = false;
              },
              update: (anim) => {
                viewAnimProgress = Math.round(anim.progress);
                if (viewAnimProgress > 0 && viewAnimProgress < 100) {
                  document.querySelectorAll("#projects-body-bar-view-icon #bottom-1,#projects-body-bar-view-icon #bottom-2").forEach((elem) => {
                    elem.style.fill = null;
                    elem.style.stroke = null;
                  });
                }
                if (viewAnimProgress === 100 && !viewAnimationVariables.current.progressFull) {
                  setTimeout(() => {
                    document.querySelectorAll(".grid-project-m").forEach((elem) => {
                      elem.removeAttribute("style");
                      elem.querySelectorAll(".list-project-img,.list-project-text,.list-project-tags").forEach((child) => {
                        child.removeAttribute("style");
                      });
                      elem.classList.add("list-project-m");
                      elem.classList.remove("grid-project-m");
                    });
                  }, 100);
                  viewAnimationVariables.current.progressFull = true;
                }
              },
              complete: (anim) => {
                document.querySelectorAll("#projects-body-bar-view-icon #bottom-1,#projects-body-bar-view-icon #bottom-2").forEach((elem) => {
                  elem.style.setProperty("fill", "none");
                  elem.style.setProperty("stroke", "inherit");
                });
                document.querySelectorAll(".list-project-m .list-project-text").forEach((elem) => {
                  elem.style.marginTop = "0";
                  // elem.style.maxHeight = "50vh";
                  // elem.style.overflow = "visible";
                  // elem.style.whiteSpace = "normal";
                  // elem.querySelector(".list-project-tags").style.flexWrap = "wrap";
                });
              },
            })
            .add(
              {
                targets: "#projects-body-bar-view-icon #top-1, #projects-body-bar-view-icon #top-2, #projects-body-bar-view-icon #middle-1, #projects-body-bar-view-icon #middle-2",
                translateY: ["-20px", 0],
                opacity: [0, 1],
              },
              0
            )
            .add(
              {
                targets: "#projects-body-bar-view-icon #bottom-1",
                d: [`M25 12C25 9 27 7 30 7H34C37 7 39 9 39 12 39 12 39 16 39 16 39 19 37 21 34 21H30C27 21 25 19 25 16Z`, `M25 19C25 18.448 25.448 18 26 18H40.998C41.552 18 42 18.448 42 19 42 19 42 19 42 19 42 19.552 41.552 20 41 20H26C25.448 20.001 25.001 19.554 25 19Z`],
                fill: ["rgba(0,0,0,0)", textColor],
                stroke: [textColor, "rgba(0,0,0,0)"],
                strokeWidth: [2, 0.5],
              },
              0
            )
            .add(
              {
                targets: "#projects-body-bar-view-icon #bottom-2",
                d: [`M39 32C39 29 37 27 34 27H30C27 27 25 29 25 32V36C25 39 27 41 30 41H34c3 0 5-2 5-5Z`, `M42 39C42 38.448 41.552 38 41 38H26C25.448 38 25 38.448 25 39V39C25 39.552 25.448 40 26 40H41c.552 0 1-.448 1-1Z`],
                fill: ["rgba(0,0,0,0)", textColor],
                stroke: [textColor, "rgba(0,0,0,0)"],
                strokeWidth: [2, 0.5],
              },
              0
            )

            .add(
              {
                targets: ".grid-project-m .grid-project-text",
                height: ["0%", "100%"],
                opacity: [0, 1],
                delay: anime.stagger(300),
              },
              0
            )
            .add(
              {
                targets: ".grid-project-img",
                width: ["90vw", "80vw"],
                height: ["35vh", "30vh"],
              },
              0
            );
        }
      }, 200);
    }
  }, [viewButton]);

  useEffect(() => {
    if (filterButton && filterAnimationVariables.current.filterPlayedOnce) {
      filterAnimation.current.reverse();
      filterAnimation.current.play();
      document.querySelector("#projects-body-filter-search-bar").style.display = "block";
    } else if (!filterButton && filterAnimationVariables.current.filterPlayedOnce) {
      filterAnimation.current.reverse();
      filterAnimation.current.play();
    } else if (filterButton && !filterAnimationVariables.current.filterPlayedOnce && filterAnimationVariables.current.mounted) {
      // filterAnimation.current.play();
      filterAnimationVariables.current.filterPlayedOnce = true;
      filterAnimation.current = anime
        .timeline({
          easing: "easeInOutQuad",
          autoplay: true,
          direction: "reverse",
          complete: (anim) => {
            if (document.querySelector("#projects-body-filter-search-bar").style.clipPath === "inset(0px)") {
              document.querySelector("#projects-body-filter-search-bar").style.clipPath = null;
            }
          },
        })
        // .add(
        //   {
        //     targets: "#projects-body-bar-filter-icon path",
        //     duration: 1500,
        //     rotate: [0, -36, 0],
        //     autoplay: true,
        //   },
        //   0
        // )
        .add(
          {
            targets: "#projects-body-filter-search-bar",
            keyframes: [
              { clipPath: "inset(0)" }, // start frame
              { clipPath: "inset(0 0 0 100%)" }, // end frame
            ],
            opacity: [1, 0],
            duration: 1500,
            autoplay: true,
          },
          0
        );
      // setTimeout(() => {
      //   document.querySelector("#projects-body-filter-search-bar").style.display = "none";
      // }, 2000);
    } else {
      filterAnimationVariables.current.mounted = true;
      filterAnimationVariables.current.filterPlayedOnce = false;
    }
  }, [filterButton]);

  useEffect(() => {
    setFilterSelectedTags(selectedTags);
    if (selectedTags.length > 0) {
      setFilterButton(!filterButton);
      tagButtonVariables.current.PreExistSelectedTags = true;
    } else {
      tagButtonVariables.current.PreExistSelectedTags = false;
    }
    let existProject = false;
    let allTags = {};

    for (let i = 1; existProject === false; i++) {
      let tempTag = "p".concat(i, "Tags");
      if (typeof Content[tempTag] === "undefined" || Content[tempTag] === null) {
        for (const [key, value] of Object.entries(allTags)) {
          if (!Object.keys(fullTagsList).find((key) => fullTagsList[key] === value)) {
            fullTagsList[key] = value;
          }
        }
        existProject = true;
      } else {
        Content[tempTag].forEach((elem, ind) => {
          allTags[elem.name] = elem.name.toLowerCase().replace(/\s|\W/g, "");
        });
      }
    }

    if (localStorage.getItem("viewType") === '"list"') {
      document.querySelectorAll("#projects-body-bar-view-icon #bottom-1,#projects-body-bar-view-icon #bottom-2").forEach((elem) => {
        elem.style.setProperty("fill", "none");
        elem.style.setProperty("stroke", "inherit");
      });
    } else if (localStorage.getItem("viewType") === '"grid"') {
      document.querySelectorAll("#projects-body-bar-view-icon #bottom-1,#projects-body-bar-view-icon #bottom-2").forEach((elem) => {
        elem.style.setProperty("fill", "inherit");
        elem.style.setProperty("stroke", "none");
      });
    }
    // window.addEventListener(
    //   "storageupdated",
    //   (e) => {
    //     if (e.detail[0] === "dark") {
    //       // viewAnimation.current.listAnimation = ChangeViewAnimation(e.detail, "list");
    //       // viewAnimation.current.gridAnimation = ChangeViewAnimation(e.detial, "grid");
    //     }
    //   },
    //   false
    // );

    document.querySelector("#projects-body-filter-search-bar").style.clipPath = "inset(0 0 0 100%)";

    document.body.querySelector(".search-wrapper").addEventListener("click", updateMultiselectUI);
    document.body.querySelector(".search-wrapper").addEventListener("keydown", updateMultiselectUI);

    // return()=>{
    //   setFilterButton(false);
    // }
    return () => {
      selectedTags = [];
    };
  }, []);

  useEffect(() => {}, [filterSelectedTags]);

  return (
    // more or less done, just add the animations and view changing shit PLEASE
    // ADD PROJECTS AND FINISH VIEW CHANGING
    <React.Fragment>
      <div id="projects-body-bar">
        <div id="projects-body-bar-options">
          <Multiselect avoidHighlightFirstOption id="projects-body-filter-search-bar" ref={filterSelectRef} isObject={false} options={Object.keys(fullTagsList)} customCloseIcon={<VectorGraphics.ChipClose id="chip-close-icon" />} placeholder="Search" hidePlaceholder={true} selectedValues={filterSelectedTags} onSelect={filterSelect} onRemove={filterRemove} />
          <button
            id="projects-body-bar-filter-button"
            onClick={() => {
              setFilterButton(!filterButton);
            }}
          >
            <VectorGraphics.Filter id="projects-body-bar-filter-icon" />
          </button>
          <button
            id="projects-body-bar-view-button"
            disabled={viewButtonDisabled}
            onClick={() => {
              setViewButtonDisabled(true);
              setTimeout(() => {
                setViewButtonDisabled(false);
              }, 1000);
              viewButton === "list" ? setViewButton("grid") : setViewButton("list");
            }}
          >
            <VectorGraphics.ViewIcon id="projects-body-bar-view-icon" />
          </button>
        </div>
      </div>
      <div id="projects-body-projects">
        <h1 id="projects-body-projects-title">Projects</h1>
        <MobileProjects filterProjects={filterList} headingPresent={false} divId="projects-body-projects-list" projectCount={projectListCount} />
      </div>
    </React.Fragment>
  );
}
export function MobileProjectsBody() {
  useEffect(() => {
    lastScroll = 0;
    window.scrollTo(0, 0);
    const projectsBodyResize = new ResizeObserver((entries) => {
      for (let i of entries) {
        switch (i.target.id) {
          case "projects-body-bar":
            PBBarH = i.target.clientHeight;
            break;
          case "projects-body-projects":
            PBProjectsH = i.target.clientHeight;
            break;
          default:
            break;
        }
      }
      document.querySelector("#projects-body").style.setProperty("--body-height", (PBBarH + PBProjectsH + 100).toString().concat("px"));
      document.querySelector("#bg-blur").style.setProperty("--body-height", (PBBarH + PBProjectsH + 100 + document.querySelector("#footer").clientHeight).toString().concat("px"));
    });
    document.querySelectorAll("#projects-body>*").forEach((elem) => {
      projectsBodyResize.observe(elem);
    });
    if (!darkMode) {
      let searchElements = document.body.querySelectorAll("#projects-body-bar,.search-wrapper,.option,.optionListContainer li, .highlightOption, .search-wrapper .chip");
      for (let i = 0; i < searchElements.length; i++) {
        searchElements[i].style.setProperty("--input-bg", inputBgL);
        searchElements[i].style.setProperty("--option-bg", optionBgL);
        searchElements[i].style.setProperty("--option-highlight-bg", optionHighlightBgL);
          searchElements[i].style.setProperty("--option-highlight-color", optionHighlightColorL);
        searchElements[i].style.setProperty("--chip-text-color", chipTextL);
        searchElements[i].style.setProperty("--text-color", Content.textBlack);
      }
    } else {
      let searchElements = document.body.querySelectorAll("#projects-body-bar,.search-wrapper,.option,.optionListContainer li, .highlightOption, .search-wrapper .chip");
      for (let i = 0; i < searchElements.length; i++) {
        searchElements[i].style.setProperty("--input-bg", inputBgD);
        searchElements[i].style.setProperty("--option-bg", optionBgD);
        searchElements[i].style.setProperty("--option-highlight-bg", optionHighlightBgD);
          searchElements[i].style.setProperty("--option-highlight-color", optionHighlightColorD);
        searchElements[i].style.setProperty("--chip-text-color", chipTextD);
        searchElements[i].style.setProperty("--text-color", Content.textWhite);
      }
    }
    document.body.querySelector(".search-wrapper").addEventListener("click", updateMultiselectUI);
    document.body.querySelector(".search-wrapper").addEventListener("keydown", updateMultiselectUI);
  }, []);

  return (
    <div id="projects-body">
      <MobileProjectsList />
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
function updateMultiselectUI(e) {
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    setTimeout(() => {
      document.getElementsByClassName("option highlightOption highlight")[0].scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
    }, 1);
  }
  setTimeout(() => {
    if (localStorage.getItem("dark") === "false") {
      let searchElements = document.body.querySelectorAll(".search-wrapper,.option,.optionListContainer li, .highlightOption, .search-wrapper .chip, .optionListContainer .notFound");
      for (let i = 0; i < searchElements.length; i++) {
        searchElements[i].style.setProperty("--input-bg", inputBgL);
        searchElements[i].style.setProperty("--option-bg", optionBgL);
        searchElements[i].style.setProperty("--option-highlight-bg", optionHighlightBgL);
          searchElements[i].style.setProperty("--option-highlight-color", optionHighlightColorL);
        searchElements[i].style.setProperty("--chip-text-color", chipTextL);
      }
    } else {
      let searchElements = document.body.querySelectorAll(".search-wrapper,.option,.optionListContainer li, .highlightOption, .search-wrapper .chip, .optionListContainer .notFound");
      for (let i = 0; i < searchElements.length; i++) {
        searchElements[i].style.setProperty("--input-bg", inputBgD);
        searchElements[i].style.setProperty("--option-bg", optionBgD);
        searchElements[i].style.setProperty("--option-highlight-bg", optionHighlightBgD);
          searchElements[i].style.setProperty("--option-highlight-color", optionHighlightColorD);
        searchElements[i].style.setProperty("--chip-text-color", chipTextD);
      }
    }
  }, 1);
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
    circle.style.backgroundColor = Content.textWhite;
    textColor = Content.textBlack;
    bgColor = Content.textWhite;
  } else {
    circle.style.backgroundColor = Content.textBlack;
    textColor = Content.textWhite;
    bgColor = Content.textBlack;
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
      bodyColor = [{ color: Content.textBlack }];
      svgColor = [{ fill: Content.textBlack }];
      BlackholeWhiteUpdate(250, 500);
      const modeChangeAnim = anime
        .timeline({
          easing: "easeInOutQuad",
          loop: false,
          autoplay: false,
          direction: "normal",
          complete: (anim) => {
            let tags = document.body.querySelectorAll(".tag");
            for (let i = 0; i < tags.length; i++) {
              tags[i].style.setProperty("--tag-bg", tagBgL); //#2191FB
              tags[i].style.setProperty("--tag-color", tagColorL);
              tags[i].style.color = null;
              tags[i].style.borderColor = null;
            }
            let searchElements = document.body.querySelectorAll("#projects-body-bar,.search-wrapper,.option,.optionListContainer li, .highlightOption, .search-wrapper .chip, .optionListContainer .notFound");
            for (let i = 0; i < searchElements.length; i++) {
              searchElements[i].style.setProperty("--input-bg", inputBgL);
              searchElements[i].style.setProperty("--option-bg", optionBgL);
              searchElements[i].style.setProperty("--option-highlight-bg", optionHighlightBgL);
          searchElements[i].style.setProperty("--option-highlight-color", optionHighlightColorL);
              searchElements[i].style.setProperty("--chip-text-color", chipTextL);
              searchElements[i].style.setProperty("--text-color", Content.textBlack);
              searchElements[i].style.background = null;
            }
          },
        })
        .add(
          {
            targets: ".tag",
            color: tagBgL,
            borderColor: tagBgL,
            duration: 500,
            direction: "normal",
          },
          0
        )
        .add(
          {
            targets: ".search-wrapper",
            background: inputBgL,
            duration: 500,
            direction: "normal",
          },
          0
        )
        .add(
          {
            targets: ".search-wrapper .chip,#chip-close-icon path",
            background: optionHighlightBgL,
            fill: chipTextL,
            color: chipTextL,
            duration: 500,
            direction: "normal",
          },
          0
        )
        .add(
          {
            targets: "#projects-body-bar",
            fill: Content.textBlack,
            stroke: Content.textBlack,
            duration: 500,
            direction: "normal",
          },
          0
        );
      modeChangeAnim.play();
    } else {
      bodyColor = [{ color: Content.textWhite }];
      svgColor = [{ fill: Content.textWhite }];
      BlackholeDarkUpdate(250, 500);
      const modeChangeAnim = anime
        .timeline({
          easing: "easeInOutQuad",
          loop: false,
          autoplay: false,
          direction: "normal",
          complete: (anim) => {
            let tags = document.body.querySelectorAll(".tag");
            for (let i = 0; i < tags.length; i++) {
              tags[i].style.setProperty("--tag-bg", tagBgD);
              tags[i].style.setProperty("--tag-color", tagColorD);
              tags[i].style.color = null;
              tags[i].style.borderColor = null;
            }
            let searchElements = document.body.querySelectorAll("#projects-body-bar,.search-wrapper,.option,.optionListContainer li, .highlightOption, .search-wrapper .chip, .optionListContainer .notFound");
            for (let i = 0; i < searchElements.length; i++) {
              searchElements[i].style.setProperty("--input-bg", inputBgD);
              searchElements[i].style.setProperty("--option-bg", optionBgD);
              searchElements[i].style.setProperty("--option-highlight-bg", optionHighlightBgD);
          searchElements[i].style.setProperty("--option-highlight-color", optionHighlightColorD);
              searchElements[i].style.setProperty("--chip-text-color", chipTextD);
              searchElements[i].style.setProperty("--text-color", Content.textWhite);
              searchElements[i].style.background = null;
            }
          },
        })
        .add(
          {
            targets: ".tag",
            color: tagBgD,
            borderColor: tagBgD,
            duration: 500,
            direction: "normal",
          },
          0
        )
        .add(
          {
            targets: ".search-wrapper",
            background: inputBgD,
            duration: 500,
            direction: "normal",
          },
          0
        )
        .add(
          {
            targets: ".search-wrapper .chip",
            background: optionHighlightBgD,
            fill: chipTextD,
            color: chipTextD,
            duration: 500,
            direction: "normal",
          },
          0
        )
        .add(
          {
            targets: "#projects-body-bar",
            fill: Content.textWhite,
            stroke: Content.textWhite,
            duration: 500,
            direction: "normal",
          },
          0
        );
      modeChangeAnim.play();
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
    dark ? (document.body.style.backgroundColor = Content.textWhite) : (document.body.style.backgroundColor = Content.textBlack);
    // dark ? (document.querySelector("#desktop-nav-bar, #mobile-nav-bar").style.backgroundColor = Content.textWhite) : (document.querySelector("#desktop-nav-bar,#mobile-nav-bar").style.backgroundColor = Content.textBlack);
  }, bgTimer);
}
