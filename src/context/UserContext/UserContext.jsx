import { createContext, useEffect, useState } from "react";
import { getProfile } from "../../services/api/profile.api.js";

export const userContext = createContext();

export default function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  async function getUserData() {
    setIsLoading(true);
    try {
      const res = await getProfile();
      setUserData(res.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const currentToken = localStorage.getItem("userToken");
    if (currentToken) {
      getUserData();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <userContext.Provider value={{ userData, setUserData, isLoading }}>
      {children}
    </userContext.Provider>
  );
}