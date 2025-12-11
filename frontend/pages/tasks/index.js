import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { apiRequest } from "../../lib/api";

export default function TasksPage() {
  const { token, userEmail, logout, loading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!token) {
      router.push("/login");
      return;
    }

    async function load() {
      try {
        const data = await apiRequest("/tasks", "GET", null, token);
        setTasks(data);
      } catch (err) {
        setError(err.message);
      }
    }

    load();
  }, [token, loading, router]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;
    try {
      await apiRequest(`/tasks/${id}`, "DELETE", null, token);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!token) return null;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">My Tasks</h1>
          <p className="text-sm text-gray-600">Logged in as {userEmail}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/tasks/new"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + New Task
          </Link>
          <button
            onClick={logout}
            className="border border-gray-400 px-3 py-2 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {error && <p className="text-red-600 mb-2 text-sm">{error}</p>}

      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks yet. Create one!</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-white p-4 rounded shadow flex justify-between items-start"
            >
              <div>
                <h2 className="font-semibold">{task.title}</h2>
                <p className="text-sm text-gray-700 mb-1">
                  {task.description || "No description"}
                </p>
                <p className="text-xs text-gray-500">
                  Status: <span className="font-medium">{task.status}</span>
                  {" • "}
                  Due:{" "}
                  <span className="font-medium">
                    {task.due_date || "Not set"}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href={`/tasks/${task.id}/edit`}
                  className="text-blue-600 text-sm underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
