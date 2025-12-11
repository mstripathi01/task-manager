"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/tasks");
    } else {
      router.push("/login");
    }
  }, [token, router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <h2 className="text-lg text-gray-600">Loading...</h2>
    </div>
  );
}
