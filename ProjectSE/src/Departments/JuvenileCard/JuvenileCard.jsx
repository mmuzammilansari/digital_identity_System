import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Config/Firebase.jsx";

function JuvenileCard() {
  const [formData, setFormData] = useState({
    childFullName: "",
    childDateOfBirth: "",
    childGender: "",
    childBirthPlace: "",
    childBFormNumber: "",
    birthCertificateType: "",
    birthCertificateNumber: "",
    parentFullName: "",
    parentCNICorNICOP: "",
    parentMobileNumber: "",
    applicationMode: "NRC",
    processingType: "Normal",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "JuvenileCardApplications"), formData);
      alert("Application submitted successfully!");
      setFormData({
        childFullName: "",
        childDateOfBirth: "",
        childGender: "",
        childBirthPlace: "",
        childBFormNumber: "",
        birthCertificateType: "",
        birthCertificateNumber: "",
        parentFullName: "",
        parentCNICorNICOP: "",
        parentMobileNumber: "",
        applicationMode: "NRC",
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
    <h2>Juvenile Card Application</h2>

    {[ 
      { placeholder: "Child Full Name", name: "childFullName", type: "text" },
      { placeholder: "Child Date of Birth", name: "childDateOfBirth", type: "date" },
      { placeholder: "Child Birth Place", name: "childBirthPlace", type: "text" },
      { placeholder: "Child B-Form Number", name: "childBFormNumber", type: "text" },
      { placeholder: "Birth Certificate Type", name: "birthCertificateType", type: "text" },
      { placeholder: "Birth Certificate Number", name: "birthCertificateNumber", type: "text" },
      { placeholder: "Parent Full Name", name: "parentFullName", type: "text" },
      { placeholder: "Parent CNIC/NICOP", name: "parentCNICorNICOP", type: "text" },
      { placeholder: "Parent Mobile Number", name: "parentMobileNumber", type: "tel" },
    ].map((field) => (
      <input
        key={field.name}
        type={field.type}
        name={field.name}
        placeholder={field.placeholder}
        value={formData[field.name]}
        onChange={handleChange}
        required={field.name !== "childBFormNumber"}
      />
    ))}

    <select
      name="childGender"
      value={formData.childGender}
      onChange={handleChange}
      required
    >
      <option value="">Select Child Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>

    <select
      name="applicationMode"
      value={formData.applicationMode}
      onChange={handleChange}
    >
      <option value="">Select Application Mode</option>
      <option value="NRC">NRC</option>
      <option value="PakID">PakID</option>
    </select>

    <select
      name="processingType"
      value={formData.processingType}
      onChange={handleChange}
    >
      <option value="">Select Processing Type</option>
      <option value="Normal">Normal</option>
      <option value="Urgent">Urgent</option>
      <option value="Executive">Executive</option>
    </select>

    <button type="submit">Submit Application</button>
  </form>
</div>

  );
}

export default JuvenileCard;
