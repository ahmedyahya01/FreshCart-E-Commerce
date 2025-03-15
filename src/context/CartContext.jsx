import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";

export const cartContext = createContext();
export default function CartContextProvider({ children }) {
  const [allProducts, setAllProducts] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [removeCart, setRemoveCart] = useState(false);
  const [cartId, setCartId] = useState(null);
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  async function addProductToCart(id) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      )
      .then(() => {
        updateLocalStorage(id, true);
        getUserCart();
        return true;
      })
      .catch((error) => {
        return false;
      });
  }
  function getUserCart() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: localStorage.getItem("tkn") },
      })
      .then((res) => {
        setCartId(res.data.cartId);
        setAllProducts(res.data.data.products);
        setNumberOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        res.data.data.products.map((id) => {
          return (
            updateLocalStorage(id.product.id) &&
            localStorage.setItem("Cart", JSON.stringify(id.product.id)) &&
            setCartProducts(id.product.id)
          );
        });
      })
      .catch((error) => {});
  }
  async function updateCartQuantity(count, productId) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      )
      .then((res) => {
        setAllProducts(res.data.data.products);
        setNumberOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        return true;
      })
      .catch((error) => {
        toast.error("Try again", {
          position: "bottom-right",
          duration: 3000,
          className: "md:text-xl",
        });
      });
  }
  function removeProduct(id) {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: { token: localStorage.getItem("tkn") },
      })
      .then((res) => {
        setAllProducts(res.data.data.products);
        setNumberOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        localStorage.setItem(
          "Cart",
          JSON.stringify(res.data.data.products.map((id) => id.product.id))
        );
        setCartProducts(res.data.data.products.map((id) => id.product.id));
        toast("Deleted item successfully", {
          position: "bottom-right",
          duration: 3000,
          className: "md:text-xl",
          icon: "🗑️",
        });
      })
      .catch((error) => {
        toast.error("Try again", {
          position: "bottom-right",
          duration: 3000,
          className: "md:text-xl",
        });
      });
  }
  function clearCart() {
    setRemoveCart(true);
    axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: localStorage.getItem("tkn") },
      })
      .then((res) => {
        getUserCart();
        localStorage.removeItem("Cart");
        setCartProducts([]);
        toast.success("Deleted cart successfully", {
          position: "bottom-right",
          duration: 3000,
          className: "md:text-xl",
        });
      })
      .catch((error) => {
        toast.error("Try again", {
          position: "bottom-right",
          duration: 3000,
          className: "md:text-xl",
        });
      });
    setRemoveCart(false);
  }
  function updateLocalStorage(proId, isAdding) {
    let updatedCart = JSON.parse(localStorage.getItem("Cart")) || [];
    if (isAdding) {
      if (!updatedCart.includes(proId)) {
        updatedCart.push(proId);
      }
      // else {
      //   updatedCart = updatedCart.filter((id) => id !== proId);
      // }
    }
    localStorage.setItem("Cart", JSON.stringify(updatedCart));
    setCartProducts([...updatedCart]);
  }
  useEffect(() => {
    if (localStorage.getItem("tkn")) {
      getUserCart();
    }
    const storedItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartProducts(storedItems);
  }, []);
  return (
    <cartContext.Provider
      value={{
        allProducts,
        numberOfCartItems,
        totalCartPrice,
        addProductToCart,
        getUserCart,
        updateCartQuantity,
        removeProduct,
        clearCart,
        cartId,
        cartProducts,
        setCartProducts,
        setRemoveCart,
        removeCart,
        updateLocalStorage,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
