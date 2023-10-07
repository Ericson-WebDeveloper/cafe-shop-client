import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IVariantSelectType } from "../../model/VariantSelectionType";
import { variant_store } from "../../store/variant";
import { IProductType } from "../../model/ProductType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSelections } from "../../api/variant-api";
import { ErrorResponseF } from "../../api/ResponseType";
import { toast } from 'react-toastify';
import { useSearchParams } from "react-router-dom";

type Props = {
  showModal: boolean;
  onCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type AddSelectionsType = Pick<
  IVariantSelectType,
  "name" | "status" | "price"
>;

const schema = yup
  .object({
    name: yup.string().required(),
    status: yup.boolean().required(),
    price: yup.number().required(),
  })
  .required();

const AddSelections = React.memo(({ showModal, onCloseModal }: Props) => {
  const {editvariant} = variant_store();
  const queryClient = useQueryClient();
  const [getQuery] = useSearchParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddSelectionsType>({
    resolver: yupResolver(schema),
  });

  const {isLoading, mutateAsync: onAddSelectionMutate} = useMutation({mutationFn:addSelections, 
    onSuccess: () => {
        getQuery.delete('page');
        reset();
        onCloseModal(false);
        queryClient.invalidateQueries({queryKey: ['variants']});
        toast.success('Selection Option Added');
    },
    onError: (error: ErrorResponseF) => {
        if(error.status == 422) {
            console.log(error.errors);
        }
        if(error.status == 400) {
            console.log(error.message);
            toast.success(error.message || 'New Category Failed');
        }
    }
})

  const onSubmitAddSelections: SubmitHandler<AddSelectionsType> = async (
    formData
  ) => {
    const p = editvariant?.product as IProductType
    const datas = {
        ...formData,
        pid:  p._id,
        variant: editvariant?._id as string
    }
    await onAddSelectionMutate(datas)
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
              Assign Selections Variant
            </h1>
            <span
              className="flex m-2 hover:bg-red-200 rounded-sm"
              onClick={() => onCloseModal(false)}
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
              <form
                onSubmit={handleSubmit(onSubmitAddSelections)}
                className="flex flex-col w-full h-full"
              >
                <div className="flex flex-col w-full">
                  <label htmlFor="" className="text-lg text-red-700">
                    Name
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className="shadow-lg p-2 rounded-lg"
                  />
                  <p className="text-red-500 font-sans">
                    {errors?.name?.message}
                  </p>
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="" className="text-lg text-red-700">
                    Price
                  </label>
                  <input
                    type="number" step={.01}
                    {...register("price")}
                    className="shadow-lg p-2 rounded-lg"
                  />
                  <p className="text-red-500 font-sans">
                    {errors?.price?.message}
                  </p>
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
                <div className="flex items-center p-6 space-x-2 border-t mt-2 border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="submit" disabled={isLoading ? true : false}
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    {isLoading ? 'Loading....' : 'Submit'}
                  </button>
                  <button
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
                  >
                    Close
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

export default AddSelections;
