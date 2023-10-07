import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { myOrders } from "../../api/order-api";
import MyOrders from "../../components/tables/MyOrders";
import Paginate from "../../components/Paginate";
import { useSearchParams } from "react-router-dom";
import Loading from "../../components/Loading";
import NoData from "../../components/NoData";

// type Props = {}

const Page = React.memo(() => {
  const [getQuery] = useSearchParams();
  const queryPage = getQuery.get("page");
  const {
    isLoading,
    isError,
    data: orders,
    refetch,
  } = useQuery(["my-orders", getQuery], () =>
    myOrders(queryPage || 1),
    {
      refetchOnWindowFocus: false,
      retry: 0
    }
  );

  useEffect(() => {
    if(queryPage) {
      refetch();
    }
  }, [queryPage, refetch]);

  return (
    <div className="flex w-full max-h-auto min-h-[calc(100vh-70px)]">
      <div className="flex flex-col w-full h-full mx-auto container space-y-2">
        <div className="flex w-full h-auto md:h-[50px] mt-24 ml-5 md:ml-10">
          <h1 className="text-2xl md:text-5xl font-mono text-red-500">My Orders</h1>
        </div>

        <div className="relative overflow-x-auto mx-3 xl:mx-0 rounded-xl">
          {isLoading ? (
            <div className="flex w-full h-[350px]">
              <Loading />
            </div>
          ) : isError ? (
            <div className="flex w-full h-[350px]">
              <NoData />
            </div>
          ) : (
            <table className="w-full text-sm text-left text-gray-300 dark:text-gray-400 overflow-x-auto">
              <thead className="text-xs text-white uppercase bg-red-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Orders
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    delivery status
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    payment_status
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    total_price
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    total_qty
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders?.data?.orders?.data?.map((order, index) => {
                  return <MyOrders order={order} key={index} />;
                })}
              </tbody>
            </table>
          )}
        </div>
        <div className="flex w-full pr-6 justify-end">
          {orders ? (
            <Paginate
              previous={orders?.data?.orders?.previous}
              currePage={orders?.data?.orders?.currePage || 1}
              next={orders?.data?.orders?.next}
            />
          ) : null}
        </div>

      </div>
    </div>
  );
});

export default Page;
