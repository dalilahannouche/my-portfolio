import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import music from "../../assets/icon-musik.gif";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="logo" />
      <div className="nav-menu">
        <li href="#">About Me</li>
        <li href="#">Projects</li>
        <li href="#">Resume</li>
      </div>
      <div className="right-side">
        <div className="nav-connect">
          {/* <button className="button-85">Connect With Me </button> */}
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
        </div>
        <div>
          <input type="checkbox" class="checkbox" id="checkbox"></input>
          <label for="checkbox" class="checkbox-label">
            <i class="fa fa-moon"></i>
            <i class="fa fa-sun"></i>
            <span class="ball"></span>
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
