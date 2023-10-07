import React, { useEffect } from "react";

// type Props = {}
import icon_check from "../../assets/icons8-check-mark-96.png";
import cross_mark from "../../assets/icons8-cross-mark-96.png";
import { useQueryClient } from "@tanstack/react-query";

const Page = React.memo(() => {
  const status = new URLSearchParams(window.location.search).get("status");
  const queryClient = useQueryClient();

  useEffect(() => {
    localStorage.removeItem('payment_id');
    queryClient.invalidateQueries({queryKey:['my_carts']})
  }, [queryClient]);
  
  return (
    <div className="flex w-full max-h-auto min-h-[calc(100vh-174px)]">
      <div className="flex w-full mx-auto container justify-center items-center">
        {status && status == "true" ? (
          <div className="flex w-full h-full">
            <div className="flex flex-col w-full h-full justify-center items-center">
              <h1 className="text-green-500 text-3xl font-semibold font-sans">Success Payment</h1>
              <img src={icon_check} className="w-36 h-32" alt="" />
            </div>
          </div>
        ) : (
          <div className="flex w-full h-full">
            <div className="flex  flex-col w-full h-full justify-center items-center">
              <h1 className="text-red-500 text-3xl font-semibold font-sans">Failed Payment</h1>
              <img src={cross_mark} className="w-36 h-32"  alt="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default Page;
