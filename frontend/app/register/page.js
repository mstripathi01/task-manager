"use client";

import { useState } from "react";
import Link from "next/link";
import { apiRequest } from "../../lib/api";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await apiRequest("/auth/register", "POST", { email, password });
      setSuccess("Account created! You can now log in.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold mb-4 text-center">Register</h1>

        {error && <p className="text-red-600 mb-2 text-sm">{error}</p>}
        {success && <p className="text-green-600 mb-2 text-sm">{success}</p>}

        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          className="border rounded w-full p-2 mb-4"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mb-2 text-sm font-medium">Password</label>
        <input
          className="border rounded w-full p-2 mb-4"
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
