import React, { useState } from "react";
import Nav from "../../Dashboard/Navbar";
import Footer from "../../Common/Footer";
import submitDataToFirestore from "../../Config/SubmitData";

function EmploymentForm() {

  const emptyEmployment = {
    jobTitle: "",
    companyName: "",
    jobStartDate: "",
    jobEndDate: "",
    isJobPresent: true,
    salary: "",
    jobResponsibility: "",
    skills: ""
  };

  const [cnic, setCnic] = useState("");
  const [employments, setEmployments] = useState([emptyEmployment]);

  const handleChange = (index, field, value) => {
    const updated = [...employments];
    updated[index][field] = value;
    setEmployments(updated);
  };

  const handleJobPresentChange = (index, value) => {
    const updated = [...employments];
    updated[index].isJobPresent = value;
    if (value) updated[index].jobEndDate = "";
    setEmployments(updated);
  };

  const handleAddAnother = () => {
    setEmployments([...employments, emptyEmployment]);
  };

  const validateCNIC = (cnic) => {
    return /^\d{5}-\d{7}-\d{1}$/.test(cnic);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateCNIC(cnic)) {
      alert("Invalid CNIC format (xxxxx-xxxxxxx-x)");
      return;
    }

    const formattedData = employments.map(emp => ({
      ...emp,
      salary: Number(emp.salary),
      skills: emp.skills.split(",").map(s => s.trim()),
      createdAt: new Date()
    }));

    submitDataToFirestore(
      { cnic, employments: formattedData },
      "Employee"
    );

    let existingData = JSON.parse(localStorage.getItem("Data")) || {};
    existingData[cnic] = { EmploymentData: formattedData };
    localStorage.setItem("Data", JSON.stringify(existingData));

    setCnic("");
    setEmployments([emptyEmployment]);
    alert("Employment Data Saved Successfully ✅");
  };

  return (
  <>
  <Nav />

  <div className="form-container">
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Employment Details</h2>

      <input
        type="text"
        placeholder="CNIC (XXXXX-XXXXXXX-X)"
        value={cnic}
        onChange={(e) => setCnic(e.target.value)}
        required
      />

      {employments.map((emp, index) => (
        <div key={index}>
          <h3>Employment #{index + 1}</h3>

          <input
            type="text"
            placeholder="Job Title"
            value={emp.jobTitle}
            onChange={(e) =>
              handleChange(index, "jobTitle", e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Company Name"
            value={emp.companyName}
            onChange={(e) =>
              handleChange(index, "companyName", e.target.value)
            }
            required
          />

          <label>Job Start Date</label>
          <input
            type="date"
            value={emp.jobStartDate}
            onChange={(e) =>
              handleChange(index, "jobStartDate", e.target.value)
            }
            required
          />

          <label>Currently Working?</label>

          <label style={{ fontWeight: "500" }}>
            <input
              type="radio"
              checked={emp.isJobPresent}
              onChange={() => handleJobPresentChange(index, true)}
              style={{ marginRight: "6px" }}
            />
            Yes
          </label>

          <label style={{ fontWeight: "500" }}>
            <input
              type="radio"
              checked={!emp.isJobPresent}
              onChange={() => handleJobPresentChange(index, false)}
              style={{ marginRight: "6px" }}
            />
            No
          </label>

          {!emp.isJobPresent && (
            <>
              <label>Job End Date</label>
              <input
                type="date"
                value={emp.jobEndDate}
                onChange={(e) =>
                  handleChange(index, "jobEndDate", e.target.value)
                }
              />
            </>
          )}

          <input
            type="number"
            placeholder="Salary"
            value={emp.salary}
            onChange={(e) =>
              handleChange(index, "salary", e.target.value)
            }
          />

          <textarea
            placeholder="Job Responsibilities"
            value={emp.jobResponsibility}
            onChange={(e) =>
              handleChange(index, "jobResponsibility", e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Skills (comma separated)"
            value={emp.skills}
            onChange={(e) =>
              handleChange(index, "skills", e.target.value)
            }
            required
          />
        </div>
      ))}

      <button type="button" onClick={handleAddAnother}>
        + Add Another Employment
      </button>

      <button type="submit">Submit Employment Record</button>
    </form>
  </div>

  <Footer />
</>

  );
}

export default EmploymentForm;
