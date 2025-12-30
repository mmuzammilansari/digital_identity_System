import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Config/Firebase.jsx";

function AdminAddress() {
  const [addressData, setAddressData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Address"));
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setAddressData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Address", id));
      setAddressData(addressData.filter((data) => data.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (data) => {
    setEditId(data.id);
    setEditData(data);
  };

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, "Address", editId), editData);
      setEditId(null);
      setEditData({});
      fetchAddresses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  return (
    <div >
      <h2>Address Verification Records</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>CNIC</th>
            <th>Permanent Address</th>
            <th>Current Address</th>
            <th>Proof Documents</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {addressData.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>

              <td>
                {editId === data.id ? (
                  <input
                    type="text"
                    name="cnic"
                    value={editData.cnic}
                    onChange={handleChange}
                  />
                ) : (
                  data.cnic
                )}
              </td>

              <td>
                {editId === data.id ? (
                  <textarea
                    name="permanentAddress"
                    value={editData.permanentAddress}
                    onChange={handleChange}
                  />
                ) : (
                  data.permanentAddress
                )}
              </td>

              <td>
                {editId === data.id ? (
                  <textarea
                    name="currentAddress"
                    value={editData.currentAddress}
                    onChange={handleChange}
                  />
                ) : (
                  data.currentAddress
                )}
              </td>

              <td>
                {data.proofDocuments?.map((doc, idx) => (
                  <div key={idx}>
                    <a href={doc} target="_blank" rel="noreferrer">
                      Doc {idx + 1}
                    </a>
                  </div>
                )) || "-"}
              </td>

              <td>
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
    </div>
  );
}

export default AdminAddress;
