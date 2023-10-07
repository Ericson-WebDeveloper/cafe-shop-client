import { ICategoryType } from "./CategoryType";
import { IVariantType } from "./VariantType";


export interface IProductType {
    _id: string,
    name: string,
    image: string,
    categories: string[] | ICategoryType[],
    description: string,
    status: boolean,
    default_price: number,
    variants?: IVariantType[]
}