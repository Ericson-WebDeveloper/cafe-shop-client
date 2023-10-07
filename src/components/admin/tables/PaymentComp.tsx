import React from "react";
import { ICostumePayments } from "../../../api/payment-api";
import { convertDateTime } from "../../../helper/dateHelper";
import { convertNumberPHP } from "../../../helper/numberHelper";

type Props = {
  payment: ICostumePayments;
  setPaymentView: React.Dispatch<React.SetStateAction<ICostumePayments | null>>;
  onShowCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const PaymentComp = React.memo(
  ({ payment, setPaymentView, onShowCloseModal }: Props) => {
    return (
      <tr className="text-sm text-left text-gray-300 dark:text-gray-400 items-center border-[2px] border-l-0 border-r-0 border-red-400">
        <th
          scope="row"
          className="flex px-6 py-4 font-medium  whitespace-nowrap items-center space-x-2"
        >
          <p>{payment?.order.user.name}</p>{" "}
          <img
            src={payment.order.user?.details?.avatar}
            className="w-10 h-10 rounded-full border-[1px] border-gray-600"
            alt=""
          />
        </th>
        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
          {convertDateTime(payment.order.date_created)}
        </th>
        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
          {payment?.payment_type}
        </th>
        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
          {convertDateTime(payment?.date_created)}
        </th>
        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
          {payment?.payment_status ? "Paid" : "UnPaid"}
        </th>
        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
          {payment?.payment_remarks}
        </th>
        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
          {convertNumberPHP(payment?.total_payment)}
        </th>
        <td className="flex w-full h-full px-6 py-4 space-x-3 justify-center items-center">
          <button
            type="button"
            onClick={() => {
              setPaymentView(payment);
              onShowCloseModal(true);
            }}
            className="p-2 px-4 bg-green-700 text-white rounded-lg font-mono hover:bg-green-400"
          >
            view
          </button>
        </td>
      </tr>
    );
  }
);

export default PaymentComp;
