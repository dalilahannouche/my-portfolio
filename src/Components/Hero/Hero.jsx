import React, { useState, useRef } from "react";
import "./Hero.css";
import profileImage from "../../assets/me_ghibli.jpg";
import LazyImage from "../LazyImage/LazyImage";
import hoverImage from "../../assets/me_real.jpg";
//import marioSound from "../../assets/music/mario-sound.mp3"; // ton son
import myCV from "../../assets/dalila-hannouche -CV.pdf"; // chemin vers le CV

function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [isResumeHovered, setIsResumeHovered] = useState(false);
  const audioRef = useRef(null);

  const handleResumeHover = () => {
    setIsResumeHovered(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // recommence au début
      audioRef.current.play();
    }
  };

  const handleResumeLeave = () => {
    setIsResumeHovered(false);
  };

  return (
    <div id="home" className="hero">
      <div
        className="shine profile-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image principale */}
        <LazyImage
          src={profileImage}
          alt="Dalila Hannouche"
          className={`profile ${isHovered ? "fade-out" : "fade-in"}`}
        />

        {/* Image au hover */}
        <LazyImage
          src={hoverImage}
          alt="Dalila Hannouche hover"
          className={`profile hover-img ${isHovered ? "fade-in" : "fade-out"}`}
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
        <div className="hero-connect">
          <a href="https://www.linkedin.com/in/dalilahannouche/">
            Connect with me
          </a>
        </div>

        <div
          className="hero-resume"
          onMouseEnter={handleResumeHover}
          onMouseLeave={handleResumeLeave}
        >
          <a className="cv" href={myCV} download>
            My Resume
            {/* {isResumeHovered && (
              <img src={marioIcon} alt="Mario Icon" className="mario-icon" />
            )}*/}
          </a>
        </div>
      </div>

      {/* Audio element caché */}
      {/* <audio ref={audioRef} src={marioSound} /> */}
    </div>
  );
}

export default Hero;
