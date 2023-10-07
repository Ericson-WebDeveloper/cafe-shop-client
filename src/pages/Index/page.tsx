// Import your components
import React from "react";
import Banner from "../../components/Banner";
import BannerCategories from "../../components/BannerCategories";
import ProductsRandom from "../../components/ProductsRandom";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api/category-api";
import { category_store } from "../../store/category";
import { getProducts } from "../../api/product-api";
import { product_store } from "../../store/product";

// Define your main component
const IndexPage = React.memo(() => {
  const { setCategory } = category_store();
  const { setProduct } = product_store();
  const { isLoading: queryCategoriesLoading } = useQuery(["public_categories"], getCategories, {
    onSuccess: (response) => {
      setCategory("categorys", response.data.categories);
    },
    onError: () => {
      setCategory("categorys", null);
    },
    refetchOnWindowFocus: false
  });

  const {isLoading: queryProductsLoading} = useQuery(['public_products'], () => getProducts(1, null, true), {
    onSuccess: (response) => {
      setProduct('products',response.data.products.data);
    },
    onError: () => {
      setProduct('products', null);
    },
    refetchOnWindowFocus: false
  });
  return (
    <>
      <Banner />
      {queryCategoriesLoading ? (
        <div className="w-full h-full">
          <div className="border border-red-300 shadow rounded-md p-4 w-full mx-auto">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-red-700 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-red-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-red-700 rounded col-span-2"></div>
                      <div className="h-2 bg-red-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-red-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      ) : (
        <BannerCategories />
      )}
      {
        queryProductsLoading ? <div className="w-full h-full">
        <div className="border border-blue-300 shadow rounded-md p-4 w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-slate-700 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-700 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
      </div> 
      : <ProductsRandom />
      }
      
    </>
  );
});

export default IndexPage;
