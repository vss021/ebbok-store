import React, { useEffect, useState } from "react";
import BookCards from "../components/book/BookCards.jsx";
import axios from "axios";
import Loder from "../components/loder/Loder.jsx";

export default function AllBooks() {
  const [recentBooks, setRecentBooks] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "http://localhost:4000/api/v1/books/get-allbooks"
      );
      setRecentBooks(response.data.data);
    };
    getData();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen md:px-12 px-6 py-10">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h4 className="text-4xl font-semibold text-yellow-200 tracking-wide">
          Explore Our Collection
        </h4>
        <p className="text-yellow-100 text-sm mt-2">
          Discover a variety of books to suit your interests.
        </p>
      </div>

      {/* Loader */}
      {recentBooks.length === 0 && (
        <div className="flex items-center justify-center my-8">
          <Loder />
        </div>
      )}

      {/* Book Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {recentBooks &&
          recentBooks.map((bookData, index) => (
            <BookCards data={bookData} key={index} />
          ))}
      </div>
    </div>
  );
}
