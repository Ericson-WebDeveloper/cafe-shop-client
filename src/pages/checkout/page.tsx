import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { order_store } from "../../store/order";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getOrderData } from "../../api/order-api";
import { toast } from "react-toastify";
import { convertNumberPHP } from "../../helper/numberHelper";
import Stripe from "../../components/payment/Stripe";
import Paypal from "../../components/payment/paypal/Paypal";
// import "./checkout.css";
import { paymentCancelIntent } from "../../api/payment-api";

// type Props = {}

const Page = React.memo(() => {
  const { order_id } = useParams();
  const { setOrder, getOrder } = order_store();
  const { mutateAsync: cancelPaymentIntent } = useMutation({
    mutationFn: paymentCancelIntent,
  });
  const [tempSelectPayment, setTempSelectPayment] = useState<
    "stripe" | "paypal"
  >("stripe");
  const { payment, setPaymentSelection } = order_store();
  const { isLoading: queryOrderLoading } = useQuery(
    ["order", order_id],
    () => getOrderData(order_id || "1"),
    {
      onError: () => {
        toast.error("Check Out Order Data Not Found. Please Try Again Later.");
      },
      onSuccess: (response) => {
        setOrder("order", response.data.order);
      },
      refetchOnWindowFocus: false,
    }
  );
  const setupPayment = async (setup: "setup" | "cancel") => {
    if (setup == "setup") {
      if (tempSelectPayment) {
        setPaymentSelection(tempSelectPayment);
      }
    }
    if (setup == "cancel") {
      if (localStorage.getItem("payment_id")) {
        await cancelPaymentIntent(localStorage.getItem("payment_id") as string);
        setPaymentSelection("");
      }
    }

    localStorage.removeItem("payment_id");
  };
  return (
    <div className="flex w-full max-h-auto min-h-[calc(100vh-174px)]">
      <div className="flex flex-col w-full h-full justify-center items-center mt-8">
        {queryOrderLoading ? (
          <div className="w-full h-full">
            <div className="border border-blue-300 shadow rounded-md p-4 w-full h-full mx-auto">
              <div className="animate-pulse flex space-x-4 h-full">
                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-[95%] md:w-[70%] h-full space-y-6">
            <div className="flex flex-col w-full space-y-4">
              <h1 className="text-center text-4xl text-red-900 font-bold">
                Select Payment Option
              </h1>
              <p className="text-lg font-sans text-justify">
                Note: this is for testing purpose. please use Paypal Sandbox
                Account for Paypal. for Stripe please refer to this link:{" "}
                <a
                  href="https://stripe.com/docs/testing"
                  className="text-red-400"
                >
                  Click Here
                </a>{" "}
                for testing account.
              </p>
            </div>
            <div className="flex w-full h-full">
              <div className="flex w-full h-full justify-center">
                <div className="flex flex-col w-[95%] md:w-[40%] h-full space-y-3">
                  <div className="flex w-full justify-center space-x-3 md:space-x-0 md:justify-between">
                    <p className="text-red-400 font-sans font-semibold text-xl md:text-2xl">
                      Total (INC VAT)
                    </p>
                    {/* if free text-green !FREE */}
                    <p className="text-red-400 font-sans font-semibold text-xl md:text-2xl">
                      {convertNumberPHP(getOrder()?.total_price || 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row w-full h-full">
              <div className="flex md:flex-1 flex-col w-full items-center md:items-start">
                {getOrder() ? (
                  <>
                    <div
                      className="flex w-[250px] justify-center p-3"
                      onClick={() => setTempSelectPayment("stripe")}
                    >
                      <span
                        className={`flex w-full h-[100px] hover:shadow-2xl p-2 rounded-lg  ${
                          tempSelectPayment == "stripe"
                            ? "shadow-2xl border-2 border-red-700"
                            : "border-[1px] border-black"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payments"
                          id="stripe_payment"
                          value="stripe"
                          onChange={(e) =>
                            setTempSelectPayment(e.target.value as "stripe")
                          }
                          checked={tempSelectPayment == "stripe" ? true : false}
                        />
                        <img
                          src="/stripe.png"
                          className="object-fit p-3"
                          alt=""
                        />
                      </span>
                    </div>

                    <div
                      className="flex w-[250px] justify-center p-3 "
                      onClick={() => setTempSelectPayment("paypal")}
                    >
                      <span
                        className={`flex w-full h-[100px] hover:shadow-2xl hover:border-2 p-2 bg-gray-100 rounded-lg 
              ${
                tempSelectPayment == "paypal"
                  ? "shadow-2xl border-2 border-red-700"
                  : "border-[1px] border-black"
              }`}
                      >
                        <input
                          type="radio"
                          name="payments"
                          id="paypal_payment"
                          value="paypal"
                          onChange={(e) =>
                            setTempSelectPayment(e.target.value as "paypal")
                          }
                          checked={tempSelectPayment == "paypal" ? true : false}
                        />
                        <img
                          src="/paypal.png"
                          className="object-fit p-3"
                          alt=""
                        />
                      </span>
                    </div>
                    {payment ? null : (
                      <button
                        type="button"
                        // delete the payment_id
                        onClick={() => setupPayment("setup")}
                        className="p-2 w-[250px] text-white font-sans rounded-lg md:text-xl bg-red-600 hover:bg-red-500"
                      >
                        Select
                      </button>
                    )}
                  </>
                ) : (
                  <div className="flex w-full h-full">
                    <div className="flex w-full h-full justify-center items-center">
                      <h1 className="text-red-500 text-xl md:text-2xl font-semibold">
                        Order Data Not Found Please Try Again
                      </h1>
                    </div>
                  </div>
                )}
              </div>

              {payment == "" ? (
                <div className="flex md:flex-3 w-full h-full">
                  <div className="flex w-full h-full p-3 justify-center items-center">
                    <h1 className="text-gray-400 text-2xl font-semibold">
                      Select Payment Option
                    </h1>
                  </div>
                </div>
              ) : payment == "paypal" ? (
                <div className="flex flex-col w-full h-[250px] justify-center items-center mb-6 md:mb-0">
                  <Paypal />
                  <button
                    type="button"
                    onClick={() => setupPayment("cancel")}
                    className="p-2 w-[40%] bg-red-600 hover:bg-red-500"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex flex-col w-full h-full justify-center items-center mb-6 md:mb-0">
                  <h1 className="text-2xl md:text-4xl text-red-500 font-semibold">
                    Stripe Payment
                  </h1>
                  <Stripe />{" "}
                  <button
                    type="button"
                    onClick={() => setupPayment("cancel")}
                    className="p-2 w-[40%] text-white font-sans rounded-lg md:text-xl bg-red-600 hover:bg-red-500"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default Page;
