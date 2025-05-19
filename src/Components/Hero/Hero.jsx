import React, { useState } from "react";
import "./Hero.css";
import profileImage from "../../assets/me_ghibli.png"; // Image par défaut
import hoverImage from "../../assets/me_real.jpg"; // Image au hover

function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div id="home" className="hero">
      <div
        className="shine profile-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={profileImage}
          alt="Dalila Hannouche"
          className={`profile ${isHovered ? "fade-out" : "fade-in"}`}
        />
        <img
          src={hoverImage}
          alt="Dalila Hannouche"
          className={`profile ${isHovered ? "fade-in" : "fade-out"}`}
        />
      </div>
      <h2>
        Hi, there!{" "}
        <span className="wave" role="img" aria-labelledby="wave">
          👋🏻
        </span>
      </h2>
      <h1>
        <span>I'm Dalila Hannouche,</span> a front-end developer.
      </h1>
      <p>
        I have experience working with WordPress and Odoo, and I'm currently
        focused on React.
      </p>
      <div className="hero-action">
        <div className="hero-connect">Connect with me</div>
        <div className="hero-resume">My Resume</div>
      </div>
    </div>
  );
}

export default Hero;
