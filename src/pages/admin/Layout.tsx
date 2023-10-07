import React, { Suspense } from "react";
import NavBar from "../../components/admin/NavBar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SpinerFallBack from "../../components/SippnerFallBack";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// const queryClient = new QueryClient();

// type Props = {}

const Layout = React.memo(() => {
  return (
    <div className="w-full max-h-screen flex">
      <Suspense fallback={<SpinerFallBack />}>
        <div className="w-full h-full flex flex-col relative">
          <NavBar />
          <Outlet />
        </div>
      </Suspense>
      <ToastContainer />
    </div>
  );
});

export default Layout;
