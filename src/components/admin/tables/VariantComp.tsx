import React from "react";
import { IVariantType } from "../../../model/VariantType";
import { IProductType } from "../../../model/ProductType";
import { IVariantSelectType } from "../../../model/VariantSelectionType";
import { variant_store } from "../../../store/variant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVariantStatus } from "../../../api/variant-api";
import { ErrorResponseF } from "../../../api/ResponseType";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type Props = {
  variant: IVariantType & {
    product: IProductType;
    selections: IVariantSelectType[];
  };
  onCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const VariantComp = ({ variant, onCloseModal }: Props) => {
  const queryClient = useQueryClient();
  const { setVariant } = variant_store();
  const setUpAddSelections = () => {
    setVariant("editvariant", variant);
    onCloseModal(true);
  };
  const navigate = useNavigate();

  const { isLoading, mutateAsync: onUpdateMutate } = useMutation({
    mutationFn: updateVariantStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["variants"] });
      toast.success("Updating Status Success");
    },
    onError(error: ErrorResponseF, variables, context) {
      toast.error(error?.message);
      console.log(error, variables, context);
    },
  });

  const onHandlingUpdateRquest = async () => {
    return await onUpdateMutate({ pid: variant.product._id, vid: variant._id });
  };
  return (
    <>
      <tr className="text-sm text-left text-gray-300 dark:text-gray-400 items-center border-[2px] border-l-0 border-r-0 border-red-400">
        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap">
          {variant?.name}
        </th>
        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
          {variant.product.name}
        </th>
        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
          PHP {variant.product.default_price}
        </th>
        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
          <img src={variant.product.image} className="w-16 h-14" alt="" />
        </th>
        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
          {variant.default ? "default" : "not default"}
        </th>
        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
          {variant.status ? (
            <span className={`p-1 bg-green-600 text-white rounded-xl text-sm`}>
              Active
            </span>
          ) : (
            <span className={`p-1 bg-red-600 text-white rounded-xl text-sm`}>
              Not Active
            </span>
          )}
        </th>
        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
          <div className="flex flex-col w-full h-full justify-center items-center">
            {variant?.selections?.map((select, index) => {
              return (
                <span
                  key={index}
                  className="flex w-fit h-full justify-center whitespace-nowrap"
                >
                  {select.name}
                </span>
              );
            })}
          </div>
        </th>
        <td className="px-6 py-4 space-y-3 md:space-x-3">
          <button
            type="button"
            onClick={() => setUpAddSelections()}
            className="p-2 px-4 bg-yellow-700 text-white rounded-lg font-mono hover:bg-yellow-400"
          >
            Add Selections
          </button>
          <button
            type="button"
            onClick={() =>
              navigate(`/backend/variant/selection/${variant._id}`)
            }
            className="p-2 px-4 bg-blue-700 text-white rounded-lg font-mono hover:bg-blue-400"
          >
            View Selections
          </button>
          <button
            type="button"
            disabled={isLoading ? true : false}
            onClick={onHandlingUpdateRquest}
            className="p-2 px-4 bg-green-700 text-white rounded-lg font-mono hover:bg-green-400"
          >
            {isLoading ? "Loading...." : "Update Status"}
          </button>
        </td>
      </tr>
    </>
  );
};

export default VariantComp;
