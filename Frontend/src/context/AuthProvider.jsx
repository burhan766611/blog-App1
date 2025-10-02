import { useEffect, useState } from "react";
import API from "../services/api.js";
import { AuthContext } from "./AuthContext.js";

export const AuthProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading , setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await API.get("/me", { withCredentials: true });
      if (res.data.success) {
        setIsLoggedin(true);
        setUser(res.data.user);
      } else {
        setIsLoggedin(false);
        setUser(null);
      }
    } catch {
      setIsLoggedin(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    try{
      await API.post("/users/logout", {}, { withCredentials: true});
    } catch (err){
      console.log(err)
    } finally {
      setIsLoggedin(false);
      setUser(null);
    }
    
  }

  return (
    <AuthContext.Provider value={{ isLoggedin, user, logout, loading, setIsLoggedin, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
