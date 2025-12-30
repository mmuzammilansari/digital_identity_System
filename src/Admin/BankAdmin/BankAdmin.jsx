import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../Config/Firebase.jsx";

function BankAdmin() {
  const [bankData, setBankData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchBankData();
  }, []);

  const fetchBankData = async () => {
    const snapshot = await getDocs(collection(db, "BankAccounts"));
    const data = [];
    snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
    setBankData(data);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "BankAccounts", id));
    setBankData(bankData.filter((d) => d.id !== id));
  };

  const handleEdit = (data) => {
    setEditId(data.id);
    setEditData(data);
  };

  const handleSave = async () => {
    await updateDoc(doc(db, "BankAccounts", editId), editData);
    setEditId(null);
    setEditData({});
    fetchBankData();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  return (
    <div>
      <h2>Bank Accounts</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>CNIC</th>
            <th>Account No</th>
            <th>Bank Name</th>
            <th>Branch</th>
            <th>Account Type</th>
            <th>Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bankData.map((d) => (
            <tr key={d.id}>
              <td>{editId === d.id ? <input name="cnic" value={editData.cnic} onChange={handleChange} /> : d.cnic}</td>
              <td>{editId === d.id ? <input name="accountNumber" value={editData.accountNumber} onChange={handleChange} /> : d.accountNumber}</td>
              <td>{editId === d.id ? <input name="bankName" value={editData.bankName} onChange={handleChange} /> : d.bankName}</td>
              <td>{editId === d.id ? <input name="branch" value={editData.branch} onChange={handleChange} /> : d.branch}</td>
              <td>{editId === d.id ? <input name="accountType" value={editData.accountType} onChange={handleChange} /> : d.accountType}</td>
              <td>{editId === d.id ? <input name="balance" value={editData.balance} onChange={handleChange} /> : d.balance}</td>
              <td>
                {editId === d.id ? <button onClick={handleSave}>Save</button> : <button onClick={() => handleEdit(d)}>Edit</button>}
                <button onClick={() => handleDelete(d.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BankAdmin;
