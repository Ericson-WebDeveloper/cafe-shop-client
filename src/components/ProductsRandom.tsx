import React from "react";
import { product_store } from "../store/product";
import { convertNumberPHP } from "../helper/numberHelper";
import { useNavigate } from "react-router-dom";

// type Props = {}

const ProductsRandom = React.memo(() => {
  const { getProducts } = product_store();
  const navigate = useNavigate();
  return (
    <div className="w-full h-[600px] md:h-[850px] overflow-x-scroll scroll-smooth">
      <div className="w-screen  h-full flex space-x-4">
        {getProducts()?.map((product, index) => {
          return (
            <div
              key={index}
              className="min-w-[260px] md:min-w-[350px] lg:min-w-[450px] h-full flex flex-col space-y-2"
            >
              <div className="w-full h-[200px] md:h-[400px] flex">
                <img
                  src={product?.image}
                  className="w-full h-[200px] md:h-[400px]"
                  alt=""
                />
              </div>
              <div className="w-full h-full flex flex-col items-center justify-center px-2 md:px-4">
                <h1 className="text-xl md:text-3xl text-red-500 font-sans font-semibold text-center">
                  {product?.name}
                </h1>
                <p className="text-sm md:text-md font-sans indent-4 text-justify">
                  {product.description}
                </p>
                <h4 className="text-xl md:text-2xl text-red-500 font-sans font-semibold">
                  {convertNumberPHP(product.default_price)}
                </h4>
              </div>
              <button
                type="button"
                onClick={() =>
                  navigate(`/product/${product._id}`)
                }
                className="p-3 md:p-6 bg-red-600 text-white text-lg md:text-xl"
              >
                View
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default ProductsRandom;
