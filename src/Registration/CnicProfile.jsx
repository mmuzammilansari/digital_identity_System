import React, { useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../Config/Firebase.jsx";
import ApplyVerification from "../Verification/ApplyVerification";
// import "./cnicProfile.css";

function CNICProfile() {
  const [cnic, setCnic] = useState("");
  const [results, setResults] = useState({
    education: [],
    employment: [],
    medical: [],
    insurance: [],
    marriage: [],
    bankAccounts: [],
    criminal: [],
    financial: [],
  });

  const searchCNIC = async () => {
    const cnicValue = cnic.trim();
    if (!cnicValue) return;

    const collections = [
      "education",
      "employment",
      "medical",
      "insurance",
      "marriage",
      "bankAccounts",
      "criminal",
      "financial",
    ];

    let newResults = {};

    for (let col of collections) {
      const q = query(
        collection(db, col),
        where("cnic", "==", cnicValue)
      );

      const snap = await getDocs(q);

      newResults[col] = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
    }

    setResults(newResults);
  };

  const hasAnyData = Object.values(results).some(
    (arr) => arr.length > 0
  );

  return (
    <div className="cnic-container">
      <h1>CNIC Profile Search</h1>

      <div className="search-bar">
        <input
          value={cnic}
          onChange={(e) => setCnic(e.target.value)}
          placeholder="42101-3539876-5"
        />
        <button onClick={searchCNIC}>Search</button>
      </div>

      {/* EDUCATION */}
      {results.education.length > 0 && (
        <section>
          <h2>Education Records</h2>
          <table>
            <thead>
              <tr>
                <th>CNIC</th>
                <th>Degree</th>
                <th>Institute</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {results.education.map((r) => (
                <tr key={r.id}>
                  <td>{r.cnic}</td>
                  <td>{r.degree}</td>
                  <td>{r.instituteName}</td>
                  <td>{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* EMPLOYMENT */}
      {results.employment.length > 0 && (
        <section>
          <h2>Employment Records</h2>
          <table>
            <thead>
              <tr>
                <th>CNIC</th>
                <th>Job Title</th>
                <th>Company</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {results.employment.map((r) => (
                <tr key={r.id}>
                  <td>{r.cnic}</td>
                  <td>{r.jobTitle}</td>
                  <td>{r.company}</td>
                  <td>{r.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* MEDICAL */}
      {results.medical.length > 0 && (
        <section>
          <h2>Medical Records</h2>
          <table>
            <thead>
              <tr>
                <th>CNIC</th>
                <th>Conditions</th>
                <th>Medications</th>
                <th>Allergies</th>
              </tr>
            </thead>
            <tbody>
              {results.medical.map((r) => (
                <tr key={r.id}>
                  <td>{r.cnic}</td>
                  <td>{r.conditions}</td>
                  <td>{r.medications}</td>
                  <td>{r.allergies}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* INSURANCE */}
      {results.insurance.length > 0 && (
        <section>
          <h2>Insurance Records</h2>
          <table>
            <thead>
              <tr>
                <th>CNIC</th>
                <th>Insurance Type</th>
                <th>Company</th>
                <th>Policy No</th>
              </tr>
            </thead>
            <tbody>
              {results.insurance.map((r) => (
                <tr key={r.id}>
                  <td>{r.cnic}</td>
                  <td>{r.insuranceType}</td>
                  <td>{r.company || "-"}</td>
                  <td>{r.policyNo || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* APPLY VERIFICATION */}
      {hasAnyData && (
        <ApplyVerification cnic={cnic} profile={results} />
      )}
    </div>
  );
}

export default CNICProfile;
