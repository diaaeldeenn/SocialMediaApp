import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ThemeContextProvider} from "./context/Theme/ThemeContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./Layouts/MainLayout.jsx";
import Home from "./pages/Home/Home.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import AuthLayout from "./Layouts/AuthLayout.jsx";
import Register from "./pages/Auth/Register/Register.jsx";
import Login from "./pages/Auth/Login/Login.jsx";
import AppProtectedRoutes from "./components/ProtectedRoutes/AppProtectedRoutes.jsx";
import AuthProtectedRoutes from "./components/ProtectedRoutes/AuthProtectedRoutes.jsx";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <AppProtectedRoutes>
          <MainLayout />
        </AppProtectedRoutes>
      ),
      children: [
        { index: true, element: <Navigate to="/home" /> },
        { path: "/home", element: <Home /> },
        { path: "/profile", element: <Profile /> },
      ],
    },
    {
      path: "",
      element: (
        <AuthProtectedRoutes>
          <AuthLayout />
        </AuthProtectedRoutes>
      ),
      children: [
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <ThemeContextProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </ThemeContextProvider>
  );
}