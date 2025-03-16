import React, { lazy, Suspense } from "react";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Loader from "./components/LoadingScreen/Loader";
import { Offline } from "react-detect-offline";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Categories from "./components/Categories/Categories";
import SpecificCategory from "./components/SpecificCategory/SpecificCategory";
import Brands from "./components/Brands/Brands";
import SpecificBrand from "./components/SpecificBrand/SpecificBrand";
import Cart from "./components/Cart/Cart";
import AddUserAddress from "./components/AddUserAddress/AddUserAddress";
import AllUserAddresses from "./components/AllUserAddresses/AllUserAddresses";
import CheckOut from "./components/CheckOut/CheckOut";
import AllOrders from "./components/AllOrders/AllOrders";
import Wishlist from "./components/Wishlist/Wishlist";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import UpdateUserData from "./components/UpdateUserInfo/UpdateUserData";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import VerifyResetCode from "./components/verifyResetPassword/VerifyResetCode";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import NotFound from "./components/NotFound/NotFound";
import AuthContextProvider from "./context/AuthContextProvider";
import CartContextProvider from "./context/CartContext";
import AddressContextProvider from "./context/AddressContext";
import WishlistContextProvider from "./context/WishlistContext";

const queryClient = new QueryClient();
export default function App() {
  const router = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/Products",
          element: <Products />,
        },
        {
          path: "productDetails/:id/:categoryId",
          element: <ProductDetails />,
        },
        {
          path: "/Home",
          element: <Home />,
        },
        {
          path: "/Categories",
          element: <Categories />,
        },
        {
          path: "/SpecificCategory/:categoryId",
          element: <SpecificCategory />,
        },
        {
          path: "/Brands",
          element: <Brands />,
        },
        {
          path: "/SpecificBrand/:BrandId",
          element: <SpecificBrand />,
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/AddUserAddress",
          element: (
            <ProtectedRoute>
              <AddUserAddress />
            </ProtectedRoute>
          ),
        },
        {
          path: "/AllUserAddresses",
          element: (
            <ProtectedRoute>
              <AllUserAddresses />
            </ProtectedRoute>
          ),
        },
        {
          path: "/CheckOut",
          element: (
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          ),
        },
        {
          path: "/Wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "/UpdatePassword",
          element: (
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          ),
        },
        {
          path: "/UpdateUserData",
          element: (
            <ProtectedRoute>
              <UpdateUserData />
            </ProtectedRoute>
          ),
        },
        { path: "/SignUp", element: <SignUp /> },
        { path: "/Login", element: <Login /> },
        { path: "/ForgetPassword", element: <ForgetPassword /> },
        { path: "/VerifyResetCode", element: <VerifyResetCode /> },
        { path: "/ResetPassword", element: <ResetPassword /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <CartContextProvider>
            <AddressContextProvider>
              <WishlistContextProvider>
                <RouterProvider router={router} />
                <Offline>
                  <div className="fixed w-10/12 md:w-fit lg:text-lg top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-black text-white text-center rounded-md py-3 px-5 font-bold z-50">
                    ⚠️ No Internet Connection. Please check your network.
                  </div>
                </Offline>
              </WishlistContextProvider>
              <Toaster />
            </AddressContextProvider>
          </CartContextProvider>
        </QueryClientProvider>
      </AuthContextProvider>
    </>
  );
}
