import React, { useState } from "react";
import Nav from "../../Dashboard/Navbar";
import Footer from "../../Common/Footer";
import submitDataToFirestore from "../../Config/SubmitData";
import { storage } from "../../Config/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../Marriage/MarriageForm.css";

function InsuranceForm() {
  const [formData, setFormData] = useState({
    cnic: "", fullName: "", fatherName: "", dob: "", address: "", insuranceType: "", insuranceStartDate: "", insuranceEndDate: "", insuranceCompany: "", policyNumber: "", premiumAmount: "", coverageAmount: "", premiumFrequency: "", policyTerm: "", beneficiaryName: "", beneficiaryCnic: "", beneficiaryRelation: "", paymentMethod: "", bankTransaction: "", cnicCopy: null, policyAgreement: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadFileAndGetURL = async (file, fieldName) => {
    if (!file) return null;
    const fileRef = ref(storage, `Insurance/${fieldName}/${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload files first
    const cnicURL = await uploadFileAndGetURL(formData.cnicCopy, "cnicCopy");
    const policyURL = await uploadFileAndGetURL(formData.policyAgreement, "policyAgreement");

    const dataToSubmit = {
      ...formData,
      cnicCopy: cnicURL,
      policyAgreement: policyURL,
    };

    submitDataToFirestore(dataToSubmit, "insurance");

    alert("Insurance form submitted successfully!");

    setFormData({
      cnic: "",
      fullName: "",
      fatherName: "",
      dob: "",
      address: "",
      insuranceType: "",
      insuranceStartDate: "",
      insuranceEndDate: "",
      insuranceCompany: "",
      policyNumber: "",
      premiumAmount: "",
      coverageAmount: "",
      premiumFrequency: "",
      policyTerm: "",
      beneficiaryName: "",
      beneficiaryCnic: "",
      beneficiaryRelation: "",
      paymentMethod: "",
      bankTransaction: "",
      cnicCopy: null,
      policyAgreement: null,
    });
  };

  return (
    <>
  <Nav />

  <div className="form-container">
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Insurance Form</h2>

      <h3>Policy Holder Details</h3>
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName || ""}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="fatherName"
        placeholder="Father Name"
        value={formData.fatherName || ""}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="cnic"
        placeholder="CNIC"
        value={formData.cnic || ""}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="dob"
        value={formData.dob || ""}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address || ""}
        onChange={handleChange}
        required
      />

      <h3>Insurance Details</h3>
      <input
        type="text"
        name="insuranceType"
        placeholder="Insurance Type"
        value={formData.insuranceType || ""}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="insuranceStartDate"
        value={formData.insuranceStartDate || ""}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="insuranceEndDate"
        value={formData.insuranceEndDate || ""}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="insuranceCompany"
        placeholder="Insurance Company"
        value={formData.insuranceCompany || ""}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="policyNumber"
        placeholder="Policy Number"
        value={formData.policyNumber || ""}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="premiumAmount"
        placeholder="Premium Amount"
        value={formData.premiumAmount || ""}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="coverageAmount"
        placeholder="Coverage Amount"
        value={formData.coverageAmount || ""}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="premiumFrequency"
        placeholder="Premium Frequency"
        value={formData.premiumFrequency || ""}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="policyTerm"
        placeholder="Policy Term"
        value={formData.policyTerm || ""}
        onChange={handleChange}
        required
      />

      <h3>Beneficiary Details</h3>
      <input
        type="text"
        name="beneficiaryName"
        placeholder="Beneficiary Name"
        value={formData.beneficiaryName || ""}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="beneficiaryCnic"
        placeholder="Beneficiary CNIC"
        value={formData.beneficiaryCnic || ""}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="beneficiaryRelation"
        placeholder="Relation with Beneficiary"
        value={formData.beneficiaryRelation || ""}
        onChange={handleChange}
        required
      />

      <h3>Payment Details</h3>
      <input
        type="text"
        name="paymentMethod"
        placeholder="Payment Method"
        value={formData.paymentMethod || ""}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="bankTransaction"
        placeholder="Bank Transaction / Details"
        value={formData.bankTransaction || ""}
        onChange={handleChange}
        required
      />

      <h3>Upload Documents</h3>
      <label>CNIC Copy</label>
      <input type="file" name="cnicCopy" onChange={handleChange} required />
      <label>Policy Agreement</label>
      <input type="file" name="policyAgreement" onChange={handleChange} required />

      <button type="submit">Submit Insurance Form</button>
    </form>
  </div>

  <Footer />
</>

  );
}

export default InsuranceForm;
