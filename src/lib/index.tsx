import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthGuard = () => {
  const params = new URLSearchParams(window.location.search);
  const navigate = useNavigate();

  useEffect(() => {
    const token =
      params.get("accessToken") || localStorage.getItem("accessToken");

    if (!token) {
      navigate("/login");
    } else if (params.get("accessToken")) {
      localStorage.setItem("accessToken", token);
      navigate("/home");
    }
  }, []);
};

export default useAuthGuard;

export const postTimer = (x: any) => {
  const postedDateISO = x;
  const postedDate = new Date(postedDateISO).getTime();
  const dateToday = new Date().getTime();
  const milliseconds = Math.abs(dateToday - postedDate).toString();

  const mins = parseInt(milliseconds);
  const minutes = Math.floor(mins / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  let date;

  if (weeks >= 1) {
    date = `${weeks}w`;
  } else if (days > 0) {
    date = `${days}d`;
  } else if (days > 1) {
    date = `${days}ds`;
  } else if (days === 0 && hours >= 1) {
    date = `${hours}hr`;
  } else if (hours > 2) {
    date = `${hours}hrs`;
  } else if (hours < 1) {
    date = `${minutes}min`;
  }
  return date;
};

export type Setter = React.Dispatch<
  React.SetStateAction<{
    content: string;
    media: string;
  }>
>;

export type CustomChangeEvent = React.ChangeEvent<HTMLInputElement | any>;

export interface Input {
  content: string;
  media: string;
}

export type SetterBoolean = React.Dispatch<React.SetStateAction<boolean>>;


export function handleFileChange(
  changeEvent: any,
  input: Input,
  setInput: Setter
): void {
  const reader = new FileReader();

  reader.onload = function (onLoadEvent) {
    setInput({
      ...input,
      media: String(onLoadEvent.target?.result),
    });
  };

  reader.readAsDataURL(changeEvent.target.files[0]);
}
