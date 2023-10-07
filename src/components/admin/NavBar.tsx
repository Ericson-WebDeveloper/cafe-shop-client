import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { auth_store } from "../../store/auth";
import { accountLogout } from "../../api/auth-api";

// type Props = {}

const NavBar = React.memo(() => {
  const [sideBarActive, setSideBarActive] = useState<boolean>(false);
  const sideNavRef = useRef<HTMLDivElement | null>(null);
  const sideBarDivRef = useRef<HTMLDivElement | null>(null);
  const { user, signOutUser } = auth_store();
  const { isLoading, mutateAsync: AccountLogout } = useMutation({
    mutationFn: accountLogout,
    onError: () => {
      signOutUser();
      window.location.replace('/');
    },
    onSuccess: () => {
      signOutUser();
      window.location.replace('/');
    },
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        sideNavRef.current &&
        !sideNavRef.current.contains(event.target as Node) &&
        !sideBarDivRef.current?.contains(event.target as Node)
      ) {
        setSideBarActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex w-full h-[70px] bg-red-600">
      <div className="flex w-full h-full mx-auto container justify-between ">
        <div className="flex-1 h-full justify-start space-x-6 items-center hidden lg:flex">
          <Link to={`/backend`} replace={true} className="text-white font-sans">
            DashBoard
          </Link>
          <Link
            to={`/backend/categories`}
            replace={true}
            className="text-white font-sans"
          >
            Categories
          </Link>
          <Link
            to={`/backend/variants`}
            replace={true}
            className="text-white font-sans"
          >
            Variant
          </Link>
          <Link
            to={`/backend/orders`}
            replace={true}
            className="text-white font-sans"
          >
            Order
          </Link>
          <Link
            to={`/backend/payments`}
            replace={true}
            className="text-white font-sans"
          >
            Payment
          </Link>
          <Link
            to={`/backend/products`}
            replace={true}
            className="text-white font-sans"
          >
            Product
          </Link>
        </div>
        <div className="flex flex-1 h-full justify-end space-x-4 items-center mr-11 lg:mr-0">
          <span
            onClick={() => AccountLogout()}
            className="text-white font-sans cursor-pointer hover:text-red-400"
          >
            {isLoading ? "Loading...." : "SignOut"}
          </span>
          <Link to={`/backend/my-profile/user`} replace={true} className="text-white font-sans">
            Profile {user?.name}
          </Link>
          <span className="text-md font-sans text-white flex lg:hidden" ref={sideNavRef}>
            <svg
              onClick={() => setSideBarActive(!sideBarActive)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer hover:scale-150"
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
      {sideBarActive ? (
        <div
          ref={sideBarDivRef}
          className={`flex ${
            sideBarActive ? "w-[250px]" : "w-[0px]"
          } h-full top-0 left-0 bottom-0 absolute bg-red-400 transition-all duration-100 ease-out z-[100]`}
        >
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-col w-full h-[40px] p-4 space-y-2">
            <span
              className="flex w-full p-3 rounded-sm justify-end"
              
            >
              <svg 
              onClick={() => setSideBarActive(!sideBarActive)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white cursor-pointer hover:bg-red-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
              <h1 className="text-center text-2xl text-white font-semibold">
                Menu List
              </h1>
              <Link
                to={`/backend`}
                replace={true}
                className="text-white hover:bg-red-800 text-center font-sans p-2 cursor-pointer rounded-lg"
              >
                DashBoard
              </Link>
              <Link
                to={`/backend/categories`}
                replace={true}
                className="text-white hover:bg-red-800 text-center font-sans p-2 cursor-pointer rounded-lg"
              >
                Categories
              </Link>
              <Link
                to={`/backend/variants`}
                replace={true}
                className="text-white hover:bg-red-800 text-center font-sans p-2 cursor-pointer rounded-lg"
              >
                Variant
              </Link>
              <Link
                to={`/backend/orders`}
                replace={true}
                className="text-white hover:bg-red-800 text-center font-sans p-2 cursor-pointer rounded-lg"
              >
                Order
              </Link>
              <Link
                to={`/backend/payments`}
                replace={true}
                className="text-white hover:bg-red-800 text-center font-sans p-2 cursor-pointer rounded-lg"
              >
                Payment
              </Link>
              <Link
                to={`/backend/products`}
                replace={true}
                className="text-white hover:bg-red-800 text-center font-sans p-2 cursor-pointer rounded-lg"
              >
                Product
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
});

export default NavBar;
