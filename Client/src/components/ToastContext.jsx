import React, { createContext, useContext } from "react";
import { toast } from "react-toastify";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const showToast = (type, message) => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "info":
        toast.info(message);
        break;
      default:
        toast(message);
        break;
    }
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
