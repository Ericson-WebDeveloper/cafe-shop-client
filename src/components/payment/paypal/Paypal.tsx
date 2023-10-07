import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// type Props = {}
import "./paypal.css";
import { useNavigate, useParams } from "react-router-dom";
import { order_store } from "../../../store/order";
import {
  completedPaymentOrder,
  paymentCreateOrder,
  paypalOnApprove,
} from "../../../api/payment-api";
import { toast } from "react-toastify";

const Paypal = React.memo(() => {
  const { order_id } = useParams();
  const { order } = order_store();
  const initialOptions: { clientId: string } = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT || "",
    // 'enable-funding': 'paylater,venmo',
    // 'data-sdk-integration-source': 'integrationbuilder_ac'
  };

  const navigate = useNavigate();

  // const [message, setMessage] = useState("");

  return (
    <div
      className="flex w-full h-full p-2 justify-center items-center"
      style={{ maxWidth: "750px", minHeight: "200px" }}
    >
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          className="flex w-[80%]"
          style={{
            shape: "pill",
            color: "blue", // change the default color of the buttons
            layout: "vertical", //default value. Can be changed to horizontal
          }}
          createOrder={async (): Promise<string> => {
            try {
              const data = {
                order_id: order_id as string,
                total_amount: order?.total_price as number,
              };
              const orderData = await paymentCreateOrder(data);
              if (orderData.data.datas?.id) {
                console.log(orderData, " after Create");
                localStorage.setItem("payment_id", orderData.data.payment_ref);
                return orderData.data.datas?.id;
              } else {
                throw new Error(
                  "Payment Paypal is Not responding correctly. please choose other payment"
                );
              }
            } catch (error: unknown) {
              toast.error(`Could not initiate PayPal Checkout...${error}`);
              throw new Error(`Could not initiate PayPal Checkout...${error}`);
            }
          }}
          onApprove={async (data, actions) => {
            try {
              const orderData = await paypalOnApprove({
                orderID: data.orderID,
              });
              if (
                orderData?.data?.datas &&
                orderData?.data?.datas?.status == "INSTRUMENT_DECLINED"
              ) {
                return actions.restart();
              } else if (
                orderData?.data?.datas &&
                orderData?.data?.datas?.status != "COMPLETED"
              ) {
                // (2) Other non-recoverable errors -> Show a failure message
                toast.error("Payment Paypal Failed");
              } else {
                await completedPaymentOrder({
                  status: true,
                  order_id: order_id as string,
                  payment_trans_id: localStorage.getItem(
                    "payment_id"
                  ) as string,
                  ref1: orderData?.data?.datas?.payment_source.paypal
                    .email_address,
                  ref2: orderData.data.datas.payment_source.paypal.account_id,
                });
                localStorage.removeItem("payment_id");
                navigate(`/redirect-payment/response?status=${true}`, {
                  replace: true,
                });
              }
            } catch (error) {
              await completedPaymentOrder({
                status: false,
                order_id: order_id as string,
                payment_trans_id: localStorage.getItem("payment_id") as string,
                ref1: "",
                ref2: "",
              });
              localStorage.removeItem("payment_id");
              navigate(`/redirect-payment/response?status=${true}`, {
                replace: true,
              });
              toast.error(
                `Sorry, your transaction could not be processed...${error}`
              );
              navigate(`/redirect-payment/response?status=${false}`, {
                replace: true,
              });
            }
          }}
        />
      </PayPalScriptProvider>
      {/* {message ?? <p className="text-red-500 text-lg font-sans">message</p>} */}
    </div>
  );
});

export default Paypal;
