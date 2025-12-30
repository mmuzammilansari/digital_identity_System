import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../../Config/Firebase";
import HomeNav from "../../Home/HomeNav";
import Footer from "../../Common/Footer";
import "./Nicreg.css";

function NicReg() {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    fatherNIC: "",
    motherName: "",
    motherNIC: "",
    dob: "",
    address: "",
    permanentAddress: "",
    age: "",
  });

  const [files, setFiles] = useState({
    photo: null,
    birthCertificate: null,
    fathersNic: null,
    bForm: null,
  });

  const [generatedNIC, setGeneratedNIC] = useState("");
  const [statusPassword, setStatusPassword] = useState("");

  const handleChange = (e) => {
    const { name, value, files: inputFiles } = e.target;
    if (inputFiles) {
      setFiles((prev) => ({ ...prev, [name]: inputFiles[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (name === "dob") calculateAge(value);
    }
  };

  const calculateAge = (dobValue) => {
    const dobDate = new Date(dobValue);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const m = today.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }
    setFormData((prev) => ({ ...prev, age }));
  };

  const generateNIC = () => {
    const nic =
      Math.floor(40000 + Math.random() * 10000) +
      "-" +
      Math.floor(1000000 + Math.random() * 9000000) +
      "-" +
      Math.floor(1 + Math.random() * 9);
    setGeneratedNIC(nic);
  };

  const generatePassword = () => {
    const password = Math.random().toString(36).slice(-8); // 8 char random password
    setStatusPassword(password);
  };

  const uploadFile = async (file, folder) => {
    if (!file) return null;
    const fileRef = ref(storage, `${folder}/${file.name}_${Date.now()}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    return url;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // 🔹 AGE VALIDATION (18+)
  if (Number(formData.age) < 18) {
    alert("You are under age. NIC registration is allowed only for 18+.");
    return;
  }

  // 🔹 Validate Parent NIC format
  const nicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;
  if (!nicRegex.test(formData.fatherNIC) || !nicRegex.test(formData.motherNIC)) {
    alert("Invalid Father or Mother NIC format!");
    return;
  }

  try {
    // 🔹 Generate NIC & Password if not already generated
    if (!generatedNIC) generateNIC();
    if (!statusPassword) generatePassword();

    // 🔹 Upload files to Firebase Storage
    const uploadedFiles = {};
    for (const key of Object.keys(files)) {
      uploadedFiles[key] = await uploadFile(files[key], "ApplyForNIC");
    }

    // 🔹 Save data to Firestore (CNIC as record)
    await addDoc(collection(db, "nicRegistrations"), {
      ...formData,
      generatedNIC,
      statusPassword,
      status: "pending",
      ...uploadedFiles,
      createdAt: new Date(),
    });

    alert(`Registration submitted successfully!\nYour status password: ${statusPassword}`);

    // 🔹 Reset form
    setFormData({
      name: "",
      fatherName: "",
      fatherNIC: "",
      motherName: "",
      motherNIC: "",
      dob: "",
      address: "",
      permanentAddress: "",
      age: "",
    });

    setFiles({
      photo: null,
      birthCertificate: null,
      fathersNic: null,
      bForm: null,
    });

    setGeneratedNIC("");
    setStatusPassword("");

  } catch (error) {
    console.error("Error submitting NIC registration:", error);
    alert("Error submitting registration. Please try again.");
  }
};

  return (
    <>
  <HomeNav />

  <div className="nicreg-container">
    <div className="nicreg-card">
      <h1>NIC Registration</h1>
      <p className="subtitle">Fill the form carefully to apply for a new NIC</p>

      <form onSubmit={handleSubmit} className="nicreg-form">
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />

        <input type="text" name="fatherName" placeholder="Father Name" value={formData.fatherName} onChange={handleChange} required />

        <input type="text" name="fatherNIC" placeholder="Father NIC (xxxxx-xxxxxxx-x)" value={formData.fatherNIC} onChange={handleChange} required />

        <input type="text" name="motherName" placeholder="Mother Name" value={formData.motherName} onChange={handleChange} required />

        <input type="text" name="motherNIC" placeholder="Mother NIC (xxxxx-xxxxxxx-x)" value={formData.motherNIC} onChange={handleChange} required />

        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

        <input type="text" name="address" placeholder="Current Address" value={formData.address} onChange={handleChange} required />

        <input type="text" name="permanentAddress" placeholder="Permanent Address" value={formData.permanentAddress} onChange={handleChange} required />

        <div className="inline-actions">
          <button type="button" onClick={generateNIC}>Generate NIC</button>
          <input type="text" value={generatedNIC} readOnly placeholder="Generated NIC" />
        </div>

        <div className="inline-actions">
          <button type="button" onClick={generatePassword}>Generate Password</button>
          <input type="text" value={statusPassword} readOnly placeholder="Status Password" />
        </div>

        <h3>Upload Required Documents: </h3>
        <br />
          <div>Photo: <input type="file" name="photo" onChange={handleChange} required /></div>
      <div>Birth Certificate: <input type="file" name="birthCertificate" onChange={handleChange} required /></div>
      <div>fathers Nic:<input type="file" name="fathersNic" onChange={handleChange} required /></div>
      <div>B Form:<input type="file" name="bForm" onChange={handleChange} required /></div>

        
        
        
        
        <button className="submit-btn" type="submit" style={{backgroundColor:"#0c7a57"}}>Submit Registration</button>
      </form>

      <Link to="/check-nic" className="status-link">
        Check NIC Application Status
      </Link>
    </div>
  </div>

  <Footer />
</>

  );
}

export default NicReg;
