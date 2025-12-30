import React, { useState } from "react";
import "./MedicalHistoryForm.css";
import "../Marriage/MarriageForm.css";
import Nav from "../../Dashboard/Navbar";
import Footer from "../../Common/Footer";
import submitDataToFirestore from "../../Config/SubmitData";

function MedicalHistoryForm() {
  const [cnic, setCnic] = useState("");

  const [medicalConditions, setMedicalConditions] = useState("");
  const [medicationsPrescribed, setMedicationsPrescribed] = useState("");

  const [hasAllergies, setHasAllergies] = useState(false);
  const [allergies, setAllergies] = useState("");

  const [hasSurgeries, setHasSurgeries] = useState(false);
  const [surgeryDetails, setSurgeryDetails] = useState("");

  const [hasVaccinations, setHasVaccinations] = useState(false);
  const [vaccinations, setVaccinations] = useState([]);

  const [familyMedicalHistory, setFamilyMedicalHistory] = useState("");

  const validateCNIC = (cnic) =>
    /^\d{5}-\d{7}-\d{1}$/.test(cnic);

  const handleVaccinationChange = (e) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (o) => o.value
    );
    setVaccinations(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateCNIC(cnic)) {
      alert("Invalid CNIC format (xxxxx-xxxxxxx-x)");
      return;
    }

    const MedicalData = {
      cnic,
      conditions: medicalConditions.split(",").map(c => c.trim()),
      medications: medicationsPrescribed.split(",").map(m => m.trim()),
      allergies: {
        hasAllergies,
        details: hasAllergies ? allergies : "None",
      },
      surgeries: {
        hasSurgeries,
        details: hasSurgeries ? surgeryDetails : "None",
      },
      vaccinations: {
        hasVaccinations,
        list: hasVaccinations ? vaccinations : [],
      },
      familyMedicalHistory,
      createdAt: new Date(),
    };

    submitDataToFirestore(MedicalData, "Medical");

    let existingData = JSON.parse(localStorage.getItem("Data")) || {};
    existingData[cnic] = existingData[cnic] || {};
    existingData[cnic].medical = MedicalData;
    localStorage.setItem("Data", JSON.stringify(existingData));

    alert("Medical History Saved Successfully");

    // Reset
    setCnic("");
    setMedicalConditions("");
    setMedicationsPrescribed("");
    setHasAllergies(false);
    setAllergies("");
    setHasSurgeries(false);
    setSurgeryDetails("");
    setHasVaccinations(false);
    setVaccinations([]);
    setFamilyMedicalHistory("");
  };

  return (
    <>
  <Nav />

  <div className="form-container">
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Medical History Form</h2>

      <input
        type="text"
        placeholder="CNIC (42101-1234567-1)"
        value={cnic}
        onChange={(e) => setCnic(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Medical Conditions (e.g., Diabetes, Hypertension)"
        value={medicalConditions}
        onChange={(e) => setMedicalConditions(e.target.value)}
      />

      <input
        type="text"
        placeholder="Medications Prescribed (e.g., Insulin, Panadol)"
        value={medicationsPrescribed}
        onChange={(e) => setMedicationsPrescribed(e.target.value)}
      />

      <label>
        <input
          type="checkbox"
          checked={hasAllergies}
          onChange={(e) => setHasAllergies(e.target.checked)}
        />
        Any Allergies?
      </label>
      {hasAllergies && (
        <textarea
          placeholder="Allergy details"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
        />
      )}

      <label>
        <input
          type="checkbox"
          checked={hasSurgeries}
          onChange={(e) => setHasSurgeries(e.target.checked)}
        />
        Surgeries / Procedures?
      </label>
      {hasSurgeries && (
        <textarea
          placeholder="Surgery details"
          value={surgeryDetails}
          onChange={(e) => setSurgeryDetails(e.target.value)}
        />
      )}

      <label>
        <input
          type="checkbox"
          checked={hasVaccinations}
          onChange={(e) => setHasVaccinations(e.target.checked)}
        />
        Vaccination History?
      </label>
      {hasVaccinations && (
        <select
          multiple
          value={vaccinations}
          onChange={handleVaccinationChange}
        >
          <option value="COVID-19">COVID-19</option>
          <option value="Flu">Flu</option>
          <option value="Hepatitis">Hepatitis</option>
          <option value="MMR">MMR</option>
          <option value="Varicella">Varicella</option>
        </select>
      )}

      <textarea
        placeholder="Family Medical History"
        value={familyMedicalHistory}
        onChange={(e) => setFamilyMedicalHistory(e.target.value)}
        required
      />

      <button type="submit">Submit</button>
    </form>
  </div>

  <Footer />
</>

  );
}

export default MedicalHistoryForm;
