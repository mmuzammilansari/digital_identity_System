import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Config/Firebase.jsx";

function FRCAdmin() {
  const [applications, setApplications] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const snapshot = await getDocs(collection(db, "FRCApplications"));
    const data = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
    setApplications(data);
  };

  const handleView = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const handleEdit = (row) => {
    setEditRow(row);
    setEditedData(row);
  };

  const handleChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  const handleSave = async () => {
    const docRef = doc(db, "FRCApplications", editRow.id);
    await updateDoc(docRef, editedData);
    setEditRow(null);
    fetchApplications();
  };

  const handleDelete = async (row) => {
    await deleteDoc(doc(db, "FRCApplications", row.id));
    fetchApplications();
  };

  return (
    <div>
      <h2>FRC Applications</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Applicant Name</th>
            <th>Applicant ID</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>FRC Category</th>
            <th>Application Mode</th>
            <th>Members Count</th>
            <th>Processing Fee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((row) => (
            <tr key={row.id}>
              <td>{row.applicantFullName}</td>
              <td>{row.applicant13DigitID}</td>
              <td>{row.applicantMobileNumber}</td>
              <td>{row.applicantEmail}</td>
              <td>{row.frcCategory}</td>
              <td>{row.applicationMode}</td>
              <td>{row.familyMembers?.length || 0}</td>
              <td>{row.processingFee}</td>
              <td>
                <button onClick={() => handleView(row)}>View</button>
                <button onClick={() => handleEdit(row)}>Edit</button>
                <button onClick={() => handleDelete(row)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* VIEW MODAL */}
      {showModal && selectedRow && (
        <div style={overlay}>
          <div style={modal}>
            <h3>Application Details</h3>
            {Object.entries(selectedRow).map(([key, value]) =>
              key !== "id" ? (
                key === "familyMembers" ? (
                  <div key={key}>
                    <b>Family Members:</b>
                    <ul>
                      {value?.map((m, i) => (
                        <li key={i}>{`${m.memberFullName} - ${m.relationship} - ${m.livingStatus}`}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p key={key}><b>{key}:</b> {value}</p>
                )
              ) : null
            )}
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editRow && (
        <div style={overlay}>
          <div style={modal}>
            <h3>Edit Application</h3>
            {Object.keys(editedData).map((key) =>
              key !== "id" && key !== "familyMembers" ? (
                <input
                  key={key}
                  value={editedData[key]}
                  onChange={(e) => handleChange(e, key)}
                  placeholder={key}
                  style={{ display: "block", marginBottom: 10 }}
                />
              ) : null
            )}
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditRow(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FRCAdmin;

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
  padding: 25,
  borderRadius: 10,
  width: 400,
};
