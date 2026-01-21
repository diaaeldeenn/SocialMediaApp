import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AppProtectedRoutes({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return children;
}
