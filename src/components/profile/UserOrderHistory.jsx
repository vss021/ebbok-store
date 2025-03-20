import axios from "axios";
import React, { useEffect, useState } from "react";
import Loder from "../loder/Loder.jsx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function UserOrderHistory() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [orderhistory, setOrderHistory] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const getOrderData = async () => {
      const response = await axios.get(
        "https://server-v0-s4ta.onrender.com/api/v1/order/all-order",
        { headers }
      );
      setOrderHistory(response.data.data);
    };
    getOrderData();
  }, []);

  if (!isLoggedIn || !orderhistory) {
    return (
      <div className="h-[75vh] flex items-center justify-center">
        <Loder />
      </div>
    );
  }

  if (orderhistory.length === 0) {
    return (
      <div className="h-[80vh] text-zinc-100 flex flex-col items-center justify-center">
        <h1 className="text-2xl md:text-5xl font-semibold text-zinc-500 mb-8">
          No Order History
        </h1>
        <img
          src="/path-to-placeholder-image.png"
          alt="no order"
          className="h-[20vh] mb-8"
        />
      </div>
    );
  }

  if (orderhistory.length > 0) {
    return (
      <div className="h-auto p-4 text-zinc-100">
        <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8 text-center md:text-left">
          Your Order History
        </h1>

        {/* Table Header */}
        <div className="hidden md:flex mt-4 bg-zinc-800 w-full rounded py-2 px-4 gap-2 text-sm">
          <div className="w-[5%] text-center">Sr.</div>
          <div className="w-[25%]">Books</div>
          <div className="w-[45%]">Description</div>
          <div className="w-[10%] text-center">Price</div>
          <div className="w-[10%] text-center">Status</div>
          <div className="w-[5%] hidden lg:block text-center">Mode</div>
        </div>

        {/* Table Body */}
        {orderhistory.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start md:items-center bg-zinc-800 rounded py-3 px-4 gap-4 mt-4 hover:bg-zinc-900 hover:cursor-pointer text-sm"
          >
            {/* Serial Number */}
            <div className="w-full md:w-[5%] text-center font-medium">
              {index + 1}
            </div>

            {/* Book Title */}
            <div className="w-full md:w-[25%] text-blue-300">
              <Link to={`/view-book-details/${item.book._id}`} className="hover:underline">
                {item.book.title}
              </Link>
            </div>

            {/* Description */}
            <div className="w-full md:w-[45%] text-zinc-400">
              {item.book.description.slice(0, 50)}...
            </div>

            {/* Price */}
            <div className="w-full md:w-[10%] text-center font-semibold">
              ${item.book.price}
            </div>

            {/* Status */}
            <div className="w-full md:w-[10%] text-center font-semibold">
              {item.status === "Order placed" ? (
                <span className="text-yellow-500">{item.status}</span>
              ) : item.status === "Canceled" ? (
                <span className="text-red-500">{item.status}</span>
              ) : (
                <span>{item.status}</span>
              )}
            </div>

            {/* Payment Mode */}
            <div className="w-full lg:w-[5%] hidden lg:block text-center text-zinc-400">
              COD
            </div>
          </div>
        ))}
      </div>
    );
  }
}
