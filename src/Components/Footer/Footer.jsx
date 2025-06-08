import React from "react";
import "./Footer.css";
import footer_logo from "../../assets/logo.png"; // Assuming you have a logo image in the assets folder
import user_icon from "../../assets/mail-icon.svg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="footer-top-left">
          <img src={footer_logo} alt="" />
          <p>
            I’m constantly seeking to improve—exploring, experimenting, and
            building with both curiosity and determination.
          </p>
        </div>
        {/* <div className="footer-top-right">
          <div className="footer-email-input">
            <img src={user_icon} alt="" />
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="footer-subscribe">Subscribe</div>
        </div>*/}
      </div>
      <hr />
      <div className="footer-bottom">
        <p className="footer-bottom-left">
          © 2025 All rights reserved. Designed by {"Dalila Hannouche"}
        </p>
        <div className="footer-bottom-right">
          <p>
            <a href="https://www.youtube.com/playlist?list=PLqP8kO2x0U8ioFv7UZvoA2fUWkLCfF-dD">
              My Guitare
            </a>
          </p>
          <p>
            <a href="https://www.youtube.com/playlist?list=PLqP8kO2x0U8gmVxdJSa3cMrJghz-ueQpn">
              My Piano
            </a>
          </p>
          <p>
            <a href="https://www.babelio.com/auteur/Dalila-Hannouche/500406">
              My book
            </a>
          </p>
          <p>
            <a href="https://www.instagram.com/dalila_hannouche/">
              My paintings
            </a>
          </p>
          <p>
            <a href="https://hannouchedalila.wordpress.com/">
              My poetry in French
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
