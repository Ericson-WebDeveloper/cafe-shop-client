import { create } from "zustand";
import { IOrderType } from "../model/OrderType";
import { IUserType } from "../model/UserType";
import { IOrderDetailsType } from "../model/OrderDetailType";
import { IProductType } from "../model/ProductType";
import { IVariantSelectType } from "../model/VariantSelectionType";
import { IPaymentType } from "../model/Payment";
import { IVariantType } from "../model/VariantType";

// export type IOrderInterfaceType = IOrderType & {user: IUserType, order_details: IOrderDetailsType & {product: IProductType, selections: IVariantSelectType[]}[]}

interface ICostumOrderDetailsType extends Omit<IOrderDetailsType, 'product'|'selections'> {
    product: IProductType, 
    selections: (Omit<IVariantSelectType, 'variant'> & { variant: IVariantType })[]
}

export interface ICostumOrderInterfaceType extends Omit<IOrderType, 'user'|'payments'|'order_details'> {
        user: IUserType,
        payments: IPaymentType[]
        order_details: ICostumOrderDetailsType[]
}

interface CategoryStoreApi {
    order: ICostumOrderInterfaceType|null,
    payment: 'stripe'|'paypal'|'',
    orders: ICostumOrderInterfaceType[],
    editorder: null,
    succes: boolean,
    message: string,
    error: string,
    errors: string[],
    setOrder: (key: string, data: ICostumOrderInterfaceType|ICostumOrderInterfaceType[]|null) => void,
    getOrder: () => ICostumOrderInterfaceType|null,
    getOrders: () => ICostumOrderInterfaceType[],
    setReponseMessage: (key: string, data: null) => void,
    getReponseMessage: (key: 'succes'|'message'|'error'|'errors') => string|boolean|unknown[],
    getEditOrder: () => ICostumOrderInterfaceType|null,
    setPaymentSelection: (key: 'stripe'|'paypal'|"") => void,
    getPaymentSelect: () => string
}

export const order_store = create<CategoryStoreApi>((set, get) => ({
    order: null,
    payment: '',
    orders: [],
    editorder: null,
    succes: false,
    message: '',
    error: '',
    errors: [],
    setPaymentSelection: (key: 'stripe'|'paypal'|'') => {
        set({payment: key})
    },
    getPaymentSelect: () => {
        return get().payment
    },
    setOrder: (key: string, data: ICostumOrderInterfaceType|ICostumOrderInterfaceType[]|null) => {
        set({[key]: data})
    },
    getOrder: () => {
        return get().order;
    },
    setReponseMessage: (key: string, data: null) => {
        set({[key]: data})
    },
    getReponseMessage: (key: 'succes'|'message'|'error'|'errors') => {
        return get()[key]
    },
    getEditOrder: () => {
        return get().editorder;
    },
    getOrders: () => {
        return get().orders;
    },
}));