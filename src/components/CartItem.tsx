import React from "react";
import { ICartType } from "../model/CartType";
import { IUserType } from "../model/UserType";
import { IProductType } from "../model/ProductType";
import { IVariantSelectType } from "../model/VariantSelectionType";
import { cart_store } from "../store/cart";
import { useMutation } from "@tanstack/react-query";
import { removeCartApi } from "../api/cart-api";
import { convertNumberPHP } from "../helper/numberHelper";
import { useNavigate } from "react-router-dom";

type Props = {
  cart: ICartType & {
    user: IUserType;
    product: IProductType;
    selections: IVariantSelectType[];
  };
};

const CartItem = React.memo(({ cart }: Props) => {
  const { checkout_cart, carts, addRemoveCheckoutCart, removeCart } = cart_store();
  const navigate = useNavigate();
  const {isLoading, mutateAsync: mutateRemoveCart} = useMutation({mutationFn: removeCartApi, 
    onSuccess: (response) => {
      removeCart(response.data.cart_id || cart._id);
      addRemoveCheckoutCart(response.data.cart_id || cart._id);
      
    }
  })

  const addRemoveCartCheckout = () => {
    addRemoveCheckoutCart(cart._id);
  }

  const removeCartDatabase = async() => {
    await mutateRemoveCart(cart._id);
    if(carts.length == 1) {
      navigate('/', {replace:true});
    }
  }
  return (
    <div className="flex w-full lg:w-[80%] justify-between items-center mx-4 md:mx-auto md:container hover:bg-gray-200 
    p-2 rounded-lg border-[1px] border-gray-500">
      <span className="flex basis-1">
        <input type="checkbox" onChange={addRemoveCartCheckout} checked={checkout_cart?.some((checkc) => checkc._id == cart._id)} />
      </span>
      <span className="flex basis-1/4 justify-center">
        <img
          src={cart?.product.image}
          className="w-12 md:w-16 h-12 md:h-16 rounded-full"
          alt=""
        />
      </span>
      <span className="flex flex-col basis-2/5">
        <h1 className="text-red-500 font-semibold font-serif text-sm md:text-md xl:text-lg">
          {cart?.product.name}
        </h1>
        <span className="grid grid-cols-2 gap-1">
          {cart?.selections?.map((selection, index) => {
            return (
              <p
                key={index}
                className="text-red-500 font-serif text-sm md:text-md "
              >
                {selection?.name}
              </p>
            );
          })}
        </span>
      </span>

      <span className="flex text-red-500 font-serif text-sm md:text-md xl:text-lg basis-1/8 justify-center">
      Qty: {cart?.qty} - {convertNumberPHP(cart.total_price)}
      </span>
      <span className={`flex basis-1 ${isLoading ? 'hidden' : ''}`}>
        <svg onClick={removeCartDatabase}
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-red-400 hover:text-red-600 cursor-pointer"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </div>
  );
});

export default CartItem;
