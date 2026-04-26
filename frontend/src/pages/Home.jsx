import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">

      {/* Main Section */}
      <div className="grid md:grid-cols-2 items-center px-8 py-16 gap-10">

        {/* Left Side */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Manage Your Tasks <br /> Smarter & Faster 
          </h1>

          <p className="text-gray-400 mb-6 text-lg">
            A modern task manager that helps you organize your work,
            track important tasks, and stay productive — all in one place.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/register")}
              className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/login")}
              className="bg-gray-700 px-6 py-2 rounded hover:bg-gray-600"
            >
              Login
            </button>
          </div>

          {/* Features */}
          <div className="mt-10 space-y-3 text-gray-400">
            <p>✔ Create and manage tasks easily</p>
            <p>✔ Add description & timestamps</p>
            <p>✔ Mark important tasks</p>
            <p>✔ Clean and modern dashboard UI</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9068/9068672.png"
            alt="Task Manager"
            className="w-80 opacity-90"
          />
        </div>

      </div>

      {/* Bottom Section */}
      <div className="px-8 pb-16">
        <div className="bg-gray-800 p-8 rounded-lg text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">
            How It Works
          </h2>

          <p className="text-gray-400 mb-2">
            1. Register and login securely.
          </p>
          <p className="text-gray-400 mb-2">
            2. Add tasks with title, description, and importance.
          </p>
          <p className="text-gray-400 mb-2">
            3. Manage tasks from your dashboard.
          </p>
          <p className="text-gray-400">
            4. Stay productive with a clean UI.
          </p>
        </div>
      </div>



    </div>
  );
}