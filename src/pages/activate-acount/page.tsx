import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { activateAccountAPi } from "../../api/auth-api";
import { toast } from "react-toastify";
import { ErrorResponseF } from "../../api/ResponseType";

// type Props = {}

const Page = React.memo(() => {
  const { code, email } = useParams();
  const { isLoading, isSuccess } = useQuery(
    ["activate", code, email],
    () => activateAccountAPi(code!, email!),
    {
      // The query will not execute until the userId exists
      enabled: !!code && !!email,
      onError: (error: ErrorResponseF) => {
        if (error.message) {
          toast.error(error.message);
        }
      },
      refetchOnWindowFocus: false
    }
  );

  return (
    <div className="w-full h-[calc(100vh-174px)] flex">
      <div className="w-full h-full flex justify-center items-center ">
        <div className="w-[75%] lg:w-full h-[80%] flex mx-4 md:mx-24 md:container">
          <div className="flex flex-1 flex-col bg-gray-200 ">
            <div className="flex w-full h-full p-15 justify-center items-center">
              <h1 className="text-4xl font-semibold text-red-500">{isLoading ? "Loading...." : isSuccess ? `Activate Account Complete` : `Activate Account Failed`}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Page;
