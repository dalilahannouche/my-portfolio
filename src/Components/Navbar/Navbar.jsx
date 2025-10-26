import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import AnchorLink from "react-anchor-link-smooth-scroll";
import menu_open from "../../assets/menu_open.svg";
import menu_close from "../../assets/menu_close.png";
import musicFile from "../../assets/music/music.mp3"; // Ton fichier mp3 ici
import { FaMoon, FaSun, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [menu, setMenu] = useState("home");
  const menuRef = useRef();

  // Musique
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const openMenu = () => {
    menuRef.current.style.right = "0px";
  };

  const closeMenu = () => {
    menuRef.current.style.right = "-350px";
  };

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
      <LazyLoadImage src={logo} alt="logo" effect="blur" />
      <LazyLoadImage
        src={menu_open}
        onClick={openMenu}
        alt=""
        className="nav-mob-open"
        effect="blur"
      />
      <ul ref={menuRef} className="nav-menu">
        <LazyLoadImage
          src={menu_close}
          onClick={closeMenu}
          alt=""
          effect="blur"
          className="nav-mob-close"
        />
        {["home", "about", "projects", "contact"].map((item) => (
          <li
            key={item}
            onClick={() => setMenu(item)}
            className={menu === item ? "active" : ""}
          >
            <AnchorLink href={`#${item}`} className="anchor-link" offset={50}>
              <p>
                {item === "about"
                  ? "About Me"
                  : item.charAt(0).toUpperCase() + item.slice(1)}
              </p>
            </AnchorLink>
          </li>
        ))}
      </ul>

      <div className="right-side">
        <div className="nav-connect">
          <AnchorLink href="#contact" className="anchor-link" offset={50}>
            <button className="Button">
              <svg
                className="Button-svg"
                width="200"
                height="50"
                viewBox="0 0 300 80"
              >
                <rect
                  className="Button-line Button-line--outer"
                  strokeWidth="8"
                  stroke="#fc7995"
                  fill="none"
                  x="4"
                  y="4"
                  width="292"
                  height="72"
                  rx="36"
                />
                <rect
                  className="Button-line Button-line--inner"
                  strokeWidth="4"
                  stroke="#ffcc5c"
                  fill="none"
                  x="4"
                  y="4"
                  width="292"
                  height="72"
                  rx="36"
                />
              </svg>
              <div className="Button-content">Let's Connect !</div>
            </button>
          </AnchorLink>
        </div>

        {/* Dark Mode */}
        <div>
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

        {/* Contrôle de la musique */}
        <div className="nav-music" onClick={togglePlay}>
          {isPlaying ? <FaVolumeUp size={24} /> : <FaVolumeMute size={24} />}
          <audio ref={audioRef} src={musicFile} loop />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
