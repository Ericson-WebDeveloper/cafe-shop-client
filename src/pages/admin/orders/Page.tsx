import React, {useEffect, useState} from "react";
import { useQuery } from "@tanstack/react-query";
import { listOrders } from "../../../api/order-api";
import { useSearchParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import NoData from "../../../components/NoData";
import OrdersComp from "../../../components/admin/tables/OrdersComp";
import Paginate from "../../../components/Paginate";
import ViewOrder from "../../../components/admin/ViewOrder";

// type Props = {}

const Page = React.memo(() => {
  const [getQuery] = useSearchParams();
  const {refetch, isLoading, isError, data: orders} = useQuery(['orders', getQuery], () => listOrders(getQuery.get('page')||1));
  const [showViewOrder, setShowViewOrder] = useState<boolean>(false);
  useEffect(() => {
    if (getQuery.get("page")) {
      refetch();
    }
  }, [getQuery, refetch]);
  return (
    <div className="flex w-full max-h-auto min-h-[calc(100vh-70px)] z-[90] mb-10 md:mb-0">
      <div className="flex flex-col w-full h-full mx-auto container space-y-2">
        <div className="flex flex-row w-full space-x-3 items-center h-auto md:h-[50px] mt-24">
          <h1 className="text-3xl md:text-4xl font-mono text-red-500">Orders</h1>
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
            <table className="w-full text-sm text-left text-gray-300 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-red-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order #
                </th>
                <th scope="col" className="px-6 py-3">
                  costumer
                </th>
                <th scope="col" className="px-6 py-3">
                  date order
                </th>
                <th scope="col" className="px-6 py-3">
                  delivery status
                </th>
                <th scope="col" className="px-6 py-3">
                  payment_status
                </th>
                <th scope="col" className="px-6 py-3">
                  total_price
                </th>
                <th scope="col" className="px-6 py-3">
                  total_qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {
                orders?.data?.orders?.data?.map((order, index) => {
                  return <OrdersComp order={order} key={index} onCloseModal={setShowViewOrder} />
                })
              }
            </tbody>
          </table>
            )}
          
        </div>
        {/*  */}
          {orders ? (
            <Paginate
              previous={orders?.data?.orders?.previous}
              currePage={orders?.data?.orders?.currePage || 1}
              next={orders?.data?.orders?.next}
            />
          ) : null}
        {/*  */}
      </div>
      <ViewOrder showModal={showViewOrder} onCloseModal={setShowViewOrder} />
    </div>
  );
});

export default Page;
