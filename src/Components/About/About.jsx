import React from "react";
import "./About.css";
import profile from "../../assets/dalila-about.gif";

function About() {
  return (
    <div id="about" className="about">
      <div className="about-title">
        <h1>About Me</h1>
      </div>
      <div className="about-sections">
        {/* Left Section */}
        <div className="about-left">
          <LazyImage src={profile} className="about-me" alt="" />
        </div>
        {/* Right Section */}
        <div className="about-right">
          {/* Paragraph Section */}
          <div className="about-para">
            <p>
              Passionate front-end developer crafting high-converting e-commerce
              interfaces. Currently expanding into back-end with Python at ReDI
              School to deliver full-stack web solutions.
            </p>
          </div>

          <div className="about-skills">
            <div className="about-skill">
              <p>Html 5 & CSS3</p>
              <hr style={{ width: "67%" }} />
            </div>

            <div className="about-skill">
              <p>Javascript</p>
              <hr style={{ width: "47%" }} />
            </div>

            <div className="about-skill">
              <p>React</p>
              <hr style={{ width: "40%" }} />
            </div>

            <div className="about-skill">
              <p>Python</p>
              <hr style={{ width: "48%" }} />
            </div>

            <div className="about-skill">
              <p>Photoshop</p>
              <hr style={{ width: "60%" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="about-achievements">
        <div className="about-achievement">
          <h1>4+</h1>
          <p>YEARS OF EXPERIENCE</p>
        </div>
        <div className="about-achievement">
          <h1>40+</h1>
          <p>PROJECTS DELIVERED</p>
        </div>
        <div className="about-achievement">
          <h1>1200+</h1>
          <p>CUPS OF COFFEE WHILE CODING</p>
        </div>
      </div>
    </div>
  );
}

export default About;
