import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ICostumePayments, allPayments } from "../../../api/payment-api";
import { useSearchParams } from "react-router-dom";
import PaymentComp from "../../../components/admin/tables/PaymentComp";
import Paginate from "../../../components/Paginate";
import NoData from "../../../components/NoData";
import Loading from "../../../components/Loading";
import ViewPayment from "../../../components/admin/ViewPayment";

// type Props = {}

const Page = React.memo(() => {
  const [getQuery] = useSearchParams();
  const [showViewPayment, setShowViewPayment] = useState<boolean>(false);
  const [paymentView, setPaymentView] = useState<ICostumePayments | null>(null);
  const {
    refetch,
    isLoading,
    isError,
    data: payments,
  } = useQuery(
    ["payments", getQuery],
    () => allPayments(getQuery.get("page") || 1),
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (getQuery.get("page")) {
      refetch();
    }
  }, [getQuery, refetch]);

  return (
    <div className="flex w-full max-h-auto min-h-[calc(100vh-70px)] z-[90] mb-10 md:mb-0">
      <div className="flex flex-col w-full h-full mx-auto container space-y-2">
        <div className="flex flex-row w-full space-x-3 items-center h-auto md:h-[50px] mt-24">
          <h1 className="text-3xl md:text-4xl font-mono text-red-500">
            Payments
          </h1>
        </div>

        <div className="relative overflow-x-auto mx-3 xl:mx-0 rounded-xl ">
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
                    user
                  </th>
                  <th scope="col" className="px-6 py-3">
                    date order
                  </th>
                  <th scope="col" className="px-6 py-3">
                    payment type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    payment date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    payment status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    payment remarks
                  </th>
                  <th scope="col" className="px-6 py-3">
                    total payment
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments?.data?.payments?.data?.map((payment, index) => {
                  return (
                    <PaymentComp
                      key={index}
                      payment={payment}
                      onShowCloseModal={setShowViewPayment}
                      setPaymentView={setPaymentView}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        {/*  */}
          {payments ? (
            <Paginate
              previous={payments?.data?.payments?.previous}
              currePage={payments?.data?.payments?.currePage || 1}
              next={payments?.data?.payments?.next}
            />
          ) : null}
        {/*  */}
      </div>
      <ViewPayment
        setPaymentView={setPaymentView}
        onCloseModal={setShowViewPayment}
        showModal={showViewPayment}
        payment={paymentView || null}
      />
    </div>
  );
});

export default Page;
