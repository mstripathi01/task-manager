import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { apiRequest } from "../../../lib/api";

export default function EditTaskPage() {
  const router = useRouter();
  const { id } = router.query;
  const { token, loading } = useAuth();
  const [task, setTask] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (loading) return;
    if (!token) {
      router.push("/login");
      return;
    }
    if (!id) return;

    async function load() {
      try {
        // Simplest way: fetch all tasks, find one by id
        const tasks = await apiRequest("/tasks", "GET", null, token);
        const t = tasks.find((task) => task.id === Number(id));
        if (!t) setError("Task not found");
        else setTask(t);
      } catch (err) {
        setError(err.message);
      }
    }
    load();
  }, [id, token, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await apiRequest(
        `/tasks/${id}`,
        "PUT",
        {
          title: task.title,
          description: task.description,
          status: task.status,
          due_date: task.due_date || null,
        },
        token
      );
      router.push("/tasks");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading || !token || !task) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>{error || "Loading..."}</p>
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
      <h1 className="text-2xl font-semibold mb-4">Edit Task</h1>
      {error && <p className="text-red-600 mb-2 text-sm">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            className="border rounded w-full p-2"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="border rounded w-full p-2"
            value={task.description || ""}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            className="border rounded w-full p-2"
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
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
            value={task.due_date || ""}
            onChange={(e) => setTask({ ...task, due_date: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
