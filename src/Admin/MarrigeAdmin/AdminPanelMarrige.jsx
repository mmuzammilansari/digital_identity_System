import React, { useState, useEffect } from "react";
import { getDocs, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../Config/Firebase.jsx";

function AdminPanelMarriage() {
  const [marriageData, setMarriageData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [viewData, setViewData] = useState(null); // For popup

  useEffect(() => {
    const fetchMarriageData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Marriage"));
        const data = [];
        querySnapshot.forEach((docSnap) => {
          data.push({ id: docSnap.id, ...docSnap.data() });
        });
        setMarriageData(data);
      } catch (error) {
        console.error("Error fetching marriage data:", error);
      }
    };
    fetchMarriageData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Marriage", id));
      setMarriageData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting marriage data:", error);
    }
  };

  const handleEdit = (data) => {
    setEditId(data.id);
    setEditedData({ ...data });
  };

  const handleChange = (e, field) => {
    setEditedData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, "Marriage", editId), editedData);
      setEditId(null);
      alert("Updated Successfully");
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Marriage Records</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Husband Name</th>
            <th>Husband CNIC</th>
            <th>Bride Name</th>
            <th>Bride CNIC</th>
            <th>Marriage Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {marriageData.map((data) => (
            <tr key={data.id} style={{ borderBottom: "1px solid #ccc" }}>
              <td>{editId === data.id ? <input value={editedData.husbandName} onChange={(e) => handleChange(e, "husbandName")} /> : data.husbandName}</td>
              <td>{editId === data.id ? <input value={editedData.husbandCnic} onChange={(e) => handleChange(e, "husbandCnic")} /> : data.husbandCnic}</td>
              <td>{editId === data.id ? <input value={editedData.brideName} onChange={(e) => handleChange(e, "brideName")} /> : data.brideName}</td>
              <td>{editId === data.id ? <input value={editedData.brideCnic} onChange={(e) => handleChange(e, "brideCnic")} /> : data.brideCnic}</td>
              <td>{editId === data.id ? <input type="date" value={editedData.marriageDate} onChange={(e) => handleChange(e, "marriageDate")} /> : data.marriageDate}</td>
              <td>
                <button onClick={() => setViewData(data)}>View Details</button>
                {editId === data.id ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(data)}>Edit</button>
                    <button onClick={() => handleDelete(data.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Modal */}
      {viewData && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
          onClick={() => setViewData(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "600px",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <h2>Marriage Details</h2>
            <p><strong>Husband Name:</strong> {viewData.husbandName}</p>
            <p><strong>Husband CNIC:</strong> {viewData.husbandCnic}</p>
            <p><strong>Husband Father:</strong> {viewData.husbandFatherName}</p>
            <p><strong>Husband Address:</strong> {viewData.husbandAddress}</p>
            <p><strong>Husband Phone:</strong> {viewData.husbandPhone}</p>

            <p><strong>Bride Name:</strong> {viewData.brideName}</p>
            <p><strong>Bride CNIC:</strong> {viewData.brideCnic}</p>
            <p><strong>Bride Father:</strong> {viewData.brideFatherName}</p>
            <p><strong>Bride Address:</strong> {viewData.brideAddress}</p>
            <p><strong>Bride Phone:</strong> {viewData.bridePhone}</p>

            <p><strong>Marriage Date:</strong> {viewData.marriageDate}</p>
            <p><strong>Marriage Location:</strong> {viewData.marriageLocation}</p>
            <p><strong>Union Council:</strong> {viewData.unionCouncil}</p>

            <p><strong>Witness 1:</strong> {viewData.witness1Name} ({viewData.witness1Cnic})</p>
            <p><strong>Witness 2:</strong> {viewData.witness2Name} ({viewData.witness2Cnic})</p>

            <p>
              <strong>Marriage Certificate:</strong><br />
              {viewData.marriageCertificateURL ? (
                <a href={viewData.marriageCertificateURL} target="_blank" rel="noreferrer">
                  <img src={viewData.marriageCertificateURL} width="200px" alt="certificate" />
                </a>
              ) : "No Certificate"}
            </p>

            <button onClick={() => setViewData(null)} style={{ marginTop: "10px" }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanelMarriage;
