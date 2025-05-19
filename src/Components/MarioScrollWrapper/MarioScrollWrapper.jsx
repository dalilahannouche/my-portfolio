import React, { useEffect, useState } from "react";
import plantImg from "../../assets/plant.png";
import marioImg from "../../assets/mario.png";
import "./MarioScroll.css";

const MarioScroll = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent = (scrollTop / docHeight) * 100;
      setScrollPercent(percent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="mario-scroll-container">
      <img src={plantImg} className="plant" alt="Plant" />
      <img
        src={marioImg}
        className="mario"
        alt="Mario"
        style={{ bottom: `${scrollPercent}%` }}
      />
    </div>
  );
};

export default MarioScroll;
