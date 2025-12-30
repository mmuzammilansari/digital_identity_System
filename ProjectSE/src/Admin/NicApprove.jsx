import React, { useEffect, useState } from "react";
import { db } from "../Config/Firebase";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function NicApprove() {
  const [nicData, setNicData] = useState([]);

  // Fetch all NIC registrations
  const fetchData = async () => {
    const colRef = collection(db, "nicRegistrations");
    const snapshot = await getDocs(colRef);

    const data = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    setNicData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ---------- APPROVE ----------
  const handleApprove = async (id) => {
    const docRef = doc(db, "nicRegistrations", id);
    await updateDoc(docRef, { status: "approved" });
    alert("Status updated to Approved");
    fetchData();
  };

  // ---------- REJECT ----------
  const handleReject = async (id) => {
    const docRef = doc(db, "nicRegistrations", id);
    await updateDoc(docRef, { status: "rejected" });
    alert("Status updated to Rejected");
    fetchData();
  };

  // ---------- DELETE ----------
  const handleDelete = async (id) => {
    const docRef = doc(db, "nicRegistrations", id);
    await deleteDoc(docRef);
    alert("Data Deleted");
    fetchData();
  };

  return (
    <div>
      <h2>NIC Registrations</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Father Name</th>
            <th>Father NIC No.</th>
            <th>Mother Name</th>
            <th>Mother NIC No.</th>
            <th>Date Of Birth</th>
            <th>Address</th>
            <th>Permanent Address</th>
            <th>Generated NIC</th>
            <th>Age</th>
            <th>Password</th>
            <th>Photo</th>
            <th>Birth Certificate</th>
            <th>Father's NIC Image</th>
            <th>B Form</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {nicData.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.name}</td>
              <td>{entry.fatherName}</td>
              <td>{entry.fatherNIC}</td>
              <td>{entry.motherName}</td>
              <td>{entry.motherNIC}</td>
              <td>{entry.dob}</td>
              <td>{entry.address}</td>
              <td>{entry.permanentAddress}</td>
              <td>{entry.generatedNIC}</td>
              <td>{entry.age}</td>
              <td>{entry.statusPassword}</td>

              {/* Image Display */}
              <td>
                <img
                  src={entry.photo}
                  style={{ width: "100px", borderRadius: "8px" }}
                />
              </td>

              <td>
                <img
                  src={entry.birthCertificate}
                  style={{ width: "100px", borderRadius: "8px" }}
                />
              </td>

              <td>
                <img
                  src={entry.fathersNic}
                  style={{ width: "100px", borderRadius: "8px" }}
                />
              </td>

              <td>
                <img
                  src={entry.bForm}
                  style={{ width: "100px", borderRadius: "8px" }}
                />
              </td>

              <td>
                <button onClick={() => handleApprove(entry.id)}>Approve</button>
                <button onClick={() => handleReject(entry.id)}>Reject</button>
                <button onClick={() => handleDelete(entry.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NicApprove;
