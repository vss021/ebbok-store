import axios from "axios";
import React, { useEffect, useState } from "react";
import Lorder from "../loder/Loder.jsx";
import { Link } from "react-router-dom";
import {FaCheck} from 'react-icons/fa'; 
import { LuExternalLink } from "react-icons/lu";
import UserDivData from "./UserDivData.jsx";
import { toast } from "react-toastify";

export default function AllOrders() {
  const [AllOrder, setAllOrder] = useState([]);
  const [Option, setOptions] = useState();
  const [Value, setValue] = useState({status : ""});
  const [userDiv, setUserDiv] = useState("hidden");
  const [userData, setUserData] = useState();
  

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const orderData = async () => {
      const orders = await axios.get(
        "http://localhost:4000/api/v1/order/all-order",
        { headers }
      );
      setAllOrder(orders.data.data);
    };
    orderData();
  }, []);

  const handleChange = (e) => {
    const {value} = e.target;
    setValue({status : value});
  }

  const submitChanges = async(index) => {
      const id = AllOrder[index]._id;
      const response = await axios.put(`http://localhost:4000/api/v1/order//order-status/${id}`, Value, {headers});
      toast.success(response.data.message);
  }





  if(!AllOrder){
    return (
      <div className=" h-[100%] flex items-center justify-center">
          <Lorder />
        </div>
    );
  };

  if(AllOrder.length > 0){

    return (
      <>
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
          <div className="w-[5%]  text-center">User</div>
        </div>

        {/* Table Body */}
        {AllOrder.map((item, index) => (
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
              
              <Link to={`/view-book-details/${item.book?._id}`} className="hover:underline">
                {item.book?.title}
              </Link>
            </div>

            {/* Description */}
            <div className="w-full md:w-[45%] text-zinc-400">
              {item.book?.description.slice(0, 50)}...
            </div>

            {/* Price */}
            <div className="w-full md:w-[10%] text-center font-semibold">
              ${item.book?.price}
            </div>

            {/* Status */}
            <div className=" w-[30%] md:w-[16%]">
              <h1 className=" font-semibold">

                <button
                  onClick={() => {
                    setOptions(index)
                  }} 

                  className=" hover:scale-105 transition-all duration-300">
                    {
                    item?.status === "Order placed" ? (
                      <div className=" text-yellow-500">{item?.status}</div>
                    ) : item?.status === "Cenceled" ?(
                      <div className=" text-red-500">{item?.status}</div>
                    ) : (
                      <div className=" text-green-500">{item?.status}</div>
                  )}
                </button>

                <div className= {`${Option === index  ? "flex" : "hidden"}`}>
                  <select 
                  onChange={handleChange}
                  value={Value.status}
                  name="status" id="" className="bg-gray-800">
                    {[
                      "Order placed",
                      "Out for delivery",
                      "Deliverd",
                      "Cenceled",
                    ].map((item, i) => (
                        <option key={i} value={item}>
                          {item}
                        </option>
                    ))}
                  </select>
                    <button
                    onClick={() => {
                      setOptions(-1)
                      submitChanges(index)
                    }} 
                    className=" text-green-500 hover:text-pink-600 mx-2">
                      <FaCheck/>
                    </button>

                </div>

              </h1>
            </div>

            {/* User */}
            <div
            onClick={() => {
              setUserDiv("fixed");
              setUserData(item.user);
            }} 
            className=" w-[5%]  text-center text-zinc-400">
            <LuExternalLink />
            </div>
          </div>
        ))}
        </div>
        {
          userDiv && (
            <UserDivData setUserDiv = {setUserDiv} userDiv = {userDiv} userData = {userData}  />
          )
        }

      </>
    )}

}
