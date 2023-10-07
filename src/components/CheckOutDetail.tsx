import React from 'react'
import { cart_store } from '../store/cart'
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { ErrorResponseF } from '../../api/ResponseType';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { createNewOrder } from '../api/order-api';
import { ErrorResponseF } from '../api/ResponseType';
import { useNavigate } from 'react-router-dom';

// type Props = {}
export interface ICartCheckoutOrder {
    carts: Array<string>,
    details: {
        house_no: number,
        city: string,
        province: string,
        zip_code: number,
    }
}
const schema = yup
  .object({
    details: yup.object({
        house_no: yup.number().required(),
        city: yup.string().required(),
        province: yup.string().required(),
        zip_code: yup.number().required()
    })
  })
  .required();

const CheckOutDetail = React.memo(() => {
    const {checkout_cart} = cart_store();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Omit<ICartCheckoutOrder, 'carts'>>({
        resolver: yupResolver(schema),
      });

    const {isLoading: postOrderLoading, mutateAsync: mutateNewOrder} = useMutation({mutationFn: createNewOrder, 
      onSuccess: (response) => {
        if(response?.data.order_id_ref && response?.data.order_qty && response.data.total_price) {
          toast.success('Create New Order Complete. Proceed to Payment Section.')
          return navigate(`/checkout-order/${response?.data.order_id_ref}`);
        }
    }, onError: (error: ErrorResponseF) => {
      if(error.status == 400) {
        toast.error(error.message || error.error);
      } else if(error.status == 422) {
        console.log(error.errors);
      } else {
        toast.error('System Error. Please Try Agin.');
      }
    }})

      const onSubmitCheckoutOrder: SubmitHandler<Omit<ICartCheckoutOrder, 'carts'>> = async (formData) => {
        if(checkout_cart.length == 0) {
            toast.error('Check Failed');
            return false;
        }
        const datas = {
            carts: checkout_cart?.map((cart) => cart._id),
            ...formData
        }
        await mutateNewOrder(datas)
      };
     
  return (
    <div className='flex w-full h-full'>
        <form onSubmit={handleSubmit(onSubmitCheckoutOrder)} className='flex flex-col w-full h-full space-y-2'>
            <div className='flex flex-col w-full'>
                <label htmlFor="" className='text-lg text-red-400 font-sans font-semibold'>House No#</label>
                <input type="number"  id="house_no" {...register('details.house_no')} className='p-2 w-full rounded-xl focus:border-none' />
                <p className='text-red-600'>{errors.details?.house_no?.message}</p>
            </div>
            <div className='flex flex-col w-full'>
                <label htmlFor="" className='text-lg text-red-400 font-sans font-semibold'>City</label>
                <input type="text" id="city" {...register('details.city')} className='p-2 w-full rounded-xl focus:border-none' />
                <p className='text-red-600'>{errors.details?.city?.message}</p>
            </div>
            <div className='flex flex-col w-full'>
                <label htmlFor="" className='text-lg text-red-400 font-sans font-semibold'>Province</label>
                <input type="text"  id="province" {...register('details.province')} className='p-2 w-full rounded-xl focus:border-none' />
                <p className='text-red-600'>{errors.details?.province?.message}</p>
            </div>
            <div className='flex flex-col w-full'>
                <label htmlFor="" className='text-lg text-red-400 font-sans font-semibold'>Zip Code</label>
                <input type="number" id="zip_code" {...register('details.zip_code')} className='p-2 w-full rounded-xl focus:border-none' />
                <p className='text-red-600'>{errors.details?.zip_code?.message}</p>
            </div>
            <div className="flex w-full justify-end pt-2">
              
                    <button
                      type="submit"
                      disabled={(checkout_cart.length > 0 || !postOrderLoading) ? false : true}
                      className={`p-2 px-12 text-white ${
                        checkout_cart.length > 0
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-red-300"
                      }  rounded-lg`}
                    >
                      {postOrderLoading ? 'Loading...' : 'CHECKOUT'}
                    </button>
                  </div>
        </form>
    </div>
  )
})

export default CheckOutDetail