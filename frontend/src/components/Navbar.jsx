import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLink = (path, label) => (
    <Link
      to={path}
      onClick={() => setMenuOpen(false)}
      className={`px-4 py-2 rounded-lg transition ${
        location.pathname === path
          ? "bg-blue-600/20 text-blue-400"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-800 shadow-lg border-b border-gray-700">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer flex items-center gap-3"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600 text-lg font-bold shadow">
            T
          </div>
          <span className="text-2xl font-semibold tracking-wide">
            TaskFlow
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          {navLink("/", "Home")}
          {navLink("/dashboard", "Dashboard")}

          {token && (
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              + Task
            </button>
          )}

          {!token ? (
            <>
              {navLink("/login", "Login")}
              <button
                onClick={() => navigate("/register")}
                className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Sign Up
              </button>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-300 text-xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-5 space-y-3 bg-gray-800 border-t border-gray-700">

          {navLink("/", "Home")}
          {navLink("/dashboard", "Dashboard")}

          {token && (
            <button
              onClick={() => {
                navigate("/dashboard");
                setMenuOpen(false);
              }}
              className="w-full bg-blue-600 py-2 rounded-lg"
            >
              + Task
            </button>
          )}

          {!token ? (
            <>
              {navLink("/login", "Login")}
              {navLink("/register", "Sign Up")}
            </>
          ) : (
            <button
              onClick={logout}
              className="w-full bg-red-500 py-2 rounded-lg"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}