"use client";

import { useState } from "react";
import styles from "../../styles/login.module.scss";
import {signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "@/firebase";


const Login = () => {
  const [error  , setError ] = useState(false) ; 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  };

  return (
    <div className={styles.login}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <label className={styles.loginLabel} htmlFor="email">
          Email:
        </label>
        <input
          id="email"
          className={styles.loginInput}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className={styles.loginLabel} htmlFor="password">
          Password:
        </label>
        <input
          id="password"
          className={styles.loginInput}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.loginButton} type="submit">
          Login
        </button>
       {error && <span className={styles.checkAuthentication}> Wrong Email or Password  </span>} 
      </form>
    </div>
  );
};

export default Login;
