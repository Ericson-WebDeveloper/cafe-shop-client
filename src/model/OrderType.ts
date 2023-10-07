import { IOrderDetailsType } from "./OrderDetailType"
import { IPaymentType } from "./Payment"
import { IUserType } from "./UserType"


export interface IOrderType {
    _id: string,
    user: string | IUserType,
    payments: IPaymentType[],
    carts?: string[],
    details: {
        house_no: number,
        city: string,
        province: string,
        zip_code: number
    },

    delivery_remark?: 'Cancel'|'Delivered'|'Preparing'|'On the Way'|'New',

    order_details: string[] | IOrderDetailsType[],
    // selections: Array<string>
    date_created: Date,
    delivery_status: boolean,
    payment_status: boolean,
    // payment_remarks: 'pending'|'cancel'|'success',
    // payment_ref1: string,
    // payment_ref2: string,
    total_price: number,
    total_qty: number
}