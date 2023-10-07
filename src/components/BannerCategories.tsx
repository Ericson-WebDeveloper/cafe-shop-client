import React from "react";
import { category_store } from "../store/category";

// type Props = {}

const BannerCategories = React.memo(() => {
  const { getCategorys } = category_store();
  return (
    <div className="w-full h-[138px] flex bg-red-300">
      <div className="h-full w-full flex ">
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 items-center mx-auto container my-4">
          {getCategorys().map((category, index) => {
            return (
              <span
                key={index}
                className="text-xs md:text-lg bg-red-700 text-white py-1 md:py-2 px-2 md:px-3 rounded-xl font-serif text-center"
              >
                {category.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default BannerCategories;
