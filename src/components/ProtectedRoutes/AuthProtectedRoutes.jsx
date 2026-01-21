import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthProtectedRoutes({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  return children;
}
