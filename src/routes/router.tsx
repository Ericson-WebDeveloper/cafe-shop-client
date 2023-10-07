import { createBrowserRouter } from "react-router-dom";
// import { Suspense, lazy } from "react";
import App from "../App";
// const App = lazy(() => import("../App"));
import ErrorPage from "../components/ErrorPage";
// const ErrorPage = lazy(() => import("../components/ErrorPage"));
import IndexPage from '../pages/Index/page';
// const IndexPage = lazy(() => import("../pages/Index/page"));
import LoginPage from "../pages/login/page";
import RegisterPage from "../pages/register/page";
import MenuPage from "../pages/menu/page";
import ProductsPage from "../pages/products/page";
import ProductPage from "../pages/product/page";
import CartPage from "../pages/cart/page";
import OrdersPage from "../pages/orders/Page";
import CheckoutPage from "../pages/checkout/page";
import BackLayout from "../pages/admin/Layout";
import BackAdminDashBoard from "../pages/admin/dashboad/Page";
import BackAdminCategories from "../pages/admin/categories/Page";
import BackAdminProducts from "../pages/admin/products/Page";
import BackAdminOrders from "../pages/admin/orders/Page";
import BackAdminPayments from "../pages/admin/payments/Page";
import BackAdminVariants from "../pages/admin/variant/Page";
import BackAdminVariantsSelection from "../pages/admin/selection/Page";
import PaymentRedirectPage from "../pages/payment_return/Page";
import PaymentCardRedirectPage from "../pages/redirect_stripe/Page";
import { Elements } from "@stripe/react-stripe-js";
import MyProfile from "../pages/user/profile/Page";
import MyOrderViewPage from "../pages/order/Page";

// import SpinerFallBack from "../components/SippnerFallBack";
import ProtectMIddleware from "../middleware/ProtectMIddleware";
import RoleMiddleware from "../middleware/RoleMiddleware";
import ActivateAccountPage from "../pages/activate-acount/page";
import GuestMIddleware from "../middleware/GuestMiddleware";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <Suspense fallback={<SpinerFallBack />}>
        <App />
      // </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        // path: "/app",
        index: true,
        element: <IndexPage />,
      },
      {
        path: "/login",
        element: (
          <GuestMIddleware>
            <LoginPage />
          </GuestMIddleware>
        ),
      },
      {
        path: "/register",
        element: (
          <GuestMIddleware>
            <RegisterPage />
          </GuestMIddleware>
        ),
      },
      {
        path: "/menus",
        element: <MenuPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/product/:pid",
        element: <ProductPage />,
      },
      {
        path: "/carts",
        element: (
          <ProtectMIddleware>
            <CartPage />
          </ProtectMIddleware>
        ),
      },
      {
        path: "/my-orders",
        element: (
          <ProtectMIddleware>
            <OrdersPage />
          </ProtectMIddleware>
        ),
      },
      {
        path: "/order/summary/:order_id",
        element: (
          <ProtectMIddleware>
            <MyOrderViewPage />
          </ProtectMIddleware>
        ),
      },
      {
        path: "/checkout-order/:order_id/:trans_id?",
        element: (
          <ProtectMIddleware>
            <CheckoutPage />
          </ProtectMIddleware>
        ),
      },
      {
        path: "/redirect-payment/stripe/:order_id",
        element: (
          <ProtectMIddleware>
            <Elements stripe={stripePromise}>
              <PaymentCardRedirectPage />
            </Elements>
          </ProtectMIddleware>
        ),
      },
      {
        path: "/redirect-payment/response",
        element: (
          <ProtectMIddleware>
            <PaymentRedirectPage />
          </ProtectMIddleware>
        ),
      },
      {
        path: "/activate-account/:email/:code",
        element: <ActivateAccountPage />,
      },
      {
        path: "/my-profile/user",
        element: (
          <ProtectMIddleware>
            <MyProfile />
          </ProtectMIddleware>
        ),
      },
    ],
  },
  {
    path: "/backend",
    element: (
      <ProtectMIddleware>
        <RoleMiddleware isAdmin={true}>
          <BackLayout />
        </RoleMiddleware>
      </ProtectMIddleware>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <BackAdminDashBoard />,
      },
      {
        path: "categories",
        element: <BackAdminCategories />,
      },
      {
        path: "products",
        element: <BackAdminProducts />,
      },
      {
        path: "orders",
        element: <BackAdminOrders />,
      },
      {
        path: "payments",
        element: <BackAdminPayments />,
      },
      {
        path: "variants",
        element: <BackAdminVariants />,
      },
      {
        path: "variant/selection/:vid",
        element: <BackAdminVariantsSelection />,
      },
      {
        path: "my-profile/user",
        element: <MyProfile />,
      },
    ],
  },
]);

export default router;
