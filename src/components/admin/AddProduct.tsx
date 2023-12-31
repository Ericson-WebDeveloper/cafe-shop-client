import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories } from "../../api/category-api";
// import { ICategoryType } from '../../model/CategoryType';
import Select from 'react-select';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IProductType } from "../../model/ProductType";
import { imageToBas64 } from "../../helper/imageHelper";
import { toast } from "react-toastify";
import { addProduct } from "../../api/product-api";
import { ErrorResponseF } from "../../api/ResponseType";

type Props = {
  showModal: boolean;
  onCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
};
interface CategoriesInterface {
  value: string;
  label: string;
}

export type AddProductType = Omit<IProductType, "_id" | "image" | "categories">;

const schema = yup
  .object({
    name: yup.string().required(),
    status: yup.boolean().required(),
    description: yup.string().required(),
    default_price: yup.number().required(),
  })
  .required();

const AddProduct = React.memo(({ showModal, onCloseModal }: Props) => {
  const [categorys, setCategorys] = useState<CategoriesInterface[]>([]);
  const [pImage, setPImage] = useState<string>("");
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddProductType>({
    resolver: yupResolver(schema),
  });

  const { data, isLoading } = useQuery(["categorys"], getCategories, {
    refetchOnWindowFocus: false,
  });

  const selectsCategory: CategoriesInterface[] =
    data?.data?.categories?.map((cat) => {
      return { value: cat._id, label: cat.name };
    }) || [];

  const setSelectCategory = (selectedOptions: readonly CategoriesInterface[]) => {
    setCategorys([...selectedOptions]);
  };
  const resetFormData = () => {
    reset();
    (document.getElementById("image") as HTMLInputElement).value = "";
    setCategorys([]);
  }

  const { isLoading: productLoading, mutateAsync: addProductsMutate } =
    useMutation({
      mutationFn: addProduct,
      onSuccess: () => {
        resetFormData();
        onCloseModal(false);
        queryClient.invalidateQueries({queryKey:["products"]});
      },
      onError: (error: ErrorResponseF) => {
        if (error.status == 422) {
          error.errors?.forEach((error) => {
            toast.error(error)
            return;
          });
        }
        if (error.status == 400) {
          toast.error(error.message || error.error);
        }
      },
    });

  const onSubmitAddProduct: SubmitHandler<AddProductType> = async (
    formData
  ) => {
    const fcategories = categorys.map((cat) => cat.value);
    if (!pImage || pImage == "") {
      toast.error("Image is required");
      return false;
    }
    await addProductsMutate({
      ...formData,
      categories: fcategories,
      image: pImage,
    });
  };

  const onUploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    imageToBas64(e.target, (result) => {
      setPImage(result as string);
    });
  };

  return (
    <div
      className={`${
        showModal == true ? "flex" : "hidden"
      } w-full h-full fixed items-center justify-center bg-black bg-opacity-75 top-0 left-0 bottom-0 z-80`}
    >
      <div
        className="flex relative  sx-modal-width xs:sm-modal-width md:md-modal-width lg:lg-modal-width h-[650px] bg-gray-50 shadow-2xl border-2 border-gray-500 
            rounded-xl transition-opacity duration-500 delay-500 ease-in-out"
      >
        <div className="flex relative  flex-col w-full h-full">
          <div className="flex w-full justify-between items-center p-4">
            <h1 className="text-xl md:text-3xl font-semibold font-sans text-red-600">
              New Product
            </h1>
            <span
              className="flex m-2 hover:bg-red-200 rounded-sm"
              onClick={() => { resetFormData(); onCloseModal(false); }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-red-500 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>

          {/* form */}
          <div className="flex w-full h-full overflow-auto">
            <div className="flex w-full h-full p-8">
              {isLoading ? (
                <div className="flex w-full h-full justify-center">
                  Loading.....
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmitAddProduct)}
                  className="flex flex-col w-full h-full space-y-6"
                >
                  <div className="flex flex-col w-full">
                    <label htmlFor="" className="text-lg text-red-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      className="shadow-lg p-2 rounded-lg"
                    />
                    <p className="text-red-500 font-sans">
                      {errors?.name?.message}
                    </p>
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="" className="text-lg text-red-700">
                      Categories
                    </label>
                    <Select
                      value={categorys}
                      onChange={(option: readonly CategoriesInterface[]) => setSelectCategory(option)}
                      options={selectsCategory}
                      isMulti={true}
                      // width='450px'
                      // menuColor='blue'
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="" className="text-lg text-red-700">
                      Image
                    </label>
                    <input
                      type="file"
                      onChange={onUploadAvatar}
                      id="image"
                      className="shadow-lg p-2 rounded-lg"
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <label htmlFor="" className="text-lg text-red-700">
                      Status
                    </label>
                    <div className="flex w-full space-x-5">
                      <input
                        type="radio"
                        id="Active"
                        {...register("status")}
                        value="true"
                      />
                      <label htmlFor="Active">Active</label>
                      <br />
                      <input
                        type="radio"
                        id="Not Active"
                        {...register("status")}
                        value="false"
                      />
                      <label htmlFor="Not Active">Not Active</label>
                    </div>
                    <p className="text-red-500 font-sans">
                      {errors?.status?.message}
                    </p>
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="" className="text-lg text-red-700">
                      Description
                    </label>
                    <textarea
                      rows={5}
                      id="description"
                      {...register("description")}
                      className="shadow-lg p-2 rounded-lg"
                    />
                    <p className="text-red-500 font-sans">
                      {errors?.description?.message}
                    </p>
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="" className="text-lg text-red-700">
                      Default Price
                    </label>
                    <input
                      type="text"
                      {...register("default_price")}
                      className="shadow-lg p-2 rounded-lg"
                    />
                    <p className="text-red-500 font-sans">
                      {errors?.default_price?.message}
                    </p>
                  </div>
                  <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button
                      type="submit"
                      disabled={productLoading ? true : false}
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      {productLoading ? "Loading....." : "Submit"}
                    </button>
                    <button
                      type="button" onClick={() => { resetFormData(); onCloseModal(false); }}
                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
                    >
                      Close
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AddProduct;
