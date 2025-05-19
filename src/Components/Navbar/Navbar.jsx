import React, { useEffect, useState, useRef } from "react";

import "./Navbar.css";
import logo from "../../assets/logo.png";
import music from "../../assets/icon-musik.gif";
import AnchorLink from "react-anchor-link-smooth-scroll";
import menu_open from "../../assets/menu_open.svg";
import { FaMoon, FaSun } from "react-icons/fa";
import menu_close from "../../assets/menu_close.png";

const Navbar = () => {
  // DarkMode
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Menu Mobile
  const [menu, setMenu] = useState("home");
  const menuRef = useRef();

  const openMenu = () => {
    menuRef.current.style.right = "0px";
  };

  const closeMenu = () => {
    menuRef.current.style.right = "-350px";
  };

  // Appliquer la classe .dark au body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="navbar">
      <img src={logo} alt="logo" />
      <img src={menu_open} onClick={openMenu} alt="" className="nav-mob-open" />
      <ul ref={menuRef} className="nav-menu">
        <img
          src={menu_close}
          onClick={closeMenu}
          alt=""
          className="nav-mob-close"
        />
        <li
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          <AnchorLink href="#home" className="anchor-link" offset={50}>
            <p>Home</p>
          </AnchorLink>
        </li>
        <li
          onClick={() => setMenu("about")}
          className={menu === "about" ? "active" : ""}
        >
          {" "}
          <AnchorLink href="#about" className="anchor-link" offset={50}>
            <p>About Me</p>
          </AnchorLink>
        </li>
        <li
          onClick={() => setMenu("projects")}
          className={menu === "projects" ? "active" : ""}
        >
          <AnchorLink href="#projects" className="anchor-link" offset={50}>
            <p>Projects</p>
          </AnchorLink>
        </li>
        <li
          onClick={() => setMenu("contact")}
          className={menu === "contact" ? "active" : ""}
        >
          <AnchorLink href="#contact" className="anchor-link" offset={50}>
            <p>Contact</p>
          </AnchorLink>
        </li>
      </ul>
      <div className="right-side">
        <div className="nav-connect">
          {/* <button className="button-85">Connect With Me </button> */}
          <AnchorLink href="#contact" className="anchor-link" offset={50}>
            <button class="Button">
              <svg
                class="Button-svg"
                width="200"
                height="50"
                viewBox="0 0 300 80"
              >
                <rect
                  class="Button-line Button-line--outer"
                  stroke-width="8"
                  stroke="#fc7995"
                  stroke-linecap="round"
                  fill="none"
                  x="4"
                  y="4"
                  width="292"
                  height="72"
                  rx="36"
                />
                <rect
                  class="Button-line Button-line--inner"
                  stroke-width="4"
                  stroke="#ffcc5c"
                  stroke-linecap="round"
                  fill="none"
                  x="4"
                  y="4"
                  width="292"
                  height="72"
                  rx="36"
                />
              </svg>

              <div class="Button-content">Let's Connect !</div>
            </button>
          </AnchorLink>
        </div>
        <div>
          {/* Toggle Dark Mode */}
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />
          <label htmlFor="checkbox" className="checkbox-label">
            <FaMoon className="fa-moon" />
            <FaSun className="fa-sun" />
            <span className="ball" />
          </label>
        </div>
        <div className="nav-music">
          <img src={music} alt="sound" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
