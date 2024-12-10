"use client";

import { useState } from "react";
import styles from "../../styles/login.module.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

const Login = () => {
  const [error, setError] = useState<string | null>(null); // Store error message as a string
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
       
        const user = userCredential.user;
        console.log("User signed in:", user);
        
        setError(null);
      })
      .catch((error) => {
        console.error("Error signing in:", error); // Log the entire error object
        const errorMessage = error.message;
        setError(errorMessage); 
      });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(null); 
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(null); 
  };

  return (
    <div className={styles.login}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        
        <input
          className={styles.loginInput}
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange} 
        />
       
        <input
          id="password"
          className={styles.loginInput}
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className={styles.loginButton} type="submit">
          Login
        </button>
        {error && <span className={styles.checkAuthentication}>{error}</span>} {/* Display error message */}
      </form>
    </div>
  );
};

export default Login;
