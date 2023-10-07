import React from "react";
import { ICostumOrderInterfaceType, order_store } from "../../../store/order";
// import { IPaymentType } from "../../../model/Payment";
import { convertDateTime } from "../../../helper/dateHelper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatingDeliveryStatus } from "../../../api/order-api";
import { convertNumberPHP } from "../../../helper/numberHelper";
import { ErrorResponseF } from "../../../api/ResponseType";
import { toast } from "react-toastify";

type Props = {
  onCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
  order: ICostumOrderInterfaceType;
};

const OrdersComp = React.memo(({ order, onCloseModal}: Props) => {
  const queryClient = useQueryClient()
  const {setOrder} = order_store()
  const viewOrderData = () => {
    setOrder('order', order);
    onCloseModal(true)
  }

  const {isLoading, mutateAsync: mutateDeliverySatus} = useMutation({mutationFn: updatingDeliveryStatus,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey:['orders']});
        toast.success('Updating Status Success');
      },
      onError: (error:ErrorResponseF) => {
        toast.error(error?.message||error?.error);
      }
    })
    const onChangedDelivery = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      return await mutateDeliverySatus({remarks: e.target.value, order_id:order._id})
    }

  return (
    <tr className="text-sm text-left text-gray-300 dark:text-gray-400 items-center border-[2px] border-l-0 border-r-0 border-red-400">
       <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
        #{order?._id}
      </th>
      <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
        {order?.user?.name}
      </th>
      <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
        <>{convertDateTime(order?.date_created)}</>
      </th>
      <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
        {order.delivery_status ? (
          <span
            className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 
      rounded dark:bg-green-900 dark:text-green-300"
          >
            Delivered - {order?.delivery_remark || ''}
          </span>
        ) : (
          <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
            UnDelivered - {order?.delivery_remark || ''}
          </span>
        )} 
      </th>
      <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
        {order.payment_status ? (
          <span
            className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 
      rounded dark:bg-green-900 dark:text-green-300"
          >
            Paid
          </span>
        ) : (
          <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
            UnPaid
          </span>
        )}
      </th>
      <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
        {convertNumberPHP(order.total_price)}
      </th>
      <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
        {order.total_qty}
      </th>

      <td className="flex w-full h-full px-6 py-4 space-x-3 justify-center items-center">
        <button
          type="button" onClick={() => viewOrderData()}
          className=" p-2 px-4 bg-green-700 text-white rounded-lg font-mono hover:bg-green-400"
        >
          View
        </button>
        {
          isLoading ? <div className="flex w-full h-full">
            <h1 className="text-sm text-red-600">Loading....</h1>
          </div> : <select
          id="status" defaultValue="" onChange={onChangedDelivery}
          disabled={ order.delivery_status ? true : order?.delivery_remark == 'Cancel' ? true : false }
          className="p-2 bg-red-700 text-white rounded-lg font-mono hover:bg-red-400"
        >
          <option value="" className="text-white hover:bg-red-400">
            Choose a Status
          </option>
          <option value="Delivered" className="text-white hover:bg-red-400">
            Delivered
          </option>
          <option value="Cancel" className="text-white hover:bg-red-400">
            Cancel
          </option>
          <option value="On The Way" className="text-white hover:bg-red-400">
            On The Way
          </option>
        </select>
        }
        
      </td>
    </tr>
  );
});

export default OrdersComp;
