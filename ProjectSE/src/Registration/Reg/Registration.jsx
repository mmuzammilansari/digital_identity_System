import React, { useState } from "react";
import "./registration.css";
import { Link } from "react-router-dom";
import HomeNav from "../../Home/HomeNav";
import Footer from "../../Common/Footer";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../Config/Firebase.jsx"; // Adjust the path as per your file structure
import { v4 as uuidv4 } from "uuid";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cnic: "",
    psw: "",
    cpsw: "",
  });
  const [errors, setErrors] = useState({});

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function submitRegistrationData(user) {
    const id = user.uid;
    console.log(user.uid);

    const userData = {
      id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      cnic: formData.cnic,
      psw: formData.psw,
      cpsw: formData.cpsw,
      role: "user",
    };

    const docRef = await setDoc(doc(db, "Registration", formData.cnic), userData);
    
    alert("Registration successful!");

    window.location.href = "/login"; 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      if (formData.psw === formData.cpsw) {
        try {
          // Generate a unique ID for the user
          const auth = getAuth();
          createUserWithEmailAndPassword(auth, formData.email, formData.psw)
            .then((userCredential) => {
              // Signed up

              const user = userCredential.user;
              console.log(user);
              submitRegistrationData(user);
              // submitRegistrationData(user);
            })
            .catch((error) => {
              if (error.code === "auth/email-already-in-use") {
                alert("Account already exists.");
              }
              // console.log(error.code);
              // ..
            });
        } catch (e) {
          // console.log(e.code);
          alert("An error occurred. Please try again later.");
        }
      } else {
        alert("Password and confirmed password do not match!");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.name.trim()) {
      errors.name = "Name is required";
    }
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Invalid email format";
    }
    if (!data.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!isValidPhone(data.phone)) {
      errors.phone = "Invalid phone number format (11 digits)";
    }
    if (!data.cnic.trim()) {
      errors.nicNo = "NIC number is required";
    } else if (!isValidNIC(data.cnic)) {z
      errors.nicNo = "Invalid NIC number format (13 digits)";
    }
    // if (!data.psw.trim()) {
    //   errors.psw = "Password is required";
    // }else if (!isValidpsw(data.psw))
    // errors.psw = "atleast 6 Character/numbers"

    if (!data.psw.trim()) {
      errors.psw = "Password is required";
    } else if (!isValidpsw(data.psw)) {
      errors.psw =
        "Password must contain at least 6 characters including letters, numbers, or special characters";
    }

    if (!data.cpsw.trim()) {
      errors.cpsw = "Confirm Password is required";
    }
    return errors;
  };

  const isValidEmail = (email) => {
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(email);
  };

  const isValidPhone = (phone) => {
    const phonePattern = /^\d{11}$/;
    return phonePattern.test(phone);
  };

  const isValidNIC = (nic) => {
    const nicPattern = /^\d{5}-\d{7}-\d{1}$/;
    return nicPattern.test(nic);
  };
  function isValidpsw(password) {
    const pass = /^(?=.*[a-zA-Z0-9!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{6,}$/;
    return pass.test(password);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let inputValue = value.replace(/\D/g, ""); 
    if (inputValue.length > 5) {
      inputValue = inputValue.slice(0, 5) + "-" + inputValue.slice(5);
    }
    if (inputValue.length > 13) {
      inputValue = inputValue.slice(0, 13) + "-" + inputValue.slice(13);
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: inputValue,
    }));
  };

  return (
   <>
  <HomeNav />

  <div className="ureg-container">
    <div className="ureg-card">
      <h1>Create Account</h1>
      <p className="ureg-subtitle">
        Register to access Digital Identity Services
      </p>

      <form onSubmit={handleSubmit} className="ureg-form">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div>
          <input
            type="text"
            name="cnic"
            placeholder="NIC Number (xxxxx-xxxxxxx-x)"
            value={formData.cnic}
            onChange={handleInputChange}
          />
          {errors.nicNo && <span className="error">{errors.nicNo}</span>}
        </div>

        <div>
          <input
            type="password"
            name="psw"
            placeholder="Password"
            value={formData.psw}
            onChange={handleChange}
          />
          {errors.psw && <span className="error">{errors.psw}</span>}
        </div>

        <div>
          <input
            type="password"
            name="cpsw"
            placeholder="Confirm Password"
            value={formData.cpsw}
            onChange={handleChange}
          />
          {errors.cpsw && <span className="error">{errors.cpsw}</span>}
        </div>

        <button type="submit" className="ureg-btn">
          Register
        </button>
      </form>
    </div>
  </div>

  <Footer />
</>

  );
}

export default Registration;
