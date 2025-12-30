import React, { useState } from "react";
import submitDataToFirestore from "../../Config/SubmitData";
import Nav from "../../Dashboard/Navbar";

function BankAccountForm() {
  const [cnic, setCnic] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [branch, setBranch] = useState("");
  const [accountType, setAccountType] = useState("Savings");
  const [balance, setBalance] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      cnic,
      accountNumber,
      bankName,
      branch,
      accountType,
      balance: Number(balance),
      createdAt: new Date(),
    };

    submitDataToFirestore(data, "BankAccounts");
    alert("Bank account added ✅");

    setCnic("");
    setAccountNumber("");
    setBankName("");
    setBranch("");
    setAccountType("Savings");
    setBalance("");
  };

  return (
    <div>
      <Nav/>
   <div className="form-container">
  <form className="form-card" onSubmit={handleSubmit}>
    <h2>Add Bank Account</h2>
    <input
      type="text"
      placeholder="CNIC"
      value={cnic}
      onChange={(e) => setCnic(e.target.value)}
      required
    />
    <input
      type="text"
      placeholder="Account Number"
      value={accountNumber}
      onChange={(e) => setAccountNumber(e.target.value)}
      required
    />
    <input
      type="text"
      placeholder="Bank Name"
      value={bankName}
      onChange={(e) => setBankName(e.target.value)}
      required
    />
    <input
      type="text"
      placeholder="Branch"
      value={branch}
      onChange={(e) => setBranch(e.target.value)}
      required
    />
    <select
      value={accountType}
      onChange={(e) => setAccountType(e.target.value)}
    >
      <option value="Savings">Savings</option>
      <option value="Current">Current</option>
      <option value="Other">Other</option>
    </select>
    <input
      type="number"
      placeholder="Balance"
      value={balance}
      onChange={(e) => setBalance(e.target.value)}
      required
    />
    <button type="submit">Add Account</button>
  </form>
</div>
</div>
  );
}

export default BankAccountForm;
