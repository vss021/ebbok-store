import axios from "axios";
import React, { useEffect, useState } from "react";
import Loder from "../components/loder/Loder.jsx";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"; 
import { toast } from "react-toastify";

export default function Cart() {

  const navigatorTo = useNavigate();
  const [cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const cartData = async () => {
      const response = await axios.get(
        "https://server-v0-s4ta.onrender.com/api/v1/cart/cart-data",
        { headers }
      );
      setCart(response.data.data);
    };
    cartData();
  }, []);


  const deleteItem = async (bookid) => {
    try {
      const response = await axios.put(
        `https://server-v0-s4ta.onrender.com/api/v1/cart/remove/${bookid}`,
        null,
        { headers }
      );
      setCart((prevCart) => prevCart.filter((item) => item._id !== bookid));
      toast.success(response.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message
      );
    }
  };

  useEffect(()=>{
    if(cart && cart.length > 0){
      let total = 0;
      
      cart.map((item) => {
        total += item.price;
      });
      setTotal(total);
    }
  },[cart]);

  const palceMyOrder = async() => {
    try {

      const response = await axios.post(`https://server-v0-s4ta.onrender.com/api/v1/order/place-order`, {order : cart}, {headers});
      alert(response.data.message);
      navigatorTo("/profile/orderhistory");

    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }


  if (!isLoggedIn || !cart ) {
    return (
      <div className="h-[75vh] flex items-center justify-center">
        <Loder />
      </div>
    );
  }

 

  return (
    <div className="bg-zinc-900 px-12 h-screen py-8">
      {cart.length === 0 && (
        <div className="h-screen">
          <div className="flex h-[100%] items-center justify-center flex-col">
            <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
              Empty Cart
            </h1>
            <img src="./cart.png" alt="empty cart" />
          </div>
        </div>
      ) }
      
      {cart.length > 0 && (
        <>
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            Your Cart
          </h1>
          {cart.map((item) => (
            <div
              key={item._id}
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
            >
              <img
                src={item.url}
                alt={item.title}
                className="h-[20vh] md:h-[10vh] object-cover"
              />
              <div className="w-full md:w-auto">
                <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                  {item.title}
                </h1>
                <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                  {item.description.slice(0, 100)}...
                </p>
              </div>
              <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                <h2 className="text-zinc-100 text-3xl font-semibold flex">
                  ${item.price}
                </h2>
                <button
                  className="bg-red-100 text-red-800 border border-red-800 rounded p-2 ms-12"
                  onClick={() => deleteItem(item._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
{/* Place Order */}
      {
        cart.length > 0 && (

          <div className="mt-4 w-full flex items-center justify-end">
            <div className="p-4 bg-zinc-800 rounded">
              <h1 className=" text-3xl text-zinc-200 font-semibold">
                Total Amount
              </h1>


              <div className="mt-3 flex items-center justify-between text-xl text-zinc-300">
                <h2>{cart.length} Books</h2> <h2>{Total}</h2>
              </div>
              <div className="w-[100%] mt-3">
                <button
                onClick={palceMyOrder}
                 className=" bg-zinc-700 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-600 hover:text-white">
                  Place Your Order
                </button>
              </div>
            </div>
          </div>

        )
      }

    </div>
  );
}
