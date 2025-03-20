import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice.js";


export default function SideBar({ data }) {


  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((store) => store.auth.role);
  
  const handleLogout = () => {
    // Clear localStorage items (specific items or all)
    
    localStorage.removeItem("id"); // Clear 'id' item
    localStorage.removeItem("token"); // Clear 'token' item
    localStorage.removeItem("role"); // Clear 'token' item
    navigateTo("/");
    dispatch(authActions.logout());
    dispatch(authActions.changedRole("user"));
  };

  return (
    <div className="bg-zinc-800  p-6 rounded-lg h-[85vh] flex flex-col justify-between items-center shadow-md">
      {/* User Info Section */}
      <div className="flex flex-col items-center">
        <img
          src={data.avatar}
          alt={data.userName}
          className="h-[12vh] w-[12vh] object-cover rounded-full border-2 border-zinc-600"
        />
        <p className="mt-3 text-xl text-zinc-200 font-semibold">
          {data.userName}
        </p>
        <p className="text-sm text-zinc-400 mt-1">{data.email}</p>
      </div>

      {/* Divider */}
      <div className="hidden lg:block w-full h-[1px] bg-zinc-600 my-6"></div>

      {/* Navigation Links for user */}
      {role === "user" && (
        <div className="flex flex-col w-full  lg:flex">
          <Link
            to="/profile"
            className="text-zinc-200 py-2 rounded-md text-center hover:bg-zinc-700 transition-all duration-200"
          >
            Favourite Items
          </Link>
          <Link
            to="/profile/orderhistory"
            className="text-zinc-200 py-2 rounded-md text-center hover:bg-zinc-700 transition-all duration-200"
          >
            Order History
          </Link>
          <Link
            to="/profile/setting"
            className="text-zinc-200 py-2 rounded-md text-center hover:bg-zinc-700 transition-all duration-200"
          >
            Settings
          </Link>
        </div>
      )}

      {/* Navigation Links for Admin */}

      {role === "admin" && (
        <div className="flex flex-col w-full  lg:flex">
          <Link
            to="/profile"
            className="text-zinc-200 py-2 rounded-md text-center hover:bg-zinc-700 transition-all duration-200"
          >
            All Order
          </Link>
          <Link
            to="/profile/add-book"
            className="text-zinc-200 py-2 rounded-md text-center hover:bg-zinc-700 transition-all duration-200"
          >
            Add Book
          </Link>
          
        </div>
      )}
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full lg:w-5/6 mt-6 py-2 flex items-center justify-center gap-3 bg-red-600 text-white font-semibold hover:bg-red-700 transition-all duration-300 rounded"
      >
        Log Out
        <FaArrowRightFromBracket size={18} />
      </button>
    </div>
  );
}
