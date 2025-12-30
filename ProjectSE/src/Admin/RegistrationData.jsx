import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Config/Firebase";

function RegistrationData() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Registration"));
        const data = querySnapshot.docs.map((docSnap) => ({
          cnic: docSnap.id,        // 👈 CNIC = document ID
          ...docSnap.data(),
        }));
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (cnic) => {
    try {
      await deleteDoc(doc(db, "Registration", cnic));
      setUserData((prev) =>
        prev.filter((user) => user.cnic !== cnic)
      );
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div>
      <h1>User Registration Data</h1>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>CNIC</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {userData.map((user) => (
            <tr key={user.cnic}>
              <td>{user.cnic}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              
              <td>
                {/* Edit logic baad mein */}
                <button onClick={() => handleDelete(user.cnic)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RegistrationData;
