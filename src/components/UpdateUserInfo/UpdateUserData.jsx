import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { authContextProvider } from "../../context/AuthContextProvider";
import { BeatLoader } from "react-spinners";
import { Helmet } from "react-helmet";

export default function UpdateUserData() {
  const nameRef = useRef();
  useEffect(() => {
    window.scroll(0, 0);
    nameRef.current.focus();
  }, []);
  const { setName, setEmail } = useContext(authContextProvider);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const user = {
    name: "",
    email: "",
    phone: "",
  };
  async function ChangeUserData(value) {
    setIsLoading(true);
    try {
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
        value,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setName(data.user.name);
      localStorage.setItem("name", data.user.name);
      setEmail(data.user.email);
      localStorage.setItem("email", data.user.email);
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.log("error", error);
      setIsFail(error.response.data.errors.msg);
      setTimeout(() => {
        setIsFail(false);
      }, 3000);
    }
    setIsLoading(false);
  }
  const updateDataFormik = useFormik({
    initialValues: user,
    onSubmit: ChangeUserData,
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .trim()
        .required("Name Is Required")
        .min(2, "The name must be at least 2 characters long")
        .max(30, "The name must be between 2 and 30 characters long")
        .matches(
          /^[a-z\s]{2,30}$/i,
          "The name must contain only letters without numbers or symbols"
        ),
      email: yup
        .string()
        .email()
        .required("Email Is Required")
        .matches(
          /^(?!.*\.\.)[a-zA-Z0-9][a-zA-Z0-9._%+-]{0,63}@[a-zA-Z0-9][a-zA-Z0-9-]{0,50}\.[a-zA-Z]{2,}$/,
          "email must be a valid email"
        ),
      phone: yup
        .string()
        .required("Phone Is Required")
        .matches(
          /^(02)?(01)[0125][0-9]{8}$/,
          "The phone number must start with 010, 011, 012, or 015 and be 11 digits long"
        ),
    }),
  });
  return (
    <>
      <Helmet>
        <title>Update Profile | FreshCart</title>
        <meta
          name="description"
          content="Edit your personal details and manage your account information on FreshCart."
        />
        <meta
          name="keywords"
          content="update profile, FreshCart, user information, edit account"
        />
        <meta property="og:title" content="Update Profile | FreshCart" />
        <meta
          property="og:description"
          content="Edit your personal details and manage your account information on FreshCart."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {isFail ? (
        <div
          className="p-4 mb-4 text-lg md:text-xl text-center text-red-800 mt-1 rounded-lg bg-red-100"
          role="alert"
        >
          <span className="font-medium">{isFail}</span>
        </div>
      ) : (
        ""
      )}
      {isSuccess ? (
        <div
          className="p-4 mb-4 text-lg md:text-xl text-center text-white rounded-lg bg-[#4fc74f]"
          role="alert"
        >
          <span className="font-medium">Your Data changed successfully</span>
        </div>
      ) : (
        ""
      )}
      <section className="py-16">
        <div className="container">
          <form
            onSubmit={updateDataFormik.handleSubmit}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-xl lg:text-2xl xl:text-3xl text-center mb-6 font-semibold">
              Update Your Data
            </h1>
            <div className="relative z-0 w-full mb-5 group">
              <input
              onBlur={updateDataFormik.handleBlur}
                ref={nameRef}
                value={updateDataFormik.values.name}
                onChange={updateDataFormik.handleChange}
                type="text"
                name="name"
                id="name"
                className="block py-3 px-1 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#36bb36] peer"
                placeholder=" "
              />
              <label
                htmlFor="name"
                className="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#36bb36] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
              >
                Name
              </label>
            {updateDataFormik.errors.name && updateDataFormik.touched.name ? (
              <div className="text-sm md:text-base text-red-800 mt-1" role="alert">
                <span className="font-medium">
                  {updateDataFormik.errors.name}
                </span>
              </div>
            ) : (
              ""
            )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
              onBlur={updateDataFormik.handleBlur}
                value={updateDataFormik.values.email}
                onChange={updateDataFormik.handleChange}
                type="text"
                name="email"
                id="email"
                className="block py-3 px-1 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#36bb36] peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#36bb36] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
              >
                Email
              </label>
            {updateDataFormik.errors.email && updateDataFormik.touched.email ? (
              <div className="text-sm md:text-base text-red-800 mt-1" role="alert">
                <span className="font-medium">
                  {updateDataFormik.errors.email}
                </span>
              </div>
            ) : (
              ""
            )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
              onBlur={updateDataFormik.handleBlur}
                value={updateDataFormik.values.phone}
                onChange={updateDataFormik.handleChange}
                type="text"
                name="phone"
                id="phone"
                autoComplete="current-password"
                className="block py-3 px-1 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#36bb36] peer"
                placeholder=" "
              />
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#36bb36] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
              >
                Phone
              </label>
            {updateDataFormik.errors.phone && updateDataFormik.touched.phone ? (
              <div className="text-sm md:text-base text-red-800 mt-1" role="alert">
                <span className="font-medium">
                  {updateDataFormik.errors.phone}
                </span>
              </div>
            ) : (
              ""
            )}
            </div>
            <button className="text-white bg-[#36bb36] hover:bg-[#4fc74f] duration-300 focus:outline-none font-medium rounded-md text-lg w-full py-2 text-center">
              {isLoading ? <BeatLoader color="white" /> : "Update data"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
