import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../loder/Loder.jsx";
import { toast } from "react-toastify";

export default function Setting() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [Address, setValue] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch the current user's data based on ID
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          `https://server-v0-s4ta.onrender.com/api/v1/user/getuser`,
          { headers }
        );
        setValue(response.data.address)
        setCurrentUser(response.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchCurrentUser();
  }, []);

  // Handle user details update
  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(
        `https://server-v0-s4ta.onrender.com/api/v1/user/update-address`,
          {Address}, // Send updated data
        { headers }
      );
      toast.success(response.data.message);
      setIsEditing(false);
      setCurrentUser(currentUser); // Sync current user with new data
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user.");
    }
  };

  if (!currentUser) {
    return (
      <div className=" flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-auto bg-gray-800 shadow lg:p-2 rounded-lg flex items-center justify-center">
      <div className="w-full mx-auto rounded-lg p-6 border border-white">
        <h1 className="md:text-4xl font-semibold text-zinc-100 mb-4">
          Your Current Profile
        </h1>

        <div className="space-y-4">
          {/* Avatar */}
          <div className="flex items-center space-x-4">
            <img
              src={currentUser.avatar}
              alt="Avatar"
              className="w-16 h-16 rounded-full border cursor-pointer"
            />

            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </button>
          </div>

          {/* User Details */}
          <div>
            <label className="block text-zinc-300 font-medium">Username:</label>
            <input
              type="text"
              value={currentUser.userName}
              disabled
              className="w-full mt-1 px-3 py-2 border rounded bg-zinc-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-medium">Email:</label>
            <input
              type="email"
              value={currentUser.email}
              disabled
              className="w-full mt-1 px-3 py-2 border rounded bg-zinc-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-medium">Role:</label>
            <input
              type="text"
              value={currentUser.role}
              disabled
              className="w-full mt-1 px-3 py-2 border rounded bg-zinc-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-medium">Address:</label>
            <textarea
              value={Address}
              disabled={!isEditing}
              onChange={(e) => setValue(e.target.value)}
              className={`w-full mt-1 px-3 py-2 border rounded ${
                isEditing ? "bg-zinc-500" : "bg-zinc-600"
              }`}
            />
          </div>

          {/* Save Changes Button */}
          {isEditing && (
            <button
              onClick={handleUpdateUser}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
