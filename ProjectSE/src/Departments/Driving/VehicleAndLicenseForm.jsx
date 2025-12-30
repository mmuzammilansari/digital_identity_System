import React, { useState } from "react";
import Nav from "../../Dashboard/Navbar";
import Footer from "../../Common/Footer";
import submitDataToFirestore from "../../Config/SubmitData";

function VehicleAndLicenseForm() {
  // Citizen CNIC
  const [cnic, setCnic] = useState("");

  // Vehicle details
  const [registrationNo, setRegistrationNo] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [engineNo, setEngineNo] = useState("");
  const [chassisNo, setChassisNo] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [insuranceNo, setInsuranceNo] = useState("");

  // Driving License details
  const [licenseNo, setLicenseNo] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [licenseExpiryDate, setLicenseExpiryDate] = useState("");
  const [authority, setAuthority] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vehicle Data
    const vehicleData = {
      registrationNo,
      cnic,
      vehicleType,
      brand,
      model,
      color,
      engineNo,
      chassisNo,
      registrationDate,
      expiryDate,
      insuranceNo,
      createdAt: new Date(),
    };

    // Driving License Data
    const licenseData = {
      licenseNo,
      cnic,
      licenseType,
      issueDate,
      expiryDate: licenseExpiryDate,
      authority,
      createdAt: new Date(),
    };

    // Submit to Firestore
    submitDataToFirestore(vehicleData, "Vehicle");
    submitDataToFirestore(licenseData, "DrivingLicense");

    // LocalStorage sync
    let existingData = JSON.parse(localStorage.getItem("Data")) || {};
    if (!existingData[cnic]) existingData[cnic] = {};
    existingData[cnic].VehicleData = vehicleData;
    existingData[cnic].DrivingLicenseData = licenseData;
    localStorage.setItem("Data", JSON.stringify(existingData));

    // Reset form
    setRegistrationNo("");
    setVehicleType("");
    setBrand("");
    setModel("");
    setColor("");
    setEngineNo("");
    setChassisNo("");
    setRegistrationDate("");
    setExpiryDate("");
    setInsuranceNo("");
    setLicenseNo("");
    setLicenseType("");
    setIssueDate("");
    setLicenseExpiryDate("");
    setAuthority("");
    setCnic("");

    alert("Vehicle and Driving License data submitted successfully ✅");
  };

  return (
    <>
  <Nav />

  <div className="form-container">
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Vehicle & Driving License Details</h2>

      <input
        type="text"
        placeholder="CNIC (XXXXX-XXXXXXX-X)"
        value={cnic}
        onChange={(e) => setCnic(e.target.value)}
        required
      />

      <h3>Vehicle Details</h3>

      <input
        type="text"
        placeholder="Registration Number"
        value={registrationNo}
        onChange={(e) => setRegistrationNo(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Vehicle Type (Car / Bike / Truck)"
        value={vehicleType}
        onChange={(e) => setVehicleType(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Engine Number"
        value={engineNo}
        onChange={(e) => setEngineNo(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Chassis Number"
        value={chassisNo}
        onChange={(e) => setChassisNo(e.target.value)}
        required
      />

      <label>Registration Date</label>
      <input
        type="date"
        value={registrationDate}
        onChange={(e) => setRegistrationDate(e.target.value)}
        required
      />

      <label>Registration Expiry Date</label>
      <input
        type="date"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Insurance Policy Number (Optional)"
        value={insuranceNo}
        onChange={(e) => setInsuranceNo(e.target.value)}
      />

      <h3>Driving License Details</h3>

      <input
        type="text"
        placeholder="License Number"
        value={licenseNo}
        onChange={(e) => setLicenseNo(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="License Type (Motorbike / Car / Heavy Vehicle)"
        value={licenseType}
        onChange={(e) => setLicenseType(e.target.value)}
        required
      />

      <label>Issue Date</label>
      <input
        type="date"
        value={issueDate}
        onChange={(e) => setIssueDate(e.target.value)}
        required
      />

      <label>License Expiry Date</label>
      <input
        type="date"
        value={licenseExpiryDate}
        onChange={(e) => setLicenseExpiryDate(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Issuing Authority"
        value={authority}
        onChange={(e) => setAuthority(e.target.value)}
        required
      />

      <button type="submit">Submit</button>
    </form>
  </div>

  <Footer />
</>

  );
}

export default VehicleAndLicenseForm;
