import React, { useState } from "react";
import submitDataToFirestore from "../../Config/SubmitData";
import { storage } from "../../Config/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Nav from "../../Dashboard/Navbar";

function FinancialRecordForm() {
  const [cnic, setCnic] = useState("");
  const [income, setIncome] = useState("");
  const [taxPaid, setTaxPaid] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let fileUrl = "";

    if (file) {
      const fileRef = ref(storage, `Financial/${cnic}/${file.name}`);
      await uploadBytes(fileRef, file);
      fileUrl = await getDownloadURL(fileRef);
    }

    const data = {
      cnic,
      income: Number(income),
      taxPaid: Number(taxPaid),
      year: Number(year),
      incomeStatement: fileUrl,
      createdAt: new Date(),
    };

    submitDataToFirestore(data, "FinancialRecords");
    alert("Financial record added");

    setCnic("");
    setIncome("");
    setTaxPaid("");
    setYear("");
    setFile(null);
  };

  return (
    <>
    <Nav/>
 <div className="form-container">
  <form className="form-card" onSubmit={handleSubmit}>
    <h2>Add Financial Record</h2>

    <input
      type="text"
      placeholder="CNIC (XXXXX-XXXXXXX-X)"
      value={cnic}
      onChange={(e) => setCnic(e.target.value)}
      required
    />

    <input
      type="number"
      placeholder="Annual Income"
      value={income}
      onChange={(e) => setIncome(e.target.value)}
      required
    />

    <input
      type="number"
      placeholder="Tax Paid"
      value={taxPaid}
      onChange={(e) => setTaxPaid(e.target.value)}
      required
    />

    <input
      type="number"
      placeholder="Financial Year (e.g. 2024)"
      value={year}
      onChange={(e) => setYear(e.target.value)}
      required
    />

    <label
      style={{
        fontSize: "14px",
        fontWeight: "600",
        color: "#374151",
        marginBottom: "6px",
        display: "block",
      }}
    >
      Upload Supporting Document
    </label>

    <input type="file" onChange={handleFileChange} />

    <button type="submit">Add Record</button>
  </form>
</div>

</>
  );
}

export default FinancialRecordForm;
