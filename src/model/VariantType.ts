import { IProductType } from "./ProductType";
import { IVariantSelectType } from "./VariantSelectionType";


export interface IVariantType {
    _id: string,
    product: IProductType | string,
    name: 'size'|'color'|'flavor'|'add on'|'side dish'|'drinks'|'extra'|'others',
    status: boolean,
    default: boolean,
    selections: string[] | IVariantSelectType[]
}

export const namevariants = ['size','color','flavor','add on','side dish','drinks','extra','others']