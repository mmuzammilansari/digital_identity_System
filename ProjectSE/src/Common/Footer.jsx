import React from "react";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div>
      <div className="Footer-container">
        <div className="social-icons">
          {" "}
          <a href="">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="fa-facebook">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
    
        </div>
        <div className="footer-nav">
          <ul>
            <li>
              <a href=""> Home </a>
            </li>
            <li>
              <a href=""> News </a>
            </li>
            <li>
              <a href=""> About </a>
            </li>
            <li>
              <a href=""> Contact us </a>
            </li>
            <li>
              <a href=""> Our team </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footerbottom">
        {" "}
        <p>
          CopyRight &copy; Designed by{" "}
          <span className="designer">Muhammad Muzammil Ansari</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
