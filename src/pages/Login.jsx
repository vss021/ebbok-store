import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/authSlice.js";
import { toast } from "react-toastify";

export default function Login() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setValues({
      ...values, // Spread the existing values
      [e.target.name]: e.target.value, // Dynamically set the key using []
    });
  };

  const handleLogin = async () => {
    try {
      if (!values.userName || !values.password) {
        setError("All fields are required!");
        return;
      }

      const response = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        values
      );

      dispatch(authActions.login());
      dispatch(authActions.changedRole(response.data.role));
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      navigateTo("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="h-screen bg-zinc-900 flex items-center justify-center px-4 py-8">
      <div className="bg-zinc-800 rounded-lg px-8 py-6 w-full max-w-md">
        <p className="text-zinc-200 text-xl font-semibold text-center">Log-In</p>

        {error && (
          <div className="mt-4 text-red-500 text-center">
            <p>{error}</p>
          </div>
        )}

        <div className="mt-4">
          <label htmlFor="username" className="text-zinc-400">
            Username
          </label>
          <input
            className="w-full mt-2 p-3 bg-zinc-900 text-zinc-100 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="userName"
            id="username"
            value={values.userName}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="text-zinc-400">
            Password
          </label>
          <input
            className="w-full mt-2 p-3 bg-zinc-900 text-zinc-100 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>

        <div className="mt-6">
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-xl font-semibold py-3 rounded-md text-white hover:bg-blue-600 transition duration-200"
          >
            Log In
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-white text-lg">Or</p>
        </div>

        <div className="mt-4 flex flex-col items-center gap-2">
          <p className="text-zinc-200 text-xl">Don't have an account?</p>
          <Link
            to="/sign-up"
            className="text-blue-500 underline text-xl font-semibold"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
