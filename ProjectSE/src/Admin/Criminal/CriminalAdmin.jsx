import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Config/Firebase.jsx";

function CriminalAdmin() {
  const [records, setRecords] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Criminal"));
      const data = [];
      snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
      setRecords(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Criminal", id));
      setRecords(records.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (data) => {
    setEditId(data.id);
    setEditData(data);
  };

  const handleSaveEdit = async () => {
    try {
      await updateDoc(doc(db, "Criminal", editId), editData);
      setEditId(null);
      setEditData({});
      fetchRecords();
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData({
      ...editData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleView = (data) => {
    setSelectedData(data);
    setShowModal(true);
  };

  return (
    <div >
      <h2>Criminal / Legal Records</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>CNIC</th>
            <th>Full Name</th>
            <th>No Record</th>
            <th>Case Type</th>
            <th>Case Number</th>
            <th>Case Status</th>
            <th>Court Name</th>
            <th>Date Filing</th>
            <th>Date Resolution</th>
            <th>Remarks</th>
            <th>Documents</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.cnic}</td>
              <td>{r.fullName}</td>
              <td>{r.noCriminalRecord ? "No Record" : "Has Record"}</td>
              <td>{r.caseType || "-"}</td>
              <td>{r.caseNumber || "-"}</td>
              <td>{r.caseStatus || "-"}</td>
              <td>{r.courtName || "-"}</td>
              <td>{r.dateOfFiling || "-"}</td>
              <td>{r.dateOfResolution || "-"}</td>
              <td>{r.remarks || "-"}</td>
              <td>
                {r.documents?.length
                  ? r.documents.map((doc, idx) => (
                      <div key={idx}>
                        <a href={doc} target="_blank" rel="noreferrer">
                          Doc {idx + 1}
                        </a>
                      </div>
                    ))
                  : "-"}
              </td>
              <td>
                <button onClick={() => handleEdit(r)}>Edit</button>
                <button onClick={() => handleDelete(r.id)}>Delete</button>
                <button onClick={() => handleView(r)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedData && (
        <div style={overlay}>
          <div style={modal}>
            <h3>Criminal / Legal Record</h3>
            <p><b>CNIC:</b> {selectedData.cnic}</p>
            <p><b>Full Name:</b> {selectedData.fullName}</p>
            <p><b>No Record:</b> {selectedData.noCriminalRecord ? "Yes" : "No"}</p>
            {!selectedData.noCriminalRecord && (
              <>
                <p><b>Case Type:</b> {selectedData.caseType}</p>
                <p><b>Case Number:</b> {selectedData.caseNumber}</p>
                <p><b>Case Status:</b> {selectedData.caseStatus}</p>
                <p><b>Court Name:</b> {selectedData.courtName}</p>
                <p><b>Date of Filing:</b> {selectedData.dateOfFiling}</p>
                <p><b>Date of Resolution:</b> {selectedData.dateOfResolution || "-"}</p>
                <p><b>Remarks:</b> {selectedData.remarks || "-"}</p>
                <p><b>Documents:</b></p>
                <ul>
                  {selectedData.documents?.map((doc, idx) => (
                    <li key={idx}><a href={doc} target="_blank" rel="noreferrer">Document {idx+1}</a></li>
                  ))}
                </ul>
              </>
            )}
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CriminalAdmin;

// const overlay = {
//   position: "fixed",
//   inset: 0,
//   background: "rgba(0,0,0,0.6)",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   zIndex: 999,
// };

// const modal = {
//   background: "#fff",
//   padding: 25,
//   borderRadius: 10,
//   width: 500,
//   maxHeight: "80vh",
//   overflowY: "auto",
// };
