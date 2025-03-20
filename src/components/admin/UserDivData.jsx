import React from 'react';
import { toast } from "react-toastify";
import {RxCross1} from "react-icons/rx";

export default function UserDivData({setUserDiv, userDiv, userData}) {
  
  return (
    <>
      <div className={`${userDiv} top-0 left-0 h-screen w-full bg-zinc-800 opacity-80`}>
        <div className={`${userData} top-0 left-0 h-screen w-full flex items-center justify-center`}>

          <div className="bg-zinc-500 rounded p-4 w-[80%] md:w-[50%] lg:w-[40%]">
              <div className=' flex items-center justify-between'>
                  <h1 className=' text-2xl font-semibold text-black' >User Information</h1>
                  <button className='text-black' onClick={() => setUserDiv("hidden")}>
                      <RxCross1/>
                  </button>
              </div>

              <div className="mt-2">
                <label htmlFor="">
                  Username : {" "}
                  <span className=' font-semibold'>{userData?.userName}</span>
                </label>
              </div>
              <div className="mt-2">
                <label htmlFor="">
                  Email : {" "}
                  <span className=' font-semibold'>{userData?.email}</span>
                </label>
              </div>
              <div className="mt-2">
                <label htmlFor="">
                  Address : {" "}
                  <span className=' font-semibold'>{userData?.address}</span>
                </label>
              </div>
          </div>
        </div>

      </div>
    </>
  );
}
