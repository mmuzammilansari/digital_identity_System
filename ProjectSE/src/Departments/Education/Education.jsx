import React, { useState } from "react";
import "../../Admin/regData.css";
import "./education.css";
import Nav from "../../Dashboard/Navbar";
import Footer from "../../Common/Footer";
import submitDataToFirestore from "../../Config/SubmitData";

function Education() {
  const initialState = {
    cnic: "",
    degreeLevel: "",
    degreeName: "",
    major: "",
    instituteName: "",
    boardUniversity: "",
    rollNo: "",
    duration: "",
    startDate: "",
    endDate: "",
    status: "",
    cgpaPercentage: "",
    gradingSystem: "",
    totalMarks: "",
    obtainedMarks: "",
    country: "",
    city: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitDataToFirestore(formData, "Education");
    setFormData(initialState);
  };

  return (
    <>
  <Nav />

  <div className="form-container">
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Education Details</h2>

      {/* BASIC INFO */}
      <input
        name="cnic"
        placeholder="CNIC (XXXXX-XXXXXXX-X)"
        value={formData.cnic}
        onChange={handleChange}
        required
      />

      <select
        name="degreeLevel"
        value={formData.degreeLevel}
        onChange={handleChange}
        required
      >
        <option value="">Degree Level</option>
        <option value="Matric">Matric</option>
        <option value="Inter">Intermediate</option>
        <option value="Bachelor">Bachelor</option>
        <option value="Master">Master</option>
      </select>

      <input
        name="degreeName"
        placeholder="Degree Name"
        value={formData.degreeName}
        onChange={handleChange}
      />

      <input
        name="major"
        placeholder="Major / Field of Study"
        value={formData.major}
        onChange={handleChange}
      />

      <input
        name="instituteName"
        placeholder="Institute Name"
        value={formData.instituteName}
        onChange={handleChange}
      />

      <input
        name="boardUniversity"
        placeholder="Board / University"
        value={formData.boardUniversity}
        onChange={handleChange}
      />

      <input
        name="rollNo"
        placeholder="Roll Number"
        value={formData.rollNo}
        onChange={handleChange}
      />

      <input
        name="duration"
        placeholder="Duration (e.g. 2019 - 2023)"
        value={formData.duration}
        onChange={handleChange}
      />

      <label>Start Date</label>
      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
      />

      <label>End Date</label>
      <input
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
      />

      <label>Education Status</label>
      <label style={{ fontWeight: "500" }}>
        <input
          type="radio"
          name="status"
          value="Completed"
          checked={formData.status === "Completed"}
          onChange={handleChange}
          style={{ marginRight: "6px" }}
        />
        Completed
      </label>

      <label style={{ fontWeight: "500" }}>
        <input
          type="radio"
          name="status"
          value="Ongoing"
          checked={formData.status === "Ongoing"}
          onChange={handleChange}
          style={{ marginRight: "6px" }}
        />
        Ongoing
      </label>

      <input
        name="cgpaPercentage"
        placeholder="CGPA / Percentage"
        value={formData.cgpaPercentage}
        onChange={handleChange}
      />

      <select
        name="gradingSystem"
        value={formData.gradingSystem}
        onChange={handleChange}
      >
        <option value="">Grading System</option>
        <option value="CGPA">CGPA</option>
        <option value="Percentage">Percentage</option>
      </select>

      <input
        name="totalMarks"
        placeholder="Total Marks"
        value={formData.totalMarks}
        onChange={handleChange}
      />

      <input
        name="obtainedMarks"
        placeholder="Obtained Marks"
        value={formData.obtainedMarks}
        onChange={handleChange}
      />

      <input
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
      />

      <input
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
      />

      <button type="submit">Save Education</button>
    </form>
  </div>

  <Footer />
</>

  );
}

export default Education;