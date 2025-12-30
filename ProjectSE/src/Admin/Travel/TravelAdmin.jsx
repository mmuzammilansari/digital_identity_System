import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Config/Firebase.jsx"; // Firestore config

function TravelAdmin() {
  const [travelData, setTravelData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    fetchTravel();
  }, []);

  const fetchTravel = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Travel"));
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setTravelData(data);
    } catch (err) {
      console.error("Error fetching travel data:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Travel", id));
      setTravelData(travelData.filter((data) => data.id !== id));
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
      await updateDoc(doc(db, "Travel", editId), editData);
      setEditId(null);
      setEditData({});
      fetchTravel();
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
    <div>
      <h2>Travel Records</h2>
    <div className="">
      
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>CNIC</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Purpose</th>
            <th>Going Abroad</th>
            <th>Passport No</th>
            <th>Visa</th>
            <th>Documents</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {travelData.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>

              <td>
                {editId === data.id ? (
                  <input
                    type="text"
                    name="cnic"
                    value={editData.cnic}
                    onChange={handleInputChange}
                  />
                ) : (
                  data.cnic
                )}
              </td>

              <td>
                {editId === data.id ? (
                  <input
                    type="text"
                    name="destination"
                    value={editData.destination}
                    onChange={handleInputChange}
                  />
                ) : (
                  data.destination
                )}
              </td>

              <td>
                {editId === data.id ? (
                  <input
                    type="date"
                    name="date"
                    value={editData.date}
                    onChange={handleInputChange}
                  />
                ) : (
                  data.date
                )}
              </td>

              <td>
                {editId === data.id ? (
                  <input
                    type="text"
                    name="purpose"
                    value={editData.purpose}
                    onChange={handleInputChange}
                  />
                ) : (
                  data.purpose
                )}
              </td>

              <td>
                {editId === data.id ? (
                  <input
                    type="checkbox"
                    name="goingAbroad"
                    checked={editData.goingAbroad || false}
                    onChange={handleInputChange}
                  />
                ) : data.goingAbroad ? (
                  "Yes"
                ) : (
                  "No"
                )}
              </td>

              <td>
                {editId === data.id && data.goingAbroad ? (
                  <input
                    type="text"
                    name="passportNo"
                    value={editData.passportNo || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  data.passportNo || "-"
                )}
              </td>

              <td>
                {editId === data.id && data.goingAbroad ? (
                  <input
                    type="checkbox"
                    name="visaRequired"
                    checked={editData.visaRequired || false}
                    onChange={handleInputChange}
                  />
                ) : data.visaRequired ? (
                  "Yes"
                ) : data.goingAbroad ? (
                  "No"
                ) : (
                  "-"
                )}
              </td>

              <td>
                {data.documents?.map((doc, idx) => (
                  <div key={idx}>
                    <a href={doc} target="_blank" rel="noreferrer">
                      Doc {idx + 1}
                    </a>
                  </div>
                )) || "-"}
              </td>

              <td>
                {editId === data.id ? (
                  <button onClick={handleSaveEdit}>Save</button>
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

      {/* ===== VIEW MODAL ===== */}
      {showModal && selectedData && (
        <div style={overlay}>
          <div style={modal}>
            <h3>Travel Details</h3>
            <p><b>CNIC:</b> {selectedData.cnic}</p>
            <p><b>Destination:</b> {selectedData.destination}</p>
            <p><b>Date:</b> {selectedData.date}</p>
            <p><b>Purpose:</b> {selectedData.purpose}</p>
            <p><b>Going Abroad:</b> {selectedData.goingAbroad ? "Yes" : "No"}</p>
            {selectedData.goingAbroad && (
              <>
                <p><b>Passport No:</b> {selectedData.passportNo}</p>
                <p><b>Visa Required:</b> {selectedData.visaRequired ? "Yes" : "No"}</p>
              </>
            )}
            <p><b>Documents:</b></p>
            <ul>
              {selectedData.documents?.map((doc, idx) => (
                <li key={idx}>
                  <a href={doc} target="_blank" rel="noreferrer">
                    Document {idx + 1}
                  </a>
                </li>
              ))}
            </ul>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div></div>
  );
}

export default TravelAdmin;

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
  width: 450,
  maxHeight: "80vh",
  overflowY: "auto",
};
