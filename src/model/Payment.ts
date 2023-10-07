import { IOrderType } from "./OrderType";



export interface IPaymentType {
    _id: string,
    order: string | IOrderType,
    date_created: Date,
    payment_type: string,
    payment_created: Date,
    payment_status: boolean,
    payment_remarks: 'pending'|'cancel'|'success',
    payment_ref1: string,
    payment_ref2: string,
    payment_ref3: string,
    payment_ref4: string,
    total_payment: number
}