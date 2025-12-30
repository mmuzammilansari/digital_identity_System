import React, { useState } from "react";
import Nav from "../../Dashboard/Navbar";
import Footer from "../../Common/Footer";
import submitDataToFirestore from "../../Config/SubmitData";
import { storage } from "../../Config/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function CriminalForm() {
  const [cnic, setCnic] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [noCriminalRecord, setNoCriminalRecord] = useState(false);
  const [policeVerified, setPoliceVerified] = useState(false);
  const [caseType, setCaseType] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [caseStatus, setCaseStatus] = useState("Pending");
  const [courtName, setCourtName] = useState("");
  const [dateOfFiling, setDateOfFiling] = useState("");
  const [dateOfResolution, setDateOfResolution] = useState("");
  const [courtRecords, setCourtRecords] = useState("");
  const [remarks, setRemarks] = useState("");
  const [documents, setDocuments] = useState([]);

  const handleFileChange = (e) => {
    setDocuments(Array.from(e.target.files));
  };

  const uploadFiles = async () => {
    const urls = [];
    for (const file of documents) {
      const fileRef = ref(storage, `Criminal/${cnic}/${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      urls.push(url);
    }
    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadedUrls = noCriminalRecord ? [] : await uploadFiles();

      const record = {
        cnic,
        fullName,
        dob,
        noCriminalRecord,
        policeVerified: noCriminalRecord ? false : policeVerified,
        caseType: noCriminalRecord ? "" : caseType,
        caseNumber: noCriminalRecord ? "" : caseNumber,
        caseStatus: noCriminalRecord ? "" : caseStatus,
        courtName: noCriminalRecord ? "" : courtName,
        dateOfFiling: noCriminalRecord ? "" : dateOfFiling,
        dateOfResolution: noCriminalRecord ? "" : dateOfResolution,
        courtRecords: noCriminalRecord ? "" : courtRecords,
        remarks: noCriminalRecord ? "" : remarks,
        documents: uploadedUrls,
        createdAt: new Date(),
      };

      submitDataToFirestore(record, "Criminal");

      // Reset form
      setCnic("");
      setFullName("");
      setDob("");
      setNoCriminalRecord(false);
      setPoliceVerified(false);
      setCaseType("");
      setCaseNumber("");
      setCaseStatus("Pending");
      setCourtName("");
      setDateOfFiling("");
      setDateOfResolution("");
      setCourtRecords("");
      setRemarks("");
      setDocuments([]);

      alert("Criminal record submitted successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Submission failed. Check console for errors.");
    }
  };

  return (
  <>
    <Nav />

    <div className="form-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Criminal / Legal Records</h2>

        <input
          type="text"
          placeholder="CNIC (XXXXX-XXXXXXX-X)"
          value={cnic}
          onChange={(e) => setCnic(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <label>Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />

        <label style={{ fontWeight: "600" }}>
          <input
            type="checkbox"
            checked={noCriminalRecord}
            onChange={(e) => setNoCriminalRecord(e.target.checked)}
            style={{ marginRight: "8px" }}
          />
          No Criminal / Legal Record
        </label>

        {!noCriminalRecord && (
          <>
            <label style={{ fontWeight: "600" }}>
              <input
                type="checkbox"
                checked={policeVerified}
                onChange={(e) => setPoliceVerified(e.target.checked)}
                style={{ marginRight: "8px" }}
              />
              Police Verified
            </label>

            <select
              value={caseType}
              onChange={(e) => setCaseType(e.target.value)}
              required
            >
              <option value="">Select Case Type</option>
              <option value="Civil">Civil</option>
              <option value="Criminal">Criminal</option>
              <option value="Traffic">Traffic</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="text"
              placeholder="Case Number"
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value)}
              required
            />

            <label>Case Status</label>
            <select
              value={caseStatus}
              onChange={(e) => setCaseStatus(e.target.value)}
              required
            >
              <option value="Pending">Pending</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Resolved">Resolved</option>
            </select>

            <input
              type="text"
              placeholder="Court Name / Jurisdiction"
              value={courtName}
              onChange={(e) => setCourtName(e.target.value)}
              required
            />

            <label>Date of Filing</label>
            <input
              type="date"
              value={dateOfFiling}
              onChange={(e) => setDateOfFiling(e.target.value)}
              required
            />

            <label>Date of Resolution</label>
            <input
              type="date"
              value={dateOfResolution}
              onChange={(e) => setDateOfResolution(e.target.value)}
            />

            <textarea
              placeholder="Court Records / Case Details"
              value={courtRecords}
              onChange={(e) => setCourtRecords(e.target.value)}
              required
            />

            <textarea
              placeholder="Remarks / Notes (Optional)"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />

            <label>Upload Supporting Documents (PDF / JPG / PNG)</label>
            <input type="file" multiple onChange={handleFileChange} />
          </>
        )}

        <button type="submit">Submit Record</button>
      </form>
    </div>

    <Footer />
  </>
);
}

export default CriminalForm;
