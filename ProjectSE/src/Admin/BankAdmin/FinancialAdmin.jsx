import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../Config/Firebase.jsx";

function FinancialAdmin() {
  const [records, setRecords] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    const snapshot = await getDocs(collection(db, "FinancialRecords"));
    const data = [];
    snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
    setRecords(data);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "FinancialRecords", id));
    setRecords(records.filter((r) => r.id !== id));
  };

  const handleEdit = (data) => {
    setEditId(data.id);
    setEditData(data);
  };

  const handleSave = async () => {
    await updateDoc(doc(db, "FinancialRecords", editId), editData);
    setEditId(null);
    setEditData({});
    fetchRecords();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  return (
    <div>
      <h2>Financial Records</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>CNIC</th>
            <th>Income</th>
            <th>Tax Paid</th>
            <th>Year</th>
            <th>Income Statement</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{editId === r.id ? <input name="cnic" value={editData.cnic} onChange={handleChange} /> : r.cnic}</td>
              <td>{editId === r.id ? <input name="income" value={editData.income} onChange={handleChange} /> : r.income}</td>
              <td>{editId === r.id ? <input name="taxPaid" value={editData.taxPaid} onChange={handleChange} /> : r.taxPaid}</td>
              <td>{editId === r.id ? <input name="year" value={editData.year} onChange={handleChange} /> : r.year}</td>
              <td>
                {r.incomeStatement ? (
                  <a href={r.incomeStatement} target="_blank" rel="noreferrer">
                    View Statement
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td>
                {editId === r.id ? <button onClick={handleSave}>Save</button> : <button onClick={() => handleEdit(r)}>Edit</button>}
                <button onClick={() => handleDelete(r.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FinancialAdmin;
