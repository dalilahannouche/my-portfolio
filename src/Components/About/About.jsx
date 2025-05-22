import React from "react";
import "./About.css";
import profile from "../../assets/me-creative.png";

function About() {
  return (
    <div id="about" className="about">
      <div className="about-title">
        <h1>About Me</h1>
      </div>
      <div className="about-sections">
        {/* Left Section */}
        <div className="about-left">
          <img src={profile} className="about-me" alt="" />
        </div>
        {/* Right Section */}
        <div className="about-right">
          {/* Paragraph Section */}
          <div className="about-para">
            <p>
              Having always enjoyed bringing digital experiences to life, I
              naturally gravitated towards front-end development. I take
              particular care in building interfaces that are both visually
              appealing and user-friendly.
            </p>
            <p>
              Currently, I am also expanding my skill set by learning Python at
              ReDI School, which allows me to better understand back-end
              processes and become a more well-rounded developer.
            </p>
            <p>
              I’m constantly seeking to improve—exploring, experimenting, and
              building with both curiosity and determination.
            </p>
          </div>

          <div className="about-skills">
            <div className="about-skill">
              <p>Html 5 & CSS3</p>
              <hr style={{ width: "50%" }} />
            </div>

            <div className="about-skill">
              <p>Javascript</p>
              <hr style={{ width: "60%" }} />
            </div>

            <div className="about-skill">
              <p>React</p>
              <hr style={{ width: "50%" }} />
            </div>

            <div className="about-skill">
              <p>Python</p>
              <hr style={{ width: "60%" }} />
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
          <h1>10+</h1>
          <p>YEARS OF EXPERIENCE</p>
        </div>
        <div className="about-achievement">
          <h1>90+</h1>
          <p>PROJECTS COMPLETED</p>
        </div>
        <div className="about-achievement">
          <h1>50+</h1>
          <p>HAPPY CLIENTS</p>
        </div>
      </div>
    </div>
  );
}

export default About;
