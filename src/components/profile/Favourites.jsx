import axios from "axios";
import React, { useState, useEffect } from "react";
import Loder from "../loder/Loder.jsx";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";

export default function Favourites() {
  const [favData, setFavData] = useState([]);

  useEffect(() => {
    const getOrderData = async () => {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const response = await axios.get(
        "https://server-v0-s4ta.onrender.com/api/v1/favorite/get",
        { headers }
      );
      setFavData(response.data.data);
    };
    getOrderData();
  }, []);
  

  const deleteItem = async (bookid) => {
    try {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: bookid,
      };
      const response = await axios.put(
        `https://server-v0-s4ta.onrender.com/api/v1/favorite/remove`,
        null,
        { headers }
      );
      setFavData((data) => data.filter((item) => item._id !== bookid));
      toast.message(response.data.message);
    } catch (error) {
      console.error(
        "Error removing item:",
        error.response?.data || error.message
      );
      toast.success("Failed to remove item.");
    }
  };

  if (!favData) {
    return (
      <div className="h-[75vh] flex items-center justify-center">
        <Loder />
      </div>
    );
  }

  if (favData.length === 0) {
    return (
      <div className="h-auto text-zinc-100">
        <div className="flex h-full flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-500 mb-6">
            No Favorite Books
          </h1>
          <img
            src="cart.png"
            alt="No Favorite"
            className="h-[20vh] md:h-[25vh] mb-6"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-8 text-center">
        Your Favorite Books
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favData.map((item) => (
          <div
            key={item._id}
            className="bg-gray-800 text-gray-100 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 relative"
          >
            {/* Image */}
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-[200px] object-cover rounded-t-lg"
            />

            {/* Content */}
            <div className="p-4 flex flex-col">
              <h2 className="text-xl font-bold truncate">{item.title}</h2>
              <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                {item.description}
              </p>

              {/* Price and Delete Button */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-semibold text-green-400">
                  ${item.price}
                </span>
                <button
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors duration-300"
                  onClick={() => deleteItem(item._id)}
                >
                  <AiFillDelete size={24} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
