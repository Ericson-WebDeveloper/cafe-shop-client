import React, { useEffect, useState } from "react";
import AddProduct from "../../../components/admin/AddProduct";
import EditProduct from "../../../components/admin/EditProduct";
import { getProducts } from "../../../api/product-api";
import { useQuery } from "@tanstack/react-query";
import ProductComp from "../../../components/admin/tables/ProductComp";
import Paginate from "../../../components/Paginate";
import { useSearchParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import NoData from "../../../components/NoData";

// type Props = {}

const Page = React.memo(() => {
  const [getQuery] = useSearchParams();
  const [addProduct, setAddProduct] = useState<boolean>(false);
  const [editProduct, setEditProduct] = useState<boolean>(false);
  const { isLoading, data, isError, refetch} = useQuery(["products", getQuery], () =>  getProducts(getQuery.get("page") || 1), {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (getQuery.get("page")) {
      refetch();
    }
  }, [getQuery, refetch]);

  return (
    <div className="flex w-full max-h-auto min-h-[calc(100vh-70px)] z-[90] mb-10 md:mb-0">
      <div className="flex flex-col w-full h-full mx-auto container">
        <div className="flex flex-row w-full space-x-3 items-center h-auto md:h-[50px] mt-24 mb-4 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-mono text-red-500">Products</h1>
          <button
            onClick={() => setAddProduct(true)}
            className="p-2 bg-red-500 rounded-lg text-white font-sans font-semibold hover:bg-red-800"
          >
            Add New
          </button>
        </div>

        <div className="relative overflow-x-auto mx-3 xl:mx-0 rounded-xl">
        {isLoading ? (
            <div className="flex w-full h-[350px]">
              <Loading />
            </div>
          ) : isError ? (
            <div className="flex w-full h-[350px]">
              <NoData />
            </div>
          ) : (
          <table className="w-full text-sm text-left text-gray-300 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-red-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  name
                </th>
                <th scope="col" className="px-6 py-3">
                  image
                </th>
                <th scope="col" className="px-6 py-3">
                  categories
                </th>
                <th scope="col" className="px-6 py-3">
                  default price
                </th>
                <th scope="col" className="px-6 py-3">
                  status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isError
                ? "Data Not Found"
                : data?.data.products?.data?.map((product, index) => {
                    return (
                      <ProductComp
                        key={index}
                        product={product}
                        setEditProduct={setEditProduct}
                      />
                    );
                  })}
            </tbody>
          </table>
           )}
        </div>
        
          {data ? <Paginate
            previous={data?.data?.products?.previous}
            currePage={data?.data?.products?.currePage || 1}
            next={data?.data?.products?.next}
          /> : null}
       
        <AddProduct showModal={addProduct} onCloseModal={setAddProduct} />
        <EditProduct showModal={editProduct} onCloseModal={setEditProduct} />
      </div>
    </div>
  );
});

export default Page;
