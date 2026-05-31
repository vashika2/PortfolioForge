import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between bg-slate-950 px-8 py-4 text-white shadow-lg">
      <Link to="/" className="text-2xl font-bold text-blue-400">
        PortfolioForge
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-blue-400">Home</Link>

        {token ? (
          <>
            <Link to="/dashboard" className="hover:text-blue-400">
              Dashboard
            </Link>

            <span className="text-slate-300">
              Hi, {userName || "User"} 👋
            </span>

            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-400">Login</Link>
            <Link
              to="/register"
              className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;