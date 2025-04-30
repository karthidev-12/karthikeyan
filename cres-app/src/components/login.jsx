import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (form.username === "admin" && form.password === "admin") {
      dispatch(login(form));
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-xl px-10 py-8 w-1/4 h-[40vh] flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          CRES Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full px-4 py-2 mb-4 border h-[80px] border-gray-300 rounded-md text-[32px] focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 py-2 mb-6 h-[80px] border border-gray-300 rounded-md text-[32px] focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 h-[80px] hover:bg-indigo-700 text-white text-[32px]  font-semibold py-2 px-4 rounded-md transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
