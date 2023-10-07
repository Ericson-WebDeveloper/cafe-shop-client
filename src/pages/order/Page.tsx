import { useQuery } from "@tanstack/react-query";
import React from "react";
import { viewOrderData } from "../../api/order-api";
import { useParams } from "react-router-dom";
import { convertDateTime } from "../../helper/dateHelper";
import { convertNumberPHP } from "../../helper/numberHelper";
import NoData from "../../components/NoData";
import Loading from "../../components/Loading";

// type Props = {};

const Page = React.memo(() => {
  const { order_id } = useParams();
  const {
    isLoading,
    isError,
    data: order,
  } = useQuery({
    queryKey: ["order", order_id],
    queryFn: () => viewOrderData(order_id || ""),
  });
  return (
    <div className="flex w-full max-h-auto min-h-[calc(100vh-70px)]">
      {isLoading ? (
        <div className="flex w-full h-[350px]">
          <Loading />
        </div>
      ) : isError ? (
        <div className="flex w-full h-[350px]">
          <NoData />
        </div>
      ) : (
        <div className="flex flex-col w-full h-full mx-4 md:mx-auto container space-y-2 py-14">
          <h1 className="text-xl md:text-2xl lg:text-4xl text-red-500 font-semibold font-sans">
            Order Date:{" "}
            <>{convertDateTime(order?.data.order?.date_created as Date)}</>
          </h1>
          <h1 className="text-lg md:text-xl lg:text-3xl text-red-500 font-semibold font-sans">
            Status: {order?.data.order.delivery_remark}
          </h1>
          <h1 className="text-lg md:text-xl lg:text-3xl text-red-500 font-semibold font-sans">
            Delivery Status:{" "}
            {order?.data.order.delivery_status ? "Delivered" : "UnDelivered"}
          </h1>
          {order?.data?.order?.order_details?.map((order, index) => {
            return (
              <span key={index}>
                <div className="flex w-full h-full border-[1px] shadow-xl border-gray-200 rounded-lg" >
                  <div
                    className="flex w-full h-full items-center space-x-3 p-2"
                  >
                    <img
                      src={order?.product?.image}
                      className="h-14 w-16"
                      alt=""
                    />
                    <span className="flex flex-col w-full h-full">
                      <h1 className="text-sm md:text-lg lg:text-2xl text-red-500 font-semibold font-sans">
                        {order?.product.name}
                      </h1>
                      {order?.selections?.map((selection, index) => {
                        return (
                          <p
                            className="text-xs lg:text-xl text-red-500 font-semibold font-sans"
                            key={index}
                          >
                            {selection.name}
                          </p>
                        );
                      })}
                    </span>
                    <span className="flex w-full h-full space-x-3 justify-end">
                    <h1 className="text-sm md:text-lg lg:text-2xl text-red-500 font-semibold font-sans">
                      Qty: {order.total_qty}
                    </h1>
                    <h1 className="text-sm md:text-lg lg:text-2xl text-red-500 font-semibold font-sans">
                      Price: {convertNumberPHP(order.total_price)}
                    </h1>
                    </span>
                  </div>
                </div>{" "}
                <br />
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
});

export default Page;
