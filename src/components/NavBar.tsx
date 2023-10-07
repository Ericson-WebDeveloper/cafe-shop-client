import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth_store } from "../store/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { accountLogout } from "../api/auth-api";
import { cart_store } from "../store/cart";
import { getMyCarts } from "../api/cart-api";
import { ErrorResponseF } from "../api/ResponseType";

// type Props = {}

const NavBar = React.memo(() => {
  const { user, signOutUser } = auth_store();
  const { getTotalQty, setCart } = cart_store();
  const { isLoading: queryCartsLoading } = useQuery(["my_carts"], getMyCarts, {
    onSuccess: (response) => {
      setCart("carts", response.data.carts);
    },
    onError: (error: ErrorResponseF) => {
      setCart("carts", null);
      if (error.status == 401) {
        signOutUser();
        window.location.replace("/");
      }
    },
    refetchOnWindowFocus: false,
    enabled: !!user, //user ? true : false
  });
  const [sideBar, setSideBar] = useState<boolean>(false);

  const signOutProcess = () => {
    signOutUser();
    setCart("carts", null);
    window.location.replace("/");
  };

  const { isLoading, mutateAsync: AccountLogout } = useMutation({
    mutationFn: accountLogout,
    onError: () => {
      signOutProcess();
    },
    onSuccess: () => {
      signOutProcess();
    },
  });

  if (isLoading) {
    <div>Loading.....</div>;
  }
  return (
    <div className="w-full h-[100px] flex border-b-4 border-red-300">
      <div className="flex w-full container mx-auto justify-between px-3">
        <div className="w-full h-full hidden lg:block">
          <div className="w-full h-full flex items-center justify-start space-x-4">
            <Link
              to={"/"}
              className="text-md font-sans text-red-500 hover:text-red-300"
            >
              Home
            </Link>
            <Link
              to={"/menus"}
              className="text-md font-sans text-red-500 hover:text-red-300"
            >
              Menu
            </Link>
            <Link
              to={"/products"}
              className="text-md font-sans text-red-500 hover:text-red-300"
            >
              Products
            </Link>
            <Link
              to={"/"}
              className="text-md font-sans text-red-500 hover:text-red-300"
            >
              About
            </Link>
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-start lg:justify-center">
          <Link to={"/"}>
            <h1 className="text-2xl font-bold text-red-600">Cafe Shop</h1>
          </Link>
        </div>
        <div className="w-full h-full flex space-x-4 items-center justify-end">
          {user ? (
            <>
              <Link
                to={"/my-orders"}
                className="text-md font-sans text-red-500 hover:text-red-300 hidden md:block"
              >
                Order
              </Link>{" "}
              <Link
                to={"/my-profile/user"}
                className="text-md font-sans text-red-500 hover:text-red-300 hidden md:block"
              >
                Profile
              </Link>{" "}
              <span
                onClick={() => AccountLogout()}
                className="text-md font-sans text-red-500 cursor-pointer hover:text-red-300 hidden md:block"
              >
                Sign Out
              </span>{" "}
            </>
          ) : (
            <>
              <Link
                to={"/login"}
                className="text-md font-sans text-red-500 hover:text-red-300 hidden md:block"
              >
                Sign In
              </Link>
              <Link
                to={"/register"}
                className="text-md font-sans text-red-500 hover:text-red-300 hidden md:block"
              >
                Sign Up
              </Link>
            </>
          )}

          <Link
            to={"/carts"}
            className={`text-md font-sans text-red-500 hover:text-red-300 ${
              getTotalQty() == 0 ? "disabled" : ""
            }`}
          >
            Cart {queryCartsLoading ? (user ? "..." : 0) : getTotalQty()}
          </Link>

          <span className="flex lg:hidden text-md font-sans text-red-500 hover:text-red-300 cursor-pointer">
            <svg
              onClick={() => setSideBar(!sideBar)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </span>
        </div>
      </div>
      {sideBar ? (
        <div className="flex flex-col w-full min-h-screen top-0 left-0 bottom-0 absolute lg:relative bg-red-50 lg:hidden z-[90] flex-1">
          <span className="flex w-full p-2 rounded-sm justify-end">
            <svg
              onClick={() => setSideBar(false)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-red-500 cursor-pointer mr-5 hover:bg-red-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
          <div className="flex w-full h-full justify-center relative">
            <div className="flex flex-col w-[75%] md:w-[55%] h-full  py-12 items-center space-y-5">
              <h1 className="text-3xl text-red-800 font-mono font-semibold">
                Menu List
              </h1>
              <Link
                onClick={() => setSideBar(false)}
                to={"/"}
                className="text-2xl font-sans text-red-500 hover:text-red-300"
              >
                Home
              </Link>
              <Link
                onClick={() => setSideBar(false)}
                to={"/menus"}
                className="text-2xl font-sans text-red-500 hover:text-red-300"
              >
                Menu
              </Link>
              <Link
                onClick={() => setSideBar(false)}
                to={"/products"}
                className="text-2xl font-sans text-red-500 hover:text-red-300"
              >
                Products
              </Link>
              <Link
                onClick={() => setSideBar(false)}
                to={"/"}
                className="text-2xl font-sans text-red-500 hover:text-red-300"
              >
                About
              </Link>
              <span className="flex flex-col lg:hidden w-full items-center space-y-5">
                {user ? (
                  <>
                    <Link
                      to={"/my-orders"}
                      onClick={() => setSideBar(false)}
                      className="text-2xl font-sans text-red-500 hover:text-red-300 "
                    >
                      Order
                    </Link>{" "}
                    <Link
                      to={"/my-profile/user"}
                      onClick={() => setSideBar(false)}
                      className="text-2xl font-sans text-red-500 hover:text-red-300 "
                    >
                      Profile
                    </Link>{" "}
                    <span
                      onClick={() => AccountLogout()}
                      className="text-2xl font-sans text-red-500 cursor-pointer hover:text-red-300 "
                    >
                      Sign Out
                    </span>{" "}
                  </>
                ) : (
                  <>
                    <Link
                      to={"/login"} 
                      onClick={() => setSideBar(false)}
                      className="text-2xl font-sans text-red-500 hover:text-red-300"
                    >
                      Sign In
                    </Link>
                    <Link
                      to={"/register"}
                      onClick={() => setSideBar(false)}
                      className="text-2xl font-sans text-red-500 hover:text-red-300"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
});

export default NavBar;
