import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import * as yup from "yup";
import { authContextProvider } from "../../context/AuthContextProvider";
import { cartContext } from "../../context/CartContext";
import { wishlistContext } from "../../context/WishlistContext";
import { Helmet } from "react-helmet";

export default function Login() {
  const { getWishlist, allData, setFavIcons } = useContext(wishlistContext);
  const { setCartProducts, allProducts, getUserCart } = useContext(cartContext);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [isFail, setIsFail] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const { setToken, setEmail, setName, setUserId } =
    useContext(authContextProvider);
  async function userLogin(values) {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
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
        navigate("/Home");
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      setIsFail(error.response.data.message);
      setTimeout(() => {
        setIsFail(false);
      }, 3000);
    }
  }
  const user = {
    email: "",
    password: "",
  };
  const loginFormik = useFormik({
    initialValues: user,
    onSubmit: userLogin,
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email()
        .required("Email Is Required")
        .matches(
          /^(?!.*\.\.)[a-zA-Z0-9][a-zA-Z0-9._%+-]{0,63}@[a-zA-Z0-9][a-zA-Z0-9-]{0,50}\.[a-zA-Z]{2,}$/,
          "email must be a valid email"
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
    }),
  });

  return (
    <>
      <Helmet>
        <title>Login | FreshCart</title>
        <meta
          name="description"
          content="Log in to your FreshCart account to access your orders, wishlist, and more."
        />
        <meta name="keywords" content="login, FreshCart, account, sign in" />
        <meta property="og:title" content="Login | FreshCart" />
        <meta
          property="og:description"
          content="Log in to your FreshCart account to access your orders, wishlist, and more."
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
          <span className="font-medium">Welcome Back</span>
        </div>
      ) : (
        ""
      )}
      <section className="py-16">
        <div className="container">
          <form
            onSubmit={loginFormik.handleSubmit}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-xl lg:text-2xl xl:text-3xl text-center mb-5 font-semibold">
              Login Now
            </h1>
            <div className="relative z-0 w-full mb-10 group">
              <input
                onBlur={loginFormik.handleBlur}
                onChange={loginFormik.handleChange}
                value={loginFormik.values.email}
                type="text"
                name="email"
                id="email"
                autoComplete="username"
                className="block py-3 px-1 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#36bb36] peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-base text-gray-500 duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#36bb36] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9"
              >
                Email
              </label>
              {loginFormik.errors.email && loginFormik.touched.email ? (
                <div className="mt-2 text-base text-red-800" role="alert">
                  <span className="font-medium">
                    {loginFormik.errors.email}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="relative z-0 w-full group">
              <input
                onBlur={loginFormik.handleBlur}
                onChange={loginFormik.handleChange}
                value={loginFormik.values.password}
                type={showPassword ? "text" : "password"}
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
            <div className="flex justify-between mt-2">
              <Link
                to={"/ForgetPassword"}
                className="cursor-pointer ms-auto text-sm lg:text-base order-1 text-[#36bb36] hover:underline duration-300"
              >
                Forget Password?
              </Link>
              {loginFormik.errors.password && loginFormik.touched.password ? (
                <div
                  className="mb-4 text-sm md:text-base text-red-800"
                  role="alert"
                >
                  <span className="font-medium">
                    {loginFormik.errors.password}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            <button
              type="submit"
              className="text-white mt-3 bg-[#36bb36] hover:bg-[#4fc74f] duration-300 focus:outline-none font-medium rounded-md text-lg w-full py-2 text-center"
            >
              {loading ? <BeatLoader color="white" /> : "Sign In"}
            </button>
            <div className="mt-2">
              <span className="text-sm lg:text-base">
                Don’t have an account yet?
                <Link
                  to={"/signup"}
                  className="cursor-pointer ms-1 text-[#36bb36] hover:underline duration-300"
                >
                  SignUp here
                </Link>
              </span>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
