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

export const postTimer = (x: any ) => {
  const postedDateISO = x;
  const postedDate = new Date(postedDateISO).getTime();
  const dateToday = new Date().getTime();
  const milliseconds = Math.abs(dateToday - postedDate).toString();

  const mins = parseInt(milliseconds);
  const minutes = Math.floor(mins / 1000 / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  let date;

  if(weeks >= 1) {
    date = `${weeks}w`
  } else if(days > 0) {
    date = `${days}d`
  } else if(days > 1 ) {
    date = `${days}ds`
  } else if(days === 0 && hours >= 1) {
    date = `${hours}hr`
  } else if(hours > 2) {
    date = `${hours}hrs`
  } else if (hours < 1) {
    date = `${minutes}min`
  }
  return date;
};
