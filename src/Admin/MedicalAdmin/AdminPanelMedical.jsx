import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../Config/Firebase.jsx";

function AdminMedical() {
  const [medicalData, setMedicalData] = useState([]);
  const [editData, setEditData] = useState({});
  const [editId, setEditId] = useState(null);
  const [viewData, setViewData] = useState(null);

  useEffect(() => {
    fetchMedical();
  }, []);

  // Fetch all medical records
  const fetchMedical = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Medical"));
      const data = [];
      snapshot.forEach((docSnap) => {
        data.push({ id: docSnap.id, ...docSnap.data() });
      });
      setMedicalData(data);
    } catch (error) {
      console.error("Error fetching medical data:", error);
    }
  };

  // Edit row
  const handleEdit = (data) => {
    setEditId(data.id);
    setEditData(data);
  };

  // Handle input change
  const handleChange = (e, field) => {
    let value = e.target.value;

    if (field === "vaccinations") {
      value = value.split(",").map((v) => v.trim());
      setEditData((prev) => ({
        ...prev,
        vaccinations: { list: value },
      }));
    } else if (field === "allergies") {
      setEditData((prev) => ({
        ...prev,
        allergies: { details: value },
      }));
    } else if (field === "surgeries") {
      setEditData((prev) => ({
        ...prev,
        surgeries: { details: value },
      }));
    } else if (field === "conditions" || field === "medications") {
      value = value.split(",").map((v) => v.trim());
      setEditData((prev) => ({
        ...prev,
        [field]: value,
      }));
    } else {
      setEditData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  // Save edited data
  const handleSave = async () => {
    try {
      await updateDoc(doc(db, "Medical", editId), editData);
      setEditId(null);
      setEditData({});
      fetchMedical();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Delete record
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Medical", id));
      fetchMedical();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // View record in popup
  const handleView = (data) => {
    setViewData(data);
  };
  const closeView = () => setViewData(null);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Medical Records</h1>
      <table border="1" width="100%" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>CNIC</th>
            <th>Conditions</th>
            <th>Medications</th>
            <th>Allergies</th>
            <th>Surgeries</th>
            <th>Vaccinations</th>
            <th>Family History</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicalData.map((data) => (
            <tr key={data.id}>
              <td>
                {editId === data.id ? (
                  <input
                    value={editData.cnic || ""}
                    onChange={(e) => handleChange(e, "cnic")}
                  />
                ) : (
                  data.cnic || ""
                )}
              </td>
              <td>
                {editId === data.id ? (
                  <input
                    value={(editData.conditions || []).join(", ")}
                    onChange={(e) => handleChange(e, "conditions")}
                  />
                ) : (
                  (data.conditions || []).join(", ")
                )}
              </td>
              <td>
                {editId === data.id ? (
                  <input
                    value={(editData.medications || []).join(", ")}
                    onChange={(e) => handleChange(e, "medications")}
                  />
                ) : (
                  (data.medications || []).join(", ")
                )}
              </td>
              <td>
                {editId === data.id ? (
                  <input
                    value={editData.allergies?.details || ""}
                    onChange={(e) => handleChange(e, "allergies")}
                  />
                ) : (
                  data.allergies?.details || ""
                )}
              </td>
              <td>
                {editId === data.id ? (
                  <input
                    value={editData.surgeries?.details || ""}
                    onChange={(e) => handleChange(e, "surgeries")}
                  />
                ) : (
                  data.surgeries?.details || ""
                )}
              </td>
              <td>
                {editId === data.id ? (
                  <input
                    value={(editData.vaccinations?.list || []).join(", ")}
                    onChange={(e) => handleChange(e, "vaccinations")}
                  />
                ) : (
                  (data.vaccinations?.list || []).join(", ")
                )}
              </td>
              <td>
                {editId === data.id ? (
                  <input
                    value={editData.familyMedicalHistory || ""}
                    onChange={(e) => handleChange(e, "familyMedicalHistory")}
                  />
                ) : (
                  data.familyMedicalHistory || ""
                )}
              </td>
              <td>
                {editId === data.id ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(data)}>Edit</button>
                    <button onClick={() => handleDelete(data.id)}>Delete</button>
                    <button onClick={() => handleView(data)}>View</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== VIEW POPUP ===== */}
      {viewData && (
        <div style={overlay}>
          <div style={modal}>
            <h2>Medical Details</h2>
            <p><b>CNIC:</b> {viewData.cnic}</p>
            <p><b>Conditions:</b> {(viewData.conditions || []).join(", ")}</p>
            <p><b>Medications:</b> {(viewData.medications || []).join(", ")}</p>
            <p><b>Allergies:</b> {viewData.allergies?.details || "None"}</p>
            <p><b>Surgeries:</b> {viewData.surgeries?.details || "None"}</p>
            <p><b>Vaccinations:</b> {(viewData.vaccinations?.list || []).join(", ")}</p>
            <p><b>Family History:</b> {viewData.familyMedicalHistory || "None"}</p>
            <button onClick={closeView}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminMedical;

// Popup styling
const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modal = {
  background: "#fff",
  padding: 20,
  borderRadius: 10,
  width: 400,
};
