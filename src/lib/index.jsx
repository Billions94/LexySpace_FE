import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthGuard = () => {
    const params = new URLSearchParams(window.location.search)
    console.log('===============> token', params.get("accessToken"))
    const navigate = useNavigate()
  
    useEffect(() => {
      
      const token =
        localStorage.getItem("accessToken") || params.get("accessToken")
  
      if (!token) {
        navigate("/login");
      } else if (params.get("accessToken")) {
        localStorage.setItem("accessToken", token);
        navigate("/home");
      }
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
};

export default useAuthGuard