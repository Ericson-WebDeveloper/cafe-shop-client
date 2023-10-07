import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api/category-api";
import { useNavigate } from "react-router-dom";
import SpinnerLoading from "../../components/SpinnerLoading";

// type Props = {}

const page = React.memo(() => {
  const { isLoading, data, isError } = useQuery(["categories"], getCategories);
  const navigate = useNavigate();
  return (
    <div className="flex w-full max-h-h-auto min-h-[calc(100vh-174px)]">
      <div className="flex w-full h-full mx-auto container py-12">
        {isLoading ? (
        //   <div className="flex w-full min-h-screen max-h-full justify-center">
        //     <h1 className="text-2xl md:text-4xl text-red-700 font-semibold">
        //       Loading......
        //     </h1>
        //   </div>
        <SpinnerLoading />
        ) : isError ? (
          <div className="flex w-full min-h-screen max-h-full justify-center">
            <h1 className="text-2xl md:text-4xl text-red-700 font-semibold">
              No Data Found
            </h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 mx-auto">
            {data?.data.categories.map((category, index) => {
              return (
                <div
                  key={index}
                  onClick={() =>
                    navigate(`/products?category=${category.name}`, {
                      replace: true,
                    })
                  }
                  className="flex w-[150px] md:w-[200px] lg:w-[350px] h-[100px] md:h-[150px] cursor-pointer rounded-lg justify-center items-center 
                  border-2 border-red-600 hover:bg-red-700 hover:text-white"
                >
                  <h1 className="text:2xl md:text-3xl lg:text-4xl font-serif font-semibold">
                    {category.name}
                  </h1>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
});

export default page;
