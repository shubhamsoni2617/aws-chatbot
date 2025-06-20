import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { useFetchData } from "./hooks/useFetchData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./notification.css";
import { IoCheckmark } from "react-icons/io5";
import { FaInfo } from "react-icons/fa6";
// import { RxCrossCircled } from "react-icons/rx";
import { LuTriangleAlert } from "react-icons/lu";
import { IoIosCloseCircleOutline } from "react-icons/io";

import CustomCloseButtonNotification from "./components/CustomCloseButtonNotification";
// import './toastStyle.css';

const router = createBrowserRouter(routes);

const App = () => {
  useFetchData();

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        icon={({ type, theme }) => {
          // theme is not used in this example but you could
          console.log("type notification props", type, theme);
          switch (type) {
            case "info":
              return (
                <FaInfo style={{ color: "indigo", strokeWidth: 2 }} size={24} />
              );
            case "error":
              return (
                <IoIosCloseCircleOutline
                  style={{ color: "#DC3545", strokeWidth: 2}}
                  size={24}
                />
              );
            case "success":
              return (
                <IoCheckmark
                  style={{ color: "#28A745", strokeWidth: 2 }}
                  size={24}
                  stroke="#28A745"
                />
              );
            case "warning":
              return (
                <LuTriangleAlert
                  style={{ color: "orange", strokeWidth: 2 }}
                  size={24}
                />
              );
            default:
              return null;
          }
        }}
        position="top-right"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={false}
        closeButton={CustomCloseButtonNotification}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="custom-toast custom-toast-body"
      />
    </>
  );
};

export default App;
