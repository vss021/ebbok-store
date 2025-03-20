import React from "react";
import { Link } from "react-router-dom";
import book from "../../assets/books2.jpg";

export default function Hero() {
  return (
    <div className="h-screen lg:h-[75vh] flex flex-col md:flex-row items-center justify-center bg-gray-900">
      {/* Left Section: Text Content */}
      <div className="w-full lg:w-3/6 mb-12 md:mb-0 flex flex-col items-center lg:items-start justify-center md:ml-3 px-4 lg:px-12 pt-20 text-center lg:text-left">
        <h1 className="lg:text-6xl text-4xl font-bold text-yellow-300 leading-tight">
          Welcome to BookVerse
        </h1>
        <p className="mt-4 lg:text-2xl text-lg text-gray-300 leading-relaxed">
          Dive into an ocean of stories, gain new perspectives, and find your
          next favorite book among thousands of curated titles.
        </p>

        <div className="mt-8">
          <Link
            to="/all-books"
            className="text-yellow-300 lg:text-2xl text-lg font-medium border-2 border-yellow-300 px-8 py-3 hover:bg-yellow-300 hover:text-gray-900 transition-all duration-300 ease-in-out rounded-full shadow-lg"
          >
            Explore Our Collection
          </Link>
        </div>
      </div>

      {/* Right Section: Image */}
      <div className="w-full lg:w-3/6 flex items-center justify-center px-4">
        <img
          src={book}
          alt="Discover Books"
          className="w-full h-[60vh] rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
        />
      </div>
    </div>
  );
}
