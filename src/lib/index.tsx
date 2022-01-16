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

// export const postTimer = (x: any) => {
//   const postedDateISO = x;
//   const postedDate = new Date(postedDateISO).getTime();
//   const dateToday = new Date().getTime();
//   const milliseconds: any = Math.abs(dateToday - postedDate).toString();

//   const minutes: string = parseInt(milliseconds / 1000 / 60);
//   const hours = parseInt(minutes / 60);
//   const days = parseInt(hours / 24);
//   let date;

//   if (days > 0) {
//     //console.log(${days}d);
//     date = `${days} d`;
//   } else if (days === 0 && hours >= 1) {
//     //console.log(${hours}hr);
//     date = `${hours} hr`;
//   } else if (hours < 1) {
//     //console.log(${minutes}min);
//     date = `${minutes} min`;
//   }
//   return date;
// };