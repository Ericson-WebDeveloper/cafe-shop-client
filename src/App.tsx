import "./App.css";
import { Suspense, lazy } from "react";
import Footer from "./components/Footer";
// import NavBar from "./components/NavBar";
const NavBar = lazy(() => import("./components/NavBar"));
import TopBar from "./components/TopBar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SpinerFallBack from "./components/SippnerFallBack";

function App() {
  return (
    <div className="w-full max-h-screen flex">
      <div className="w-full h-full flex flex-col relative">
      <Suspense fallback={<SpinerFallBack />}>
        <TopBar />
        <NavBar />
        <Outlet />
        <Footer />
      </Suspense>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
