import React, { useState, useEffect, 
  useRef 
} from "react";
import {
  Appearance,
  StripeElementsOptions,
  loadStripe,
} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useMutation } from "@tanstack/react-query";
import { createPaymentStripeIntentApi } from "../../api/payment-api";
import { ErrorResponseF } from "../../api/ResponseType";
import { useParams } from "react-router-dom";
import { order_store } from "../../store/order";
import { toast } from "react-toastify";
import "./Stripe.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
// type Props = {}

const Stripe = React.memo(() => {
  const { order_id } = useParams();

  const { order } = order_store();
  const stripeRef = useRef<boolean>(false);
 
  const [clientSecret, setClientSecret] = useState<string>("");
  const { isLoading, mutateAsync: mutatePaymentIntent } = useMutation({
    mutationFn: createPaymentStripeIntentApi,
    onSuccess: (response) => {
      setClientSecret(response.data.clientSecret)
      localStorage.setItem("payment_id", response.data.payment_ref);
    },
    onError: (error: ErrorResponseF) => {
      toast.error(
        error?.error ||
          error?.message ||
          "Payment Selected Not Available Now. Please Try Again."
      );
    },
  });

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    // create Order APi Call
    // await api.post('/api/order/checkoutorder')
    // get reposne order_id_ref & order_qty
    // order_id store in localstorage
    // fetch("/create-payment-intent", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ items: [
    //     { id: "xl-tshirt" }
    //   ] }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => setClientSecret(data.clientSecret));
    const loadPaymentCard = async () => {
      if (
        order_id &&
        order &&
        clientSecret == "" && stripeRef.current == false
      ) {
        stripeRef.current = true
        return setTimeout(async() => {
          return await mutatePaymentIntent({
            order_id: order_id as string,
            total_amount: order?.total_price || 0,
          });
        }, 500)
      }
    };
    loadPaymentCard();
  }, [clientSecret, order_id, order, mutatePaymentIntent]);

  const appearance: Appearance = {
    theme: "stripe",
  };
  const optionStripe: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <div className="flex w-full h-full">
      <div className="flex w-full h-full p-4 justify-center">
        {isLoading ? (
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
        ) : clientSecret ? (
          <Elements options={optionStripe} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        ) : null}
      </div>
    </div>
  );
});

export default Stripe;
