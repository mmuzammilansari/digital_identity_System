import React from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Navbar";
import Footer from "../Common/Footer";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const modules = [
    { name: "Marriage", key: "marriage", icon: "💍" },
    { name: "Smart POC", key: "smartPOC", icon: "🪪" },
    { name: "CRC", key: "crc", icon: "👶" },
    { name: "FRC", key: "frc", icon: "👨‍👩‍👧" },
    { name: "Criminal", key: "criminal", icon: "⚖️" },
    { name: "Insurance", key: "insurance", icon: "🛡️" },
    { name: "Education", key: "education", icon: "🎓" },
    { name: "Employment", key: "employment", icon: "💼" },
    { name: "Medical", key: "medical", icon: "🏥" },
    { name: "Vehicle", key: "vehicle", icon: "🚗" },
    { name: "Driving License", key: "drivingLicense", icon: "🪪" },
    { name: "Travel", key: "travel", icon: "✈️" },
    { name: "Financial", key: "financial", icon: "📊" },
    { name: "Address", key: "address", icon: "🏠" },
    { name: "Bank Accounts", key: "bankAccounts", icon: "🏦" },
  ];

  const handleClick = (mod) => {
    navigate(`/get-data/${mod.key}`);
  };

  return (
    <>
      <Nav />

      <div className="dashboard-container">
        <h1>Digital Identity Dashboard</h1>

        <div className="dashboard-grid">
          {modules.map((mod) => (
            <div key={mod.key} className="dash-card">
              <span className="dash-icon">{mod.icon}</span>
              <h3>{mod.name}</h3>

              <div className="action-buttons">
                <button
                  onClick={() => navigate(`/get-data/${mod.key}`)}
                  className="btn-view">
                  👁 View
                </button>

                <button
                  onClick={() => navigate(`/${mod.key}`)}
                  className="btn-add"
                >
                  + Add
                </button>
              </div>

            </div>
          ))}
          <div
            className="dash-card verification-card"
            onClick={() => navigate("/apply/verification")}
          >
            <span>✅</span>
            <h3>Verification</h3>

            <div className="action-buttons">
              <button className="btn-view">
                🔍 View Status
              </button>
            </div>
          </div>

        </div>
      </div>

    </>
  );
}

export default Dashboard;
