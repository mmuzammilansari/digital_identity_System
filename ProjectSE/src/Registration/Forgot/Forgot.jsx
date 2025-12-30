import React, { useState } from "react";
import HomeNav from "../../Home/HomeNav";

function Forgot() {
  const [email, setEmail] = useState("");
  const [nicNo, setNicNo] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle password retrieval
  const handlePassword = () => {
    if (!email || !nicNo || !phone) {
      setErrorMessage("Please fill out all fields");
      return;
    }
    // Your password retrieval logic here
    alert("Login successfully");
    window.location.href = "/dashboard";
  };

  return (
    <>
      <HomeNav />
      <div className="LoginForm">
        <div className="b1">
          <form style={{ height: "70vh" }}>
            <h1>Forgot Password</h1>
            <label>Email</label>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>NIC Data</label>
            <input
              type="text"
              placeholder="NIC No."
              value={nicNo}
              onChange={(e) => setNicNo(e.target.value)}
              required
            />
            <label>Contact</label>
            <input
              type="text"
              placeholder="Contact No."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {/* Display error message if any */}
            {errorMessage && <p className="error">{errorMessage}</p>}
            {/* Call handlePassword function onClick */}
            <button onClick={handlePassword}>Retrieve Password</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Forgot;
