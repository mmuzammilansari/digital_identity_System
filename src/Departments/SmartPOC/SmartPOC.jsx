import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Config/Firebase.jsx";
import Nav from "../../Dashboard/Navbar.jsx";

function SmartPOC() {
  const [formData, setFormData] = useState({
    applicantFullName: "",
    applicantDateOfBirth: "",
    applicantGender: "",
    applicantNationality: "",
    countryOfResidence: "",
    passportNumber: "",
    passportCountry: "",
    passportExpiryDate: "",
    eligibilityCategory: "Former Pakistani",
    relationCNICorPOC: "",
    applicationType: "New",
    processingType: "Normal",
    contactEmail: "",
    contactMobile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "SmartPOCApplications"), formData);
      alert("Application submitted successfully!");
      setFormData({
        applicantFullName: "",
        applicantDateOfBirth: "",
        applicantGender: "",
        applicantNationality: "",
        countryOfResidence: "",
        passportNumber: "",
        passportCountry: "",
        passportExpiryDate: "",
        eligibilityCategory: "Former Pakistani",
        relationCNICorPOC: "",
        applicationType: "New",
        processingType: "Normal",
        contactEmail: "",
        contactMobile: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to submit application.");
    }
  };

  return (
    <>
  <Nav />

  <div className="form-container">
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Smart POC Application</h2>

      {[  
        { label: "Applicant Full Name", name: "applicantFullName", type: "text" },
        { label: "Date of Birth", name: "applicantDateOfBirth", type: "date" },
        { label: "Nationality", name: "applicantNationality", type: "text" },
        { label: "Country of Residence", name: "countryOfResidence", type: "text" },
        { label: "Passport Number", name: "passportNumber", type: "text" },
        { label: "Passport Country", name: "passportCountry", type: "text" },
        { label: "Passport Expiry Date", name: "passportExpiryDate", type: "date" },
        { label: "Relation CNIC/POC (if applicable)", name: "relationCNICorPOC", type: "text" },
        { label: "Contact Email", name: "contactEmail", type: "email" },
        { label: "Contact Mobile", name: "contactMobile", type: "tel" },
      ].map((field) => (
        <label key={field.name}>
          {field.label}:
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            required={!["relationCNICorPOC"].includes(field.name)}
          />
        </label>
      ))}

      <label>
        Gender:
        <select name="applicantGender" value={formData.applicantGender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </label>

      <label>
        Eligibility Category:
        <select name="eligibilityCategory" value={formData.eligibilityCategory} onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="Former Pakistani">Former Pakistani</option>
          <option value="Parent/Grandparent Pakistani">Parent/Grandparent Pakistani</option>
          <option value="Close Relative Pakistani">Close Relative Pakistani</option>
          <option value="Spouse of Pakistani">Spouse of Pakistani</option>
        </select>
      </label>

      <label>
        Application Type:
        <select name="applicationType" value={formData.applicationType} onChange={handleChange}>
          <option value="">Select Type</option>
          <option value="New">New</option>
          <option value="Renewal">Renewal</option>
          <option value="Modification">Modification</option>
          <option value="Cancellation">Cancellation</option>
        </select>
      </label>

      <label>
        Processing Type:
        <select name="processingType" value={formData.processingType} onChange={handleChange}>
          <option value="">Select Processing</option>
          <option value="Normal">Normal</option>
          <option value="Urgent">Urgent</option>
          <option value="Executive">Executive</option>
        </select>
      </label>

      <button type="submit">Submit Application</button>
    </form>
  </div>

  {/* <Footer /> */}
</>

  );
}

export default SmartPOC;
