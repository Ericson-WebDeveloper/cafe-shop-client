import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getVariants } from "../../../api/variant-api";
import VariantComp from "../../../components/admin/tables/VariantComp";
import Paginate from "../../../components/Paginate";
import { useSearchParams } from "react-router-dom";
import AddSelections from "../../../components/admin/AddSelections";
import Loading from "../../../components/Loading";
import NoData from "../../../components/NoData";

// type Props = {}

const Page = React.memo(() => {
  const [getQuery] = useSearchParams();
  const [addModal, setAddModal] = useState<boolean>(false);
  const {
    isLoading,
    data: variants,
    isError,
    refetch,
  } = useQuery(
    ["variants", getQuery],
    () => getVariants(getQuery.get("page") || 1),
    {
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );

  useEffect(() => {
    if (getQuery.get("page")) {
      refetch();
    }
  }, [getQuery, refetch]);

  return (
    <div className="flex w-full max-h-auto min-h-[calc(100vh-70px)] z-[90] mb-10 md:mb-0">
      <div className="flex flex-col w-full h-full mx-auto container">
        <div className="flex flex-row w-full space-x-3 items-center h-auto md:h-[50px] mt-24">
          <h1 className="text-3xl md:text-4xl font-mono text-red-500">
            Variant's Selections
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
                    name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    product price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    default
                  </th>
                  <th scope="col" className="px-6 py-3">
                    selections
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {variants?.data.variants.data?.map((variant, index) => {
                  return (
                    <VariantComp
                      variant={variant}
                      key={index}
                      onCloseModal={setAddModal}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/*  */}
          {variants ? (
            <Paginate
              previous={variants?.data?.variants?.previous}
              currePage={variants?.data?.variants?.currePage || 1}
              next={variants?.data?.variants?.next}
            />
          ) : null}
       {/*  */}
      </div>
      <AddSelections showModal={addModal} onCloseModal={setAddModal} />
    </div>
  );
});

export default Page;
