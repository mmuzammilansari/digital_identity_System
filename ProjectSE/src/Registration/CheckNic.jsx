import React, { useState } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Config/Firebase";
import HomeNav from "../Home/HomeNav";
import Footer from "../Common/Footer";
import "./CheckNic.css";

function CheckNic() {
  const [fatherNIC, setFatherNIC] = useState("");
  const [motherNIC, setMotherNIC] = useState("");
  const [statusPassword, setStatusPassword] = useState("");
  const [userData, setUserData] = useState(null);

  const handleCheck = async (e) => {
    e.preventDefault();

    if (!fatherNIC || !motherNIC || !statusPassword) {
      alert("Please enter all fields.");
      return;
    }

    const q = query(
      collection(db, "nicRegistrations"),
      where("fatherNIC", "==", fatherNIC),
      where("motherNIC", "==", motherNIC),
      where("statusPassword", "==", statusPassword)
    );

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setUserData(querySnapshot.docs[0].data());
      } else {
        alert("Incorrect details");
        setUserData(null);
      }
    } catch (error) {
      alert("Error checking NIC");
    }
  };

  return (
    <>
      <HomeNav />

      <div className="checknic-container">
        <div className="checknic-card">
          <h1>Check NIC Status</h1>
          <p className="subtitle">
            Enter your credentials to view NIC application status
          </p>

          <form onSubmit={handleCheck} className="checknic-form">
            <input
              value={fatherNIC}
              onChange={(e) => setFatherNIC(e.target.value)}
              placeholder="Father NIC (xxxxx-xxxxxxx-x)"
            />

            <input
              value={motherNIC}
              onChange={(e) => setMotherNIC(e.target.value)}
              placeholder="Mother NIC (xxxxx-xxxxxxx-x)"
            />

            <input
              value={statusPassword}
              onChange={(e) => setStatusPassword(e.target.value)}
              placeholder="Status Password"
            />

            <button type="submit">Check Status</button>
          </form>

          {userData && (
            <div className="nic-info">
              <h2>Applicant Information</h2>

              <div className="info-grid">
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Father:</strong> {userData.fatherName}</p>
                <p><strong>Mother:</strong> {userData.motherName}</p>
                <p><strong>Date of Birth:</strong> {userData.dob}</p>
                <p><strong>Age:</strong> {userData.age}</p>
                <p><strong>Address:</strong> {userData.address}</p>
                <p><strong>Permanent Address:</strong> {userData.permanentAddress}</p>
                <p><strong>Generated NIC:</strong> {userData.generatedNIC}</p>
                <p className={`status ${userData.status}`}>
                  <strong>Status:</strong>{" "}
                  {userData.status === "approved" ? "Approved" : "Pending"}
                </p>
              </div>

              <h2>Uploaded Documents</h2>

              <div className="documents">
                <img src={userData.photo} alt="User" />
                <img src={userData.birthCertificate} alt="Birth Certificate" />
                <img src={userData.fathersNic} alt="Father NIC" />
                <img src={userData.bForm} alt="B-Form" />
              </div>
            </div>
          )}

          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CheckNic;
