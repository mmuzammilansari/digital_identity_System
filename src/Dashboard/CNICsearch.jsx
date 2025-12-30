import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Config/Firebase.jsx";
import Nav from "../Dashboard/Navbar";
import Footer from "../Common/Footer";

function CNICSearch() {
  const [cnic, setCnic] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({});
  const [error, setError] = useState("");

  // All collections in DIMS
  const collections = [
    "Address",
    "BankAccounts",
    "Criminal",
    "DrivingLicense",
    "Education",
    "Employee",
    "FinancialRecords",
    "Insurance",
    "Marriage",
    "Medical",
    "Registration",
    "Travel",
    "Vehicle",
  ];

  const handleSearch = async () => {
    if (!cnic) return;
    setLoading(true);
    setResults({});
    setError("");

    try {
      const allResults = {};

      for (const col of collections) {
        // Query CNIC
        const snapshot1 = await getDocs(
          query(collection(db, col), where("cnic", "==", cnic))
        );

        // Query husbandCnic (only relevant for Marriage or similar tables)
        const snapshot2 = await getDocs(
          query(collection(db, col), where("husbandCnic", "==", cnic))
        );

        const data1 = snapshot1.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const data2 = snapshot2.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Merge results and remove duplicates
        const merged = [...data1];
        data2.forEach((doc) => {
          if (!merged.some((d) => d.id === doc.id)) merged.push(doc);
        });

        allResults[col] = merged;
      }

      setResults(allResults);
    } catch (err) {
      console.error(err);
      setError("Error fetching data. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="cnic-search-container" style={{ padding: "20px" }}>
        <h2 style={{ marginBottom: "20px" }}>Search by CNIC / NIC</h2>

        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Enter CNIC"
            value={cnic}
            onChange={(e) => setCnic(e.target.value)}
            style={{ padding: "10px", width: "250px", marginRight: "10px" }}
          />
          <button onClick={handleSearch} style={{ padding: "10px 20px" }}>
            Search
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading &&
          Object.keys(results).map((col) => (
            <div key={col} style={{ marginBottom: "40px" }}>
              <h3>{col}</h3>
              {results[col]?.length ? (
                <table
                  border="1"
                  width="100%"
                  style={{ borderCollapse: "collapse", marginBottom: "20px" }}
                >
                  <thead>
                    <tr>
                      {Object.keys(results[col][0])
                        .filter((k) => k !== "id")
                        .map((key) => (
                          <th
                            key={key}
                            style={{ padding: "8px", backgroundColor: "#f2f2f2" }}
                          >
                            {key}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {results[col].map((doc) => (
                      <tr key={doc.id}>
                        {Object.keys(doc)
                          .filter((k) => k !== "id")
                          .map((key) => (
                            <td key={key} style={{ padding: "8px" }}>
                              {Array.isArray(doc[key])
                                ? doc[key].map((url, idx) => (
                                    <a
                                      key={idx}
                                      href={url}
                                      target="_blank"
                                      rel="noreferrer"
                                      style={{ display: "block" }}
                                    >
                                      {key} {idx + 1}
                                    </a>
                                  ))
                                : doc[key]?.toString() || "-"}
                            </td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No record found in {col}</p>
              )}
            </div>
          ))}
      </div>
      <Footer />
    </>
  );
}

export default CNICSearch;
