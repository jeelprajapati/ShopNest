import React, { useState } from "react";
import "./contact.css";
import Topbar from "../../components/topbar/Topbar";
import Navbar from "../../components/navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/footer/Footer";
import { sendMessage } from "../../actions/messageAction";

const Contact = () => {
    const token=JSON.parse(localStorage.getItem("user"))?.token
    const [values,setValues]=useState({email:"",message:""});
    const handleChange=(e)=>{
        setValues((item)=>({...item,[e.target.name]:e.target.value}))
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        sendMessage(token,values,()=>{
            setValues({email:"",message:""});
        })
    }
  return (
    <div className="contact">
      <Topbar />
      <div className="contactContainer">
        <div className="contactWrapper">
          <div className="contactNav">
            <Navbar id={4} />
          </div>
          <div className="contactTitle">
            <h1>Contact</h1>
          </div>
        </div>
        <div className="contactBoxs">
          <div className="contactBox">
            <div className="contactForm">
              <h3>Send Us A Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="contactInput">
                  <span className="contactIcon">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={values?.email}
                    placeholder="Your Email Address"
                    required
                    pattern={`/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i`}
                    onChange={handleChange}
                  />
                </div>
                <div className="contactTextarea">
                  <textarea
                    name="message"
                    value={values?.message}
                    placeholder="How Can We Help?"
                    required
                    onChange={handleChange}
                  ></textarea>
                </div>
              <button type="submit" className="contactButton">
                SUBMIT
              </button>
              </form>
            </div>
          </div>
          <div className="contactBox" style={{ border: "none", flex: 3 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.5456007573634!2d72.651248175148!3d23.259616879008256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2c791966070f%3A0x8ccee418e3fc7833!2sGOVERNMENT%20ENGINEERING%20COLLEGE-1%2C%20Sector%2028%20GIDC%2C%20Sector%2028%2C%20Gandhinagar%2C%20Gujarat%20382041!5e0!3m2!1sen!2sin!4v1710783127324!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: "0" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
