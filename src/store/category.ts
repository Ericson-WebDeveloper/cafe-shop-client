import { create } from "zustand";
import { ICategoryType } from "../model/CategoryType";


interface CategoryStoreApi {
  category: ICategoryType | null,
  categorys: ICategoryType[],
  editcategory: ICategoryType | null,
  succes: boolean,
  message: string,
  error: string,
  errors: string[],
  setCategory: (key: string, data: ICategoryType|ICategoryType[]|null) =>  void,
  getCategory: () => ICategoryType|null,
  getCategorys: () => ICategoryType[]
}

export const category_store = create<CategoryStoreApi>((set, get) => ({
    category: null,
    categorys: [],
    editcategory: null,
    succes: false,
    message: '',
    error: '',
    errors: [],
    setCategory: (key: string, category: ICategoryType | ICategoryType[] | null) => {
        if(Array.isArray(category)) {
           set({[key]: category}); 
        } else {
        set({[key]: category});
        }
    },
    getCategory: () => {
        return get().category;
    },
    getCategorys: () => {
        return get().categorys;
    },
    getEditCategory: () => {
        return get().editcategory;
    }
}));