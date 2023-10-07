import React from "react";
import { IProductType } from "../../../model/ProductType";
import { ICategoryType } from "../../../model/CategoryType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProduct, updateProductStatus } from "../../../api/product-api";
import { product_store } from "../../../store/product";
import { toast } from 'react-toastify';

type Props = {
  product: IProductType,
  setEditProduct: React.Dispatch<React.SetStateAction<boolean>>,
};

const ProductComp = React.memo(({ product, setEditProduct}: Props) => {
  const {setProduct} = product_store()
  const { refetch, isFetching: fetchProductLoading} = useQuery({queryKey:["product", product._id], queryFn: () => getProduct(product._id),
    onSuccess: (response) => {
      setProduct('editproduct', response.data.product)
      setEditProduct(true);
    },
    refetchOnWindowFocus: false,
    enabled: false // disable this query from automatically running
  });
  const categories = (product.categories as ICategoryType[]) || [];
  const queryClient = useQueryClient();

  const {isLoading, mutateAsync: onUpdateStatusMutate} = useMutation({mutationFn: updateProductStatus, onSuccess: () => {
    queryClient.invalidateQueries({queryKey:['products']});
    toast.success('Updating Status Success');
  }, onError: () => {
    toast.success('Updating Status Failed');
  }});

  const onSubmitUpdateStatus = async (id:string) => {
    await onUpdateStatusMutate(id)
  }

  const setUpEditProduct = () => {
    refetch();
  }

  return (
    <>
      <tr className="text-sm text-left text-gray-300 dark:text-gray-400 items-center border-[2px] border-l-0 border-r-0 border-red-400">
        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
          {product.name}
        </th>
        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
          <img src={product.image} className="w-16 h-14" alt="" />
        </th>
        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
          {categories?.map((cat) => (cat?.name ? cat?.name : "")).join(", ")}
        </th>
        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
          PHP {product.default_price}
        </th>
        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
          {product.status ? (
            <span className={`p-1 bg-green-600 text-white rounded-xl text-sm`}>
              Active
            </span>
          ) : (
            <span className={`p-1 bg-red-600 text-white rounded-xl text-sm`}>
              Not Active
            </span>
          )}
        </th>
        <td className="flex w-full h-full px-6 py-4 space-x-3 justify-center items-center">
          <button
            type="button" disabled={fetchProductLoading ? true : false} onClick={() => setUpEditProduct()}
            className="p-2 px-4 bg-yellow-700 text-white rounded-lg font-mono hover:bg-yellow-400"
          >
            {fetchProductLoading ? 'Loading....' : 'Update'}
          </button>
          <button
            type="button" disabled={isLoading ? true : false} onClick={() => onSubmitUpdateStatus(product._id)}
            className="flex p-2 px-4  bg-green-700 text-white rounded-lg font-mono hover:bg-green-400"
          >
            { isLoading ? 'Loading....' : 'Update Status' }
          </button>
        </td>
      </tr>
    </>
  );
});

export default ProductComp;
