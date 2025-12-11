"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { apiRequest } from "../../lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await apiRequest("/auth/login", "POST", { email, password });
      login(res.access_token, email);
      router.push("/tasks");
    } catch (err) {
      setError(err.message || "Invalid login");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>

        {error && <p className="text-red-600 mb-2 text-sm">{error}</p>}

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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Log In
        </button>

        <p className="text-sm mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
