import React, { useEffect, useState } from "react";
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../Config/Firebase";
import "./applyVerification.css";

const MODULES = [
  "education",
  "employment",
  "insurance",
  "marriage",
  "medical",
  "travel",
  "juvenile",
  "frc",
  "crc",
  "address",
  "bankAccounts",
  "financial",
  "vehicle",
  "criminal",
];

function ApplyVerification() {
  const [cnic, setCnic] = useState("");
  const [modules, setModules] = useState(null);
  const [showStatus, setShowStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const storedCnic = localStorage.getItem("cnic");
  if (storedCnic) {
    setCnic(storedCnic);
  }
}, []);
  useEffect(() => {
    if (!cnic || !showStatus) return;

    const ref = doc(db, "verificationRequests", cnic);
    

    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setModules(snap.data().modules || {});
      } else {
        setModules(null);
      }
    });

    return () => unsub();
  }, [cnic, showStatus]);
  

  const applyVerification = async () => {
    if (!cnic) return alert("Enter CNIC");

    setLoading(true);
    const ref = doc(db, "verificationRequests", cnic);
    const existing = await getDoc(ref);

    if (existing.exists()) {
      alert("Already applied");
      setLoading(false);
      return;
    }

    const payload = {};
    MODULES.forEach((m) => (payload[m] = "Pending"));

    await setDoc(ref, {
      cnic,
      modules: payload,
      appliedAt: new Date(),
    });

    alert("Verification applied successfully");
    setLoading(false);
  };

  const checkStatus = async () => {
    if (!cnic) return alert("Enter CNIC");

    setShowStatus(true);

    const snap = await getDoc(doc(db, "verificationRequests", cnic));
    if (!snap.exists()) {
      alert("No verification request found");
      setModules(null);
      return;
    }

    setModules(snap.data().modules || {});
  };

  const normalize = (v) =>
    typeof v === "string" ? v : v?.status || "Pending";

  return (
    <div className="apply-container">
      <h2>Verification Request</h2>

      <input
        type="text"
        placeholder="Enter CNIC"
        value={cnic}
        readOnly
        // onChange={(e) => setCnic(e.target.value)}
      />

      <div className="btn-row">
        <button onClick={applyVerification} disabled={loading}>
          {loading ? "Applying..." : "Apply Verification"}
        </button>

        <button className="status-btn" onClick={checkStatus}>
          Check Status
        </button>
      </div>

      {/* 🔽 STATUS SECTION */}
      {showStatus && (
        <div className="status-section">
          <h3>Verification Status</h3>

          {!modules ? (
            <p className="no-data">No data available</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Module</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(modules).map(([mod, stat]) => {
                  const s = normalize(stat);
                  return (
                    <tr key={mod}>
                      <td>{mod}</td>
                      <td className={s.toLowerCase()}>{s}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default ApplyVerification;
