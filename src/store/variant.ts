import { create } from "zustand";
// import { ICategoryType } from "../model/CategoryType";
import { IVariantType } from "../model/VariantType";


interface VariantStoreApi {
    variant: IVariantType | null,
    editvariant: IVariantType | null,
    succes: boolean,
    message: string,
    error: string,
    errors: string[],
    setVariant: (key: string, data: IVariantType) =>  void,
    getVariant: () => IVariantType|null,
    getEditVariant: () => IVariantType|null,
}

export const variant_store = create<VariantStoreApi>((set, get) => ({
    variant: null,
    editvariant: null,
    succes: false,
    message: '',
    error: '',
    errors: [],
    setVariant: (key: string, category: IVariantType | null) => {
        set({[key]: category});
    },
    getVariant: () => {
        return get().variant;
    },
    getEditVariant: () => {
        return get().editvariant;
    }
}));