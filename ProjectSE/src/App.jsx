import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./Home/Home";
import About from "./Common/About";
import Contact from "./Common/Contact";
import Login from "./Login/Login";

import Forgot from "./Registration/Forgot/Forgot";
import Registration from "./Registration/Registration";
import NewRegistration from "./Registration/Reg/Registration";
import Nic from "./Registration/NicReg/NicReg";
import CheckNic from "./Registration/CheckNic";
import CNICProfile from "./Registration/CnicProfile";

import Dashboard from "./Dashboard/Dashboard";
import CNICSearch from "./Dashboard/CNICsearch";

import Education from "./Departments/Education/Education";
import Empolyemnet from "./Departments/Employment/EmploymentForm";
import Marriage from "./Departments/Marriage/MarriageForm";
import Medical from "./Departments/MedicalHistory/MedicalHistory";
import TravelForm from "./Departments/Travel/Travel";
import InsuranceForm from "./Departments/Insurence/Insurence";
import AddressForm from "./Departments/Address/Address";
import BankAccountForm from "./Departments/Bank/BankAccountForm";
import FinancialRecordForm from "./Departments/Bank/FinancialRecordForm";
import VehicleAndLicenseForm from "./Departments/Driving/VehicleAndLicenseForm";
import CriminalForm from "./Departments/Criminal/CriminalForm";
import JuvenileCard from "./Departments/JuvenileCard/JuvenileCard";
import SmartPOC from "./Departments/SmartPOC/SmartPOC";
import SuccessionCertificate from "./Departments/SuccessionCertificate/SuccessionCertificate";
import CRC from "./Departments/CRC/CRC";
import FRC from "./Departments/FRC/FRC";

import ApplyVerification from "./Verification/ApplyVerification";

import Admin from "./Admin/Admin";
import RegistrationData from "./Admin/RegistrationData";
import NicApprove from "./Admin/NicApprove";
import AdminPanelMarrige from "./Admin/MarrigeAdmin/AdminPanelMarrige";
import AdminPanelMedical from "./Admin/MedicalAdmin/AdminPanelMedical";
import AdminAddress from "./Admin/Address/Addressadmin";
import AdminVerification from "./Admin/Verification/AdminVerification";
import GetData from "./Dashboard/GetData";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    // temporary admin auth
    if (username === "a" && password === "a") {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* REGISTRATION */}
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/new" element={<NewRegistration />} />
        <Route path="/nic" element={<Nic />} />
        <Route path="/check-nic" element={<CheckNic />} />
        <Route path="/apply/cnic" element={<CNICProfile />} />

        {/* USER DASHBOARD */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cnic-search" element={<CNICSearch />} />

        {/* DEPARTMENTS */}
        <Route path="/education" element={<Education />} />
        <Route path="/employment" element={<Empolyemnet />} />
        <Route path="/marriage" element={<Marriage />} />
        <Route path="/medical" element={<Medical />} />
        <Route path="/travel" element={<TravelForm />} />
        <Route path="/insurance" element={<InsuranceForm />} />
        <Route path="/address" element={<AddressForm />} />
        <Route path="/bank-account" element={<BankAccountForm />} />
        <Route path="/financial" element={<FinancialRecordForm />} />
        <Route path="/vehicle" element={<VehicleAndLicenseForm />} />
        <Route path="/drivingLicense" element={<VehicleAndLicenseForm/>} />
        <Route path="/criminal" element={<CriminalForm />} />
        <Route path="/juvenile-card" element={<JuvenileCard />} />
        <Route path="/smartPOC" element={<SmartPOC />} />
        <Route
          path="/succession-certificate"
          element={<SuccessionCertificate />}
        />
        <Route path="/get-data/:moduleKey" element={<GetData />} />

        <Route path="/crc" element={<CRC />} />
        <Route path="/frc" element={<FRC />} />

        {/* VERIFICATION */}
        <Route path="/apply/verification" element={<ApplyVerification />} />

        {/* ADMIN */}
        <Route path="/admin" element={<Admin />} />

        <Route
          path="/registration-data"
          element={isLoggedIn ? <RegistrationData /> : <Navigate to="/" />}
        />
        <Route
          path="/nic-approve"
          element={isLoggedIn ? <NicApprove /> : <Navigate to="/" />}
        />
        <Route
          path="/admin-panel-marriage"
          element={isLoggedIn ? <AdminPanelMarrige /> : <Navigate to="/" />}
        />
        <Route
          path="/admin-panel-medical"
          element={isLoggedIn ? <AdminPanelMedical /> : <Navigate to="/" />}
        />
        <Route
          path="/adminaddress"
          element={isLoggedIn ? <AdminAddress /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/verification"
          element={isLoggedIn ? <AdminVerification /> : <Navigate to="/" />}
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
