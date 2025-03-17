import React, { lazy, Suspense } from "react";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { createHashRouter, RouterProvider } from "react-router-dom";
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

export default function App() {
  const router = createHashRouter([
    {
      path: "",
      element: <Layout />,
      errorElement: <ErrorFallback />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "/Login", element: <Login /> },
        { path: "/SignUp", element: <SignUp /> },
        { path: "/Products", element: <Products /> },
        { path: "productDetails/:id/:categoryId", element: <ProductDetails /> },
        { path: "/Categories", element: <Categories /> },
        {
          path: "/SpecificCategory/:categoryId",
          element: <SpecificCategory />,
        },
        { path: "/Brands", element: <Brands /> },
        { path: "/SpecificBrand/:BrandId", element: <SpecificBrand /> },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
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
          path: "/allorders",
          element: (
            <ProtectedRoute>
              <AllOrders />
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
          path: "/AllUserAddresses",
          element: (
            <ProtectedRoute>
              <AllUserAddresses />
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
        { path: "/ForgetPassword", element: <ForgetPassword /> },
        { path: "/VerifyResetCode", element: <VerifyResetCode /> },
        { path: "/ResetPassword", element: <ResetPassword /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <CartContextProvider>
          <AddressContextProvider>
            <WishlistContextProvider>
              <Suspense fallback={<Loader />}>
                <RouterProvider router={router} />
              </Suspense>
              <Offline>
                <div className="fixed w-10/12 md:w-fit lg:text-lg top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-black text-white text-center rounded-md py-3 px-5 font-bold z-50">
                  ⚠️ No Internet Connection. Please check your network.
                </div>
              </Offline>
              <Toaster />
            </WishlistContextProvider>
          </AddressContextProvider>
        </CartContextProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
