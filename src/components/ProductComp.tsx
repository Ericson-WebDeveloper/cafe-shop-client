import React, { useEffect, useRef } from "react";
import { product_store } from "../store/product";
import { IVariantSelectType } from "../model/VariantSelectionType";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IVariantType } from "../model/VariantType";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorResponseF } from "../api/ResponseType";
import { cart_store } from "../store/cart";
import { apiAddCart } from "../api/cart-api";

// type Props = {}

const ProductComp = React.memo(() => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    product,
    productCart: { tTotalPrice, qty, selections },
    setProductCart,
  } = product_store();
  const variants = product?.variants ? product?.variants : [];
  const [getQuery, setQuery] = useSearchParams();
  const defaultPriceRef = useRef(true);
  const { setCart } = cart_store();

  const {
    isLoading: mutateCartLoading,
    // isSuccess,
    // isError,
    // error,
    mutateAsync: onMutateAddCart,
  } = useMutation({
    mutationFn: apiAddCart,
    onError: (error: ErrorResponseF) => {
      if (error && error.status && error.status == 400) {
        toast.error(error.message);
      }
      if (error && error.status && error.status == 401) {
        toast.error(error.message);
        navigate('/login');
      }
      if (error && error.status && error.status == 422) {
        error.errors?.forEach((error) => {
          toast.error(error);
        });
      }
    },
    onSuccess: (response) => {
      setCart("carts", response.data.cart);
      queryClient.invalidateQueries({ queryKey: ["my_carts"] });
      toast.success(response.data.message || 'Add to Cart Complete!')
    },
  });

  useEffect(() => {
    const defaultPrice = () => {
      if (product?.variants && defaultPriceRef.current) {
        defaultPriceRef.current = false;
        returningSelections()?.forEach((selections) => {
          return selections?.map((selection) => {
            if (selection.default_select) {
              // setSelections((prev) => [...prev, selection]);
              setProductCart("selections", selection, null, null);
            }
          });
        });
        if (getQuery.size > 0) {
          getQuery.forEach((q) => {
            returningSelections()?.forEach((selections) => {
              return selections?.map((selection) => {
                if (selection.name == q) {
                  //   setSelections((prev) => [...prev, selection]);
                  setProductCart("selections", selection, null, null);
                }
              });
            });
          });
        }
      }
      //   if (product?.variants && getQuery.size > 0 && defaultPriceRef.current) {
      //     defaultPriceRef.current = false;
      //     getQuery.forEach((q) => {
      //       returningSelections()?.forEach((selections) => {
      //         return selections?.map((selection) => {
      //           if (selection.name == q) {
      //             //   setSelections((prev) => [...prev, selection]);
      //             setProductCart("selections", selection, null, null);
      //           }
      //         });
      //       });
      //     });
      //   }
    };
    defaultPrice();
  }, [product?.variants, getQuery, setProductCart]);

  const onSubmitCart = async () => {
    const datas = {
      product: product?._id as string,
      selections: selections?.map((selection) => selection._id),
      qty: qty,
      price: (tTotalPrice == 0
        ? product?.default_price
        : tTotalPrice / qty) as number,
      total_price: (tTotalPrice == 0
        ? product?.default_price
        : tTotalPrice) as number,
    };

    if (datas.price == 0 || datas.total_price == 0) {
      toast.error("Price is not set");
      return false;
    }
    if (
      product?.variants &&
      product?.variants?.length > 0 &&
      selections.length == 0
    ) {
      toast.error("You didn't select option of item");
      return false;
    }
    return await onMutateAddCart(datas);
  };

  const returningSelections = (): IVariantSelectType[][] | undefined => {
    return product?.variants
      ?.map((variant) => (variant?.status ? variant : null))
      .map((variant) => variant?.selections as IVariantSelectType[]);
  };

  const newSelection = (
    variantP: IVariantType,
    selection: IVariantSelectType
  ) => {
    // const variant = selection?.variant;
    if (!selection?.status) return;
    // setSelections(
    //   selections?.filter((selection) => selection.variant != variant)
    // );
    // setSelections((prev) => [...prev, selection]);
    setProductCart("selections", selection, null, null);
    if (getQuery.has(variantP.name)) {
      getQuery.delete(variantP.name);
      setQuery(`${getQuery.toString()}&${variantP.name}=${selection.name}`);
    } else {
      setQuery(`${getQuery.toString()}&${variantP.name}=${selection.name}`);
    }
  };

  const setDefaultSelection = (selection: IVariantSelectType) => {
    return selections?.some(
      (select) =>
        select.variant == selection.variant && selection._id == select._id
    );
  };

  const setNewQty = (qty_num: number) => {
    const newQty = JSON.parse(JSON.stringify(qty));
    setProductCart("qty", null, qty_num < 0 ? newQty - 1 : newQty + 1, null);
  };

  useEffect(() => {
    const reCompute = () => {
      if (product) {
        // if (product && selections.length > 0) {
        const newQty = JSON.parse(JSON.stringify(qty));
        let reTotal = selections?.reduce((total, selection) => {
          if (!selection?.status) return 0;
          return (total += selection.price);
        }, 0);
        reTotal = Number(
          ((product?.default_price + reTotal) * newQty).toFixed(2)
        );
        setProductCart("totalprice", null, null, reTotal);
      }
    };
    reCompute();

  }, [selections, product, qty, setProductCart]);

  return (
    <div className="flex flex-col lg:flex-row w-full h-full p-8">
      <div className="flex flex-1 p-4 lg:p-12">
        <img
          src={product?.image}
          className="h-[350px] md:h-[450px] lg:h-[650px] w-full"
          alt=""
        />
      </div>
      <div className="flex flex-col flex-1 p-4 lg:p-12 space-y-3 justify-center">
        <h1 className="text-4xl font-bold font-sans text-red-500">
          {product?.name}
        </h1>
        <p className="font-sans text-red-500">{product?.description}</p>
        <p className="text-2xl font-bold font-sans text-red-500">
          PHP {tTotalPrice == 0 ? product?.default_price : tTotalPrice}
        </p>
        {/* list of varian selections */}
        <div className="flex flex-col w-full space-y-3">
          {variants?.map((variant, index) => {
            return variant?.status ? (
              <div key={index} className="w-full flex flex-col">
                <span
                  className="text-red-400 font-sans font-semibold"
                  key={index}
                >
                  {variant.name}
                </span>
                <div className="flex w-full space-x-4">
                  {(variant?.selections as IVariantSelectType[])?.map(
                    (selection, index) => {
                      return selection?.status ? (
                        <span
                          key={index}
                          onClick={() => {
                            newSelection(variant, selection);
                          }}
                          className={`font-semibold font-sans p-2 rounded-xl hover:bg-red-300 cursor-pointer 
                        ${
                          setDefaultSelection(selection)
                            ? "text-white bg-red-600"
                            : "text-black bg-white"
                        } 
                         border-gray-600 border-2`}
                        >
                          {selection.name}
                        </span>
                      ) : null;
                    }
                  )}
                </div>
              </div>
            ) : null;
          })}
        </div>
        {/*  */}
        <div className="flex w-full justify-between border-2 border-red-300 rounded-xl">
          <div className="flex flex-1 items-center px-4 ">
            <p>{qty}</p>
            <span className={`flex w-full justify-end text-red-400 `}>
              <svg
                onClick={() => {
                    if (qty == 1) return;
                    setNewQty(-1);
                }}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 cursor-pointer hover:text-red-700 ${qty == 1 ? 'cursor-not-allowed' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>qty</span>
              <svg
                onClick={() => {
                  setNewQty(1);
                }}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer hover:text-red-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
          <div
            className={`flex flex-3 rounded-r-xl ${
              mutateCartLoading ? "bg-gray-400" : "bg-red-400"
            } `}
          >
            <button
              type="button"
              disabled={mutateCartLoading}
              className={`p-4 text-white font-serif 
          font-semibold text-lg hover:bg-red-700 hover:rounded-r-xl`}
              onClick={onSubmitCart}
            >
              {mutateCartLoading ? "Loading...." : "ADD TO CART"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductComp;
