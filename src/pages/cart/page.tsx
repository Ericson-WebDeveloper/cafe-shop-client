import React, { useEffect } from "react";
import { cart_store } from "../../store/cart";
import CartItem from "../../components/CartItem";
import { convertNumberPHP } from "../../helper/numberHelper";
import CheckOutDetail from "../../components/CheckOutDetail";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import NoData from "../../components/NoData";

// type Props = {}

const page = React.memo(() => {
  const { getTotalPrice, getCarts, setCart, checkout_cart } = cart_store();
  const carts = getCarts();
  const navigate = useNavigate();

  useEffect(() => {
      if (carts) {
        setCart("checkout_cart", carts);
      }
  }, [carts, setCart, navigate]);

  return (
    <div className="flex w-full max-h-auto min-h-[calc(100vh-174px)]">
      <div className="flex flex-col-reverse lg:flex-row w-full h-full">
        <div
          className={`flex flex-col flex-1 w-full min-h-[calc(100vh-174px)] pt-8 lg:pt-0 px-2 lg:px-8 space-y-5 lg:justify-center`}
        >
          {carts.length > 0 ? carts?.map((cart, index) => {
            return <CartItem cart={cart} key={index} />;
          }) : 
           <NoData />}
        </div>
        <div className="flex flex-1 w-full bg-red-100 p-8">
          <div className="flex w-full h-full justify-center lg:pt-[10%]">
            <div className="flex flex-col w-[70%] h-full space-y-3">
              {carts.length > 0 ? (
                <>
                  <div className="flex w-full justify-between">
                    <p className="text-red-400 font-sans font-semibold">
                      SubTotal Items(3)
                    </p>
                    <p className="text-red-400 font-sans font-semibold">
                      {convertNumberPHP(getTotalPrice())}
                    </p>
                  </div>
                  <div className="flex w-full justify-between">
                    <p className="text-red-400 font-sans font-semibold">
                      Delivery Fee
                    </p>
                    <p className="text-red-400 font-sans font-semibold">
                      {checkout_cart.length > 0
                        ? Number(getTotalPrice().toFixed(2)) > 249
                          ? convertNumberPHP(0.0)
                          : convertNumberPHP(70)
                        : 0.0}
                    </p>
                  </div>
                  <br />
                  <div className="flex w-full justify-between">
                    <p className="text-red-400 font-sans font-semibold">
                      Total (INC VAT)
                    </p>
                    {/* if free text-green !FREE */}
                    <p className="text-red-400 font-sans font-semibold">
                      {convertNumberPHP(getTotalPrice())}
                    </p>
                  </div>
                  <br />
                  <CheckOutDetail />
                  {/* <div className="flex w-full justify-end">
                    <button
                      type="button"
                      disabled={checkout_cart.length > 0 ? false : true}
                      className={`p-2 px-12 text-white ${
                        checkout_cart.length > 0
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-red-300"
                      }  rounded-lg`}
                    >
                      CHECKOUT
                    </button>
                  </div> */}
                </>
              ) : (
                <div className="flex w-full h-full justify-center items-center">
                  <Loading />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default page;
