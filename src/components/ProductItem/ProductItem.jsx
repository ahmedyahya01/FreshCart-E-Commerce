import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { cartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { wishlistContext } from "../../context/WishlistContext";
import { authContextProvider } from "../../context/AuthContextProvider";
import saleImage from "../../assets/images/sale.png";

export default function ProductItem({ product }) {
  const [loading, setLoading] = useState(null);
  let navigate = useNavigate();
  const { addProductToCart, cartProducts } = useContext(cartContext);
  const { removeProductFromWishlist, addProductToWishlist, favIcons } =
    useContext(wishlistContext);
  const { token } = useContext(authContextProvider);
  async function handleAddToCart(id) {
    setLoading(true);
    let flag = null;
    if (token) {
      flag = await addProductToCart(id);
    }
    if (flag) {
      toast.success("Added to cart successfully", {
        position: "bottom-right",
        duration: 3000,
        className: "md:text-xl",
      });
    } else if (!token) {
      navigate("/login");
    } else {
      toast.error("Add to cart failed, Check intenet", {
        position: "bottom-right",
        duration: 3000,
        className: "md:text-xl",
      });
    }
    setLoading(false);
  }
  function handleAddToWishlist(proId) {
    if (favIcons.includes(proId)) {
      removeProductFromWishlist(proId);
    } else {
      addProductToWishlist(proId);
    }
  }
  return (
    <>
      <div
        id="product"
        className="bg-[#F0F3F2] relative rounded-lg border border-gray-300 shadow-md p-5 hover:scale-[1.02] duration-500 cursor-pointer"
      >
        {product.priceAfterDiscount ? (
          <img src={saleImage} className="w-12 absolute top-3" alt="" />
        ) : (
          ""
        )}
        {token ? (
          <div
            onClick={() => {
              handleAddToWishlist(product._id);
            }}
            className="bg-white absolute right-1 top-1 w-11 h-11 rounded-full border cursor-pointer flex items-center justify-center"
          >
            {favIcons.includes(product._id) ? (
              <i className="fa-solid fa-heart text-[25px] md:text-xl lg:text-2xl text-red-600"></i>
            ) : (
              <i className="fa-regular fa-heart text-[25px] md:text-xl lg:text-2xl text-[#238123]"></i>
            )}
          </div>
        ) : (
          ""
        )}
        <Link to={`/productDetails/${product._id}/${product.category._id}`}>
          <div className="pb-4">
            <img
              src={product.imageCover}
              alt={product.title}
              className="w-full h-80 p-1"
            />
          </div>
          <div className="flex flex-col">
            <div>
              <p className="opacity-70 text-sm md:text-base font-semibold">
                {product.brand.name}
              </p>
              <h3 className="text-xl md:text-2xl font-semibold">
                {product.title.split(" ").slice(0, 2).join(" ")}
              </h3>
            </div>
            <p className="text-sm font-semibold text-[#238123] mb-1">
              {product.category.name}
            </p>
            <div className="flex gap-2">
              <div className="flex items-center">
                <i className="fa-solid fa-star text-yellow-400"></i>
                <i className="fa-solid fa-star text-yellow-400"></i>
                <i className="fa-solid fa-star text-yellow-400"></i>
                <i className="fa-solid fa-star text-yellow-400"></i>
                <i className="fa-solid fa-star text-yellow-400"></i>
              </div>
              <div>
                <span className="text-sm rounded">
                  {product.ratingsAverage}
                </span>
              </div>
            </div>
          </div>
        </Link>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <p
              className={`font-bold ${
                product.priceAfterDiscount
                  ? "line-through text-[16px] opacity-60"
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
          <button
            onClick={() => handleAddToCart(product._id) && setLoading(product)}
            disabled={cartProducts.includes(product._id)}
          >
            {cartProducts.includes(product._id) ? (
              <div className="flex items-center justify-center gap-2 px-2 py-2 md:px-4 md:py-3 rounded-lg text-white bg-gradient-to-r from-[#333] to-[#777]">
                <span>Product in cart</span>
                <i className="fa-solid fa-check"></i>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 px-2 py-2 md:px-4 md:py-3 rounded-lg text-white bg-gradient-to-r from-[#238123] to-[#4FC74F] hover:scale-105 duration-300">
                {loading === product ? (
                  <ClipLoader color="white" size={25} />
                ) : (
                  <i className="fa-solid fa-cart-shopping text-xl"></i>
                )}
                <span>Add to cart</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
