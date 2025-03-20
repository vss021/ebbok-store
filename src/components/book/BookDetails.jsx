import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";
import Loder from "../loder/Loder.jsx";
import { useSelector } from "react-redux";

export default function BookDetails() {
  const [bookData, setBookData] = useState(null);
  const { bookid } = useParams();
  const navigateTo = useNavigate();
  const userLogin = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const headers = {
    id: localStorage.getItem("id"),
    bookid: bookid,
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://server-v0-s4ta.onrender.com/api/v1/books/get-book/${bookid}`
        );
        setBookData(response.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getData();
  }, []);

  const handleAddToFav = async () => {
    try {
      const response = await axios.put(
        "https://server-v0-s4ta.onrender.com/api/v1/favorite/add",
        {},
        { headers }
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.put(
        "https://server-v0-s4ta.onrender.com/api/v1/cart/add",
        {},
        { headers }
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

 
  const handleDelete = async() => {
    try {
      const response = await axios.delete(
        "https://server-v0-s4ta.onrender.com/api/v1/books/delete",
        { headers }
      );

      toast.success(response.data.message);
      navigateTo("/all-books");
    } catch (error) {
      console.error(
        toast.error(error?.response?.data?.message)
      );
    }
  }

  if (!bookData) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <Loder />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 lg:p-12 bg-gray-900">
      {/* Book Image Section */}
      <div className="w-full lg:w-2/5">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <img
            src={bookData.url}
            alt={bookData.title}
            className="rounded-lg shadow-lg h-[60vh] object-cover"
          />
          {/* Action Buttons for User */}
          {userLogin && role === "user" && (
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAddToFav}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all duration-300"
              >
                <FaHeart /> <span>Add to Favorites</span>
              </button>
              <button
                onClick={handleAddToCart}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300"
              >
                <FaShoppingCart /> <span>Add to Cart</span>
              </button>
            </div>
          )}

          {/* Action Buttons for Admin */}

          {userLogin && role === "admin" && (
            <div className="flex gap-4 mt-6">
              <Link
                to={`/profile/update-book/${bookData._id}`} 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white transition-all duration-300">
                <FaEdit /> <span>Edit</span>
              </Link>
              <button
              onClick={handleDelete} 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all duration-300">

                <MdOutlineDelete /> <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Book Details Section */}
      <div className="w-full lg:w-3/5">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl lg:text-4xl text-white font-bold">
            {bookData.title}
          </h1>
          <p className="text-gray-400 text-lg mt-2">by {bookData.author}</p>
          <p className="text-gray-500 mt-4">{bookData.description}</p>
          <div className="flex items-center mt-4">
            <GrLanguage className="text-gray-400 text-xl mr-2" />
            <span className="text-gray-400">{bookData.language}</span>
          </div>
          <p className="mt-6 text-2xl lg:text-3xl text-yellow-400 font-bold">
            ${bookData.price}
          </p>
        </div>
      </div>
    </div>
  );
}
