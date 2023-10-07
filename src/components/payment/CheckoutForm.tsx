import React, { 
  // useEffect, 
  useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  // PaymentIntentResult,
  StripePaymentElementOptions,
} from "@stripe/stripe-js";
import { 
  // useNavigate, 
  useParams } from "react-router-dom";
// import { auth_store } from "../../store/auth";
// import { useMutation } from "react-query";
// import { completedPaymentOrder } from "../../api/payment-api";
// import { ErrorResponseF } from "../../api/ResponseType";
// import { toast } from "react-toastify";

const CheckoutForm = React.memo(() => {
  const { order_id } = useParams();
  // const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };

  // const {
  //   isLoading: postConfirmPaymentLoading,
  //   mutateAsync: mutatePaymentFinish,
  // } = useMutation({
  //   mutationFn: completedPaymentOrder,
  //   onSuccess: () => {
  //     localStorage.removeItem("payment_id");
  //     toast.success("Payment succeeded!");
  //     navigate(`/redirect-payment/response?status=${true}`, { replace: true });
  //   },
  //   onError: (error: ErrorResponseF) => {
  //     if (error.status == 400) {
  //       toast.error(error.message || error.error);
  //       return;
  //     }
  //     toast.error("System Payment Error. Please Try Again.");
  //     navigate(`/redirect-payment/response?status=${false}`, { replace: true });
  //   },
  // });
 

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // useEffect(() => {
  //   // put to other page for success page and run this code
  //   const clientSecret = new URLSearchParams(window.location.search).get(
  //     "payment_intent_client_secret"
  //   );

  //   if (!stripe || !clientSecret || !localStorage.getItem("payment_id") || !order_id) {
  //     return;
  //   }

  //   stripe
  //     .retrievePaymentIntent(clientSecret)
  //     .then(async ({ paymentIntent }: PaymentIntentResult) => {
  //       switch (paymentIntent?.status) {
  //         case "succeeded":
  //           // api order update status remaks etc
  //           // after that redirect to success page
  //           await mutatePaymentFinish({
  //             status: true,
  //             order_id: order_id as string,
  //             payment_trans_id: localStorage.getItem("payment_id") as string,
  //             ref1: paymentIntent.id as string,
  //             ref2: paymentIntent.client_secret as string,
  //           });
  //           break;
  //         case "processing":
  //           setMessage("Your payment is processing.");
  //           break;
  //         case "requires_payment_method":
  //           // api order update status remaks etc
  //           // after that redirect to error page
  //           await mutatePaymentFinish({
  //             status: false,
  //             order_id: order_id as string,
  //             payment_trans_id: "",
  //           });
  //           break;
  //         default:
  //           // api order update status remaks etc
  //           // after that redirect to error page
  //           await mutatePaymentFinish({
  //             status: false,
  //             order_id: order_id as string,
  //             payment_trans_id: localStorage.getItem("payment_id") as string,
  //           });
  //           break;
  //       }
  //     });
  // }, [stripe, mutatePaymentFinish, order_id]);
  // put to other page for success page and run this code

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    try {
      setIsLoading(true);
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          // return_url: window.location.href, // add order_id as query http://localhost:3000?order_trans_id=
          return_url: `http://localhost:5173/redirect-payment/stripe/${order_id}`,
        },
      });
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error?.message || "Error Payment Please try Again");
      } else {
        setMessage("An unexpected error occurred.");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setMessage("An unexpected error occurred.");
    }
    
  };

 

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-pay-now">
          {isLoading ? (
            <div className="spinner" id="spinner-pay"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
});

export default CheckoutForm;
