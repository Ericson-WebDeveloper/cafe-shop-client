import React, { useState } from "react";
// import { auth_store } from "../../../store/auth";
import Profile from "../../../components/profile/Profile";
import Address from "../../../components/profile/Address";
import Contact from "../../../components/profile/Contact";

// type Props = {};

const Page = React.memo(() => {
  const [activeComp, setActiveComp] = useState<"profile" | "address" | "contact">("profile");
  return (
    <div className="flex w-full max-h-auto min-h-[calc(100vh-70px)]">
      <div className="flex w-full h-full justify-center items-center md:mx-auto md:container">
        <div className="flex w-full lg:w-[80%] h-full p-2 md:p-5 space-x-1 md:space-x-3">
          <div className="flex w-[30%] h-fit shadow-xl rounded-xl">
            <div className="flex flex-col w-full h-full">
              <ul className="flex flex-col w-full">
                <li
                  onClick={() => setActiveComp("profile")}
                  className={`flex p-2 text-gray-600 text-xs md:text-[16px] border-[2px] 
                border-red-300 justify-center items-center rounded-t-lg hover:bg-red-700 hover:text-white cursor-pointer ${
                  activeComp == "profile" ? "bg-red-700 text-white" : ""
                }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mr-1 md:mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Profile
                </li>
                <li
                  onClick={() => setActiveComp("address")}
                  className={`flex p-2 text-gray-600 text-xs md:text-[16px] border-[2px] 
                border-red-300 justify-center items-center hover:bg-red-700 hover:text-white cursor-pointer ${
                  activeComp == "address" ? "bg-red-700 text-white" : ""
                }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mr-1 md:mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  Address
                </li>
                <li
                  onClick={() => setActiveComp("contact")}
                  className={`flex text-gray-600 text-xs md:text-[16px] p-2 border-[2px] border-red-300 
                justify-center items-center rounded-b-lg hover:bg-red-700 hover:text-white cursor-pointer ${
                  activeComp == "contact" ? "bg-red-700 text-white" : ""
                }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mr-1 md:mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                  My Contact
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col w-[70%] h-auto bg-gray-100 rounded-2xl">
            {activeComp == "profile" ? (
              <Profile />
            ) : activeComp == "address" ? (
              <Address />
            ) : activeComp == "contact" ? (
              <Contact />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Page;
