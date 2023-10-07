import axios from "../axios/axios";
import { ICartCheckoutOrder } from "../components/CheckOutDetail";
import { IOrderDetailsType } from "../model/OrderDetailType";
import { IOrderType } from "../model/OrderType";
import { IPaymentType } from "../model/Payment";
import { IProductType } from "../model/ProductType";
import { IUserType } from "../model/UserType";
import { IVariantSelectType } from "../model/VariantSelectionType";
import { IVariantType } from "../model/VariantType";
// import { IOrderType } from "../model/OrderType";
// import { IOrderInterfaceType } from "../store/order";
import { IResponseDataWithPages } from "./ResponseType";

interface ICostumOrderDetailsType extends Omit<IOrderDetailsType, 'product'|'selections'> {
    product: IProductType, 
    // selections: IVariantSelectType []
    selections: (Omit<IVariantSelectType, 'variant'> & {variant: IVariantType})[]
}
interface ICostumOrderInterfaceType extends Omit<IOrderType, 'user'|'payments'|'order_details'> {
        user: IUserType,
        payments: IPaymentType[]
        order_details: ICostumOrderDetailsType[]
}

export const createNewOrder = async(datas: ICartCheckoutOrder) => {
    return await axios.post<{
        order_id_ref: string,
        order_qty: number,
        total_price: number,
        status?: number, errors?: string[], message: string, error?: string
    }>(`/api/order/checkout/orders`, datas)
}

export const getOrderData = async (id: string) => {
    return await axios.get<{
        order: ICostumOrderInterfaceType,
        status?: number, 
        errors?: string[], 
        message: string, 
        error?: string
    }>(`/api/order/fetch/checkout-order/${id}`)
}

export const viewOrderData = async (id: string) => {
    return await axios.get<{
        order: ICostumOrderInterfaceType,
        status?: number, 
        errors?: string[], 
        message: string, 
        error?: string
    }>(`/api/order/summary/order/${id}`)
}

export const myOrders = async (page:string|number) => {
    return await axios.get<{
        orders: IResponseDataWithPages<ICostumOrderInterfaceType>,
        status?: number, 
        errors?: string[], 
        message: string, 
        error?: string
    }>(`/api/order/users/my-orders?page=${page}`);
}


export const listOrders = async(page:string|number) => {
    return await axios.get<{
        orders: IResponseDataWithPages<ICostumOrderInterfaceType>,
        status?: number, 
        errors?: string[], 
        message: string, 
        error?: string
    }>(`/api/order/backend/orders?page=${page}`);
}

export const updatingDeliveryStatus = async(datas: {remarks:string, order_id:string}) => {
    return await axios.post<{
        order: IOrderType,
        status?: number, 
        errors?: string[], 
        message: string, 
        error?: string
    }>(`/api/order/delivery-status/changed`, datas);
}