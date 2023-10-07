import axios from "../axios/axios";
import { IAddCartType } from "../pages/product/page";
import { CartInterface } from "../store/cart";

export const apiAddCart = async (data: IAddCartType) => {
  return await axios.post<{
    cart: CartInterface,
    status?: number,
    errors?: string[],
    message: string,
    error?: string,
  }>("/api/cart/add-item", data);
};

export const getMyCarts = async () => {
    return await axios.get<{
        carts: CartInterface[],
        status?: number;
        errors?: string[];
        message: string;
        error?: string;
      }>(`/api/cart/carts-list`)
}

export const removeCartApi = async(id: string) => {
  return await axios.delete<{
    cart_id: string,
    status?: number,
    errors?: string[],
    message: string,
    error?: string,
  }>(`/api/cart/remove/my-cart/${id}`);
}
