import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import * as yup from "yup";
import { authContextProvider } from "../../context/AuthContextProvider";
import { cartContext } from "../../context/CartContext";
import { Helmet } from "react-helmet";
import { wishlistContext } from "../../context/WishlistContext";
import { jwtDecode } from "jwt-decode";

export default function SignUp() {
  const { getWishlist, allData, setFavIcons } = useContext(wishlistContext);
  const { setCartProducts, allProducts, getUserCart } = useContext(cartContext);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [isFail, setIsFail] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const { setToken, setEmail, setName, setUserId } =
    useContext(authContextProvider);
  async function userRegistration(values) {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      console.log(data);
      setIsLoading(false);
      setIsSuccess(data.message);
      setEmail(data.user.email);
      setName(data.user.name);
      const userJwtToken = jwtDecode(data.token);
      localStorage.setItem("tkn", data.token);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("userId", userJwtToken.id);
      getUserCart();
      getWishlist();
      setUserId(userJwtToken.id);
      setTimeout(() => {
        navigate("/Home");
        setToken(data.token);
        const cartProducts = [];
        const wishlistProducts = [];
        for (let i in allProducts) {
          cartProducts.push(allProducts[i].product.id);
        }
        for (let i in allData) {
          wishlistProducts.push(allData[i].id);
        }
        setCartProducts(cartProducts);
        localStorage.setItem("Cart", JSON.stringify(cartProducts));
        setFavIcons(wishlistProducts);
        localStorage.setItem("wishlist", JSON.stringify(wishlistProducts));
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      console.log(error);

      setIsFail(error.response.data.message);
      setTimeout(() => {
        setIsFail(false);
      }, 3000);
    }
  }
  const user = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  };
  const registerFormik = useFormik({
    initialValues: user,
    onSubmit: userRegistration,
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
          "Password and confirm Password don't match"
        ),
    }),
  });

  return (
    <>
      <Helmet>
        <title>Sign Up | FreshCart</title>
        <meta
          name="description"
          content="Create your FreshCart account and start shopping today!"
        />
        <meta
          name="keywords"
          content="sign up, register, FreshCart, create account"
        />
        <meta property="og:title" content="Sign Up | FreshCart" />
        <meta
          property="og:description"
          content="Create your FreshCart account and start shopping today!"
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
          <span className="font-medium">The account has been created</span>
        </div>
      ) : (
        ""
      )}
      <section className="py-10">
        <div className="container">
          <form
            onSubmit={registerFormik.handleSubmit}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-xl lg:text-2xl xl:text-3xl text-center mb-5 font-semibold">
              Create an account
            </h1>
            <div className="relative z-0 w-full mb-6 group">
              <input
                onBlur={registerFormik.handleBlur}
                onChange={registerFormik.handleChange}
                value={registerFormik.values.name}
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                className="block py-3 px-1 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#36bb36] peer"
                placeholder=" "
              />
              <label
                htmlFor="name"
                className="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#36bb36] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
              >
                Name
              </label>
              {registerFormik.errors.name && registerFormik.touched.name ? (
                <div className="mt-2 text-sm md:text-base text-red-800" role="alert">
                  <span className="font-medium">
                    {registerFormik.errors.name}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                onBlur={registerFormik.handleBlur}
                onChange={registerFormik.handleChange}
                value={registerFormik.values.email}
                type="text"
                name="email"
                id="email"
                autoComplete="email"
                className="block py-3 px-1 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#36bb36] peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#36bb36] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
              >
                Email
              </label>
              {registerFormik.errors.email && registerFormik.touched.email ? (
                <div className="mt-2 text-sm md:text-base text-red-800" role="alert">
                  <span className="font-medium">
                    {registerFormik.errors.email}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                onBlur={registerFormik.handleBlur}
                onChange={registerFormik.handleChange}
                value={registerFormik.values.phone}
                type="tel"
                name="phone"
                id="phone"
                autoComplete="phone"
                className="block py-3 px-1 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#36bb36] peer"
                placeholder=" "
              />
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#36bb36] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
              >
                Phone Number
              </label>
              {registerFormik.errors.phone && registerFormik.touched.phone ? (
                <div className="mt-2 text-sm md:text-base text-red-800" role="alert">
                  <span className="font-medium">
                    {registerFormik.errors.phone}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                onBlur={registerFormik.handleBlur}
                onChange={registerFormik.handleChange}
                value={registerFormik.values.password}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                autoComplete="password"
                className="block py-3 px-1 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#36bb36] peer"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#36bb36] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
              >
                Password
              </label>
              {showPassword ? (
                <i
                  onClick={() => setShowPassword(!showPassword)}
                  className="fa-solid fa-lock-open text-xl absolute right-2 top-[50%] -translate-y-[50%] cursor-pointer"
                ></i>
              ) : (
                <i
                  onClick={() => setShowPassword(!showPassword)}
                  className="fa-solid fa-lock text-xl absolute right-2 top-[50%] -translate-y-[50%] cursor-pointer"
                ></i>
              )}
            </div>
              {registerFormik.errors.password &&
              registerFormik.touched.password ? (
                <div className="mt-2 mb-5 text-base text-red-800" role="alert">
                  <span className="font-medium">
                    {registerFormik.errors.password}
                  </span>
                </div>
              ) : (
                ""
              )}
            <div className="relative z-0 w-full mb-6 group">
              <input
                onBlur={registerFormik.handleBlur}
                onChange={registerFormik.handleChange}
                value={registerFormik.values.rePassword}
                type={showRePassword ? "text" : "password"}
                name="rePassword"
                id="rePassword"
                autoComplete="rePassword"
                className="block py-3 px-1 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#36bb36] peer"
                placeholder=" "
              />
              <label
                htmlFor="rePassword"
                className="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#36bb36] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
              >
                Confirm password
              </label>
              {showRePassword ? (
                <i
                  onClick={() => setShowRePassword(!showRePassword)}
                  className="fa-solid fa-lock-open text-xl absolute right-2 top-[50%] -translate-y-[50%] cursor-pointer"
                ></i>
              ) : (
                <i
                  onClick={() => setShowRePassword(!showRePassword)}
                  className="fa-solid fa-lock text-xl absolute right-2 top-[50%] -translate-y-[50%] cursor-pointer"
                ></i>
              )}
            </div>
            {registerFormik.errors.rePassword &&
            registerFormik.touched.rePassword ? (
              <div className="mt-2 mb-2 text-base text-red-800" role="alert">
                <span className="font-medium">
                  {registerFormik.errors.rePassword}
                </span>
              </div>
            ) : (
              ""
            )}
            <button
              type="submit"
              className="text-white bg-[#36bb36] hover:bg-[#4fc74f] duration-300 focus:outline-none font-medium rounded-md text-lg w-full py-2 text-center"
            >
              {loading ? <BeatLoader color="white" /> : "Register"}
            </button>
            <div className="mt-2">
              <span className="text-sm lg:text-base">
                Already have an account?
                <Link
                  to={"/login"}
                  className="cursor-pointer ms-1 text-[#36bb36] hover:underline duration-300"
                >
                  Login Here
                </Link>
              </span>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
