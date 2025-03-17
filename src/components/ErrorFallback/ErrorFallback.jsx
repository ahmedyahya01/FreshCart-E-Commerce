import React from "react";
import Navbar from "../Navbar/Navbar";
import { Offline } from "react-detect-offline";

export default function ErrorFallback() {
  return (
    <>
      <Navbar />
      <Offline>
        <div className="fixed w-10/12 md:w-fit lg:text-lg top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-black text-white text-center rounded-md py-3 px-5 font-bold z-50">
          ⚠️ No Internet Connection. Please check your network.
        </div>
      </Offline>
    </>
  );
}
