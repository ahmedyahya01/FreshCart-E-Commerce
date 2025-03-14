import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import * as yup from "yup";
import { authContextProvider } from "./../../context/AuthContextProvider";
import { Helmet } from "react-helmet";

export default function ForgetPassword() {
  const emailRef = useRef();
  useEffect(() => {
    window.scroll(0, 0);
    emailRef.current.focus();
  }, []);
  const { setEmail } = useContext(authContextProvider);
  const [isLoading, setIsLoading] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [isfail, setIsfail] = useState(null);
  const navigate = useNavigate();
  const user = {
    email: "",
  };
  async function sendEmail(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );

      setEmail(values.email);
      localStorage.setItem("email", values.email);
      setIsSuccess(data.message);
      setTimeout(() => {
        navigate("/VerifyResetCode");
      }, 2000);
    } catch (error) {
      setIsfail(error.response.data.message);
      setTimeout(() => {
        setIsfail(null);
      }, 5000);
    }
    setIsLoading(false);
  }
  const forgetPassFormik = useFormik({
    initialValues: user,
    onSubmit: sendEmail,
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email()
        .required("Email Is Required")
        .matches(
          /^(?!.*\.\.)[a-zA-Z0-9][a-zA-Z0-9._%+-]{0,63}@[a-zA-Z0-9][a-zA-Z0-9-]{0,50}\.[a-zA-Z]{2,}$/,
          "email must be a valid email"
        ),
    }),
  });
  return (
    <>
      <Helmet>
        <title>Verify Email | FreshCart</title>
        <meta
          name="description"
          content="Enter your email to receive a verification code and reset your password."
        />
        <meta
          name="keywords"
          content="email verification, password reset, FreshCart, recover account"
        />
        <meta property="og:title" content="Verify Email | FreshCart" />
        <meta
          property="og:description"
          content="Enter your email to receive a verification code and reset your password."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      {isfail ? (
        <div
          className="p-4 mb-4 text-lg md:text-xl text-center text-red-800 rounded-lg bg-red-100"
          role="alert"
        >
          <span className="font-medium">{isfail}</span>
        </div>
      ) : (
        ""
      )}
      {isSuccess ? (
        <div
          className="p-4 mb-4 text-lg md:text-xl text-center text-white rounded-lg bg-[#4fc74f]"
          role="alert"
        >
          <span className="font-medium">{isSuccess}</span>
        </div>
      ) : (
        ""
      )}
      <section id="forgetPassword" className="py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-xl lg:text-2xl xl:text-3xl text-center mb-2 font-semibold">
              Forget your Password?
            </h1>
            <p className="text-base leading-tight md:text-lg lg:text-xl">
              Enter the email to get code reset Your password
            </p>
            <form
              onSubmit={forgetPassFormik.handleSubmit}
              className="max-w-3xl mx-auto mt-8"
            >
              <div className="relative z-0 w-full mb-6 group text-start">
                <input
                  ref={emailRef}
                  onBlur={forgetPassFormik.handleBlur}
                  value={forgetPassFormik.values.email}
                  onChange={forgetPassFormik.handleChange}
                  type="text"
                  name="email"
                  id="email"
                  className="block py-3 px-1 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#36bb36] peer"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="eer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#36bb36] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
                >
                  Enter your email
                </label>
              {forgetPassFormik.errors.email &&
              forgetPassFormik.touched.email ? (
                <div
                  className="mt-2 text-base text-red-800"
                  role="alert"
                >
                  <span className="font-medium">
                    {forgetPassFormik.errors.email}
                  </span>
                </div>
              ) : (
                ""
              )}
              </div>
              <button
                type="submit"
                className="text-white bg-[#36bb36] hover:bg-[#4fc74f] duration-300 focus:outline-none font-medium rounded-md text-lg w-full py-2 text-center"
              >
                {isLoading ? <BeatLoader color="white" /> : "Send"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
