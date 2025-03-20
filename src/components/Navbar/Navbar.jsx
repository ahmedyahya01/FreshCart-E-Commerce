import React, { useContext, useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import cartImg from "../../assets/images/reshot-icon-cart-CU9PKG8Z5X.svg";
import { authContextProvider } from "../../context/AuthContextProvider";
import { cartContext } from "../../context/CartContext";
import { wishlistContext } from "../../context/WishlistContext";

export default function Navbar() {
  const { token, setToken, email, name } = useContext(authContextProvider);
  const { numberOfCartItems, setCartProducts } = useContext(cartContext);
  const [userIcon, setUserIcon] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [hideModal, setHideModal] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const openModalRef = useRef();
  const innerModal = useRef();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { count } = useContext(wishlistContext);
  let navigate = useNavigate();

  const menuButtonRef = useRef(null);
  const userButtonRef = useRef(null);
  const userDropdownRef = useRef(null);
  const menuDropdownRef = useRef(null);

  function handleLogOut() {
    setTimeout(() => {
      localStorage.removeItem("tkn");
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      localStorage.removeItem("cartData");
      localStorage.removeItem("userId");
      localStorage.removeItem("Cart");
      localStorage.removeItem("wishlist");
      setCartProducts([]);
      setHideModal(true);
      setToken(null);
      navigate("/login");
    }, 1000);
  }
  useEffect(() => {
    let lastScrollY = window.scrollY;
    function handleScroll() {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        if (isMenu) setIsMenu(false);
        if (userIcon) setUserIcon(false);
        lastScrollY = currentScrollY;
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenu, userIcon]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target) &&
        menuDropdownRef.current &&
        !menuDropdownRef.current.contains(event.target)
      ) {
        setIsMenu(false);
      }
      if (
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target) &&
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setUserIcon(false);
        setIsSettingsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (openModal) {
      openModalRef.current.classList.replace("hidden", "flex");
    }
    if (hideModal) {
      openModalRef.current.classList.replace("flex", "hidden");
    }
    setOpenModal(false);
    setHideModal(false);
  }, [openModal, hideModal]);
  return (
    <>
      <nav className="bg-[#F0F3F2] text-black text-opacity-70 py-2 lg:py-4 shadow-md sticky top-0 z-10">
        <div className="container">
          <div className="flex flex-wrap items-center justify-between">
            <NavLink to={"/Home"}>
              <img src={logo} alt="Fresh Cart" className="w-full" />
            </NavLink>
            <div className="flex relative items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <button
                ref={userButtonRef}
                onClick={() => setUserIcon(!userIcon)}
                type="button"
                className="flex text-sm rounded-full md:me-0"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                <div className="w-10 lg:w-12 h-10 text-center lg:h-12 flex justify-center items-center rounded-full bg-white border">
                  <i className="fa-solid fa-user text-2xl xl:text-3xl"></i>
                </div>
              </button>
              <div
                ref={userDropdownRef}
                className={`z-50 absolute ${
                  userIcon ? "block" : "hidden"
                } right-0 top-10 md:top-8 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-md border-2`}
                id="user-dropdown"
              >
                {token ? (
                  <>
                    <div className="px-4 py-3 border-b-2">
                      <span className="block text-xs lg:text-base opacity-90">
                        {name}
                      </span>
                      <span className="block text-sm lg:text-lg opacity-90">
                        {email}
                      </span>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <ul aria-labelledby="user-menu-button">
                  {token ? (
                    <>
                      <li
                        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                        className="px-5 py-1 text-sm lg:text-lg cursor-pointer flex items-center"
                      >
                        Settings
                        <svg
                          className="w-3.5 h-3.5 ms-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                          />
                        </svg>
                      </li>
                      <ul
                        className={`px-8 ${
                          isSettingsOpen ? "block" : "hidden"
                        }`}
                      >
                        <li className="py-1 text-sm lg:text-base cursor-pointer">
                          <NavLink
                            to={"/UpdatePassword"}
                            onClick={() => {
                              setUserIcon(!userIcon);
                            }}
                          >
                            Change Password
                          </NavLink>
                        </li>
                        <li className="py-1 text-sm lg:text-base cursor-pointer">
                          <NavLink
                            to={"UpdateUserData"}
                            onClick={() => {
                              setUserIcon(!userIcon);
                            }}
                          >
                            Change User Data
                          </NavLink>
                        </li>
                      </ul>
                      <li>
                        <NavLink
                          to={"AllUserAddresses"}
                          onClick={() => {
                            setUserIcon(!userIcon);
                          }}
                          className="block py-1 px-5 sm lg:text-lg cursor-pointer"
                        >
                          Addresses
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/allorders"
                          onClick={() => {
                            setUserIcon(!userIcon);
                          }}
                          className="block py-1 px-5 sm lg:text-lg cursor-pointer"
                        >
                          Orders
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/Wishlist"
                          onClick={() => {
                            setUserIcon(!userIcon);
                          }}
                          className="flex items-center gap-2 py-1 px-5 sm lg:text-lg cursor-pointer"
                        >
                          Wishlist
                          <span className="w-5 h-5 text-xs rounded-md text-white bg-[#36BB36] flex justify-center items-center">
                            {count}
                          </span>
                        </NavLink>
                      </li>
                      <li className="border-t">
                        <span
                          onClick={() => {
                            setUserIcon(!userIcon);
                            setOpenModal(!openModal);
                          }}
                          className="block py-2 px-5 text-sm lg:text-lg cursor-pointer"
                        >
                          Sign out
                          <i className="fa-solid fa-right-from-bracket ms-1"></i>
                        </span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <NavLink
                          to={"/login"}
                          onClick={() => setUserIcon(!userIcon)}
                          className="block py-1 px-5 lg:text-lg border-b-2"
                        >
                          Login
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"/signup"}
                          onClick={() => setUserIcon(!userIcon)}
                          className="block py-1 px-5 lg:text-lg"
                        >
                          SignUp
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              <button
                ref={menuButtonRef}
                onClick={() => {
                  setIsMenu(!isMenu);
                }}
                data-collapse-toggle="navbar-user"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-user"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMenu ? (
                  <i className="fa-solid fa-xmark text-2xl"></i>
                ) : (
                  <i className="fa-solid fa-bars text-2xl"></i>
                )}
              </button>
            </div>
            <div
              ref={menuDropdownRef}
              className={`items-center justify-between ${
                isMenu ? "block" : "hidden"
              } w-full md:flex md:w-auto md:order-1`}
              id="navbar-user"
            >
              <ul className="flex flex-col justify-center text-lg xl:text-xl items-center font-medium mt-2 md:space-x-2 md:flex-row md:mt-0">
                <>
                  <li>
                    <NavLink
                      to="/Products"
                      onClick={() => setIsMenu(!isMenu)}
                      className="block py-2 px-3"
                      aria-current="page"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/Categories"
                      onClick={() => setIsMenu(!isMenu)}
                      className="block py-2 px-3"
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/Brands"
                      onClick={() => setIsMenu(!isMenu)}
                      className="block py-2 px-3"
                    >
                      Brands
                    </NavLink>
                  </li>
                  {token ? (
                    <li className="pt-3 md:pt-0">
                      <NavLink
                        onClick={() => setIsMenu(!isMenu)}
                        className={"py-2 rounded duration-300 relative"}
                        to="/cart"
                      >
                        <span className="absolute w-5 h-5 text-xs rounded-md text-white bg-[#36BB36] -top-[6px] left-[50%] -translate-x-[25%] flex justify-center items-center">
                          {numberOfCartItems}
                        </span>
                        <img
                          src={cartImg}
                          className="w-9 inline-block"
                          alt="cart"
                        />
                      </NavLink>
                    </li>
                  ) : (
                    ""
                  )}
                </>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div>
        <div
          ref={openModalRef}
          id="popup-modal"
          tabIndex={-1}
          className={`bg-[#0008] hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 bottom-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full`}
        >
          <div
            ref={innerModal}
            className="relative p-4 w-full max-w-md max-h-full"
          >
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <button
                onClick={() => {
                  setHideModal(true);
                }}
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to log out?
                </h3>
                <button
                  onClick={() => {
                    handleLogOut();
                  }}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => {
                    setHideModal(true);
                  }}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
