import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../Config/Firebase";
import "./adminVerification.css";

function AdminVerification() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "verificationRequests"),
      (snap) => {
        setRequests(
          snap.docs.map((d) => ({ id: d.id, ...d.data() }))
        );
      }
    );
    return () => unsub();
  }, []);

  const normalize = (v) =>
    typeof v === "string" ? v : v?.status || "Pending";

  const updateStatus = async (cnic, module, status) => {
    await updateDoc(doc(db, "verificationRequests", cnic), {
      [`modules.${module}`]: status,
    });
  };

  return (
    <div className="admin-verify-container">
      <h2 className="admin-title">Admin Verification Panel</h2>

      {requests.map((req) => (
        <div key={req.cnic} className="verify-card">
          <h3 className="cnic-heading">
            CNIC: <span>{req.cnic}</span>
          </h3>

          <table className="verify-table">
            <thead>
              <tr>
                <th>Module</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {Object.entries(req.modules || {}).map(([mod, raw]) => {
                const stat = normalize(raw);

                return (
                  <tr key={mod}>
                    <td className="module-name">{mod}</td>

                    <td>
                      <span className={`status-badge ${stat.toLowerCase()}`}>
                        {stat}
                      </span>
                    </td>

                    <td>
                      <div className="action-links">
                        <button
                          className="action-link approve"
                          onClick={() =>
                            updateStatus(req.cnic, mod, "Verified")
                          }
                        >
                          ✔ Approve
                        </button>

                        <button
                          className="action-link reject"
                          onClick={() =>
                            updateStatus(req.cnic, mod, "Rejected")
                          }
                        >
                          ✖ Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default AdminVerification;
