import React from "react";
import "./Contact.css";
import linkedin_icon from "../../assets/linkedin.svg";
import fiverr_icon from "../../assets/fiverr-icon.svg";
import github_icon from "../../assets/github-icon.svg";
import { useState } from "react";

const Contact = () => {
  const [result, setResult] = React.useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "d9681ab9-086f-4676-bd48-f87c91e5bec4");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <div id="contact" className="contact">
      <div className="contact-title">
        <h1>Get in Touch</h1>
      </div>
      <div className="contact-section">
        <div className="contact-left">
          <h1>Let's talk</h1>
          <p>
            I'm always open to new opportunities, collaborations, or simply a
            friendly chat about web development, design, or tech in general.
            Whether you're looking for a front-end developer, need help bringing
            a project to life, or just want to connect—feel free to reach out!
          </p>
          <div className="contact-details">
            <div className="contact-detail">
              <a
                href="https://www.linkedin.com/in/dalilahannouche/"
                target="_blank"
              >
                <img src={linkedin_icon} alt="" />
              </a>
              <p>Say hi on LinkedIn</p>
            </div>
            <div className="contact-detail">
              <a href="https://github.com/dalilahannouche" target="_blank">
                <img src={github_icon} alt="" />
              </a>
              <p>Dev stuff lives here</p>
            </div>
            <div className="contact-detail">
              <a href="https://www.fiverr.com/lamasara" target="_blank">
                <img src={fiverr_icon} alt="" />
              </a>

              <p>Hire me here!</p>
            </div>
          </div>
        </div>
        <form onSubmit={onSubmit} className="contact-right">
          <div className="contact-form">
            <label htmlFor="name">Your Name</label>
            <div className="input-container">
              <input type="text" placeholder="Enter Your Name" name="name" />
            </div>

            <label htmlFor="email">Your Email</label>
            <div className="input-container">
              <input type="email" placeholder="Enter your email" name="email" />
            </div>

            <label htmlFor="message">Write your message</label>
            <div className="textarea-container">
              <textarea
                name="message"
                rows="8"
                placeholder="Write your message here"
              ></textarea>
            </div>

            <button type="submit" className="contact-submit">
              Submit now
            </button>

            {result && (
              <p
                className={`form-result ${
                  result === "Sending..." ? "sending" : "done"
                }`}
              >
                {result}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
