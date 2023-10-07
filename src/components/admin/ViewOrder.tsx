import React from "react";
import { order_store } from "../../store/order";
import { convertNumberPHP } from "../../helper/numberHelper";
import { IUserDetailType } from "../../model/UserType";

type Props = {
  showModal: boolean;
  onCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ViewOrder = ({ showModal, onCloseModal }: Props) => {
  const { setOrder, order } = order_store();
  const closingModalComp = () => {
    setOrder("order", null);
    onCloseModal(false);
  };

  return (
    <div
      className={`${
        showModal == true ? "flex" : "hidden"
      } w-full h-full fixed items-center justify-center bg-black bg-opacity-75 top-0 left-0 bottom-0 z-80`}
    >
      <div
        className="flex relative md-modal-width lg:lg-modal-width h-[650px] bg-gray-50 shadow-2xl border-2 border-gray-500 
          rounded-xl transition-opacity duration-500 delay-500 ease-in-out"
      >
        <div className="flex relative  flex-col w-full h-full">
          <div className="flex w-full justify-between items-center p-4">
            <h1 className="text-xl md:text-3xl font-semibold font-sans text-red-600">
              Order by: {order?.user.name}
            </h1>
            <span
              className="flex m-2 hover:bg-red-200 rounded-sm"
              onClick={() => closingModalComp()}
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

          {/* form */}
          <div className="flex w-full h-full overflow-auto">
            <div className="flex flex-col w-full h-full p-8 space-y-2">
              <div className="flex w-full justify-center">
                <img
                  src={
                    order?.user?.details
                      ? (order?.user?.details as IUserDetailType).avatar
                      : ""
                  }
                  className="w-24 md:w-36 h-24 md:h-36"
                  alt=""
                />
              </div>
              {order?.order_details?.map((order_detail, index) => {
                return (
                  <div
                    key={index}
                    className="flex w-full h-[300px] space-x-2 p-3 bg-gray-100 shadow-xl"
                  >
                    <div className="flex [100px] md:w-[150px] h-[100px] md:h-[130px] ">
                      <img src={order_detail?.product?.image} alt="" />
                    </div>
                    <div className="flex flex-col w-full">
                      <h1 className="text-md sm:text-xl md:text-2xl text-red-500 font-sans">
                        {order_detail.product.name}
                      </h1>
                      <p className=" text-red-500 font-sans text-sm sm:text-lg">
                        {order_detail.product.description}
                      </p>
                      <br />
                      {order_detail.selections?.map((selection, index) => {
                        return (
                          <span
                            className="text-red-500 font-sans font-semibold text-sm sm:text-lg"
                            key={index}
                          >
                            {selection?.variant.name}: {selection?.name}
                          </span>
                        );
                      })}

                      <span className="flex w-full justify-between">
                        <p className="text-red-500 font-bold text-sm sm:text-lg">
                          {convertNumberPHP(order_detail.total_price)}
                        </p>
                        <p className="text-red-500 font-bold text-sm sm:text-lg">
                          Qty: {order_detail.total_qty}
                        </p>
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className="flex w-full justify-end pb-3">
                <p className="text-red-500 font-bold text-xl md:text-3xl">
                  Total Price {convertNumberPHP(order?.total_price || 0)}
                </p>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
