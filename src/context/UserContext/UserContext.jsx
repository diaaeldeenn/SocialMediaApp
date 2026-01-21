import { createContext, useEffect, useState } from "react";
import { getProfile } from "../../services/api/profile.api.js";

export const userContext = createContext();

export default function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getUserData() {
    try {
      const res = await getProfile();
      setUserData(res.data.user);
    } catch (error) {
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      getUserData();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <userContext.Provider value={{ userData, setUserData }}>
      {children}
    </userContext.Provider>
  );
}
