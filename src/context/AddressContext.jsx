import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
export const addressProvider = createContext();

export default function AddressContextProvider({ children }) {
  const [allAddresses, setAllAddresses] = useState([]);

  function getAllAddresses() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/addresses", {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        setAllAddresses(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function removeAddress(id) {
    try {
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/addresses/${id}`,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      console.log(res);
      getAllAddresses();
      toast.success("Address removed", {
        position: "bottom-right",
        duration: 3000,
        className: "md:text-xl",
      });
    } catch (error) {
      toast.error("Remove address Faild", {
        position: "bottom-right",
        duration: 3000,
        className: "md:text-xl",
      });
      console.log(error);
    }
  }
  useEffect(() => {
    if (localStorage.getItem("tkn")) {
      getAllAddresses();
    }
  }, []);

  return (
    <addressProvider.Provider
      value={{ setAllAddresses, allAddresses, removeAddress, getAllAddresses }}
    >
      {children}
    </addressProvider.Provider>
  );
}
