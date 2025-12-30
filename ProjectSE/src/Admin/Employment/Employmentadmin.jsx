import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../Config/Firebase.jsx";

function EmploymentDataTable() {
  const [rows, setRows] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const snapshot = await getDocs(collection(db, "Employee"));
    const tableData = [];

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      data.employments?.forEach((emp, index) => {
        tableData.push({
          docId: docSnap.id,
          empIndex: index,
          cnic: data.cnic,
          ...emp,
        });
      });
    });

    setRows(tableData);
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
    const docRef = doc(db, "Employee", editRow.docId);
    const snapshot = await getDocs(collection(db, "Employee"));

    let employments = [];
    snapshot.forEach((d) => {
      if (d.id === editRow.docId) employments = d.data().employments;
    });

    employments[editRow.empIndex] = {
      ...editedData,
      salary: Number(editedData.salary),
    };

    await updateDoc(docRef, { employments });
    setEditRow(null);
    fetchData();
  };

  const handleDelete = async (row) => {
    const docRef = doc(db, "Employee", row.docId);
    const snapshot = await getDocs(collection(db, "Employee"));

    let employments = [];
    snapshot.forEach((d) => {
      if (d.id === row.docId) employments = d.data().employments;
    });

    employments.splice(row.empIndex, 1);

    employments.length === 0
      ? await deleteDoc(docRef)
      : await updateDoc(docRef, { employments });

    fetchData();
  };

  return (
    <div>
      <h2>Employment Records</h2>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>CNIC</th>
            <th>Job Title</th>
            <th>Company</th>
            <th>Start</th>
            <th>End</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td>{row.cnic}</td>
              <td>{row.jobTitle}</td>
              <td>{row.companyName}</td>
              <td>{row.jobStartDate}</td>
              <td>{row.jobEndDate || "Present"}</td>
              <td>{row.salary}</td>

              <td>
                <button onClick={() => handleView(row)}>View</button>
                <button onClick={() => handleEdit(row)}>Edit</button>
                <button onClick={() => handleDelete(row)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== VIEW POPUP ===== */}
      {showModal && selectedRow && (
        <div style={overlay}>
          <div style={modal}>
            <h3>Employment Details</h3>

            <p><b>CNIC:</b> {selectedRow.cnic}</p>
            <p><b>Job Title:</b> {selectedRow.jobTitle}</p>
            <p><b>Company:</b> {selectedRow.companyName}</p>
            <p><b>Start Date:</b> {selectedRow.jobStartDate}</p>
            <p><b>End Date:</b> {selectedRow.jobEndDate || "Present"}</p>
            <p><b>Salary:</b> {selectedRow.salary}</p>
            <p><b>Responsibilities:</b> {selectedRow.jobResponsibility}</p>
            <p><b>Skills:</b> {selectedRow.skills}</p>

            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* ===== EDIT INLINE ===== */}
      {editRow && (
        <div style={overlay}>
          <div style={modal}>
            <h3>Edit Employment</h3>

            {[
              "jobTitle",
              "companyName",
              "jobStartDate",
              "jobEndDate",
              "salary",
              "jobResponsibility",
              "skills",
            ].map((field) => (
              <input
                key={field}
                value={editedData[field] || ""}
                onChange={(e) => handleChange(e, field)}
                placeholder={field}
                style={{ display: "block", marginBottom: 10 }}
              />
            ))}

            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditRow(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmploymentDataTable;

/* ===== MODAL STYLES ===== */
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
  width: 420,
};
