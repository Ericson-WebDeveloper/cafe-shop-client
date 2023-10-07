import axios from "../axios/axios";
import { AddCategoryType } from "../components/admin/AddCategoryM";
import { ICategoryType } from "../model/CategoryType";

export const getCategories = async () => {
    return await axios.get<{ categories: ICategoryType[], status?: number, errors?: string[], message: string, error?: string }>('/api/category/lists');
}

export const addCategory = async(data:AddCategoryType) => {
    return await axios.post<{ status?: number, errors?: string[], message: string, error?: string }>('/api/category/create-new', data);
}
