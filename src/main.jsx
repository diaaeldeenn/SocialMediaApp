import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HeroUIProvider } from "@heroui/react";
import { ToastContainer } from "react-toastify";
import UserContextProvider from "./context/UserContext/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <HeroUIProvider>
        <App />
        <ToastContainer />
      </HeroUIProvider>
    </UserContextProvider>
  </StrictMode>,
);
