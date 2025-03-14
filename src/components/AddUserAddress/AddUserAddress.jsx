import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addressProvider } from "../../context/AddressContext";
import { Helmet } from "react-helmet";
export default function AddUserAddress() {
  const { getAllAddresses } = useContext(addressProvider);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  let navigate = useNavigate();
  function addAddress(values) {
    setLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/addresses", values, {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        getAllAddresses();
        toast.success("Add address successfully", {
          position: "bottom-right",
          duration: 3000,
          className: "md:text-xl",
        });
        navigate("/AllUserAddresses");
      })
      .catch((error) => {
        console.log("errors", error.data);
        toast.error("Add address failed", {
          position: "bottom-right",
          duration: 3000,
          className: "md:text-xl",
        });
      });
    setLoading(false);
  }
  const userAddres = {
    name: "",
    details: "",
    phone: "",
    city: "",
  };
  const addressFormik = useFormik({
    initialValues: userAddres,
    onSubmit: addAddress,
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .trim()
        .required("Address Name Is Required")
        .min(3, "Address Name must be at least 3 characters long")
        .max(30, "Address Name must be between 3 and 30 characters long"),
      city: yup
        .string()
        .trim()
        .required("The City Is Required")
        .min(3, "The City must be at least 3 characters long")
        .max(20, "The City must be between 3 and 20 characters long"),
      phone: yup
        .string()
        .required("Phone Is Required")
        .matches(
          /^(02)?(01)[0125][0-9]{8}$/,
          "The phone number must start with 010, 011, 012, or 015 and be 11 digits long"
        ),
      details: yup
        .string()
        .trim()
        .required("Details Is Required")
        .min(3, "Details must be at least 3 characters long")
        .max(300, "Details must be between 3 and 300 characters long"),
    }),
  });
  return (
    <>
      <Helmet>
        <title>Add New Address | FreshCart</title>
        <meta
          name="description"
          content="Add a new shipping address to your FreshCart account for a seamless shopping experience."
        />
        <meta
          name="keywords"
          content="FreshCart, add address, shipping, delivery, new address, customer address"
        />
        <meta property="og:title" content="Add New Address | FreshCart" />
        <meta
          property="og:description"
          content="Save a new shipping address to your FreshCart account for convenient deliveries."
        />
      </Helmet>

      <section id="AProviderddUserAddress" className="py-10">
        <div className="container">
          <h1 className="text-xl lg:text-2xl xl:text-3xl text-center mb-6 font-semibold">
            Billing Information
          </h1>
          <form
            onSubmit={addressFormik.handleSubmit}
            className="max-w-lg mx-auto"
          >
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-1 text-xs ms-1 md:text-base lg:text-lg"
              >
                Address Name
              </label>
              <input
                onBlur={addressFormik.handleBlur}
                onChange={addressFormik.handleChange}
                value={addressFormik.values.name}
                type="text"
                id="name"
                className="shadow-xs bg-gray-50 border border-gray-300 text-sm lg:text-base rounded-lg block w-full p-3 outline-none"
                placeholder="Home or Company..."
              />
              {addressFormik.errors.name && addressFormik.touched.name ? (
                <div
                  className="text-sm md:text-base text-red-800 mt-1"
                  role="alert"
                >
                  <span className="font-medium">
                    {addressFormik.errors.name}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="city"
                className="block mb-1 text-xs ms-1 md:text-base lg:text-lg"
              >
                City
              </label>
              <input
                onBlur={addressFormik.handleBlur}
                onChange={addressFormik.handleChange}
                value={addressFormik.values.city}
                type="text"
                id="city"
                placeholder="Enter Your City"
                className="shadow-xs bg-gray-50 border border-gray-300 text-sm lg:text-base rounded-lg block w-full p-3 outline-none"
              />
              {addressFormik.errors.city && addressFormik.touched.city ? (
                <div
                  className="text-sm md:text-base text-red-800 mt-1"
                  role="alert"
                >
                  <span className="font-medium">
                    {addressFormik.errors.city}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="phone"
                className="block mb-1 text-xs ms-1 md:text-base lg:text-lg"
              >
                Phone Number
              </label>
              <input
                onBlur={addressFormik.handleBlur}
                onChange={addressFormik.handleChange}
                value={addressFormik.values.phone}
                type="text"
                id="phone"
                placeholder="Enter Your Phone Number"
                className="shadow-xs bg-gray-50 border border-gray-300 text-sm lg:text-base rounded-lg block w-full p-3 outline-none"
              />
              {addressFormik.errors.phone && addressFormik.touched.phone ? (
                <div
                  className="text-sm md:text-base text-red-800 mt-1"
                  role="alert"
                >
                  <span className="font-medium">
                    {addressFormik.errors.phone}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="details"
                className="block mb-1 text-xs ms-1 md:text-base lg:text-lg"
              >
                Details
              </label>
              <textarea
                onBlur={addressFormik.handleBlur}
                onChange={addressFormik.handleChange}
                value={addressFormik.values.details}
                rows={100}
                type="text"
                id="details"
                style={{ height: "100px" }}
                maxLength={300}
                placeholder="Street name, building number and apartment number"
                className="shadow-xs resize-none break-words bg-gray-50 border border-gray-300 text-sm lg:text-base rounded-lg block w-full p-3 outline-none"
              />
              {addressFormik.errors.details && addressFormik.touched.details ? (
                <div
                  className="text-sm md:text-base text-red-800 mt-1"
                  role="alert"
                >
                  <span className="font-medium">
                    {addressFormik.errors.details}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            <button className="text-white disabled:opacity-70 bg-[#4FC74F] focus:outline-none font-medium rounded-lg text-sm md:text-base px-5 py-2.5 text-center">
              {loading ? "Loading..." : "Save Information"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
