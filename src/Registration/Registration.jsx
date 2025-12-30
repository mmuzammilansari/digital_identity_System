// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Registration = () => {
// const [formData, setFormData] = useState({
//     nicNumber: "",
//     name: "",
//     nicStatus: ""
// });

// const handleInputChange = (event) => {
//     setFormData({
//         ...formData,
//         [event.target.name]: event.target.value
//     });
// };

// const handleSelectChange = (event) => {
//     setFormData({
//         ...formData,
//         nicStatus: event.target.value
//     });

//     if (event.target.value === "No") {
//         window.location.href = '/new-component';
//     }
// };

// const handleSaveData = () => {
//     // Retrieve existing data from local storage
//     const existingDataString = localStorage.getItem("registrationFormData");
//     let existingData = [];

//     // If there is existing data, parse it from JSON
//     if (existingDataString) {
//         existingData = JSON.parse(existingDataString);
//     }

//     // Add the new form data to the existing data array
//     existingData.push(formData);

//     // Save the updated data back to local storage
//     localStorage.setItem("registrationFormData", JSON.stringify(existingData));

//     // Log all data to console
//     console.log(existingData);
// };

// return (
//     <>
{
  /* <input type="text" placeholder="NIC Number" name="nicNumber" value={formData.nicNumber} onChange={handleInputChange} />
            <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleInputChange} />
            <select id="nicStatus" name="nicStatus" value={formData.nicStatus} onChange={handleSelectChange}>
                <option value="Nic">Have Nic</option>
                <option value="No">Have No Nic</option>
            </select>
            <button onClick={handleSaveData}>Save Data</button> */
}
{
  /* <button> <Link to="/NicReg">Have Nic</Link></button>
            <button><a>Not Nic</a></button> */
}
{
  /* </>
    );
};

export default Registration; */
}
// NicComponent.js

import React from "react";
import { Link } from "react-router-dom";
import "./reg.css";
import HomeNav from "../Home/HomeNav";
import Footer from "../Common/Footer";

function NicComponent() {
  return (
    <>
      <HomeNav />

      <div className="nic-container">
        <h1 className="nic-title">National Identity Services</h1>
        <p className="nic-subtitle">
          Select your current NIC status to continue
        </p>

        <div className="nic-cards">
          <Link to="/nic" className="nic-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="No NIC"
            />
            <h3>Don’t Have NIC</h3>
            <p>Apply for a new National Identity Card</p>
          </Link>

          <Link to="/new" className="nic-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/942/942748.png"
              alt="Have NIC"
            />
            <h3>Have NIC</h3>
            <p>Proceed with existing NIC services</p>
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default NicComponent;

