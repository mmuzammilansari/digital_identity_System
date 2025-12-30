import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Config/Firebase.jsx";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Nav from "../../Dashboard/Navbar.jsx";


function CRC() {
  const [formData, setFormData] = useState({
    cnic: "childBFormNumber",
    childFullName: "",
    childDateOfBirth: "",
    childGender: "",
    childBirthPlace: "",
    childBirthCountry: "",
    childBFormNumber: "",
    childDisabilityStatus: "No",
    childPhotograph: null,
    childFingerprints: null,
    birthCertificateType: "Computerized Birth Registration Certificate",
    parentFullName: "",
    parentCNICorNICOP: "",
    parentRelationship: "Father",
    parentBiometricVerified: "Yes",
    applicationMode: "NRC",
    processingType: "Normal",
    feeAmount: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const storage = getStorage();


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let photoURL = null;
    let fingerprintURL = null;

    // Upload child photograph
    if (formData.childPhotograph) {
      const photoRef = ref(
        storage,
        `crc/photographs/${Date.now()}_${formData.childPhotograph.name}`
      );

      await uploadBytes(photoRef, formData.childPhotograph);
      photoURL = await getDownloadURL(photoRef);
    }

    // Upload fingerprints
    if (formData.childFingerprints) {
      const fingerRef = ref(
        storage,
        `crc/fingerprints/${Date.now()}_${formData.childFingerprints.name}`
      );

      await uploadBytes(fingerRef, formData.childFingerprints);
      fingerprintURL = await getDownloadURL(fingerRef);
    }

    // Firestore document (NO File objects)
    const payload = {
      cnic: formData.cnic,
      childFullName: formData.childFullName,
      childDateOfBirth: formData.childDateOfBirth,
      childGender: formData.childGender,
      childBirthPlace: formData.childBirthPlace,
      childBirthCountry: formData.childBirthCountry,
      childBFormNumber: formData.childBFormNumber,
      childDisabilityStatus: formData.childDisabilityStatus,
      childPhotographURL: photoURL,
      childFingerprintsURL: fingerprintURL,
      birthCertificateType: formData.birthCertificateType,
      parentFullName: formData.parentFullName,
      parentCNICorNICOP: formData.parentCNICorNICOP,
      parentRelationship: formData.parentRelationship,
      parentBiometricVerified: formData.parentBiometricVerified,
      applicationMode: formData.applicationMode,
      processingType: formData.processingType,
      feeAmount: formData.feeAmount,
      createdAt: new Date()
    };

    await addDoc(collection(db, "ChildRegistrationApplications"), payload);

    alert("Application submitted successfully!");
  } catch (error) {
    console.error("Error:", error);
    alert("Submission failed");
  }
};


  return (
    <div>
      <Nav/>
   <div className="form-container">
  <form className="form-card" onSubmit={handleSubmit}>
    <h2>Child Registration Certificate (CRC / B-Form)</h2>

    {/* Map text/date inputs */}
    {[
      { label: "Child Full Name", name: "childFullName", type: "text" },
      { label: "Date of Birth", name: "childDateOfBirth", type: "date" },
      { label: "Birth Place", name: "childBirthPlace", type: "text" },
      { label: "Birth Country", name: "childBirthCountry", type: "text" },
      { label: "B-Form Number", name: "childBFormNumber", type: "text" },
      { label: "Parent Full Name", name: "parentFullName", type: "text" },
      { label: "Parent CNIC/NICOP", name: "parentCNICorNICOP", type: "text" },
      { label: "Fee Amount", name: "feeAmount", type: "text" },
    ].map((field) => (
      <input
        key={field.name}
        type={field.type}
        name={field.name}
        value={formData[field.name]}
        onChange={handleChange}
        placeholder={field.label}
        required={field.name !== "childBFormNumber"}
      />
    ))}

    {/* Select fields */}
    <select name="childGender" value={formData.childGender} onChange={handleChange} required>
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>

    <select name="childDisabilityStatus" value={formData.childDisabilityStatus} onChange={handleChange}>
      <option value="No">No</option>
      <option value="Yes">Yes</option>
    </select>

    <input type="file" name="childPhotograph" onChange={handleChange} required />
    <input type="file" name="childFingerprints" onChange={handleChange} />

    <select name="birthCertificateType" value={formData.birthCertificateType} onChange={handleChange}>
      <option value="Computerized Birth Registration Certificate">Computerized Birth Registration Certificate</option>
      <option value="Detailed Birth Certificate">Detailed Birth Certificate</option>
      <option value="S-1 Form (for abroad birth)">S-1 Form (for abroad birth)</option>
    </select>

    <select name="parentRelationship" value={formData.parentRelationship} onChange={handleChange}>
      <option value="Father">Father</option>
      <option value="Mother">Mother</option>
      <option value="Guardian">Guardian</option>
    </select>

    <select name="parentBiometricVerified" value={formData.parentBiometricVerified} onChange={handleChange}>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>

    <select name="applicationMode" value={formData.applicationMode} onChange={handleChange}>
      <option value="NRC">NRC</option>
      <option value="PakID">PakID</option>
    </select>

    <select name="processingType" value={formData.processingType} onChange={handleChange}>
      <option value="Normal">Normal</option>
      <option value="Executive">Executive</option>
    </select>

    <button type="submit">Submit Application</button>
  </form>
</div>
</div>
  );
}

export default CRC;
