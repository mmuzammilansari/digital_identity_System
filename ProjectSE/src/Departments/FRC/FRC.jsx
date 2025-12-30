import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Config/Firebase.jsx";
import Nav from "../../Dashboard/Navbar.jsx";

function FRC() {
  const [formData, setFormData] = useState({
    applicantFullName: "",
    applicant13DigitID: "",
    applicantMobileNumber: "",
    applicantEmail: "",
    frcCategory: "By Birth",
    applicationMode: "NRC",
    familyMembers: [],
    processingFee: "",
  });

  const [member, setMember] = useState({ memberFullName: "", member13DigitID: "", relationship: "", livingStatus: "Alive" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMemberChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const addFamilyMember = () => {
    setFormData({ ...formData, familyMembers: [...formData.familyMembers, member] });
    setMember({ memberFullName: "", member13DigitID: "", relationship: "", livingStatus: "Alive" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "FRCApplications"), formData);
      alert("Application submitted successfully!");
      setFormData({
        applicantFullName: "",
        applicant13DigitID: "",
        applicantMobileNumber: "",
        applicantEmail: "",
        frcCategory: "By Birth",
        applicationMode: "NRC",
        familyMembers: [],
        processingFee: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to submit application.");
    }
  };

  return (
    <>
    <Nav/>
    <div className="form-container">
  <form className="form-card" onSubmit={handleSubmit}>
    <h2>Family Registration Certificate (FRC)</h2>

    <input
      type="text"
      name="applicantFullName"
      placeholder="Applicant Full Name"
      value={formData.applicantFullName}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="applicant13DigitID"
      placeholder="Applicant 13-Digit ID"
      value={formData.applicant13DigitID}
      onChange={handleChange}
      required
    />

    <input
      type="tel"
      name="applicantMobileNumber"
      placeholder="Mobile Number"
      value={formData.applicantMobileNumber}
      onChange={handleChange}
      required
    />

    <input
      type="email"
      name="applicantEmail"
      placeholder="Email Address"
      value={formData.applicantEmail}
      onChange={handleChange}
      required
    />

    <select
      name="frcCategory"
      value={formData.frcCategory}
      onChange={handleChange}
      required
    >
      <option value="">Select FRC Category</option>
      <option value="By Birth">By Birth</option>
      <option value="By Marriage">By Marriage</option>
      <option value="By Adoption">By Adoption</option>
      <option value="By All">By All</option>
    </select>

    <select
      name="applicationMode"
      value={formData.applicationMode}
      onChange={handleChange}
      required
    >
      <option value="">Select Application Mode</option>
      <option value="NRC">NRC</option>
      <option value="PakID">PakID</option>
    </select>

    <h3>Family Members</h3>

    <input
      type="text"
      name="memberFullName"
      placeholder="Member Full Name"
      value={member.memberFullName}
      onChange={handleMemberChange}
    />

    <input
      type="text"
      name="member13DigitID"
      placeholder="Member 13-Digit ID"
      value={member.member13DigitID}
      onChange={handleMemberChange}
    />

    <input
      type="text"
      name="relationship"
      placeholder="Relationship"
      value={member.relationship}
      onChange={handleMemberChange}
    />

    <select
      name="livingStatus"
      value={member.livingStatus}
      onChange={handleMemberChange}
    >
      <option value="">Select Living Status</option>
      <option value="Alive">Alive</option>
      <option value="Deceased">Deceased</option>
    </select>

    <button type="button" onClick={addFamilyMember}>
      + Add Family Member
    </button>

    <input
      type="text"
      name="processingFee"
      placeholder="Processing Fee"
      value={formData.processingFee}
      onChange={handleChange}
    />

    <button type="submit">Submit Application</button>
  </form>
</div>
</>
  );
}

export default FRC;
