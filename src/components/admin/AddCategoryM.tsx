import React from "react";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "../../api/category-api";
import { ErrorResponseF } from '../../api/ResponseType';
import { toast } from "react-toastify";

type Props = {
  showModal: boolean;
  onCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

export interface AddCategoryType {
  name: string;
}

const AddCategoryM = React.memo(({ showModal, onCloseModal }: Props) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddCategoryType>({
    resolver: yupResolver(schema),
  });

  const { mutateAsync: PostCategoryAdd, isLoading } = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["categories"]});
      onCloseModal(true);
      reset();
      toast.success('New Category Added');
    },
    onError: (error: ErrorResponseF) => {
      toast.error(error?.message || 'Server Error. Please Try Again');
    },
  });

  const onSubmitAddCategory: SubmitHandler<AddCategoryType> = async (
    formData
  ) => {
    return await PostCategoryAdd(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className={`${
        showModal == true ? "flex" : "hidden"
      } w-full h-full fixed items-center justify-center bg-black bg-opacity-75 top-0 left-0 bottom-0 z-80`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, transition: { duration: 0.5 } }}
        className="flex relative  sx-modal-width xs:sm-modal-width md:md-modal-width lg:lg-modal-width h-[650px] bg-gray-50 shadow-2xl border-2 border-gray-500 
            rounded-xl transition-opacity duration-500 delay-500 ease-in-out"
      >
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: 0, transition: { delay: 0.5 } }}
          className="flex relative  flex-col w-full h-full"
        >
          <div className="flex w-full justify-between items-center p-4">
            <h1 className="text-xl md:text-3xl font-semibold font-sans text-red-600">
              New Category
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
                onSubmit={handleSubmit(onSubmitAddCategory)}
                className="flex flex-col w-full h-full"
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
                  <p className="text-red-600">{errors?.name?.message}</p>
                </div>

                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="submit"
                    disabled={isLoading ? true : false}
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    {isLoading ? "Loading..." : "Submit"}
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
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

export default AddCategoryM;
