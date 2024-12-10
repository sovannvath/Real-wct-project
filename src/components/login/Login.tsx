"use client";
import React, { useState } from "react";
import Link from "next/link"; 

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle login logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">Login</button>
    </form>
  );
};

export default LoginForm;
