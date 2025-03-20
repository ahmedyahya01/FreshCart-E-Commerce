import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import * as yup from "yup";
import { authContextProvider } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ResetPassword() {
  const passwordRef = useRef();
  useEffect(() => {
    window.scroll(0, 0);
    passwordRef.current.focus();
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isFail, setIsFail] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(authContextProvider);
  const user = {
    email: localStorage.getItem("email"),
    newPassword: "",
  };
  async function resetPassword(values) {
    setLoading(true);
    try {
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setIsFail(error.response.data.message);
      setTimeout(() => {
        setIsFail(false);
      }, 5000);
    }
    setLoading(false);
  }
  const resetPasswordFormik = useFormik({
    initialValues: user,
    onSubmit: resetPassword,
    validationSchema: yup.object().shape({
      newPassword: yup
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(100, "Password must be between 8 and 100 characters long")
        .required("New Password Is Required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
          "password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
    }),
  });
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>Reset Password | FreshCart</title>
        <meta
          name="description"
          content="Enter your new password to reset your FreshCart account access."
        />
        <meta
          name="keywords"
          content="reset password, FreshCart, change password, recover account"
        />
        <meta property="og:title" content="Reset Password | FreshCart" />
        <meta
          property="og:description"
          content="Enter your new password to reset your FreshCart account access."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      {isFail ? (
        <div
          className="p-4 mb-4 text-lg md:text-xl text-center text-red-800 rounded-lg bg-red-100"
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
          <span className="font-medium">Reset Password Successfully</span>
        </div>
      ) : (
        ""
      )}
      <section className="py-16">
        <div className="container">
          <form
            onSubmit={resetPasswordFormik.handleSubmit}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-xl lg:text-2xl xl:text-3xl text-center mb-5 font-semibold">
              Reset Your Password
            </h1>
            <div className="relative z-0 w-full mb-6 group">
              <input
                ref={passwordRef}
                onBlur={resetPasswordFormik.handleBlur}
                onChange={resetPasswordFormik.handleChange}
                value={resetPasswordFormik.values.newPassword}
                type={showPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                className="block py-3 px-1 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#36bb36] peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#36bb36] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
              >
                Enter new Password
              </label>
              {showPassword ? (
                <i
                  onClick={() => setShowPassword(!showPassword)}
                  className="fa-solid fa-lock-open fa-xl absolute right-2 top-[50%] -translate-y-[50%] cursor-pointer"
                ></i>
              ) : (
                <i
                  onClick={() => setShowPassword(!showPassword)}
                  className="fa-solid fa-lock text-xl absolute right-2 top-[50%] -translate-y-[50%] cursor-pointer"
                ></i>
              )}
            </div>
            {resetPasswordFormik.errors.newPassword &&
            resetPasswordFormik.touched.newPassword ? (
              <div className="text-base mb-3 text-red-800" role="alert">
                <span className="font-medium">
                  {resetPasswordFormik.errors.newPassword}
                </span>
              </div>
            ) : (
              ""
            )}
            <button
              type="submit"
              className="text-white mt-3 bg-[#36bb36] hover:bg-[#4fc74f] duration-300 focus:outline-none font-medium rounded-md text-lg w-full py-2 text-center"
            >
              {loading ? <BeatLoader color="white" /> : "Reset Password"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
