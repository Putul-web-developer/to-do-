import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  //  Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  // Email validation
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async () => {
    if (!isValidEmail(form.email)) {
      alert(" Enter a valid email");
      return;
    }

    if (!form.password) {
      alert(" Password is required");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await axios.post(
        "https://to-do-v1l1.onrender.com/api/auth/login",
        {
          email: form.email.trim(),
          password: form.password
        }
      );

      localStorage.setItem("token", res.data.token);

      alert(" Login successful!");
      navigate("/dashboard");

    } catch (err) {
      let message = "Login failed";

      if (err.response?.data?.msg) {
        message = err.response.data.msg;
      } else if (err.code === "ECONNABORTED") {
        message = "The server took too long to respond.";
      } else if (err.message === "Network Error") {
        message = "Unable to connect to backend. Make sure server is running.";
      }

      if (message.toLowerCase().includes("invalid")) {
        alert(" Invalid email or password");
      } else {
        alert(" " + message);
      }

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login to Your Account
        </h2>

        <input
          type="email"
          className="w-full p-3 mb-3 bg-gray-700 rounded outline-none"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-center text-gray-400 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}