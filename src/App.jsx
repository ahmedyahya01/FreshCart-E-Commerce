import React, { lazy, Suspense } from "react";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Loader from "./components/LoadingScreen/Loader";
// Context Providers
import AuthContextProvider from "./context/AuthContextProvider";
import CartContextProvider from "./context/CartContext";
import AddressContextProvider from "./context/AddressContext";
import WishlistContextProvider from "./context/WishlistContext";
import ErrorFallback from "./components/ErrorFallback/ErrorFallback";
import { Offline } from "react-detect-offline";

// Lazy Loaded Components
const Layout = lazy(() => import("./components/Layout/Layout"));
const Home = lazy(() => import("./components/Home/Home"));
const Login = lazy(() => import("./components/Login/Login"));
const SignUp = lazy(() => import("./components/SignUp/SignUp"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));
const Products = lazy(() => import("./components/Products/Products"));
const ProductDetails = lazy(() =>
  import("./components/ProductDetails/ProductDetails")
);
const Categories = lazy(() => import("./components/Categories/Categories"));
const SpecificCategory = lazy(() =>
  import("./components/SpecificCategory/SpecificCategory")
);
const Brands = lazy(() => import("./components/Brands/Brands"));
const SpecificBrand = lazy(() =>
  import("./components/SpecificBrand/SpecificBrand")
);
const Cart = lazy(() => import("./components/Cart/Cart"));
const Wishlist = lazy(() => import("./components/Wishlist/Wishlist"));
const AllOrders = lazy(() => import("./components/AllOrders/AllOrders"));
const CheckOut = lazy(() => import("./components/CheckOut/CheckOut"));
const AllUserAddresses = lazy(() =>
  import("./components/AllUserAddresses/AllUserAddresses")
);
const AddUserAddress = lazy(() =>
  import("./components/AddUserAddress/AddUserAddress")
);
const UpdatePassword = lazy(() =>
  import("./components/UpdatePassword/UpdatePassword")
);
const UpdateUserData = lazy(() =>
  import("./components/UpdateUserInfo/UpdateUserData")
);
const ForgetPassword = lazy(() =>
  import("./components/ForgetPassword/ForgetPassword")
);
const VerifyResetCode = lazy(() =>
  import("./components/verifyResetPassword/VerifyResetCode")
);
const ResetPassword = lazy(() =>
  import("./components/ResetPassword/ResetPassword")
);

const queryClient = new QueryClient();

function withSuspense(Component, isProtected = false) {
  const WrappedComponent = () => (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  );

  return isProtected ? (
    <ProtectedRoute>
      <WrappedComponent />
    </ProtectedRoute>
  ) : (
    <WrappedComponent />
  );
}
export default function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <Suspense fallback={<Loader />}>
          <Layout />
        </Suspense>
      ),
      errorElement: <ErrorFallback />,
      children: [
        { index: true, element: withSuspense(Home) },
        { path: "home", element: withSuspense(Home) },
        { path: "/Login", element: withSuspense(Login) },
        { path: "/SignUp", element: withSuspense(SignUp) },
        { path: "/Products", element: withSuspense(Products) },
        {
          path: "productDetails/:id/:categoryId",
          element: withSuspense(ProductDetails),
        },
        { path: "/Categories", element: withSuspense(Categories) },
        {
          path: "/SpecificCategory/:categoryId",
          element: withSuspense(SpecificCategory),
        },
        { path: "/Brands", element: withSuspense(Brands) },
        {
          path: "/SpecificBrand/:BrandId",
          element: withSuspense(SpecificBrand),
        },
        { path: "/cart", element: withSuspense(Cart, true) },
        { path: "/Wishlist", element: withSuspense(Wishlist, true) },
        { path: "/allorders", element: withSuspense(AllOrders, true) },
        { path: "/CheckOut", element: withSuspense(CheckOut, true) },
        {
          path: "/AllUserAddresses",
          element: withSuspense(AllUserAddresses, true),
        },
        {
          path: "/AddUserAddress",
          element: withSuspense(AddUserAddress, true),
        },
        {
          path: "/UpdatePassword",
          element: withSuspense(UpdatePassword, true),
        },
        {
          path: "/UpdateUserData",
          element: withSuspense(UpdateUserData, true),
        },
        { path: "/ForgetPassword", element: withSuspense(ForgetPassword) },
        { path: "/VerifyResetCode", element: withSuspense(VerifyResetCode) },
        { path: "/ResetPassword", element: withSuspense(ResetPassword) },
        { path: "*", element: withSuspense(NotFound) },
      ],
    },
  ]);
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <CartContextProvider>
          <AddressContextProvider>
            <WishlistContextProvider>
              <RouterProvider router={router} />
              {/* <Offline>
                <div className="fixed w-10/12 md:w-fit lg:text-lg top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-black text-white text-center rounded-md py-3 px-5 font-bold z-50">
                  ⚠️ No Internet Connection. Please check your network.
                </div>
              </Offline> */}
              <Toaster />
            </WishlistContextProvider>
          </AddressContextProvider>
        </CartContextProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
