import React from "react";
import amazonLogo from "../../assets/images/amazonLogo.svg";
import mastercardLogo from "../../assets/images/mastercardLogo.svg";
import paypalLogo from "../../assets/images/paypalLogo.svg";
import googlePlayLogo from "../../assets/images/googlePlay.png";
import appStoreLogo from "../../assets/images/appStore.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-[#F0F3F2] py-10">
        <div className="container flex flex-col items-center lg:items-start">
          <h3 className="text-lg lg:text-2xl mb-1">Get The FreshCart App</h3>
          <p className="text-[#555] text-base mb-3 text-center lg:text-start">
            We Will Send You a Link, Open It On Your Phone To Download The App.
          </p>
          <div className="w-full flex flex-col items-center lg:flex-row gap-3 px-3 pb-8 border-b border-gray-300">
            <div className="w-full">
              <input
                type="text"
                placeholder="Email..."
                className="px-3 py-1 lg:py-2 text-base lg:text-base rounded-md border border-[#555] w-full outline-none caret-green-800"
              />
            </div>
            <div className="lg:w-1/4">
              <button className="text-white bg-[#36bb36] hover:bg-[#4fc74f] duration-300 py-[9px] px-10 lg:text-xl rounded-lg w-full">
                Share App Link
              </button>
            </div>
          </div>
          <div className="lg:flex lg:justify-between lg:items-center text-xl py-4 border-b border-gray-300 w-full">
            <div className="lg:flex text-center gap-3 items-center justify-center">
              <span className="inline-block mb-4 lg:mb-0">
                Payment Patterns
              </span>
              <div className="flex justify-center mb-4 lg:mb-0 gap-3">
                <img
                  src={amazonLogo}
                  className="cursor-pointer w-10"
                  alt="amazonLogo"
                />
                <img
                  src={mastercardLogo}
                  className="cursor-pointer w-10"
                  alt="mastercard"
                />
                <img
                  src={paypalLogo}
                  className="cursor-pointer w-10"
                  alt="paypal"
                />
              </div>
            </div>
            <div className="lg:flex text-center gap-3 items-center justify-center">
              <span className="inline-block text-lg mb-4 lg:mb-0">
                Get Delveries With FreshCart
              </span>
              <div className="flex flex-col items-center sm:flex-row justify-center gap-3 ">
                <img
                  src={googlePlayLogo}
                  className="cursor-pointer w-32"
                  alt="googlePlay"
                />
                <img
                  src={appStoreLogo}
                  className="cursor-pointer w-32"
                  alt="appStore"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
