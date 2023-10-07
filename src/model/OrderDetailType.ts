import { IOrderType } from "./OrderType";
import { IProductType } from "./ProductType";
import { IVariantSelectType } from "./VariantSelectionType";


export interface IOrderDetailsType {
    _id: string,
    order: string | IOrderType,
    product: string | IProductType,
    selections: string[] | IVariantSelectType[],
    price: number,
    total_price: number,
    total_qty: number
}