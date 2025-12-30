import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../Config/Firebase";
import HomeNav from "../Home/HomeNav";
import Footer from "../Common/Footer";
import { fetchAllCNICData } from "../Config/fetchCNICData";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      /* -------- FIREBASE AUTH -------- */
      await signInWithEmailAndPassword(auth, email.trim(), password);

      /* -------- REGISTRATION LOOKUP -------- */
      const q = query(
        collection(db, "Registration"),
        where("email", "==", email.trim())
      );

      const snap = await getDocs(q);

      if (snap.empty) {
        throw new Error("Registration record not found");
      }

      const userData = snap.docs[0].data();
      const cnic = userData.cnic;

      if (!cnic) {
        throw new Error("CNIC missing in registration");
      }

      /* -------- SAVE BASIC INFO -------- */
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("cnic", cnic);

      /* -------- FETCH ALL MODULE DATA -------- */
      const cnicData = await fetchAllCNICData(cnic);

      localStorage.setItem("cnicData", JSON.stringify(cnicData));

      /* -------- REDIRECT -------- */
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);

      if (err.code === "auth/wrong-password") {
        setError("Incorrect password");
      } else if (err.code === "auth/user-not-found") {
        setError("User not found");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email");
      } else {
        setError(err.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HomeNav />

      <div className="admin-container">
        <div className="admin-card">
          <h1>Login</h1>

          <form onSubmit={handleLogin} className="admin-form">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="error">{error}</p>}

            <button type="submit" className="admin-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
