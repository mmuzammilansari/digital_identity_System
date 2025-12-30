import React, { useState } from "react";
import RegistrationData from "./RegistrationData";
import AdminPanelMedical from "./MedicalAdmin/AdminPanelMedical";
import AdminPanelMarrige from "./MarrigeAdmin/AdminPanelMarrige";
import NicApprove from "./NicApprove";
import EmploymentDataTable from "./Employment/Employmentadmin";
import AdminInsuranceData from "./Insurence/Insurence";
import AdminEducation from "./Education/AdminEducation";
import TravelDataDisplay from "./Travel/TravelAdmin";
import BankAdmin from "./BankAdmin/BankAdmin";
import FinancialAdmin from "./BankAdmin/FinancialAdmin";
import VehicleAndLicenseAdmin from "./Driving/VehicleAndLicenseAdmin";
import CriminalAdmin from "./Criminal/CriminalAdmin";
import Navbar from "./AdminNav";
import JuvenileCardAdmin from "./JuvenileCard/JuvenileCardAdmin";
import SmartPOCAdmin from "./SmartPOC/SmartPOCAdmin";
import SuccessionCertificateAdmin from "./SuccessionCertificate/SuccessionCertificateAdmin";
import CRCAdmin from "./CRC/CRCAdmin";
import FRCAdmin from "./FRC/FRCAdmin";
import AdminAddress from "./Address/Addressadmin";
import AdminVerification from "./Verification/AdminVerification";
import { useNavigate } from "react-router-dom";


import "./Admin.css";

// Array of admin modules with icons
const adminComponents = [
  { name: "NIC Approval", component: <NicApprove />, icon: "🆔" },
  { name: "Registration", component: <RegistrationData />, icon: "📝" },
  { name: "Employment", component: <EmploymentDataTable />, icon: "💼" },
  { name: "Medical", component: <AdminPanelMedical />, icon: "🏥" },
  { name: "Marriage", component: <AdminPanelMarrige />, icon: "💍" },
  { name: "Insurance", component: <AdminInsuranceData />, icon: "🛡️" },
  { name: "Education", component: <AdminEducation />, icon: "🎓" },
  { name: "Travel", component: <TravelDataDisplay />, icon: "✈️" },
  { name: "Address", component: <AdminAddress />, icon: "🏠" },
  { name: "Bank", component: <BankAdmin />, icon: "🏦" },
  { name: "Financial", component: <FinancialAdmin />, icon: "💰" },
  { name: "Vehicle & License", component: <VehicleAndLicenseAdmin />, icon: "🚗" },
  { name: "Criminal", component: <CriminalAdmin />, icon: "⚖️" },
  { name: "Juvenile Card", component: <JuvenileCardAdmin />, icon: "🧒" },
  { name: "Smart POC", component: <SmartPOCAdmin />, icon: "📱" },
  { name: "Succession Certificate", component: <SuccessionCertificateAdmin />, icon: "📜" },
  { name: "CRC", component: <CRCAdmin />, icon: "🏢" },
  { name: "FRC", component: <FRCAdmin />, icon: "🏠" }

];

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeComponent, setActiveComponent] = useState(null);
  const [searchNIC, setSearchNIC] = useState("");
   const navigate = useNavigate();

  // Login handler
  const handleLogin = () => {
    if (username === "a" && password === "a") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setActiveComponent(null);
    setSearchNIC("");
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <Navbar onLogout={handleLogout} />
          <h1 className="dashboard-title">Welcome Admin</h1>

          {/* NIC Search Bar */}
          <div style={{ textAlign: "center", margin: "1rem" }}>
  <input
    type="text"
    placeholder="Search by NIC"
    value={searchNIC}
    onChange={(e) => setSearchNIC(e.target.value)}
    className="nic-search"
    style={{ padding: "0.5rem", width: "300px", borderRadius: "8px", border: "1px solid #ccc" }}
  />
  <button
    onClick={() => {
      if (activeComponent && searchNIC) {
        // Pass searchNIC prop to active component
        setActiveComponent(
          React.cloneElement(activeComponent, { searchNIC })
        );
      } else {
        alert("Select a module and enter NIC to search");
      }
    }}
    style={{ marginLeft: "10px", padding: "0.5rem 1rem", borderRadius: "8px", cursor: "pointer" }}
  >
    Search
  </button>
</div>


          {/* Dashboard Cards */}
          <div className="dashboard-grid">
            {adminComponents.map((item, index) => (
              <div
                key={index}
                className="dashboard-card"
                onClick={() => setActiveComponent(item.component)}
              >
                <div className="card-icon">{item.icon}</div>
                <div className="card-name">{item.name}</div>
              </div>
            ))}
          </div>

          {/* Active Module */}
          <div className="active-component">
            {activeComponent ? React.cloneElement(activeComponent, { searchNIC }) : <p>Select a module to view data</p>}
          </div>
          {/* <AdminAddress/>
          <AdminEducation/>
          <AdminInsuranceData/>
          <AdminPanelMarrige/>
          <AdminPanelMedical/>
          <BankAdmin/>
          <CRCAdmin/>
          <CriminalAdmin/>
          <EmploymentDataTable/>
          <FRCAdmin/>
          <FinancialAdmin/>
          <JuvenileCardAdmin/> */}
          
        </div>
      ) : (
        <div className="admin-login-page">
          <div className="admin-login-card">
            <h2>Admin Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {error && <div className="login-error">{error}</div>}
          </div>
        </div>
      )}
     

  <AdminVerification/>

    </div>
  );
}

export default Admin;
