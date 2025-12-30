import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Config/Firebase.jsx"; // Adjust path

function VehicleAndLicenseAdmin() {
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
      const vehicleSnap = await getDocs(collection(db, "Vehicle"));
      const licenseSnap = await getDocs(collection(db, "DrivingLicense"));

      // Merge Vehicle + License by CNIC
      const vehicleData = [];
      vehicleSnap.forEach((doc) => vehicleData.push({ id: doc.id, ...doc.data() }));

      const licenseData = [];
      licenseSnap.forEach((doc) => licenseData.push({ id: doc.id, ...doc.data() }));

      const merged = vehicleData.map((v) => {
        const license = licenseData.find((l) => l.cnic === v.cnic) || {};
        return { ...v, license };
      });

      setRecords(merged);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id, collectionName) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      fetchRecords();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (record) => {
    setEditId(record.id);
    setEditData(record);
  };

  const handleSave = async () => {
    try {
      // Update Vehicle
      await updateDoc(doc(db, "Vehicle", editData.id), {
        registrationNo: editData.registrationNo,
        vehicleType: editData.vehicleType,
        brand: editData.brand,
        model: editData.model,
        color: editData.color,
        engineNo: editData.engineNo,
        chassisNo: editData.chassisNo,
        registrationDate: editData.registrationDate,
        expiryDate: editData.expiryDate,
        insuranceNo: editData.insuranceNo,
      });

      // Update License if exists
      if (editData.license?.id) {
        await updateDoc(doc(db, "DrivingLicense", editData.license.id), {
          licenseNo: editData.license.licenseNo,
          licenseType: editData.license.licenseType,
          issueDate: editData.license.issueDate,
          expiryDate: editData.license.expiryDate,
          authority: editData.license.authority,
        });
      }

      setEditId(null);
      setEditData({});
      fetchRecords();
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e, field, type = "vehicle") => {
    const { value } = e.target;
    if (type === "vehicle") {
      setEditData({ ...editData, [field]: value });
    } else {
      setEditData({
        ...editData,
        license: { ...editData.license, [field]: value },
      });
    }
  };

  const handleView = (record) => {
    setSelectedData(record);
    setShowModal(true);
  };

  return (
    <div>
      <h2>Vehicle & Driving License Records</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>CNIC</th>
            <th>Vehicle Reg. No</th>
            <th>Vehicle Type</th>
            <th>Brand</th>
            <th>Model</th>
            <th>License No</th>
            <th>License Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.cnic}</td>
              <td>
                {editId === record.id ? (
                  <input
                    type="text"
                    value={editData.registrationNo}
                    onChange={(e) => handleInputChange(e, "registrationNo")}
                  />
                ) : (
                  record.registrationNo
                )}
              </td>
              <td>
                {editId === record.id ? (
                  <input
                    type="text"
                    value={editData.vehicleType}
                    onChange={(e) => handleInputChange(e, "vehicleType")}
                  />
                ) : (
                  record.vehicleType
                )}
              </td>
              <td>
                {editId === record.id ? (
                  <input
                    type="text"
                    value={editData.brand}
                    onChange={(e) => handleInputChange(e, "brand")}
                  />
                ) : (
                  record.brand
                )}
              </td>
              <td>
                {editId === record.id ? (
                  <input
                    type="text"
                    value={editData.model}
                    onChange={(e) => handleInputChange(e, "model")}
                  />
                ) : (
                  record.model
                )}
              </td>
              <td>
                {editId === record.id ? (
                  <input
                    type="text"
                    value={editData.license?.licenseNo || ""}
                    onChange={(e) => handleInputChange(e, "licenseNo", "license")}
                  />
                ) : (
                  record.license?.licenseNo || "-"
                )}
              </td>
              <td>
                {editId === record.id ? (
                  <input
                    type="text"
                    value={editData.license?.licenseType || ""}
                    onChange={(e) => handleInputChange(e, "licenseType", "license")}
                  />
                ) : (
                  record.license?.licenseType || "-"
                )}
              </td>
              <td>
                {editId === record.id ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(record)}>Edit</button>
                    <button
                      onClick={() =>
                        handleDelete(record.id, "Vehicle")
                      }
                    >
                      Delete
                    </button>
                    <button onClick={() => handleView(record)}>View</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Popup */}
      {showModal && selectedData && (
        <div style={overlay}>
          <div style={modal}>
            <h3>Vehicle & Driving License Details</h3>
            <p><b>CNIC:</b> {selectedData.cnic}</p>
            <h4>Vehicle</h4>
            <p><b>Reg. No:</b> {selectedData.registrationNo}</p>
            <p><b>Type:</b> {selectedData.vehicleType}</p>
            <p><b>Brand:</b> {selectedData.brand}</p>
            <p><b>Model:</b> {selectedData.model}</p>
            <p><b>Color:</b> {selectedData.color}</p>
            <p><b>Engine No:</b> {selectedData.engineNo}</p>
            <p><b>Chassis No:</b> {selectedData.chassisNo}</p>
            <p><b>Registration Date:</b> {selectedData.registrationDate}</p>
            <p><b>Expiry Date:</b> {selectedData.expiryDate}</p>
            <p><b>Insurance No:</b> {selectedData.insuranceNo}</p>

            <h4>Driving License</h4>
            {selectedData.license ? (
              <>
                <p><b>License No:</b> {selectedData.license.licenseNo}</p>
                <p><b>Type:</b> {selectedData.license.licenseType}</p>
                <p><b>Issue Date:</b> {selectedData.license.issueDate}</p>
                <p><b>Expiry Date:</b> {selectedData.license.expiryDate}</p>
                <p><b>Authority:</b> {selectedData.license.authority}</p>
              </>
            ) : (
              <p>No license linked</p>
            )}
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VehicleAndLicenseAdmin;

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
  width: 500,
  maxHeight: "80vh",
  overflowY: "auto",
};
