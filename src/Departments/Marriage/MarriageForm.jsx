import React, { useState } from "react";
import "./MarriageForm.css";
import Footer from "../../Common/Footer";
import Nav from "../../Dashboard/Navbar";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Config/Firebase";

function MarriageForm() {
  const [husbandName, setHusbandName] = useState("");
  const [husbandCnic, setHusbandCnic] = useState("");
  const [brideName, setBrideName] = useState("");
  const [brideCnic, setBrideCnic] = useState("");
  const [marriageDate, setMarriageDate] = useState("");
  const [marriageLocation, setMarriageLocation] = useState("");
  const [unionCouncil, setUnionCouncil] = useState("");
  const [witness1Name, setWitness1Name] = useState("");
  const [witness1Cnic, setWitness1Cnic] = useState("");
  const [witness2Name, setWitness2Name] = useState("");
  const [witness2Cnic, setWitness2Cnic] = useState("");

  const cnicPattern = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;

  const formatCnic = (value) => {
    let digits = value.replace(/\D/g, "");
    if (digits.length <= 5) return digits;
    if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12, 13)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !husbandName ||
      !husbandCnic ||
      !brideName ||
      !brideCnic ||
      !marriageDate ||
      !marriageLocation ||
      !unionCouncil ||
      !witness1Name ||
      !witness1Cnic ||
      !witness2Name ||
      !witness2Cnic
    ) {
      alert("Please fill all fields");
      return;
    }

    if (
      !cnicPattern.test(husbandCnic) ||
      !cnicPattern.test(brideCnic) ||
      !cnicPattern.test(witness1Cnic) ||
      !cnicPattern.test(witness2Cnic)
    ) {
      alert("Invalid CNIC format");
      return;
    }

    const marriageData = {
      cnic: husbandCnic, // 🔑 MAIN CNIC
      husbandName,
      husbandCnic,
      brideName,
      brideCnic,
      marriageDate,
      marriageLocation,
      unionCouncil,
      witnesses: [
        { name: witness1Name, cnic: witness1Cnic },
        { name: witness2Name, cnic: witness2Cnic },
      ],
      createdAt: new Date(),
    };

    try {
      // 🔥 CNIC AS DOCUMENT ID
      await setDoc(doc(db, "Marriage", husbandCnic), marriageData);
      alert("Marriage record saved successfully");

      // reset
      setHusbandName("");
      setHusbandCnic("");
      setBrideName("");
      setBrideCnic("");
      setMarriageDate("");
      setMarriageLocation("");
      setUnionCouncil("");
      setWitness1Name("");
      setWitness1Cnic("");
      setWitness2Name("");
      setWitness2Cnic("");
    } catch (err) {
      console.error(err);
      alert("Failed to save marriage record");
    }
  };

  return (
    <>
      <Nav />

      <div className="form-container">
        <form className="form-card" onSubmit={handleSubmit}>
          <h2>Marriage Registration</h2>

          <input
            placeholder="Husband Name"
            value={husbandName}
            onChange={(e) => setHusbandName(e.target.value)}
          />

          <input
            placeholder="Husband CNIC"
            value={husbandCnic}
            onChange={(e) => setHusbandCnic(formatCnic(e.target.value))}
            maxLength={15}
          />

          <input
            placeholder="Bride Name"
            value={brideName}
            onChange={(e) => setBrideName(e.target.value)}
          />

          <input
            placeholder="Bride CNIC"
            value={brideCnic}
            onChange={(e) => setBrideCnic(formatCnic(e.target.value))}
            maxLength={15}
          />

          <input
            type="date"
            value={marriageDate}
            onChange={(e) => setMarriageDate(e.target.value)}
          />

          <input
            placeholder="Marriage Location"
            value={marriageLocation}
            onChange={(e) => setMarriageLocation(e.target.value)}
          />

          <input
            placeholder="Union Council"
            value={unionCouncil}
            onChange={(e) => setUnionCouncil(e.target.value)}
          />

          <h4>Witnesses</h4>

          <input
            placeholder="Witness 1 Name"
            value={witness1Name}
            onChange={(e) => setWitness1Name(e.target.value)}
          />

          <input
            placeholder="Witness 1 CNIC"
            value={witness1Cnic}
            onChange={(e) => setWitness1Cnic(formatCnic(e.target.value))}
            maxLength={15}
          />

          <input
            placeholder="Witness 2 Name"
            value={witness2Name}
            onChange={(e) => setWitness2Name(e.target.value)}
          />

          <input
            placeholder="Witness 2 CNIC"
            value={witness2Cnic}
            onChange={(e) => setWitness2Cnic(formatCnic(e.target.value))}
            maxLength={15}
          />

          <button type="submit">Submit</button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default MarriageForm;
