import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/product-api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import SpinnerLoading from "../../components/SpinnerLoading";
import Paginate from "../../components/Paginate";

// type Props = {}

const page = React.memo(() => {
  const [getQuery] = useSearchParams();
  const queryClient = useQueryClient();
  const { isLoading, data, refetch } = useQuery(
    ["products", getQuery],
    () =>
      getProducts(
        getQuery.get("page") || 1,
        getQuery.get("category") || null,
        true
      ),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: false,
      refetchOnMount: false,
      retry: false,
      // staleTime: 30000
    }
  );
  const navigate = useNavigate();

  useEffect(() => {
    if(getQuery.get("page") || getQuery.get("category")) {
      refetch();
    }

    return () => {
      // queryClient.resetQueries({queryKey: ['products']});
      queryClient.clear();
    };
  }, [getQuery, refetch, queryClient]);

  return (
    <>
      <div className="flex w-full max-h-auto min-h-[calc(100vh-174px)] ">
        <div className="w-full h-full flex mx-auto container py-6 justify-center">
          {isLoading ? (
            <SpinnerLoading />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4  gap-3">
              {data?.data?.products?.data?.map((product, index) => {
                return (
                  <div
                    key={index}
                    className="w-[300px] md:w-[200px] lg:w-[280px] xl:w-[300px] h-full flex flex-col space-y-2 border-red-400 border-2"
                  >
                    <div className="w-full min-h-[250px] max-h-[300px] lg:h-[300px] flex justify-center">
                      <img
                        src={product.image}
                        className=" w-full h-[230px]"
                        alt=""
                      />
                    </div>
                    <div className="w-full h-full flex flex-col items-center justify-center px-4 space-y-2">
                      <h1 className="text-lg lg:text-3xl text-red-500 font-sans font-semibold text-center">
                        {product.name}
                      </h1>
                      <p className="text-sm lg:text-lg font-sans indent-4 text-justify ">
                        {product.description}
                      </p>
                      <h4 className="text-lg lg:text-2xl text-red-500 font-sans font-semibold">
                        PHP {product.default_price}
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/product/${product._id}`, { replace: true })
                      }
                      className="p-2 md:p-3 bg-red-600 text-white text-xl"
                    >
                      View
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full pr-6 justify-center mb-4">
        {data?.data?.products ? (
          <Paginate
            previous={data?.data?.products?.previous}
            currePage={data?.data?.products?.currePage || 1}
            next={data?.data?.products?.next}
          />
        ) : null}
      </div>
    </>
  );
});

export default page;
