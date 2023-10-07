import { IProductType } from "./ProductType";
import { IUserType } from "./UserType";
import { IVariantSelectType } from "./VariantSelectionType";


export interface ICartType {
    _id: string,
    user: string|IUserType,
    product: string|IProductType,
    selections: string[]|IVariantSelectType[],
    qty: number,
    price: number,
    total_price: number,
    date: Date
}