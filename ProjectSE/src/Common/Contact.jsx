import React from "react";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { TelephoneFill, EnvelopeFill } from "react-bootstrap-icons";
// import { MarkGithub } from 'react-bootstrap-icons';
import { Github } from "react-bootstrap-icons";

import "./contact.css";
import HomeNav from "../Home/HomeNav";
import Sliderr from "../Dashboard/Sliderr";
import Footer from "./Footer";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_r4et5qs",
        "template_tss256s",
        form.current,
        "2Nx2eciysbPZ1pWwn"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <>
      <HomeNav />
      <Sliderr />
      <div className="contact-container">
        <h1>Contact-Us</h1>
        <br />
        <h2>----IDENTITY HUB----</h2>
        <div className="contact-info">
          <h2>Want Help? Contact Us Directly</h2>
          <br />
          <p>
            We would be delighted to assist you with any query, suggestion, or
            complaint you might have. Please choose one of the following ways to
            approach us:
          </p>
        </div>

        <div className="contact-options">
          <div className="contact-option">
            <button className="button">
              <TelephoneFill />
            </button>
            <div className="contact-text">
              <p>Call us:</p>
              <p>000-000-0000</p>
            </div>
          </div>
          <div className="contact-option">
            <button className="button">
              <EnvelopeFill />
            </button>
            <div className="contact-text">
              <p>Email us:</p>
              <p>abcd@gmail.com</p>
            </div>
          </div>
          <div className="contact-option">
            <button className="button">
              <Github />
            </button>
            <div className="contact-text">
              <p>Visit our GitHub:</p>
              <p>github.com/yourusername</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <form ref={form} onSubmit={sendEmail}>
            <label>Name:</label>
            <input type="text" name="user_name" required />
            <label>Email:</label>
            <input type="email" name="user_email" required />
            <label>Message:</label>
            <textarea name="message" required />
            <input className="submit" type="submit" value="Send" />
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
