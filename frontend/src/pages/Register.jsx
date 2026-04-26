import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      alert("Name is required");
      return;
    }

    if (!isValidEmail(form.email)) {
      alert(" Enter a valid email (example: user@gmail.com)");
      return;
    }

    if (form.password.length < 6) {
      alert(" Password must be at least 6 characters");
      return;
    }

    try {
      setIsSubmitting(true);

      await axios.post("https://to-do-v1l1.onrender.com/api/auth/register", {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password
      });

      alert(" Registration successful! Please login.");
      navigate("/login");

    } catch (err) {
      let message = "Registration failed";

      if (err.response?.data?.msg) {
        message = err.response.data.msg;
      } else if (err.code === "ECONNABORTED") {
        message = "The server took too long to respond.";
      } else if (err.message === "Network Error") {
        message = "Unable to connect to backend. Make sure server is running.";
      }

      if (message.toLowerCase().includes("exist")) {
        alert(" User already exists. Try logging in.");
      } else {
        alert("" + message);
      }

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <input
          className="w-full p-3 mb-3 bg-gray-700 rounded outline-none"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

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
          {isSubmitting ? "Creating..." : "Sign Up"}
        </button>

        <p className="mt-4 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}