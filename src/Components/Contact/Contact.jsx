import React from "react";
import "./Contact.css";
import mail_icon from "../../assets/mail-icon.svg";
import location_icon from "../../assets/location-icon.svg";
import call_icon from "../../assets/call-icon.svg";
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
              <img src={mail_icon} alt="" />
              <p>XXXXXX</p>
            </div>
            <div className="contact-detail">
              <img src={call_icon} alt="" />
              <p>XXXXX</p>
            </div>
            <div className="contact-detail">
              <img src={location_icon} alt="" />
              <p>Berlin, Germany</p>
            </div>
          </div>
        </div>
        <form onSubmit={onSubmit} className="contact-right">
          <div className="contact-form">
            <label htmlFor="name">Your Name</label>
            <input type="text" placeholder="Enter Your Name" name="name" />
            <label htmlFor="email">Your Email</label>
            <input type="email" placeholder="Enter your email" name="email" />
            <label htmlFor="">Write your message</label>
            <textarea
              name="message"
              rows="8"
              placeholder="Write your message here"
            ></textarea>
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
