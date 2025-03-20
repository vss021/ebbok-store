import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {
  const navigateTo = useNavigate();
  const [values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!values.userName || !values.email || !values.password || !values.address) {
      setError("All fields are required!");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(values.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (values.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/api/v1/user/sign-up", values);
      setLoading(false);
      navigateTo("/login");
    } catch (error) {
      setLoading(false);
      toast.error(error.response ? error.response.data.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="h-auto bg-zinc-900 md:px-12 px-3 py-8 flex items-center justify-center">
      <div className="px-8 rounded-lg bg-zinc-800 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Sign Up</p>

        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

        <div className="mt-4">
          <label htmlFor="userName" className="text-zinc-400">
            Username
          </label>
          <input
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            type="text"
            name="userName"
            id="userName"
            placeholder="UserName"
            value={values.userName}
            onChange={handleChange}
            required
            aria-label="Username"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="email" className="text-zinc-400">
            Email
          </label>
          <input
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            type="email"
            name="email"
            id="email"
            placeholder="example@gmail.com"
            value={values.email}
            onChange={handleChange}
            required
            aria-label="Email"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="text-zinc-400">
            Password
          </label>
          <input
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            required
            aria-label="Password"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="address" className="text-zinc-400">
            Address
          </label>
          <textarea
            className="w-full h-[10vh] mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            name="address"
            id="address"
            value={values.address}
            onChange={handleChange}
            required
            aria-label="Address"
          />
        </div>

        <div className="mt-4 flex items-center justify-center">
          <button
            onClick={handleSignUp}
            className="w-full bg-blue-500 text-2xl font-semibold p-1 rounded text-white hover:text-blue-600 hover:bg-zinc-700"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "SignUp"}
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center">
          <p className="text-2xl text-white font-semibold">Or</p>
        </div>

        <div className="mt-4 flex flex-col md:flex-row justify-center items-center gap-2">
          <p className="text-zinc-200 text-xl">Already have an account?</p>
          <Link to="/login" className="text-blue-500 underline text-xl font-semibold">
            LogIn
          </Link>
        </div>
      </div>
    </div>
  );
}
