import React from "react";
import { useQuery } from "@tanstack/react-query";
import { adminDashBoard } from "../../../api/auth-api";
import Loading from "../../../components/Loading";
import NoData from "../../../components/NoData";

// type Props = {}

const Page = React.memo(() => {
  const { isLoading, isError, data } = useQuery(["dashboards"], adminDashBoard, {
    refetchOnWindowFocus: false
  });

  return (
    <div className="flex w-full max-h-auto min-h-[calc(100vh-70px)] z-[90]">
      <div className="flex w-full h-full mx-auto container">
        {isLoading ? (
            <div className="flex w-full h-[350px]">
              <Loading />
            </div>
          ) : isError ? (
            <div className="flex w-full h-[350px]">
              <NoData />
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-auto py-5 ">
              <div className="flex w-[350px] h-[150px] bg-gray-100 shadow-lg border-[1px] justify-center items-center border-red-500 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-14 w-14 absolute right-[20px] top-[10px] text-red-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <h1 className="text-7xl text-red-500 font-bold font-monospace">
                  {data?.data.orderCounts || 0}
                </h1>
              </div>
              <div className="flex w-[350px] h-[150px] bg-gray-100 shadow-lg border-[1px] justify-center items-center border-red-500 relative">
                <svg
                  className="w-14 h-14 absolute text-red-700 right-[20px] top-[10px]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                </svg>
                <h1 className="text-7xl text-red-500 font-bold font-monospace">
                {data?.data.productCounts || 0}
                </h1>
              </div>
              <div className="flex w-[350px] h-[150px] bg-gray-100 shadow-lg border-[1px] justify-center items-center border-red-500 relative">
                <svg
                  className="w-14 h-14 text-red-700 absolute right-[20px] top-[10px]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01"
                  />
                </svg>
                <h1 className="text-7xl text-red-500 font-bold font-monospace">
                {data?.data.categoryCounts || 0}
                </h1>
              </div>
              <div className="flex w-[350px] h-[150px] bg-gray-100 shadow-lg border-[1px] justify-center items-center border-red-500 relative">
                <svg
                  className="w-14 h-14 absolute text-red-700 right-[20px] top-[10px]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <h1 className="text-7xl text-red-500 font-bold font-monospace">
                {data?.data.userCounts || 0}
                </h1>
              </div>
              <div className="flex w-[350px] h-[150px] bg-gray-100 shadow-lg border-[1px] justify-center items-center border-red-500 relative">
                <svg
                  className="w-14 h-14 absolute text-red-700 right-[20px] top-[10px]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h6m-6 4h6m-6 4h6M1 1v18l2-2 2 2 2-2 2 2 2-2 2 2V1l-2 2-2-2-2 2-2-2-2 2-2-2Z"
                  />
                </svg>
                <h1 className="text-7xl text-red-500 font-bold font-monospace">
                {data?.data.paymentCounts || 0}
                </h1>
              </div>
              </div>
          )}
    
      </div>
    </div>
  );
});

export default Page;
