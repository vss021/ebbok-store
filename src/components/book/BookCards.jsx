import React from "react";
import { Link } from "react-router-dom";

export default function BookCards({ data }) {
  return (
    <Link to={`/view-book-details/${data._id}`}>
      <div className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex flex-col">
        {/* Book Image */}
        <div
          className="bg-gray-800 m-2 rounded-lg  shadow-lg max-h-60 flex flex-col items-center"
        >
          <img
            src={data.url}
            alt={data.title}
            className="rounded-lg shadow-lg h-60  object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Book Title */}
          <h2 className="text-white text-lg font-semibold truncate">
            {data.title}
          </h2>

          {/* Author Name */}
          <p className="mt-2 text-gray-400 text-sm font-medium">
            By: {data.author}
          </p>

          {/* Price */}
          <p className="mt-2 text-yellow-400 font-bold text-lg">${data.price}</p>

          {/* Call to Action */}
          <button className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-md transition duration-300">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
