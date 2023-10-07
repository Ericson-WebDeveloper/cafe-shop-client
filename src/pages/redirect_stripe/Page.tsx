import { useStripe } from "@stripe/react-stripe-js";
import { PaymentIntentResult } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { completedPaymentOrder } from "../../api/payment-api";
import icon_check from "../../assets/icons8-check-mark-96.png";
import cross_mark from "../../assets/icons8-cross-mark-96.png";
import { ErrorResponseF } from "../../api/ResponseType";

// type Props = {}

const Page = React.memo(() => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const [message, setMessage] = useState<string | null>(null);
    const {order_id} = useParams();
  const {
    isLoading: postConfirmPaymentLoading,
    isSuccess,
    isError,
    mutateAsync: mutatePaymentFinish,
  } = useMutation({
    mutationFn: completedPaymentOrder,
    onSuccess: () => {
      localStorage.removeItem("payment_id");
      toast.success("Payment succeeded!");
      navigate(`/redirect-payment/response?status=${true}`, { replace: true });
    },
    onError: (error: ErrorResponseF) => {
      if (error.status == 400) {
        toast.error(error.message || error.error);
        return;
      }
      toast.error("System Payment Error. Please Try Again.");
      navigate(`/redirect-payment/response?status=${false}`, { replace: true });
    },
  });

  useEffect(() => {
    // put to other page for success page and run this code
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (
      !stripe ||
      !clientSecret ||
      !localStorage.getItem("payment_id") || !order_id
    ) {
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(async ({ paymentIntent }: PaymentIntentResult) => {
        switch (paymentIntent?.status) {
          case "succeeded":
            // api order update status remaks etc
            // after that redirect to success page
            await mutatePaymentFinish({
              status: true,
              order_id: order_id as string,
              payment_trans_id: localStorage.getItem("payment_id") as string,
              ref1: paymentIntent.id as string,
              ref2: paymentIntent.client_secret as string,
            });
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            // api order update status remaks etc
            // after that redirect to error page
            await mutatePaymentFinish({
              status: false,
              order_id: order_id as string,
              payment_trans_id: "",
            });
            break;
          default:
            // api order update status remaks etc
            // after that redirect to error page
            await mutatePaymentFinish({
              status: false,
              order_id: order_id as string,
              payment_trans_id: localStorage.getItem("payment_id") as string,
            });
            break;
        }
      });
  }, [stripe, mutatePaymentFinish, order_id]);

  return (
    <div className="flex w-full max-h-auto min-h-[calc(100vh-174px)]">
      <div className="flex w-full mx-auto container justify-center items-center">
        {postConfirmPaymentLoading ? (
          <div className="flex w-full h-full justify-center items-center">
            <h1 className="text-3xl font-sans text-red-500 font-semibold">Loading.....</h1>
          </div>
        ) : isSuccess ? (
          <div className="flex w-full h-full">
            <div className="flex flex-col w-full h-full justify-center items-center">
              <h1 className="text-green-500 text-3xl font-semibold font-sans">
                Success Payment
              </h1>
              <img src={icon_check} className="w-36 h-32" alt="" />
            </div>
          </div>
        ) : isError && (
          <div className="flex w-full h-full">
            <div className="flex  flex-col w-full h-full justify-center items-center">
              <h1 className="text-red-500 text-3xl font-semibold font-sans">
                Failed Payment {message}
              </h1>
              <img src={cross_mark} className="w-36 h-32" alt="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default Page;
