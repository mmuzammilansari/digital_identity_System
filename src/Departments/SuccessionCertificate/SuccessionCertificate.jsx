import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Config/Firebase.jsx";

function SuccessionCertificate() {
  const [formData, setFormData] = useState({
    applicantFullName: "",
    applicantCNIC: "",
    applicantMobileNumber: "",
    applicantEmail: "",
    applicantAddress: "",
    deceasedFullName: "",
    deceasedCNIC: "",
    dateOfDeath: "",
    placeOfDeath: "",
    relationshipWithDeceased: "",
    certificateType: "Succession Certificate",
    region: "ICT",
    applicationMode: "NADRA Office",
    processingType: "Normal",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "SuccessionApplications"), formData);
      alert("Application submitted successfully!");
      setFormData({
        applicantFullName: "",
        applicantCNIC: "",
        applicantMobileNumber: "",
        applicantEmail: "",
        applicantAddress: "",
        deceasedFullName: "",
        deceasedCNIC: "",
        dateOfDeath: "",
        placeOfDeath: "",
        relationshipWithDeceased: "",
        certificateType: "Succession Certificate",
        region: "ICT",
        applicationMode: "NADRA Office",
        processingType: "Normal",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to submit application.");
    }
  };

  return (
 


  <div className="form-container">
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Succession Certificate / Letter of Administration</h2>

      {[
        { label: "Applicant Full Name", name: "applicantFullName", type: "text" },
        { label: "Applicant CNIC", name: "applicantCNIC", type: "text" },
        { label: "Mobile Number", name: "applicantMobileNumber", type: "tel" },
        { label: "Email", name: "applicantEmail", type: "email" },
        { label: "Address", name: "applicantAddress", type: "text" },
        { label: "Deceased Full Name", name: "deceasedFullName", type: "text" },
        { label: "Deceased CNIC", name: "deceasedCNIC", type: "text" },
        { label: "Date of Death", name: "dateOfDeath", type: "date" },
        { label: "Place of Death", name: "placeOfDeath", type: "text" },
        { label: "Relationship With Deceased", name: "relationshipWithDeceased", type: "text" },
      ].map((field) => (
        <label key={field.name}>
          {field.label}:
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            required
          />
        </label>
      ))}

      <label>
        Certificate Type:
        <select name="certificateType" value={formData.certificateType} onChange={handleChange}>
          <option value="">Select Certificate Type</option>
          <option value="Succession Certificate">Succession Certificate</option>
          <option value="Letter of Administration">Letter of Administration</option>
        </select>
      </label>

      <label>
        Region:
        <select name="region" value={formData.region} onChange={handleChange}>
          <option value="">Select Region</option>
          <option value="ICT">ICT</option>
          <option value="Punjab">Punjab</option>
          <option value="Sindh">Sindh</option>
          <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
        </select>
      </label>

      <label>
        Application Mode:
        <select name="applicationMode" value={formData.applicationMode} onChange={handleChange}>
          <option value="NADRA Office">NADRA Office</option>
        </select>
      </label>

      <label>
        Processing Type:
        <select name="processingType" value={formData.processingType} onChange={handleChange}>
          <option value="">Select Processing Type</option>
          <option value="Normal">Normal</option>
          <option value="Urgent">Urgent</option>
        </select>
      </label>

      <button type="submit">Submit Application</button>
    </form>
  </div>




  );
}

export default SuccessionCertificate;
