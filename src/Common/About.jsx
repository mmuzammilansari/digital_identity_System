import React from "react";
import "./about.css";
import HomeNav from "../Home/HomeNav";
import Sliderr from "../Dashboard/Sliderr";
import Footer from "./Footer";

const About = () => {
  return (
    <>
      <HomeNav />

      <Sliderr />
      <div style={{ height: "250px" }}></div>

      <div className="section">
        <h2>About-Us</h2>
        <br />
        <p style={{ textAlign: "center" }}> ----IDENTITY HUB---- </p>
        <div className="title">
          <h2>Personal Data Management & CNIC Creation System</h2>
        </div>
        <p>
          Welcome to IDENTITY HUB, your trusted online Registration Authority
          for managing personal information and documentation seamlessly. At
          identity hub, we understand the importance of safeguarding your
          sensitive data while providing convenient access to essential
          services. Our mission is to empower individuals like you to take
          control of your information and streamline bureaucratic processes with
          ease.
        </p>
        <div className="services">
          <div className="psec">
            <br />
            <p>
              At identity hub, our mission is simple, to provide a secure and
              user-friendly platform for individuals to manage their personal
              data and documentation online. We strive to simplify complex
              procedures such as document verification, NIC creation, and
              profile management, making administrative tasks hassle-free for
              our users.{" "}
            </p>
          </div>
        </div>

        <div className="services">
          <div className="psec">
            <p>
              Your security is our top priority. Say goodbye to long queues and
              paperwork. With identity hub, you can access and update your
              personal information anytime, anywhere, from any device with an
              internet connection. We believe in transparency and
              accountability. You can trust identity hub to handle your data
              responsibly, with clear privacy policies and robust security
              measures in place. Whether you're applying for a NIC, managing
              your educational records, updating your work experience, or
              securing your insurance documentation, identity hub puts you in
              the driver's seat, giving you the tools you need to navigate
              bureaucratic processes with confidence.{" "}
            </p>
          </div>
        </div>
        {/* <div className='flex-container'>
    <div class="flip-card">
    <div class="flip-card-inner">
        <div class="flip-card-front">
            <h2 class="title">Our Mission</h2>
            <p>Hover me</p>
        </div>
        <div class="flip-card-back">
            <h2 class="title">Mission</h2>
            <p>At [Your Platform Name], our mission is simple: to provide a secure and user-friendly platform for individuals to manage their personal data and documentation online. We strive to simplify complex procedures such as document verification, NIC creation, and profile management, making administrative tasks hassle-free for our users. </p>
        </div>
    </div>
</div>
<div class="flip-card">
    <div class="flip-card-inner">
        <div class="flip-card-front">
            <h2 class="title">Why Choose ?</h2>
            <p>Hover me</p>
        </div>
        <div class="flip-card-back">
            <h2 class="title"></h2>
            <p>Convenience Redefined: Say goodbye to long queues and paperwork. With [Your Platform Name], you can access and update your personal information anytime, anywhere, from any device with an internet connection.
            Empowering You: Whether you're applying for a NIC, managing your educational records, updating your work experience, or securing your insurance documentation, [Your Platform Name] puts you in the driver's seat, giving you the tools you need to navigate bureaucratic processes with confidence.
            </p>
        </div>
    </div>
</div>
    </div> */}
      </div>

      <Footer />
    </>
  );
};

export default About;
