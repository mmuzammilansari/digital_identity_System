import React, { useState } from "react";
import Nav from "../../Dashboard/Navbar";
import Footer from "../../Common/Footer";
import submitDataToFirestore from "../../Config/SubmitData";
import { storage } from "../../Config/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../style.css";

function AddressForm() {
  const [cnic, setCnic] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [proofFiles, setProofFiles] = useState([]);

  const handleFileChange = (e) => {
    setProofFiles(Array.from(e.target.files));
  };

  const uploadFiles = async () => {
    const urls = [];
    for (const file of proofFiles) {
      const fileRef = ref(storage, `Address/${cnic}/${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      urls.push(url);
    }
    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadedUrls = await uploadFiles();

      const addressData = {
        cnic,
        permanentAddress,
        currentAddress,
        proofDocuments: uploadedUrls,
        createdAt: new Date(),
      };

      submitDataToFirestore(addressData, "Address");

      // Optional: LocalStorage sync
      let existingData = JSON.parse(localStorage.getItem("Data")) || {};
      if (!existingData[cnic]) existingData[cnic] = {};
      existingData[cnic].AddressData = addressData;
      localStorage.setItem("Data", JSON.stringify(existingData));

      // Reset form
      setCnic("");
      setPermanentAddress("");
      setCurrentAddress("");
      setProofFiles([]);

      alert("Address submitted successfully ");
    } catch (err) {
      console.error("Error submitting address:", err);
      alert("Submission failed, check console for errors.");
    }
  };

  return (
    <>
  <Nav />
  <div className="form-container">
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Address / Residence Verification</h2>
      <input
        type="text"
        placeholder="CNIC (xxxxx-xxxxxxx-x)"
        value={cnic}
        onChange={(e) => setCnic(e.target.value)}
        required
      />
      <textarea
        placeholder="Permanent Address"
        value={permanentAddress}
        onChange={(e) => setPermanentAddress(e.target.value)}
        required
      ></textarea>
      <textarea
        placeholder="Current Address"
        value={currentAddress}
        onChange={(e) => setCurrentAddress(e.target.value)}
        required
      ></textarea>

      <label>Upload Proof of Residence (PDF/JPG/PNG)</label>
      <input type="file" multiple onChange={handleFileChange} />

      <button type="submit">Submit</button>
    </form>
  </div>
  <Footer />
</>

  );
}

export default AddressForm;
