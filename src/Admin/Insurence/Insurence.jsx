import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Config/Firebase.jsx";
import "./Insurance.css"

const COLLECTION = "Insurance"; 

function AdminInsuranceData() {
  const [insuranceData, setInsuranceData] = useState([]);
  const [viewData, setViewData] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [editId, setEditId] = useState(null);

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchInsuranceData = async () => {
      try {
        const snapshot = await getDocs(collection(db, COLLECTION));
        const list = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setInsuranceData(list);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchInsuranceData();
  }, []);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteDoc(doc(db, COLLECTION, id));
      setInsuranceData((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ================= VIEW =================
  const handleView = (data) => {
    setViewData(data);
    setEditedData({ ...data });
    setEditId(data.id);
  };

  // ================= CHANGE =================
  const handleChange = (key, value) => {
    setEditedData((prev) => ({ ...prev, [key]: value }));
  };

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      const { id, ...dataToUpdate } = editedData; // ❗ remove id
      await updateDoc(doc(db, COLLECTION, editId), dataToUpdate);

      setInsuranceData((prev) =>
        prev.map((item) =>
          item.id === editId ? { id: editId, ...dataToUpdate } : item
        )
      );

      closePopup();
      alert("Updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const closePopup = () => {
    setViewData(null);
    setEditId(null);
    setEditedData({});
  };

  // ================= UI =================
  return (
    <div style={{ padding: "20px" }}>
      <h1>Insurance Data</h1>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>CNIC</th>
            <th>Full Name</th>
            <th>Insurance Type</th>
            <th>Company</th>
            <th>Policy No</th>
            <th>Premium</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {insuranceData.length === 0 && (
            <tr>
              <td colSpan="7" align="center">
                No data found
              </td>
            </tr>
          )}

          {insuranceData.map((d) => (
            <tr key={d.id}>
              <td>{d.cnic}</td>
              <td>{d.fullName}</td>
              <td>{d.insuranceType}</td>
              <td>{d.insuranceCompany}</td>
              <td>{d.policyNumber}</td>
              <td>{d.premiumAmount}</td>
              <td>
                <button onClick={() => handleView(d)}>View</button>{" "}
                <button onClick={() => handleDelete(d.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= POPUP ================= */}
      {viewData && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Edit Insurance Record</h2>

            {Object.keys(viewData).map((key) =>
              key !== "id" ? (
                <div key={key} className="field">
                  <label>{key}</label>
                  <input
                    type="text"
                    value={editedData[key] ?? ""}
                    onChange={(e) =>
                      handleChange(key, e.target.value)
                    }
                  />
                </div>
              ) : null
            )}

            <br />
            <button onClick={handleSave}>Save</button>{" "}
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminInsuranceData;
