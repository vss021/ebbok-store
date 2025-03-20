import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCards from "../book/BookCards.jsx";
import Loder from "../loder/Loder.jsx";

export default function RecentlyAddedBooks() {
  const [recentBooks, setRecentBooks] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const responceData = await axios.get(
        "https://server-v0-s4ta.onrender.com/api/v1/books/get-newbooks"
      );
      setRecentBooks(responceData.data.data);
    };
    getData();
  }, []);

  return (
    <div className="mt-12 px-4 sm:px-6 lg:px-12">
      <h4 className="text-3xl text-yellow-100 font-semibold mb-6">
        Recently Added Books
      </h4>
      
      {/* Loading State */}
      {recentBooks.length === 0 && (
        <div className="flex items-center justify-center my-8">
          <Loder />
        </div>
      )}

      {/* Book Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-8">
        {recentBooks &&
          recentBooks.map((bookData, index) => (
            <BookCards data={bookData} key={index} />
          ))}
      </div>
    </div>
  );
}
