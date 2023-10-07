import { create } from "zustand";
import { ICartType } from "../model/CartType";
import { IVariantSelectType } from "../model/VariantSelectionType";
import { IProductType } from "../model/ProductType";
import { IUserType } from "../model/UserType";

export type CartInterface = ICartType & {
  user: IUserType;
  product: IProductType;
  selections: IVariantSelectType[];
};

interface CartStoreApi {
  carts: CartInterface[];
  checkout_cart: CartInterface[];
  cart: CartInterface | null;
  editcart: CartInterface | null;
  succes: boolean;
  message: string;
  error: string;
  errors: string[];
  setCart: (key: string, data: CartInterface | CartInterface[] | null) => void;
  getCart: () => CartInterface | null;
  getCarts: () => CartInterface[];
  getEditCartt: () => CartInterface | null;
  getTotalPrice: () => number;
  getTotalQty: () => number;
  removeCart: (id: string) => void;
  addRemoveCheckoutCart: (id: string) => void;
}

export const cart_store = create<CartStoreApi>((set, get) => ({
  carts: [],
  checkout_cart: [],
  cart: null,
  editcart: null,
  succes: false,
  message: "",
  error: "",
  errors: [],
  setCart: (key: string, cart: ICartType | ICartType[] | null) => {
    if (cart !== null) {
      if (Array.isArray(cart)) {
        // Handle an array of cart items
        set({ [key]: cart });
      } else {
        // Handle a single cart item (ICartType)
        set({ [key]: [cart] }); // Wrap the single item in an array if needed
      }
    } else {
      // Handle the case where cart is null
      set({ [key]: null });
    }
  },
  addRemoveCheckoutCart: (id: string) => {
    const newCartCheckouts: CartInterface[] = JSON.parse(
      JSON.stringify(get().checkout_cart)
    );
    const newCarts: CartInterface[] = JSON.parse(JSON.stringify(get().carts));
    let cartCheckout = newCartCheckouts?.find((cart) => cart._id == id);
    if (cartCheckout) {
      get().setCart(
        "checkout_cart",
        newCartCheckouts?.filter((cart) => cart._id != id)
      );
    } else {
      cartCheckout = newCarts?.find((cart) => cart._id == id);
      get().setCart("checkout_cart", [...get().checkout_cart, cartCheckout!]);
    }
  },
  getCart: () => {
    return get().cart;
  },
  getCarts: () => {
    return get().carts;
  },
  getEditCartt: () => {
    return get().editcart;
  },
  removeCart: (id: string) => {
    let newCarts: CartInterface[] = JSON.parse(JSON.stringify(get().carts));
    newCarts = newCarts?.filter((cart) => cart._id != id);
    const settingCarts = get().setCart;
    settingCarts("carts", newCarts);
  },
  getTotalPrice: () => {
    // const newCarts: CartInterface[] = JSON.parse(JSON.stringify(get().carts));
    // return newCarts?.reduce((total, cart) => {
    //     return total += cart.qty * cart.price
    // }, 0)
    const newCarts: CartInterface[] = JSON.parse(
      JSON.stringify(get().checkout_cart)
    );
    return newCarts?.reduce((total, cart) => {
      return (total += cart.qty * cart.price);
    }, 0);
  },
  getTotalQty: () => {
    const newCarts: CartInterface[] = JSON.parse(JSON.stringify(get().carts));
    // return newCarts?.reduce((total, cart) => {
    //     return total += cart.qty
    // }, 0)
    return newCarts?.length;
  },
}));
