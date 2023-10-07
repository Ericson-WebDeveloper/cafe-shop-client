import React from "react";
import { ICostumePayments } from "../../api/payment-api";
import { convertDateTime } from "../../helper/dateHelper";
import { convertNumberPHP } from "../../helper/numberHelper";

type Props = {
  showModal: boolean;
  onCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
  payment: ICostumePayments | null;
  setPaymentView: React.Dispatch<React.SetStateAction<ICostumePayments | null>>;
};

const ViewPayment = ({
  onCloseModal,
  showModal,
  payment,
  setPaymentView,
}: Props) => {
  return (
    <div
      className={`${
        showModal == true ? "flex" : "hidden"
      } w-full h-full fixed items-center justify-center bg-black bg-opacity-75 top-0 left-0 bottom-0 z-80`}
    >
      <div
        className="flex relative sm-modal-width md:md-modal-width lg:lg-modal-width h-[650px] bg-gray-50 shadow-2xl border-2 border-gray-500 
          rounded-xl transition-opacity duration-500 delay-500 ease-in-out"
      >
        <div className="flex relative  flex-col w-full h-full">
          <div className="flex w-full justify-between items-center p-4">
            <h1 className="text-xl md:text-3xl font-semibold font-sans text-red-600">
              Payment By: #{payment?._id} {payment?.order?.user.name}
            </h1>
            <span
              className="flex m-2 hover:bg-red-200 rounded-sm"
              onClick={() => {
                setPaymentView(null);
                onCloseModal(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-red-500 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
          <div className="flex w-full h-full overflow-auto mb-8">
            <div className="flex flex-col w-full h-full p-8 space-y-6">
              <div className="flex flex-col w-full items-center">
                <img
                  src={payment?.order?.user?.details?.avatar}
                  className="w-36 h-36 rounded-full border-[1px] border-black"
                  alt=""
                />
              </div>
              <div className="flex flex-col w-full">
                <label
                  htmlFor=""
                  className="text-xl md:text-2xl text-red-500 font-sans"
                >
                  User Email:{" "}
                  <b>{payment?.order?.user.email}</b>
                </label>
              </div>
              <div className="flex flex-col w-full">
                <label
                  htmlFor=""
                  className="text-xl md:text-2xl text-red-500 font-sans"
                >
                  User Address:{" "}
                  <b>City: {payment?.order.details.city}, Province: {payment?.order.details.province}, 
                  House: {payment?.order.details.house_no} zip code: {payment?.order.details.zip_code}</b>
                </label>
              </div>
              <div className="flex flex-col w-full">
                <label
                  htmlFor=""
                  className="text-xl md:text-2xl text-red-500 font-sans"
                >
                  Payment Date:{" "}
                  <b>{convertDateTime(payment?.payment_created as Date)}</b>
                </label>
              </div>
              <div className="flex flex-col w-full">
                <label
                  htmlFor=""
                  className="text-xl md:text-2xl text-red-500 font-sans"
                >
                  Payment Type: <b>{payment?.payment_type}</b>
                </label>
              </div>
              <div className="flex flex-col w-full">
                <label
                  htmlFor=""
                  className="text-xl md:text-2xl text-red-500 font-sans"
                >
                  Payment Status: <b>{payment?.payment_status ? "Paid" : "UnPaid"}</b>
                </label>
              </div>
              <div className="flex flex-col w-full">
                <label
                  htmlFor=""
                  className="text-xl md:text-2xl text-red-500 font-sans"
                >
                  Payment Remarks: <b>{payment?.payment_remarks}</b>
                </label>
              </div>
              <div className="flex flex-col w-full">
                <label
                  htmlFor=""
                  className="text-xl md:text-2xl text-red-500 font-sans"
                >
                  Total Payment:{" "}
                  <b>{convertNumberPHP(payment?.total_payment as number)}</b>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPayment;
