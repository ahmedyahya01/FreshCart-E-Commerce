import React, { useContext, useEffect } from "react";
import { addressProvider } from "../../context/AddressContext";
import Loader from "./../LoadingScreen/Loader";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function AllUserAddresses() {
  const { allAddresses, removeAddress } = useContext(addressProvider);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>My Addresses | FreshCart</title>
        <meta
          name="description"
          content="Manage your saved addresses for a faster checkout experience on FreshCart."
        />
        <meta
          name="keywords"
          content="addresses, shipping, FreshCart, user profile, delivery"
        />
        <meta property="og:title" content="My Addresses | FreshCart" />
        <meta
          property="og:description"
          content="Manage your saved addresses for a faster checkout experience on FreshCart."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <section id="allAddresses" className="py-10">
        {allAddresses.length == 0 ? (
          <div className="text-center">
            <h1 className="mb-5 text-lg md:text-xl lg:text-2xl font-semibold">
              Dont't Have Addresses Yet
            </h1>
            <Link
              to="/AddUserAddress"
              className="px-6 py-3 lg:px-8 lg:py-4 text-center rounded-md md:text-lg text-white bg-[#36BB36] hover:bg-[#4fc74f] hover:scale-105 duration-300 "
            >
              <i className="fa-solid fa-cart-shopping me-2"></i>
              Add Adress
            </Link>
          </div>
        ) : (
          <div className="container">
            <h1 className="text-center mb-5 text-lg md:text-xl lg:text-2xl font-semibold ">
              All Adresses
            </h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm md:text-base lg:text-lg text-left">
                <thead className="text-sm lg:text-base uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Address name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      City
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Details
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only"></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allAddresses.map((address) => (
                    <tr key={address._id} className="bg-white border-b">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap"
                      >
                        {address.name}
                      </th>
                      <td className="px-6 py-4">{address.city}</td>
                      <td className="px-6 py-4">{address.phone}</td>
                      <td className="px-6 py-4">{address.details}</td>
                      <td className="px-6 py-4 text-right">
                        <i
                          onClick={() => removeAddress(address._id)}
                          className="fa-solid fa-trash-can fa-xl cursor-pointer text-red-700"
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5">
              <Link
                to={"/AddUserAddress"}
                className="text-white disabled:opacity-70 bg-[#4FC74F] focus:outline-none font-medium rounded-lg text-sm md:text-base px-5 py-2.5 text-center"
              >
                Add Address
              </Link>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
