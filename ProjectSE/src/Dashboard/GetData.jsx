import React, { useEffect, useState } from "react";
import { useParams , Link} from "react-router-dom";
import Nav from "./Navbar";
import Footer from "../Common/Footer";
import "./Dashboard.css";

function GetData() {
  const { moduleKey } = useParams();

  const [cnic, setCnic] = useState(null);
  const [moduleData, setModuleData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("cnicData");
    if (!stored) return;

    const data = JSON.parse(stored);

    // 🔹 Extract CNIC (from any available module)
    const foundCnic =
      data?.address?.cnic ||
      data?.education?.cnic ||
      data?.employment?.cnic ||
      data?.financial?.cnic ||
      data?.marriage?.cnic ||
      data?.criminal?.cnic ||
      data?.medical?.cnic ||
      data?.vehicle?.cnic ||
      data?.travel?.cnic ||
      null;

    setCnic(foundCnic);

    // 🔹 Extract selected module data
    setModuleData(data[moduleKey] ?? null);
  }, [moduleKey]);

  return (
    <>
      <Nav />

      <div className="dashboard-container">
        <h1>Citizen Data</h1>
            <Link
  to="/dashboard"
  style={{
    display: "inline-block",
    marginBottom: "20px",
    textDecoration: "none",
    color: "#2563eb",
    fontWeight: "600",
    fontSize: "15px",
    padding: "6px 12px",
    borderRadius: "6px",
    background: "#e0e7ff",
  }}
>
  ← Back to Dashboard
</Link>

        {/* 🔐 CNIC SECTION */}
        {cnic && (
          <div className="cnic-card">
            <strong>CNIC:</strong> {cnic}
          </div>
        )}

        <h2 style={{ marginTop: "30px" }}>
          {moduleKey.toUpperCase()} Details
        </h2>

        {!moduleData ? (
          <p className="no-data">No data available for this module</p>
        ) : (
          <RenderData data={moduleData} />
        )}
      </div>

      <Footer />
    </>
  );
}

export default GetData;

function RenderData({ data }) {
  if (Array.isArray(data)) {
    return data.map((item, index) => (
      <RenderObject key={index} obj={item} />
    ));
  }

  if (typeof data === "object") {
    return <RenderObject obj={data} />;
  }

  return <span>{String(data)}</span>;
}

function RenderObject({ obj }) {
  return (
    <table className="data-table">
      <tbody>
        {Object.entries(obj).map(([key, value]) => (
          <tr key={key}>
            <th>{key}</th>
            <td>{formatValue(value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function formatValue(value) {
  if (value === null || value === undefined) return "—";

  // Firestore timestamp
  if (value?.seconds) {
    return new Date(value.seconds * 1000).toLocaleString();
  }

  // Array
  if (Array.isArray(value)) {
    return (
      <ul>
        {value.map((v, i) => (
          <li key={i}>{formatValue(v)}</li>
        ))}
      </ul>
    );
  }

  // Object
  if (typeof value === "object") {
    return <RenderObject obj={value} />;
  }

  // File / URL
  if (typeof value === "string" && value.startsWith("http")) {
    return (
      <a href={value} target="_blank" rel="noopener noreferrer">
        View File
      </a>
    );
  }

  return String(value);
}

