import { AxiosResponse } from "axios"; // isAxiosError
import axios from "../axios/axios";
import { IUserDetailType, IUserType } from "../model/UserType";
import { IRegisterType } from "../pages/register/page";
// import { IJoiType } from './ResponseType';

export const login = async (data: {
  email: string;
  password: string;
}): Promise<
  AxiosResponse<{
    user: (Omit<IUserType, 'details'> & {details: IUserDetailType});
    status?: number;
    errors?: string[];
    message: string;
    error?: string;
  }>
  //   | { status: number; response_error: { message: string } }
> => {
  // try {
  const response = await axios.post<{
    user: (Omit<IUserType, 'details'> & {details: IUserDetailType});
    status?: number;
    errors?: string[];
    message: string;
    error?: string;
  }>("/api/authentication/sign-in", data);
  return response;
  // } catch (error) {
  //   return error.response
  // if (
  //   isAxiosError<{ message: string; error?: string }>(error) &&
  //   error.response?.status == 400
  // ) {
  // return { status: 400, {...error.response} };
  //   // return new Error(JSON.stringify({status: 400, response_error: error.response.data }))
  // }
  // // else if(isAxiosError<{message?:string, errors:{details:IJoiType[]}}>(error) && error.response?.status == 422) {
  // //     if(error?.response?.data?.errors) {
  // //         throw {status: 422, response_error: error?.response?.data?.errors.details};
  // //     }  else {
  // //         throw {status: 422, response_error: []};
  // //     }
  // // } else if(isAxiosError<{message:string, error?:string}>(error) && error.response?.status == 401) {
  // //     throw {status: 400, response_error: error.response.data};
  // // } else if(isAxiosError<{message:string, error?:string}>(error) && error.response?.status == 403) {
  // //     throw {status: 403, response_error: error.response.data};
  // // }
  // else {
  //     return new Error(JSON.stringify({status: 500,
  //         response_error: {
  //           message: "Server Error Contact. The System Support.",
  //         }, }))
  // //   throw {
  // //     status: 500,
  // //     response_error: {
  // //       message: "Server Error Contact. The System Support.",
  // //     },
  // //   };
  // }
  // }
};

export const signupApi = async (datas: IRegisterType) => {
  return await axios.post<{
    status?: number;
    errors?: string[];
    message: string;
    error?: string;
  }>("/api/authentication/sign-up", datas);
};

export const activateAccountAPi = async (code: string, email: string) => {
  return await axios.get<{
    status?: number;
    errors?: string[];
    message: string;
    error?: string;
  }>(`/api/authentication/acount-activation/${email}/${code}`);
};

export const accountLogout = async () => {
  return await axios.post<{
    status?: number;
    errors?: string[];
    message: string;
    error?: string;
  }>(`/api/authentication/acount/signout`);
};

export const verifyAuthentication = async () => {
  return await axios.get<{
    status?: number,
    user: (Omit<IUserType, 'details'> & {details: IUserDetailType}) | null,
    errors?: string[],
    message: string,
    error?: string,
  }>(`/api/authentication/user`);
};

export const adminDashBoard = async () => {
  return await axios.get<{
    userCounts: number;
    orderCounts: number;
    categoryCounts: number;
    paymentCounts: number;
    productCounts: number;
    status?: number;
    errors?: string[];
    message: string;
    error?: string;
  }>(`/api/dashboard/datas`);
};
