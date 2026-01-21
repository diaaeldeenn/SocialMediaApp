import Navbar from "../components/Navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer.jsx";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}