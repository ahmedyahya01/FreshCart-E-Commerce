import { useEffect, useState } from "react";
import { createContext } from "react";
export const authContextProvider = createContext();

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("tkn")) {
      setToken(localStorage.getItem("tkn"));
    }

    if (localStorage.getItem("email")) {
      setEmail(localStorage.getItem("email"));
    }
    if (localStorage.getItem("name")) {
      setName(localStorage.getItem("name"));
    }
    if (localStorage.getItem("userId")) {
      setUserId(localStorage.getItem("userId"));
    }
  }, []);
  return (
    <authContextProvider.Provider
      value={{
        token,
        setToken,
        setEmail,
        email,
        setName,
        name,
        setUserId,
        userId,
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </authContextProvider.Provider>
  );
}
