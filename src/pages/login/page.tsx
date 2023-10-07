import React from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/auth-api";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { auth_store } from "../../store/auth";
import { ErrorResponseF } from "../../api/ResponseType";
import {RedirectPage} from "../../helper/redirectPage";
// import { IUserType } from "../../model/UserType";
// import { AxiosResponse } from "axios";
// type Props = {}

export interface SignInData {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const Page = React.memo(() => {
  const { setAuthUser, getAuthUser } = auth_store();
  const {
    isLoading,
    // isSuccess,
    // isError,
    // error,
    mutateAsync: SignInUser,
  } = useMutation({
    mutationFn: login,
    onError: (error: ErrorResponseF) => {
      if(error && error.status && error.status == 400) {
        toast.error(error.message)
      }    
    },
    onSuccess: (response) => {
      setAuthUser(response.data.user);
      const user = getAuthUser();
      if (user) {
        toast.success('Sigin Success')
        window.location.href = RedirectPage(user.is_admin);
        // redirect to backend dashboard
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<SignInData> = async (formData) => {
    return await SignInUser(formData);
  };

  return (
    <div className="w-full h-[calc(100vh-174px)] flex">
      <div className="w-full h-full flex justify-center items-center ">
        <div className="w-full md:w-[80%] xl:w-[70%] h-[80%] flex mx-4 md:mx-24 md:container">
          <div className="flex-1 flex-col bg-red-500 justify-center items-center hidden lg:flex">
            <h1 className="text-white font-bold text-2xl md:text-4xl text-center">
              Welcom to our Cafe Shop
            </h1>
            <p className="text-white font-semibold text-xl text-center">
              Please login to able order in our cafe's menu.
            </p>
          </div>
          <div className="flex flex-1 flex-col bg-gray-200">
            <div className="w-full h-full p-4 md:p-10 xl:p-20">
              <h1 className="text-xl md:text-4xl font-bold font-sans">LOGIN</h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full h-full space-y-6 mt-6"
              >
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor=""
                    className="text-sm md:text-lg font-semibold font-serif"
                  >
                    Email/Username
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className="p-1 md:p-2 w-full rounded-lg"
                  />
                  <p className="text-red-600">{errors?.email?.message}</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor=""
                    className="text-sm md:text-lg font-semibold font-serif"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password")}
                    className="p-1 md:p-2 w-full rounded-lg"
                  />
                  <p className="text-red-600">{errors?.password?.message}</p>
                </div>
                <div className="flex justify-start">
                  <button
                    className={`bg-red-600 text-white p-1 md:p-2 px-2 md:px-4 text-sm md:text-lg rounded-lg ${
                      isLoading ? "disabled" : ""
                    }`}
                  >
                    {isLoading ? (
                      <svg
                        aria-hidden="true"
                        className="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    ) : null}
                    <span className="sr-only">Loading...</span>
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Page;
