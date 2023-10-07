import { create } from "zustand";
// import { ICategoryType } from "../model/CategoryType";
import { IProductType } from "../model/ProductType";
import { IVariantSelectType } from "../model/VariantSelectionType";

interface ProductStoreApi {
  product: IProductType | null;
  products: IProductType[];
  editproduct: IProductType | null;

  productCart: {
    tTotalPrice: number;
    qty: number;
    selections: IVariantSelectType[];
  };

  succes: boolean;
  message: string;
  error: string;
  errors: string[];
  setProduct: (key: string, data: IProductType | IProductType[] | null) => void;
  getProduct: () => IProductType | null;
  getProducts: () => IProductType[];
  getEditProduct: () => IProductType | null;
  setProductCart: (
    action: "selections" | "qty" | "totalprice",
    selection: IVariantSelectType | null,
    qty: number | null,
    tTotalPrice: number | null
  ) => void;
  setResetProductCart: () => void
}

export const product_store = create<ProductStoreApi>((set, get) => ({
  product: null,
  productCart: {
    tTotalPrice: 0,
    qty: 1,
    selections: [],
  },
  products: [],
  editproduct: null,
  succes: false,
  message: "",
  error: "",
  errors: [],
  setProduct: (key: string, category: IProductType | IProductType[] | null) => {
    set({ [key]: category });
  },
  getProduct: () => {
    return get().product;
  },
  getProducts: () => {
    return get().products;
  },
  getEditProduct: () => {
    return get().editproduct;
  },
  setProductCart: (
    action: string,
    selection: IVariantSelectType | null,
    qty: number | null,
    tTotalPrice: number | null
  ) => {
    if (action == "selections") {
      if (selection) {
        const newSelections = get().productCart.selections?.filter(
          (select) => select.variant != selection?.variant
        );
        set((state) => ({
          ...state,
          productCart: {
            ...state.productCart,
            selections: [...newSelections, selection],
          },
        }));
      }
    }
    if (action == "qty") {
      if (qty) {
        set((state) => ({
          ...state,
          productCart: { ...state.productCart, qty: qty },
        }));
      }
    }
    if (action == "totalprice") {
      if (tTotalPrice) {
        set((state) => ({
          ...state,
          productCart: {
            ...state.productCart,
            tTotalPrice: tTotalPrice,
          },
        }));
      }
    }
  },
  setResetProductCart: () => {
    set((state) => ({
      ...state,
      productCart: {
        selections: [],
        tTotalPrice: 0,
        qty: 1
      },
    }));
  }
}));
