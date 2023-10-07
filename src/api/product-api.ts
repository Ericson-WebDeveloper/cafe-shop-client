import axios from "../axios/axios";
import { ICategoryType } from "../model/CategoryType";
import { IProductType } from "../model/ProductType";
import { IVariantType } from "../model/VariantType";
import { IResponseDataWithPages } from "./ResponseType";

export const getProducts = async (page: string | number, category: string | null = null, filter:boolean|null = null) => {
  return await axios.get<{
    products: IResponseDataWithPages<Omit<IProductType, 'categories'> & {categories: ICategoryType[]}>,
    status?: number,
    errors?: string[],
    message: string,
    error?: string
  }>(`/api/product/products?page=${page}${category ? `&category=${category}` : ``}${filter ? `&filter=${filter}`: ``}`);
};


export const addProduct = async (datas: Omit<IProductType, '_id'>) => {
  return await axios.post<{product: IProductType, status?: number,
    errors?: string[],
    message: string,
    error?: string,}>('/api/product/product-new', datas)
}

export const updateProductStatus = async(product_id:string) => {
  return await axios.put<{product: IProductType, status?: number,
    errors?: string[],
    message: string,
    error?: string,}>(`/api/product/status-update/${product_id}`)
}

export const getProduct = async (id:string) => {
  return await axios.get<{product: IProductType, status?: number,
    errors?: string[],
    message: string,
    error?: string,}>(`/api/product/fetch/${id}`)
}


export const addVariant = async(data: Pick<IVariantType, 'name'|'status'> & {product:string}) => {
  return await axios.post<{variant: IVariantType, status?: number,
    errors?: string[],
    message: string,
    error?: string,}>('/api/variant/new-create', data)
}
