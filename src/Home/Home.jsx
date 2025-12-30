import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import HomeNav from "./HomeNav";
import { Container } from 'react-bootstrap'
import pic1 from "../assets/about_nadra.png";
import Sliderr from "../Dashboard/Sliderr";
import "./home.css";

import image1 from "../assets/DigitalCompImages/playstore-btn.png"
import image2 from "../assets/DigitalCompImages/applestore-btn.png"
import hero from "../assets/DigitalCompImages/Hero_img.webp"
import identity from "../assets/DigitalCompImages/identity.png"
import NDEL from "../assets/DigitalCompImages/NDEL.png"
// import UserData from "../Admin/AllData/Data";
import Footer from "../Common/Footer";

function Home() {
  return (
    <>
      <HomeNav />

      {/* <UserData /> */}
      <div className="bgpp">
        <div className="bgp">
          <h1 className="bgph1"> DIGITAL IDENTITY HUB</h1>
          <p className="pppp">Complete your identity</p>
        </div>
      </div>
      <div className="mainParent">
        <Container>

          <div className="forFlex">
            <div className="cardOneParent">
              <h1><span>Your</span> Digital Identity, Key to the Digital Pakistan</h1>
              <p>Pakistan’s secure, inclusive, and citizen-first digital identity platform</p>
              {/* <div className="imgSec">
                            <img src={image1} alt="" />
                            <img src={image2} alt="" />
                        </div> */}
            </div>
            <div className="cardTwoParent">
              <img src={hero} alt="" />
            </div>
          </div>
        </Container>
      </div>
      <div className="pp-6">
        <div className="d-flex pp-5">
          <div>
            <img src={pic1} alt="" className="ppic1" />
          </div>
          <div>
            <h1 id="hh1">
              Digital Identity Hub
              (DIH)
            </h1>
            <p id="pp1">
              DIH has gained international recognition for its success in
              providing solutions for identification, e-governance and secure
              documents that deliver multiple goals of mitigating identity
              theft, safe-guarding the interests of our clients and facilitating
              the public. In-depth Research and Development efforts have enabled
              DIH to become the trailblazer in the areas of Software
              Integration, Data Warehousing and Network Infrastructure.
            </p>
          </div>
        </div>
      </div>
      <div className="mainParentTwo">
        <Container>

          <div className="forFlexTwo">

            {/* CARD 1 */}
            <div className="CardTwoParent">
              <div className="card-header">
                <img src={identity} alt="Digital Identity" />

                <div className="card-text">
                  <p>Ecosystem for</p>
                  <h6>Digital Identity</h6>
                </div>
              </div>

              <div className="card-list">
                <ul>
                  <li className="highlight">
                    NADRA is building a secure Digital ID to verify your identity & access digital documents.
                  </li>
                  <li>Enable secure and trusted identification and authentication of individuals</li>
                  <li>Facilitate access to public and private digital services</li>
                  <li>Ensure privacy, consent, and data protection in digital interactions</li>
                </ul>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="card-two card-two-alt">
              <div className="card-header alt-header">
                <img src={NDEL} alt="NDEL" />

                <div className="card-text alt-text">
                  <p>Design and Establishment of a</p>
                  <h6>National Data Exchange Layer (NDEL)</h6>
                </div>
              </div>

              <div className="card-list">
                <ul>
                  <li className="highlight">
                    NDEL is a secure, standardized API platform for seamless and controlled data sharing across organizations
                  </li>
                  <li>Enable secure and interoperable data exchange</li>
                  <li>Standardize APIs and governance across entities</li>
                  <li>Improved public service through verified data</li>
                </ul>
              </div>
            </div>

          </div>
        </Container>
      </div>



      <Footer />
    </>
  );
}

export default Home;
