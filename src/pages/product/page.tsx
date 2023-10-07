import React from "react";
import { 
  // useMutation, 
  useQuery, 
  // useQueryClient 
} from "@tanstack/react-query";
import { useParams, 
  // useSearchParams 
} from "react-router-dom";
import { getProduct } from "../../api/product-api";
// import { IVariantSelectType } from "../../model/VariantSelectionType";
// import { ErrorResponseF } from "../../api/ResponseType";
// import { apiAddCart } from "../../api/cart-api";
// import { toast } from "react-toastify";
// import { cart_store } from "../../store/cart";
// import { IVariantType } from "../../model/VariantType";
import { product_store } from "../../store/product";
import ProductComp from "../../components/ProductComp";

// type Props = {}

export interface IAddCartType {
  product: string;
  selections: string[];
  qty: number;
  price: number;
  total_price: number;
}

const Page = React.memo(() => {
  // const queryClient = useQueryClient();
  // const [getQuery, setQuery] = useSearchParams();
  // const { setCart } = cart_store();
  const { setProduct, setResetProductCart} = product_store()
  const { pid } = useParams();
  const { isLoading } = useQuery( //  const { isLoading, data } = useQuery(
    ["product", pid],
    () => getProduct(pid ? pid : ""),
    {
      onSuccess: (response) => {
        setResetProductCart();
        setProduct('product',response.data.product)
      },
      refetchOnWindowFocus: false,
    }
  );
  // const defaultPriceRef = useRef(true);

  // const variants = data?.data.product?.variants
  //   ? data?.data.product?.variants
  //   : [];

  // const [tTotalPrice, setTTotalPrice] = useState<number>(
  //   data?.data.product ? data?.data.product.default_price : 0
  // );

  // const [qty, setQty] = useState<number>(1);

  // const [selections, setSelections] = useState<IVariantSelectType[]>([]);

  // const {
  //   isLoading: mutateCartLoading,
  //   // isSuccess,
  //   // isError,
  //   // error,
  //   mutateAsync: onMutateAddCart,
  // } = useMutation({
  //   mutationFn: apiAddCart,
  //   onError: (error: ErrorResponseF) => {
  //     if (error && error.status && error.status == 400) {
  //       toast.error(error.message);
  //     }
  //     if (error && error.status && error.status == 422) {
  //       error.errors?.forEach((error) => {
  //         toast.error(error);
  //       });
  //     }
  //   },
  //   onSuccess: (response) => {
  //     setCart("carts", response.data.cart);
  //     queryClient.invalidateQueries({ queryKey: ["my_carts"] });
  //   },
  // });

  // const onSubmitCart = async () => {
  //   const datas = {
  //     product: data?.data.product._id as string,
  //     selections: selections?.map((selection) => selection._id),
  //     qty: qty,
  //     price: (tTotalPrice == 0
  //       ? data?.data.product?.default_price
  //       : tTotalPrice / qty) as number,
  //     total_price: (tTotalPrice == 0
  //       ? data?.data.product?.default_price
  //       : tTotalPrice) as number,
  //   };

  //   if (datas.price == 0 || datas.total_price == 0) {
  //     toast.error("Price is not set");
  //     return false;
  //   }
  //   return await onMutateAddCart(datas);
  // };

  // const returningSelections = (): IVariantSelectType[][] | undefined => {
  //   return data?.data.product?.variants
  //   ?.map((variant) => (variant?.status ? variant : null))
  //   .map((variant) => variant?.selections as IVariantSelectType[]);
  // }

  // useEffect(() => {
  //   const defaultPrice = () => {
  //     if (
  //       data?.data.product?.variants &&
  //       getQuery.size > 0 &&
  //       defaultPriceRef.current
  //     ) {
  //       defaultPriceRef.current = false;
  //       getQuery.forEach((q) => {
  //         returningSelections()?.forEach((selections) => {
  //             return selections?.map((selection) => {
  //               if (selection.name == q) {
  //                 setSelections((prev) => [...prev, selection]);
  //               }
  //             });
  //           });
  //       });
  //     } else if (data?.data.product?.variants && defaultPriceRef.current) {
  //       defaultPriceRef.current = false;
  //       returningSelections()?.forEach((selections) => {
  //           return selections?.map((selection) => {
  //             if (selection.default_select) {
  //               setSelections((prev) => [...prev, selection]);
  //             }
  //           });
  //         });
  //     }
  //   };
  //   defaultPrice();
  // }, [data?.data.product?.variants, getQuery]);


  
  // const computeTotal = (selects: IVariantSelectType[]) => {
  //   return selects?.reduce((total, c) => {
  //     return (total += c.price);
  //   }, 0);
  // };
  // const computeTotalPrice = useMemo(
  //   () => computeTotal(selections),
  //   [selections]
  // );

  // const newSelection = (
  //   variantP: IVariantType,
  //   selection: IVariantSelectType
  // ) => {
  //   const variant = selection?.variant;
  //   if (!selection?.status) return;
  //   setSelections(
  //     selections?.filter((selection) => selection.variant != variant)
  //   );
  //   setSelections((prev) => [...prev, selection]);
  //   if (getQuery.has(variantP.name)) {
  //     getQuery.delete(variantP.name);
  //     setQuery(`${getQuery.toString()}&${variantP.name}=${selection.name}`);
  //   } else {
  //     setQuery(`${getQuery.toString()}&${variantP.name}=${selection.name}`);
  //   }
  // };

  // const setDefaultSelection = (selection: IVariantSelectType) => {
  //   return selections?.some(
  //     (select) =>
  //       select.variant == selection.variant && selection._id == select._id
  //   );
  // };

  // change to components based the all can convert

  // useEffect(() => {
  //   const reCompute = () => {
  //     if (data?.data.product && selections.length > 0) {
  //       let reTotal = selections?.reduce((total, selection) => {
  //         if (!selection?.status) return 0;
  //         return (total += selection.price);
  //       }, 0);
  //       reTotal = Number(
  //         ((data?.data.product.default_price + reTotal) * qty).toFixed(2)
  //       );
  //       setTTotalPrice(reTotal);
  //     }
  //   };
  //   reCompute();
  // }, [selections, data?.data.product, qty]);


  // cleanup
  // useEffect(() => {
  //   return () => {
  //     setProductCart('selections', null, null, null);
  //     setProductCart('totalprice', null, null, 0);
  //     setProductCart('qty', null, 0, null);
  //   }
  // }, [setProductCart]);

  return (
    <div className="flex w-full max-h-auto min-h-[calc(100vh-174px)]">
      <div className="flex w-full h-full mx-auto container">
        {isLoading ? (
          <div className="flex w-full h-screen bg-white">
            <div className="flex justify-center mt-16 w-full h-full">
              <img
                className="h-16 md:h-28 w-16 md:w-28"
                src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
                alt=""
              />
            </div>
          </div>
        ) : (
          <ProductComp />
          // <div className="flex flex-col lg:flex-row w-full h-full p-8">
          //   <div className="flex flex-1 p-4 lg:p-12">
          //     <img
          //       src={data?.data.product.image}
          //       className="h-[350px] md:h-[450px] lg:h-[650px] w-full"
          //       alt=""
          //     />
          //   </div>
          //   <div className="flex flex-col flex-1 p-4 lg:p-12 space-y-3 justify-center">
          //     <h1 className="text-4xl font-bold font-sans text-red-500">
          //       {data?.data.product.name}
          //     </h1>
          //     <p className="font-sans text-red-500">
          //       {data?.data.product.description}
          //     </p>
          //     <p className="text-2xl font-bold font-sans text-red-500">
          //       PHP{" "}
          //       {tTotalPrice == 0
          //         ? data?.data.product.default_price
          //         : tTotalPrice}
          //     </p>
          //     {/* list of varian selections */}
          //     <div className="flex flex-col w-full space-y-3">
          //       {variants?.map((variant, index) => {
          //         return variant?.status ? (
          //           <div key={index} className="w-full flex flex-col">
          //             <span
          //               className="text-red-400 font-sans font-semibold"
          //               key={index}
          //             >
          //               {variant.name}
          //             </span>
          //             <div className="flex w-full space-x-4">
          //               {(variant?.selections as IVariantSelectType[])?.map(
          //                 (selection, index) => {
          //                   return selection?.status ? (
          //                     <span
          //                       key={index}
          //                       onClick={() => {
          //                         newSelection(variant, selection);
          //                       }}
          //                       className={`font-semibold font-sans p-2 rounded-xl hover:bg-red-300 cursor-pointer 
          //                       ${
          //                         setDefaultSelection(selection)
          //                           ? "text-white bg-red-600"
          //                           : "text-black bg-white"
          //                       } 
          //                        border-gray-600 border-2`}
          //                     >
          //                       {selection.name}
          //                     </span>
          //                   ) : null;
          //                 }
          //               )}
          //             </div>
          //           </div>
          //         ) : null;
          //       })}

          //       {/* <div className="w-full flex flex-col">
          //           <span className="text-red-400 font-sans font-semibold">Flavor</span>
          //           <div className="flex w-full space-x-4">
          //               <span className={` font-semibold font-sans p-2 rounded-xl hover:bg-red-300 cursor-pointer text-white bg-red-500`}>Regular</span>
          //               <span className={`text-red-500 font-semibold font-sans p-2 hover:bg-red-300 cursor-pointer rounded-xl`}>Spicy</span>
          //               <span className={`text-red-500 font-semibold font-sans p-2 hover:bg-red-300 cursor-pointer rounded-xl`}>Super Spicy</span>
          //           </div>
          //       </div> */}
          //     </div>
          //     {/*  */}
          //     <div className="flex w-full justify-between border-2 border-red-300">
          //       <div className="flex flex-1 items-center px-4">
          //         <p>{qty}</p>
          //         <span className="flex w-full justify-end text-red-400">
          //           <svg
          //             onClick={() => setQty((prev) => prev + 1)}
          //             xmlns="http://www.w3.org/2000/svg"
          //             className="h-6 w-6 cursor-pointer hover:text-red-700"
          //             fill="none"
          //             viewBox="0 0 24 24"
          //             stroke="currentColor"
          //             strokeWidth={2}
          //           >
          //             <path
          //               strokeLinecap="round"
          //               strokeLinejoin="round"
          //               d="M15 19l-7-7 7-7"
          //             />
          //           </svg>
          //           <span>qty</span>
          //           <svg
          //             onClick={() => {
          //               if (qty == 1) return;
          //               setQty((prev) => prev - 1);
          //             }}
          //             xmlns="http://www.w3.org/2000/svg"
          //             className="h-6 w-6 cursor-pointer hover:text-red-700"
          //             fill="none"
          //             viewBox="0 0 24 24"
          //             stroke="currentColor"
          //             strokeWidth={2}
          //           >
          //             <path
          //               strokeLinecap="round"
          //               strokeLinejoin="round"
          //               d="M9 5l7 7-7 7"
          //             />
          //           </svg>
          //         </span>
          //       </div>
          //       <div
          //         className={`flex flex-3 ${
          //           mutateCartLoading ? "bg-gray-400" : "bg-red-400"
          //         } `}
          //       >
          //         <button
          //           type="button"
          //           disabled={mutateCartLoading}
          //           className={`p-4 text-white font-serif 
          //         font-semibold text-lg hover:bg-red-700`}
          //           onClick={onSubmitCart}
          //         >
          //           {mutateCartLoading ? "Loading...." : "ADD TO CART"}
          //         </button>
          //       </div>
          //     </div>
          //   </div>
          // </div>
        )}
      </div>
    </div>
  );
});

export default Page;
