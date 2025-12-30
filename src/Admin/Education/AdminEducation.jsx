import React, { useState, useEffect } from "react";
import { db } from "../../Config/Firebase.jsx";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

function AdminEducation() {
  const [educationData, setEducationData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const initialState = {
    id: "",
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
    verificationStatus: "Pending",
    updatedAt: null,
  };

  const [editedData, setEditedData] = useState(initialState);

  useEffect(() => {
    const fetchEducationData = async () => {
      const snapshot = await getDocs(collection(db, "Education"));
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setEducationData(list);
    };
    fetchEducationData();
  }, []);

  const openPopup = (item) => {
    setSelectedData(item);
    setEditedData({ ...initialState, ...item });
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedData(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const payload = { ...editedData, updatedAt: serverTimestamp() };
    await updateDoc(doc(db, "Education", editedData.id), payload);
    setEducationData((prev) =>
      prev.map((item) => (item.id === editedData.id ? payload : item))
    );
    closePopup();
  };

  const handleVerify = async (status) => {
    await updateDoc(doc(db, "Education", editedData.id), {
      verificationStatus: status,
      updatedAt: serverTimestamp(),
    });
    setEducationData((prev) =>
      prev.map((item) =>
        item.id === editedData.id
          ? { ...item, verificationStatus: status }
          : item
      )
    );
    closePopup();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "Education", id));
    setEducationData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="admin-education">
      <h1>Education Verification</h1>

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>CNIC</th>
            <th>Degree</th>
            <th>Institute</th>
            <th>Status</th>
            <th>Verification</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {educationData.map((item) => (
            <tr key={item.id}>
              <td>{item.cnic}</td>
              <td>{item.degreeName}</td>
              <td>{item.instituteName}</td>
              <td>{item.status}</td>
              <td>{item.verificationStatus}</td>
              <td>
                <button onClick={() => openPopup(item)}>View</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isPopupOpen && (
       <div
  className="popup-overlay"
  style={{
    backgroundColor: "rgba(0,0,0,0.4)",
    position: "fixed",
    inset: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }}
>

          <div
  className="popup"
  style={{
    backgroundColor: "white",
    width: "800px",
    maxHeight: "80vh",
    padding: "20px",
    borderRadius: "8px",
    overflowY: "auto"
  }}
>


            <h2 style={{ gridColumn: "1 / -1" }}>Edit & Verify Education</h2>

            {Object.keys(initialState).map(
  (key) =>
    key !== "id" &&
    key !== "verificationStatus" && (
      <div key={key}>
        <label style={{ fontSize: "15px", fontWeight: 500 }}>
          {key}
        </label>
        <input
          type={key.includes("Date") ? "date" : "text"}
          name={key}
          value={editedData[key] || ""}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "6px",
            marginTop: "4px",
            fontSize: "14px"
          }}
        />
      </div>
    )
)}



            <div
  style={{
    gridColumn: "1 / -1",
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px"
  }}
>
  <button onClick={handleSave}>Save</button>
  <button onClick={() => handleVerify("Verified")}>Verify</button>
  <button onClick={() => handleVerify("Rejected")}>Reject</button>
  <button onClick={closePopup}>Close</button>
</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminEducation;
