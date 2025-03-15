import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Loader from "./components/LoadingScreen/Loader";
import { Offline } from "react-detect-offline";
const Layout = lazy(() => import("./components/Layout/Layout"));
const SignUp = lazy(() => import("./components/SignUp/SignUp"));
const Products = lazy(() => import("./components/Products/Products"));
const Categories = lazy(() => import("./components/Categories/Categories"));
const Brands = lazy(() => import("./components/Brands/Brands"));
const Login = lazy(() => import("./components/Login/Login"));
const NotFound = lazy(() => import("./components/Not Found/NotFound"));
const AuthContextProvider = lazy(() => import("./context/AuthContextProvider"));
const ProtectedRoute = lazy(() =>
  import("./components/ProtectedRoute/ProtectedRoute")
);
const Home = lazy(() => import("./components/Home/Home"));
const ProductDetails = lazy(() =>
  import("./components/ProductDetails/ProductDetails")
);
const CartContextProvider = lazy(() => import("./context/CartContext"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const ForgetPassword = lazy(() =>
  import("./components/ForgetPassword/ForgetPassword")
);
const VerifyResetCode = lazy(() =>
  import("./components/verifyResetPassword/VerifyResetCode")
);
const ResetPassword = lazy(() =>
  import("./components/ResetPassword/ResetPassword")
);
const AddUserAddress = lazy(() =>
  import("./components/AddUserAddress/AddUserAddress")
);
const AddressContextProvider = lazy(() => import("./context/AddressContext"));
const AllUserAddresses = lazy(() =>
  import("./components/AllUserAddresses/AllUserAddresses")
);
const CheckOut = lazy(() => import("./components/CheckOut/CheckOut"));
const AllOrders = lazy(() => import("./components/AllOrders/AllOrders"));
const UpdatePassword = lazy(() =>
  import("./components/UpdatePassword/UpdatePassword")
);
const UpdateUserData = lazy(() =>
  import("./components/UpdateUserInfo/UpdateUserData")
);
const Whishlist = lazy(() => import("./components/Whishlist/Whishlist"));
const WashlistContextProvider = lazy(() => import("./context/WishlistContext"));
const SpecificCategory = lazy(() =>
  import("./components/SpecificCategory/SpecificCategory")
);
const SpecificBrand = lazy(() =>
  import("./components/SpecificBrand/SpecificBrand")
);
const queryClient = new QueryClient();
export default function App() {
  const router = createBrowserRouter([
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
              <Whishlist />
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
              <WashlistContextProvider>
                <Suspense fallback={<Loader />}>
                  <RouterProvider router={router} />
                </Suspense>
                <Offline>
                  <div className="fixed w-10/12 md:w-fit lg:text-lg top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-black text-white text-center rounded-md py-3 px-5 font-bold z-50">
                    ⚠️ No Internet Connection. Please check your network.
                  </div>
                </Offline>
              </WashlistContextProvider>
              <Toaster />
            </AddressContextProvider>
          </CartContextProvider>
        </QueryClientProvider>
      </AuthContextProvider>
    </>
  );
}
