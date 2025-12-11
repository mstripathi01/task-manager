import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { apiRequest } from "../../lib/api";

export default function NewTaskPage() {
  const { token, loading } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  if (!loading && !token && typeof window !== "undefined") {
    router.push("/login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await apiRequest(
        "/tasks",
        "POST",
        {
          title,
          description,
          status,
          due_date: dueDate || null,
        },
        token
      );
      router.push("/tasks");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading || !token) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-8">
      <button
        onClick={() => router.back()}
        className="text-sm text-gray-600 mb-4"
      >
        ← Back
      </button>
      <h1 className="text-2xl font-semibold mb-4">Create Task</h1>

      {error && <p className="text-red-600 mb-2 text-sm">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            className="border rounded w-full p-2"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="border rounded w-full p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            className="border rounded w-full p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input
            className="border rounded w-full p-2"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    </div>
  );
}
