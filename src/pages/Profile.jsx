import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/profile/SideBar.jsx";
import axios from "axios";
import Lorder from "../components/loder/Loder.jsx";

export default function Profile() {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfileData = async () => {

      const response = await axios.get("https://server-v0-s4ta.onrender.com/api/v1/user/getuser",{ headers });
      setProfile(response.data);
    };
    getProfileData();
  }, []);

  return (
    <div className="bg-zinc-900 px-4 md:px-8 py-6 flex flex-col md:flex-row h-auto text-white min-h-screen">
      {!profile ? (
        <div className="flex items-center justify-center w-full">
          <Lorder />
        </div>
      ) : (
        <div className=" w-full flex flex-col md:flex-row gap-4 p-4">
          {/* Sidebar */}
          <div className="w-full md:w-2/6 lg:w-1/6 bg-zinc-800 md:bg-transparent md:block md:sticky top-0 left-0 z-10">
            <SideBar data={profile} />
          </div>

          {/* Main Content */}
          <div className="w-full md:w-4/6 lg:w-5/6 px-4 lg:px-8 top-0 left-0 bg-zinc-800 md:bg-transparent rounded">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}
