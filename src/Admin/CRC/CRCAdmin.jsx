import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Config/Firebase.jsx";

function CRCAdmin() {
  const [applications, setApplications] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const snapshot = await getDocs(collection(db, "ChildRegistrationApplications"));
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
    const docRef = doc(db, "ChildRegistrationApplications", editRow.id);
    await updateDoc(docRef, editedData);
    setEditRow(null);
    fetchApplications();
  };

  const handleDelete = async (row) => {
    await deleteDoc(doc(db, "ChildRegistrationApplications", row.id));
    fetchApplications();
  };

  return (
    <div>
      <h2>Child Registration Applications</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Child Name</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Birth Place</th>
            <th>Parent Name</th>
            <th>Parent CNIC</th>
            <th>Certificate Type</th>
            <th>Processing Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((row) => (
            <tr key={row.id}>
              <td>{row.childFullName}</td>
              <td>{row.childDateOfBirth}</td>
              <td>{row.childGender}</td>
              <td>{row.childBirthPlace}</td>
              <td>{row.parentFullName}</td>
              <td>{row.parentCNICorNICOP}</td>
              <td>{row.birthCertificateType}</td>
              <td>{row.processingType}</td>
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
                <p key={key}><b>{key}:</b> {typeof value === "object" ? JSON.stringify(value) : value}</p>
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
              key !== "id" ? (
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

export default CRCAdmin;

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
