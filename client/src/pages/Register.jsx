import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://portfolioforge-backend-fl80.onrender.com/api/auth/register",
        formData
      );

      setMessage(res.data.message);
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md rounded-2xl bg-slate-900 p-8 shadow-lg"
      >
        <h1 className="mb-6 text-center text-3xl font-bold">Register</h1>

        <input
          className="mb-4 w-full rounded-lg bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          className="mb-4 w-full rounded-lg bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          className="mb-4 w-full rounded-lg bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button className="w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700">
          Register
        </button>

        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </form>
    </div>
  );
}

export default Register;