import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchVariantSelection } from "../../../api/variant-api";
import SelecComp from "../../../components/admin/tables/SelecComp";
import Loading from "../../../components/Loading";
import NoData from "../../../components/NoData";

// type Props = {}

const Page = React.memo(() => {
  const { vid } = useParams();
  const {
    isLoading,
    data: variant,
    isError,
  } = useQuery(["selections", vid], () => fetchVariantSelection(String(vid)));
  return (
    <div className="flex w-full max-h-auto min-h-[calc(100vh-70px)] z-[90] mb-10 md:mb-0">
      <div className="flex flex-col w-full h-full mx-auto container space-y-4">
        <div className="flex flex-row w-full items-center h-auto mt-24">
          <h1 className="text-3xl md:text-4xl font-mono text-red-500">
            Selections List of variant ({variant?.data.variant.name}), product (
            {variant?.data.variant.product.name})
          </h1>
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
                    selection name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    default
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
                {variant?.data.variant?.selections?.map((selection, index) => {
                  return (
                    <SelecComp
                      selection={selection}
                      key={index}
                      product_id={variant.data.variant.product._id}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div className="flex w-full pr-6 justify-end"></div>
      </div>
    </div>
  );
});

export default Page;
