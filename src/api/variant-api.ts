import axios from "../axios/axios";
import { AddSelectionsType } from "../components/admin/AddSelections";
import { IProductType } from "../model/ProductType";
import { IVariantSelectType } from "../model/VariantSelectionType";
import { IVariantType } from "../model/VariantType";
import { IResponseDataWithPages } from "./ResponseType";

export const getVariants = async (page: number | string) => {
  type VariantListsType = IVariantType & {
    product: IProductType;
    selections: IVariantSelectType[];
  };
  return await axios.get<{
    variants: IResponseDataWithPages<VariantListsType>;
    status?: number;
    errors?: string[];
    message: string;
    error?: string;
  }>(`/api/variant/lists?page=${page}`);
};

export const updateVariantStatus = async (data: {
  pid: string;
  vid: string;
}) => {
  return await axios.put<{
    variant: IVariantType;
    status?: number;
    errors?: string[];
    message: string;
    error?: string;
  }>(`/api/variant/update/${data.pid}/${data.vid}`);
};

export const fetchVariantSelection = async (variant_id: string) => {
  type costumSelections = IVariantSelectType & {variant: string}
  return await axios.get<{
    variant: IVariantType & {
      product: IProductType;
      selections: costumSelections[];
    };
    status?: number;
    errors?: string[];
    message: string;
    error?: string;
  }>(`/api/variant/fetch/${variant_id}`);
};

export const updateSelectionStatus = async (datas: {
  selection: IVariantSelectType,
  pid: string,
}) => {
  return await axios.put<{
    variant_selections: IVariantSelectType;
    status?: number;
    errors?: string[];
    message: string;
    error?: string;
  }>(`/api/variant//update/variant-selection`, {
    pid: datas.pid,
    variant: datas.selection.variant,
    opt_id: datas.selection._id,
    status: !datas.selection.status
  });
};

export const addSelections = async (
  datas: AddSelectionsType & { variant: string; pid: string }
) => {
  return await axios.post<{
    variant_selections: IVariantSelectType;
    status?: number;
    errors?: string[];
    message: string;
    error?: string;
  }>("/api/variant/append/selection", datas);
};
