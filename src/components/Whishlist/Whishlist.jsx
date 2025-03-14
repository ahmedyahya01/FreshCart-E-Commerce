import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Loader from "./../LoadingScreen/Loader";
import { wishlistContext } from "../../context/WishlistContext";
import { cartContext } from "../../context/CartContext";
import { Helmet } from "react-helmet";
export default function Whishlist() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const {
    allData,
    handleAddToCart,
    removeProductFromWishlist,
    removeLoading,
    addLoading,
    setAddLoading,
    setRemoveLoading,
  } = useContext(wishlistContext);
  const { cartProducts } = useContext(cartContext);
  return (
    <>
      <Helmet>
        <title>Wishlist | FreshCart</title>
        <meta
          name="description"
          content="View and manage your wishlist items on FreshCart."
        />
        <meta
          name="keywords"
          content="wishlist, FreshCart, favorite products, saved items"
        />
        <meta property="og:title" content="Wishlist | FreshCart" />
        <meta
          property="og:description"
          content="View and manage your wishlist items on FreshCart."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {allData ? (
        <section id="Whishlist" className="py-10">
          {allData.length == 0 ? (
            <div className="flex flex-col gap-2 items-center mx-auto md:w-3/4">
              <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
                Your wishlist is empty. Start adding your favorite items now!
              </h1>
              <Link
                to="/products"
                className="px-6 py-3 lg:px-8 lg:py-4 text-center rounded-md md:text-lg text-white bg-[#36BB36] hover:bg-[#4fc74f] hover:scale-105 duration-300 "
              >
                <i className="fa-solid fa-cart-shopping me-2"></i>
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="container">
              <div className="bg-[#F0F3F2] border rounded-lg">
                <div className="border-b border-gray-300 mb-6">
                  <h1 className="text-xl xl:text-2xl font-semibold p-6">
                    My Wishlist ({allData.count}{" "}
                    {allData.count == 1 ? "item" : "items"})
                  </h1>
                </div>
                {allData.map((product) => (
                  <div
                    key={product._id}
                    id="product"
                    className="bg-[#F0F3F2] md:flex justify-between items-center mb-3 rounded-lg border border-gray-300 shadow-md p-5 duration-500 cursor-pointer"
                  >
                    <Link
                      className="md:flex items-start gap-3"
                      to={`/productDetails/${product._id}/${product.category._id}`}
                    >
                      <div className="pb-4">
                        <img
                          src={product.imageCover}
                          alt={product.title}
                          className="w-full md:w-40 md:h-48 h-80 p-1"
                        />
                      </div>
                      <div>
                        <div className="flex flex-col">
                          <div>
                            <p className="text-[#555] text-sm md:text-base  font-semibold">
                              {product.brand.name}
                            </p>
                            <h3 className="text-xl md:text-2xl font-semibold">
                              {product.title.split(" ").slice(0, 2).join(" ")}
                            </h3>
                          </div>
                          <p className="text-sm font-semibold text-[#238123] mb-1">
                            {product.category.name}
                          </p>
                          <div className="flex justify-between mb-1 items-center md:hidden">
                            <span className="bg-[#238123] text-white text-xs md:text-sm py-1 px-3 rounded">
                              Up to 35% off
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <div className="flex items-center">
                              <i className="fa-solid fa-star text-yellow-400"></i>
                              <i className="fa-solid fa-star text-yellow-400"></i>
                              <i className="fa-solid fa-star text-yellow-400"></i>
                              <i className="fa-solid fa-star text-yellow-400"></i>
                              <i className="fa-solid fa-star text-yellow-400"></i>
                            </div>
                            <div>
                              <span className="text-sm px-2 py-[3px] rounded">
                                {product.ratingsAverage}
                              </span>
                            </div>
                          </div>
                          <div className="my-3 hidden md:block">
                            <span className="bg-[#238123] text-white text-xs md:text-sm py-1 px-3 rounded">
                              Up to 35% off
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <p
                              className={`font-bold ${
                                product.priceAfterDiscount
                                  ? "line-through text-[16px] text-slate-600"
                                  : "text-lg"
                              }`}
                            >
                              EGP {product.price}
                            </p>
                            {product.priceAfterDiscount ? (
                              <p className="font-bold text-lg">
                                EGP {product.priceAfterDiscount}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="flex flex-col gap-2 mt-3 md:mt-0">
                      <button
                        disabled={cartProducts.includes(product._id)}
                        onClick={() =>
                          handleAddToCart(product._id) && setAddLoading(product)
                        }
                      >
                        {cartProducts.includes(product._id) ? (
                          <div className="flex items-center justify-center gap-2 px-2 py-2 md:px-4 md:py-3 rounded-lg text-white bg-gradient-to-r from-[#333] to-[#777]">
                            <span>Product in cart</span>
                            <i className="fa-solid fa-check"></i>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1 px-2 py-2 md:px-4 md:py-3 rounded-lg text-white bg-gradient-to-r from-[#238123] to-[#4FC74F] hover:scale-105 duration-300">
                            {addLoading === product ? (
                              <ClipLoader color="white" size={25} />
                            ) : (
                              <i className="fa-solid fa-cart-shopping text-xl"></i>
                            )}
                            <span>Add to cart</span>
                          </div>
                        )}
                      </button>
                      <button
                        onClick={() =>
                          removeProductFromWishlist(product._id) &&
                          setRemoveLoading(product)
                        }
                        className="px-2 py-2 md:px-4 md:py-3 rounded-lg text-white bg-red-600 hover:scale-105 duration-300"
                      >
                        <div className="flex items-center justify-center gap-2">
                          {removeLoading === product ? (
                            <ClipLoader color="white" size={25} />
                          ) : (
                            <i className="fa-solid fa-trash-can text-white me-1"></i>
                          )}
                          <span>Remove</span>
                        </div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
}
