import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddBooks() {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    description: "",
    language: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const handleFromData = async () => {
    if (
      Data.url === "" ||
      Data.title === "" ||
      Data.author === "" ||
      Data.price === "" ||
      Data.description === "" ||
      Data.language === ""
    ) {
      alert("All Fields are required");
    } else {
      const response = await axios.post(
        "https://server-v0-s4ta.onrender.com/api/v1/books/add-book",
        Data,
        { headers }
      );
      setData({
        url: "",
        title: "",
        author: "",
        price: "",
        description: "",
        language: "",
      });
        toast.success(response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-800 flex justify-center items-center md:p-4 m-2">
      <div className="w-full bg-zinc-800 shadow-lg rounded lg:p-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Add a New Book</h1>

        <div className="space-y-6">
          {/* Image URL */}
          <div>
            <label
              htmlFor="url"
              className="block text-sm font-medium text-zinc-100"
            >
              Image URL
            </label>
            <input
              type="text"
              id="url"
              name="url"
              className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring-indigo-500 text-black focus:border-indigo-500 sm:text-sm"
              placeholder="Enter image URL"
              value={Data.url}
              onChange={handleChange}
              required
            />
          </div>

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-zinc-100"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring-indigo-500 text-black focus:border-indigo-500 sm:text-sm"
              placeholder="Enter book title"
              value={Data.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Author */}
          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-zinc-100"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring-indigo-500 text-black focus:border-indigo-500 sm:text-sm"
              placeholder="Enter author's name"
              value={Data.author}
              onChange={handleChange}
              required
            />
          </div>

          {/* Language and Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="language"
                className="block text-sm font-medium text-zinc-100"
              >
                Language
              </label>
              <input
                type="text"
                id="language"
                name="language"
                className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring-indigo-500 text-black focus:border-indigo-500 sm:text-sm"
                placeholder="Enter language"
                value={Data.language}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-zinc-100"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring-indigo-500 text-black focus:border-indigo-500 sm:text-sm"
                placeholder="Enter price"
                value={Data.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-zinc-100"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring-indigo-500 text-black focus:border-indigo-500 sm:text-sm"
              rows={4}
              placeholder="Enter book description"
              value={Data.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              onClick={handleFromData}
              className="w-full p-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 "
            >
              Add Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
