import React from "react";
import { ICostumOrderInterfaceType } from "../../store/order";
import { convertDateTime, getPastTime } from "../../helper/dateHelper";
import { useNavigate } from "react-router-dom";
import { convertNumberPHP } from "../../helper/numberHelper";

type Props = {
  // order: IOrderInterfaceType & {payments: IPaymentType[]},
  order: ICostumOrderInterfaceType;
};

const MyOrders = React.memo(({ order }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <tr className="bg-gray-100 border-b text-black">
        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
          <>{convertDateTime(order?.date_created)}</>
        </th>
        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
          {order?.order_details?.map((order, index) => {
            return <p key={index}>{order.product.name},</p>;
          })}
        </th>
        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap text-center">
              {order?.delivery_status ? "Delivered" : "Not Delivered"}
              <br />
            {`${
              getPastTime(order?.date_created) >= 90
                ? "Cancel via Super Late Delivery"
                : order?.delivery_remark || ""
            }`}
        </th>
        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
          {order?.payment_status ? "Paid" : "Not Paid"}
        </th>
        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
          {convertNumberPHP(order.total_price)}
        </th>
        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
          {order.total_qty}
        </th>
        <td className="px-2 md:px-6 py-2 md:py-4 space-y-3 md:space-x-3 justify-center">
          <button
            type="button"
            onClick={() => navigate(`/order/summary/${order._id}`)}
            className="p-2 px-4 w-full md:w-auto bg-blue-700 text-white rounded-lg font-mono hover:bg-blue-400"
          >
            View
          </button>
          <button
            type="button"
            className="p-2 px-4 w-full md:w-auto bg-green-700 text-white rounded-lg font-mono hover:bg-green-400"
          >
            Update Status
          </button>
        </td>
      </tr>
    </>
  );
});

export default MyOrders;
