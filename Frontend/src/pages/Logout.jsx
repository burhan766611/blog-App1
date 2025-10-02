import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await API.post("/users/logout"); 
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    };

    logoutUser();
  }, [navigate]);

  return <h1>Logging out...</h1>;
};

export default Logout;

