import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Homepage from "./components/Homepage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./store/mainStore";
import SignUp from "./components/SignUp";
import SignUpSuccess from "./components/SignUpSuccess";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastProvider } from "./components/ToastContext";

const App = () => {
  return (
    <>
      <Provider store={appStore}>
      <ToastProvider>
        <Header />
        <Outlet />
        <Footer />
        {/* <ToastContainer /> */}
        <ToastContainer />
        </ToastProvider>

      </Provider>
    </>
  );
};

export default App;
