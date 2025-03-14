import { useContext, useEffect } from "react";
import cartImg from "../../assets/images/reshot-icon-cart-CU9PKG8Z5X.svg";
import { cartContext } from "./../../context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import cart from "../../assets/images/cart.jpg";
import Loader from "./../LoadingScreen/Loader";
import { Helmet } from "react-helmet";

export default function Cart() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  let navigate = useNavigate();
  const {
    allProducts,
    numberOfCartItems,
    totalCartPrice,
    updateCartQuantity,
    removeProduct,
    clearCart,
    removeCart,
  } = useContext(cartContext);
  async function handleUpdate(count, id) {
    const flag = await updateCartQuantity(count, id);
    if (flag == true) {
      toast.success("Updated Successfuly", {
        position: "bottom-right",
        duration: 3000,
        className: "md:text-xl",
      });
    }
  }
  function navigateToCheckOut() {
    navigate("/CheckOut");
  }
  return (
    <>
      <Helmet>
        <title>Shopping Cart | FreshCart</title>
        <meta
          name="description"
          content="Review your cart and proceed to checkout on FreshCart."
        />
        <meta name="keywords" content="cart, FreshCart, checkout, shopping" />
        <meta property="og:title" content="Shopping Cart | FreshCart" />
        <meta
          property="og:description"
          content="Review your cart and proceed to checkout on FreshCart."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      {allProducts ? (
        <section
          id="cart"
          className={`py-12 ${
            removeCart == true ? "opacity-50" : "opacity-100"
          } `}
        >
          <div className="container p-8 bg-[#F2F4F5] rounded-lg">
            <div className="pb-4 border-b-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={cartImg}
                    className="w-14 lg:w-[70px] border-4 p-1 rounded-lg bg-white"
                    alt="cart"
                  />
                  <div className="leading-none">
                    <h2 className="font-bold text-xl lg:text-2xl md:text-xl">
                      My Cart
                    </h2>
                    <span className="opacity-60 text-sm font-semibold md:text-base lg:text-xl">
                      {numberOfCartItems}{" "}
                      {numberOfCartItems == 1 ? "Item" : "Items"} in cart
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex flex-col md:flex-row leading-none gap-2 items-center">
                    <span className="opacity-50 text-sm font-semibold md:text-lg lg:text-xl">
                      Total amount
                    </span>
                    <span className="font-semibold opacity-70 md:text-lg lg:text-2xl">
                      {totalCartPrice} EGP
                    </span>
                  </div>
                  <div className="hidden lg:flex justify-center">
                    <div className="flex gap-2">
                      <button
                        disabled={numberOfCartItems == 0}
                        onClick={clearCart}
                        className="px-6 py-2 md:text-lg lg:text-xl disabled:bg-opacity-60 bg-red-600 hover:bg-red-500 text-[rgba(255,255,255,90%)] rounded-md duration-300"
                      >
                        Clear cart
                        <i className="fa-solid fa-trash-can ms-2"></i>
                      </button>
                      <button
                        disabled={numberOfCartItems == 0}
                        onClick={navigateToCheckOut}
                        className="px-6 py-2 md:text-lg lg:text-xl disabled:bg-opacity-60 bg-[#36BB36] hover:bg-[#4FC74F] text-[rgba(255,255,255,90%)] rounded-md duration-300"
                      >
                        Checkout
                        <i className="fa-solid fa-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex lg:hidden my-4">
                <div className="flex gap-4">
                  <button
                    disabled={numberOfCartItems == 0}
                    onClick={clearCart}
                    className="px-6 py-2 disabled:bg-opacity-60 bg-red-600 hover:bg-red-500 text-[rgba(255,255,255,90%)] rounded-md duration-300"
                  >
                    Clear cart <i className="fa-solid fa-trash-can"></i>
                  </button>
                  <button
                    disabled={numberOfCartItems == 0}
                    onClick={navigateToCheckOut}
                    className="px-6 py-2 disabled:bg-opacity-60 bg-[#36BB36] hover:bg-[#4FC74F] text-[rgba(255,255,255,90%)] rounded-md duration-300"
                  >
                    Checkout <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
            {numberOfCartItems == 0 ? (
              <div className="flex flex-col items-center bg-white rounded-xl mt-7">
                <img
                  src={cart}
                  className="w-full md:w-3/4 lg:w-1/2"
                  alt="cart"
                />
              </div>
            ) : (
              <div className="relative overflow-auto shadow-md rounded-lg">
                <table className="w-full text-sm md:text-base lg:text-lg xl:text-xl text-left rtl:text-right text-gray-500">
                  <thead className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 uppercase dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-12 py-0"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProducts?.map((product) => {
                      return (
                        <tr
                          key={product._id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td className="px-6 py-2">
                            <img
                              src={product.product.imageCover}
                              className="w-16 md:w-24 max-w-full max-h-full"
                              alt={product.product.title}
                            />
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            <div className="opacity-70 text-base">
                              {product.product.brand.name}
                            </div>
                            {product.product.title
                              .split(" ")
                              .slice(0, 3)
                              .join(" ")}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <button
                                disabled={product.count == 1}
                                onClick={() =>
                                  handleUpdate(
                                    product.count - 1,
                                    product.product.id
                                  )
                                }
                                className="inline-flex items-center disabled:hover:bg-white justify-center p-1 me-3 text-sm font-medium h-6 w-6 md:w-9 md:h-9 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 "
                                type="button"
                              >
                                <span className="sr-only">Quantity button</span>
                                <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 2"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M1 1h16"
                                  />
                                </svg>
                              </button>
                              <div>
                                <span className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm md:text-base lg:text-lg rounded-lg block px-2 text-center py-1">
                                  {product.count}
                                </span>
                              </div>
                              <button
                                onClick={() =>
                                  handleUpdate(
                                    product.count + 1,
                                    product.product.id
                                  )
                                }
                                className="inline-flex items-center justify-center h-6 w-6 md:w-9 md:h-9 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 "
                                type="button"
                              >
                                <span className="sr-only">Quantity button</span>
                                <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 18"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 1v16M1 9h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {product.price} EGP
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => removeProduct(product.product.id)}
                              className="font-medium text-red-600 flex items-center"
                            >
                              <i className="fa-solid fa-trash-can text-red-600 me-1"></i>
                              <span className="hover:underline">Remove</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
}
