"use client";

import { useState, FormEvent } from "react";
import styles from "../../styles/login.module.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

const Login = () => {
  const [error , setError] = useState(false);
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  // ... existing code ...

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    // Handle successful login, e.g., redirect or show a success message
  } catch (err) {
    setError(true);
  }
};

return (
  <div>
    <form onSubmit={handleSubmit}> 
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button type="submit">Login</button>
      {error && <span>Wrong email or password </span>}
    </form>
  </div>
);
  
};

export default Login;
