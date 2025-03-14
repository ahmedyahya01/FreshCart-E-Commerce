import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { authContextProvider } from "../../context/AuthContextProvider";
import { BeatLoader } from "react-spinners";
import { Helmet } from "react-helmet";

export default function UpdatePassword() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const { setToken } = useContext(authContextProvider);
  const [currentPassword, setCurrentPassword] = useState(false);
  const [newPassword, setnewPassword] = useState(false);
  const [rePassword, setRePassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const user = {
    currentPassword: "",
    password: "",
    rePassword: "",
  };
  async function ChangePassword(value) {
    setIsLoading(true);
    try {
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        value,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setToken(data.token);
      localStorage.setItem("tkn", data.token);
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
  const changePassFormik = useFormik({
    initialValues: user,
    onSubmit: ChangePassword,
    validationSchema: yup.object().shape({
      currentPassword: yup.string().required("Password Is Required"),
      password: yup
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(100, "Password must be between 8 and 100 characters long")
        .required("Password Is Required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
          "password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
      rePassword: yup
        .string()
        .required("Confirm Password Is Required")
        .oneOf(
          [yup.ref("password")],
          "NewPassword and confirm new Password don't match"
        ),
    }),
  });
  return (
    <>
      <Helmet>
        <title>Update Password | FreshCart</title>
        <meta
          name="description"
          content="Secure your FreshCart account by updating your password regularly."
        />
        <meta
          name="keywords"
          content="update password, change password, FreshCart, security"
        />
        <meta property="og:title" content="Update Password | FreshCart" />
        <meta
          property="og:description"
          content="Secure your FreshCart account by updating your password regularly."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      {isFail ? (
        <div
          className="p-4 mb-4 text-base md:text-xl text-center text-red-800 rounded-lg bg-red-100"
          role="alert"
        >
          <span className="font-medium">{isFail}</span>
        </div>
      ) : (
        ""
      )}
      {isSuccess ? (
        <div
          className="p-4 mb-4 text-base md:text-xl text-center text-white rounded-lg bg-[#4fc74f]"
          role="alert"
        >
          <span className="font-medium">Password changed successfully</span>
        </div>
      ) : (
        ""
      )}
      <section className="py-10">
        <div className="container">
          <form
            onSubmit={changePassFormik.handleSubmit}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-xl lg:text-2xl xl:text-3xl text-center mb-6 font-semibold">
              Change Your Password
            </h1>
            <div className="relative z-0 w-full group">
              <input
                onBlur={changePassFormik.handleBlur}
                value={changePassFormik.values.currentPassword}
                onChange={changePassFormik.handleChange}
                type={currentPassword ? "text" : "password"}
                name="currentPassword"
                id="currentPassword"
                autoComplete="current-password"
                className="block py-3 px-1 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#36bb36] peer"
                placeholder=" "
              />
              <label
                htmlFor="currentPassword"
                className="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#36bb36] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
              >
                Current Password
              </label>
              {currentPassword ? (
                <i
                  onClick={() => setCurrentPassword(!currentPassword)}
                  className="fa-solid fa-lock-open text-xl absolute right-2 top-[50%] -translate-y-[50%] cursor-pointer"
                ></i>
              ) : (
                <i
                  onClick={() => setCurrentPassword(!currentPassword)}
                  className="fa-solid fa-lock text-xl absolute right-2 top-[50%] -translate-y-[50%] cursor-pointer"
                ></i>
              )}
            </div>
            <div
              className={`flex justify-between mt-1 ${
                changePassFormik.errors.currentPassword &&
                changePassFormik.touched.currentPassword
                  ? "mb-5"
                  : ""
              }`}
            >
              <Link
                to={"/ForgetPassword"}
                className="cursor-pointer ms-auto text-sm lg:text-base order-1 text-[#36bb36] hover:underline duration-300"
              >
                Forget Password?
              </Link>
              {changePassFormik.errors.currentPassword &&
              changePassFormik.touched.currentPassword ? (
                <div className="text-sm md:text-base text-red-800" role="alert">
                  <span className="font-medium">
                    {changePassFormik.errors.currentPassword}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="relative z-0 w-full group">
              <input
                onBlur={changePassFormik.handleBlur}
                value={changePassFormik.values.password}
                onChange={changePassFormik.handleChange}
                type={newPassword ? "text" : "password"}
                name="password"
                id="password"
                autoComplete="current-password"
                className="block py-3 px-1 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#36bb36] peer"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#36bb36] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
              >
                New Password
              </label>
              <div>
                {newPassword ? (
                  <i
                    onClick={() => setnewPassword(!newPassword)}
                    className="fa-solid fa-lock-open text-xl absolute right-2 top-[50%] -translate-y-[50%] cursor-pointer"
                  ></i>
                ) : (
                  <i
                    onClick={() => setnewPassword(!newPassword)}
                    className="fa-solid fa-lock text-xl absolute right-2 top-[50%] -translate-y-[50%] cursor-pointer"
                  ></i>
                )}
              </div>
            </div>
            <div className="mt-1 mb-5">
              {changePassFormik.errors.password &&
              changePassFormik.touched.password ? (
                <div className="text-sm md:text-base text-red-800" role="alert">
                  <span className="font-medium">
                    {changePassFormik.errors.password}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="relative z-0 mt-6 w-full group">
              <input
                onBlur={changePassFormik.handleBlur}
                value={changePassFormik.values.rePassword}
                onChange={changePassFormik.handleChange}
                type={rePassword ? "text" : "password"}
                name="rePassword"
                id="rePassword"
                autoComplete="current-password"
                className="block py-3 px-1 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#36bb36] peer"
                placeholder=" "
              />
              <label
                htmlFor="rePassword"
                className="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#36bb36] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
              >
                Confirm New Password
              </label>
              {rePassword ? (
                <i
                  onClick={() => setRePassword(!rePassword)}
                  className="fa-solid fa-lock-open text-xl absolute right-2 top-[50%] -translate-y-[50%] cursor-pointer"
                ></i>
              ) : (
                <i
                  onClick={() => setRePassword(!rePassword)}
                  className="fa-solid fa-lock text-xl absolute right-2 top-[50%] -translate-y-[50%] cursor-pointer"
                ></i>
              )}
            </div>
            <div className="mt-1 mb-3">
              {changePassFormik.errors.rePassword &&
              changePassFormik.touched.rePassword ? (
                <div className="text-sm md:text-base text-red-800" role="alert">
                  <span className="font-medium">
                    {changePassFormik.errors.rePassword}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            <button className="text-white bg-[#36bb36] hover:bg-[#4fc74f] duration-300 focus:outline-none font-medium rounded-md text-lg w-full py-2 text-center">
              {isLoading ? <BeatLoader color="white" /> : "Change Password"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
