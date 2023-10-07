import axios from "../axios/axios";
import { IPaymentType } from "../model/Payment";
import { IOrderType } from "../model/OrderType";
import { IUserDetailType, IUserType } from "../model/UserType";
import { IResponseDataWithPages } from "./ResponseType";

export const createPaymentStripeIntentApi = async (datas: {
  order_id: string;
  total_amount: number;
  payment_type?:string
}) => {
  datas.payment_type = "stripe"
  return await axios.post<{
    clientSecret: string;
    stripe_payment_ref: string;
    payment_ref: string;
    payment_type: string;
    status?: number;
    errors?: string[];
    message: string;
    error?: string;
  }>(`/api/payment/create/intent`, datas);
  // (`/api/payment/stripe/intent`, datas);
  
};

export const completedPaymentOrder = async (datas: {
  status: boolean | string;
  order_id: string;
  payment_trans_id: string;
  ref1?: string;
  ref2?: string;
}) => {
  return await axios.post<{
    payment_detail: IPaymentType;
    status?: number;
    errors?: string[];
    message: string;
    error?: string;
  }>(`/api/payment/payment-finish/response`, datas);
};

export interface paypalIntentResponse {
  id: string,
  status: boolean,
  links: {href:string, rel:string, method:string}[]
}
export const paymentCreateOrder = async (datas: {
  order_id: string;
  total_amount: number;
  payment_type?:string
}) => {
  datas.payment_type = "paypal";
  return axios.post<{
    datas: paypalIntentResponse,
    payment_ref: string,
    status?: number,
    errors?: string[],
    message: string,
    error?: string
  }>(`/api/payment/create/intent`, datas)
}


export interface paypalOnApproveType {
  status:string,
  id: string,
  links: {href: string, method:string, rel:string}[],
  payer: {
    address: {country_code:string},
    email_address: string,
    name: {
      given_name: string,
      surname: string
    },
    payer_id: string
  },
  payment_source: {
    paypal: {
      account_id: string,
      account_status: string,
      address: {country_code:string},
      email_address: string,
      name: {
        given_name: string,
        surname: string
      },
    }
  },
  
}
export const paypalOnApprove = async(datas: {
  orderID: string,
  payment_type?:string
}) => {
  datas.payment_type = "paypal";
  return axios.post<{
    datas: paypalOnApproveType,
    status?: number,
    errors?: string[],
    message: string,
    error?: string
  }>(`/api/payment/payment-paypal/capture`, datas)
}

export const paymentCancelIntent = async (paymentId:string) => {
  return await axios.delete<{
    status?: number,
    errors?: string[],
    message: string,
    error?: string
  }>(`/api/payment/payment-cancel/${paymentId}`)
}


export type ICostumePayments = (Omit<IPaymentType, 'order'> & { order: (Omit<IOrderType, 'user'> & 
{user: (Omit<IUserType, 'details'> & {details: IUserDetailType}) }) })

export const allPayments = async (page:string|number) => {
  return await axios.get<{
    payments: IResponseDataWithPages<ICostumePayments>
    status?: number,
    errors?: string[],
    message: string,
    error?: string
  }>(`/api/payment/payments/records?page=${page}`)
}
