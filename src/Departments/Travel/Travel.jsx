import React, { useState } from "react";
import Nav from "../../Dashboard/Navbar";
import Footer from "../../Common/Footer";
import submitDataToFirestore from "../../Config/SubmitData";
import { storage } from "../../Config/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function TravelForm() {
  const [cnic, setCnic] = useState("");
  const [passportNo, setPassportNo] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [goingAbroad, setGoingAbroad] = useState(false);
  const [visaRequired, setVisaRequired] = useState(false);
  const [files, setFiles] = useState([]);

  // CNIC validation
  const validateCNIC = (cnic) => /^\d{5}-\d{7}-\d{1}$/.test(cnic);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const uploadFiles = async () => {
    const urls = [];
    for (const file of files) {
      const fileRef = ref(storage, `Travel/${cnic}/${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      urls.push(url);
    }
    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCNIC(cnic)) {
      alert("Invalid CNIC format: xxxxx-xxxxxxx-x");
      return;
    }

    try {
      const uploadedUrls = await uploadFiles();

      const travelData = {
        cnic,
        passportNo: goingAbroad ? passportNo : "",
        destination,
        date,
        purpose,
        goingAbroad,
        visaRequired: goingAbroad ? visaRequired : false,
        documents: uploadedUrls,
        createdAt: new Date(),
      };

      // Submit to Firestore
      submitDataToFirestore(travelData, "Travel");

      // LocalStorage sync
      let existingData = JSON.parse(localStorage.getItem("Data")) || {};
      if (!existingData[cnic]) existingData[cnic] = { TravelData: [] };
      else if (!Array.isArray(existingData[cnic].TravelData))
        existingData[cnic].TravelData = [];
      existingData[cnic].TravelData.push(travelData);
      localStorage.setItem("Data", JSON.stringify(existingData));

      // Reset form
      setCnic("");
      setPassportNo("");
      setDestination("");
      setDate("");
      setPurpose("");
      setGoingAbroad(false);
      setVisaRequired(false);
      setFiles([]);

      alert("Travel data submitted successfully ✅");
    } catch (err) {
      console.error("Error submitting travel data:", err);
      alert("Submission failed, check console for errors.");
    }
  };

  return (
  <>
  <Nav />

  <div className="form-container">
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Travel Details</h2>

      <input
        type="text"
        placeholder="CNIC (xxxxx-xxxxxxx-x)"
        value={cnic}
        onChange={(e) => setCnic(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
      />

      <label>Travel Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <textarea
        placeholder="Purpose of Travel"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
        required
      />

      <label>
        <input
          type="checkbox"
          checked={goingAbroad}
          onChange={(e) => setGoingAbroad(e.target.checked)}
        />
        Going Abroad?
      </label>

      {goingAbroad && (
        <>
          <input
            type="text"
            placeholder="Passport Number"
            value={passportNo}
            onChange={(e) => setPassportNo(e.target.value)}
            required
          />
          <label>
            <input
              type="checkbox"
              checked={visaRequired}
              onChange={(e) => setVisaRequired(e.target.checked)}
            />
            Visa Required
          </label>
        </>
      )}
      <br />
      <label>Upload Travel Documents (PDF/JPG/PNG)</label>
      <input type="file" multiple onChange={handleFileChange} />

      <button type="submit">Submit Application</button>
    </form>
  </div>

  <Footer />
</>

  );
}

export default TravelForm;
