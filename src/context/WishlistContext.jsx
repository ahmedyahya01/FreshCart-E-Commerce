import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { cartContext } from "./CartContext";
export const wishlistContext = createContext();

export default function WashlistContextProvider({ children }) {
  const [allData, setAllData] = useState(null);
  const [addLoading, setAddLoading] = useState(null);
  const [removeLoading, setRemoveLoading] = useState(null);
  const { addProductToCart } = useContext(cartContext);
  const [isCatch, setIsCatch] = useState(false);
  const [favIcons, setFavIcons] = useState([]);
  const [count, setCount] = useState(null);

  function getWishlist() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then(({ data }) => {
        setCount(data.count);
        setAllData(data.data);
      })
      .catch((error) => {});
  }
  async function handleAddToCart(id) {
    setAddLoading(true);
    const flag = await addProductToCart(id);
    if (flag) {
      toast.success("Added to cart successfully", {
        position: "bottom-right",
        duration: 3000,
        className: "md:text-xl",
      });
      removeProductFromWishlist(id);
    } else {
      toast.error("Add to cart failed", {
        position: "bottom-right",
        duration: 3000,
        className: "md:text-xl",
      });
    }
    setAddLoading(false);
  }
  async function addProductToWishlist(proId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: proId,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      )
      .then((res) => {
        getWishlist();
        updateLocalStorage(proId, true);
        toast.success("Product added successfully to your wishlist", {
          position: "bottom-right",
          duration: 3000,
          className: "md:text-xl",
        });
      })
      .catch((error) => {
        setIsCatch(true);
        toast.error("Failed, Check internet connection", {
          position: "bottom-right",
          duration: 3000,
          className: "md:text-xl",
        });
      });
  }
  async function removeProductFromWishlist(proId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${proId}`, {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        getWishlist();
        updateLocalStorage(proId, false);
        toast("Product removed from your wishlist", {
          position: "bottom-right",
          duration: 3000,
          className: "md:text-xl",
          icon: "🗑️",
          removeDelay: 1000,
        });
      })
      .catch((error) => {
        setIsCatch(true);
        toast.error("Failed, Check internet connection", {
          position: "bottom-right",
          duration: 3000,
          className: "md:text-xl",
        });
      });
  }
  function updateLocalStorage(proId, isAdding) {
    let updatedFavs = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (isAdding) {
      if (!updatedFavs.includes(proId)) {
        updatedFavs.push(proId);
      }
    } else {
      updatedFavs = updatedFavs.filter((id) => id !== proId);
    }
    localStorage.setItem("wishlist", JSON.stringify(updatedFavs));
    setFavIcons([...updatedFavs]);
  }
  useEffect(() => {
    if (localStorage.getItem("tkn")) {
      getWishlist();
    }
    const storedFavs = JSON.parse(localStorage.getItem("wishlist")) || [];
    setFavIcons(storedFavs);
  }, []);
  return (
    <wishlistContext.Provider
      value={{
        allData,
        getWishlist,
        handleAddToCart,
        removeProductFromWishlist,
        addProductToWishlist,
        removeLoading,
        addLoading,
        setAddLoading,
        setRemoveLoading,
        isCatch,
        updateLocalStorage,
        count,
        favIcons,
        setFavIcons,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
