import { IVariantType } from "./VariantType";


export interface IVariantSelectType {
    _id: string,
    variant: IVariantType | string,
    name: string,
    price: number,
    image?: string,
    status: boolean,
    default_select: boolean
}