import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("https://to-do-v1l1.onrender.com/api/tasks", {
        headers: { Authorization: token }
      });
      setTasks(res.data);
    } catch (err) {
      alert(" Failed to load tasks. Check backend connection.");
    }
  };

  useEffect(() => {
    if (!token) {
      alert(" Please login first");
      navigate("/login");
      return;
    }

    fetchTasks();
  }, []);

  // Submit task
  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    const taskData = {
      title,
      description: desc,
      createdAt: new Date()
    };

    try {
      if (editId) {
        await axios.put(
          `https://to-do-v1l1.onrender.com/api/tasks/${editId}`,
          taskData,
          { headers: { Authorization: token } }
        );
        setEditId(null);
      } else {
        await axios.post(
          "https://to-do-v1l1.onrender.com/api/tasks",
          taskData,
          { headers: { Authorization: token } }
        );
      }

      setTitle("");
      setDesc("");
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      alert(" Failed to save task. Backend error.");
    }
  };

  // Delete
  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://to-do-v1l1.onrender.com/api/tasks/${id}`, {
        headers: { Authorization: token }
      });
      fetchTasks();
    } catch {
      alert(" Failed to delete task.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-6">

      {/* Heading Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">Your Tasks</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Task
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg mb-10">
          <h2 className="text-lg mb-4">
            {editId ? "Edit Task" : "Create New Task"}
          </h2>

          <input
            className="w-full p-3 mb-3 bg-gray-700 rounded outline-none"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full p-3 mb-3 bg-gray-700 rounded outline-none"
            placeholder="Task Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="bg-green-600 px-5 py-2 rounded-lg hover:bg-green-700"
          >
            Save Task
          </button>
        </div>
      )}

      {/* Task Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {tasks.length === 0 ? (
          <p className="text-center col-span-3 text-gray-400">
            No tasks found. Add your first task 
          </p>
        ) : (
          tasks.map((t) => (
            <div
              key={t._id}
              className="p-5 rounded-xl shadow-lg bg-gray-800 border border-gray-700 transition hover:scale-[1.02]"
            >
              <h3 className="text-xl font-semibold mb-2">
                {t.title}
              </h3>

              <p className="text-gray-300 mb-3">
                {t.description || "No description"}
              </p>

              <p className="text-sm text-gray-400 mb-4">
                {new Date(t.createdAt).toLocaleString()}
              </p>

              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setTitle(t.title);
                    setDesc(t.description);
                    setEditId(t._id);
                    setShowForm(true);
                  }}
                  className="text-blue-400 hover:underline"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTask(t._id)}
                  className="text-red-400 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}